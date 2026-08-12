const HUBSPOT_BASE = 'https://api.hubapi.com';

export interface HubspotDeal {
  id: string;
  dealname: string;
  amount: string | null;
  dealstage: string | null;
  closedate: string | null;
  notion_proposal_url: string | null;
  pipeline: string | null;
}

export interface HubspotContact {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  jobtitle: string;
}

export interface HubspotCompany {
  id: string;
  name: string;
  domain: string;
  industry: string;
  city: string;
  state: string;
  country: string;
}

export interface HubspotDealBundle {
  deal: HubspotDeal;
  contact: HubspotContact | null;
  company: HubspotCompany | null;
}

async function hubspotGet<T>(path: string): Promise<T> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN is not set');
  const resp = await fetch(`${HUBSPOT_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`HubSpot ${resp.status} ${path}: ${text}`);
  }
  return resp.json() as Promise<T>;
}

export async function getDealBundle(dealId: string): Promise<HubspotDealBundle> {
  const dealProps = ['dealname', 'amount', 'dealstage', 'closedate', 'notion_proposal_url', 'pipeline'];
  const propsParam = `properties=${dealProps.join(',')}`;
  const associationsParam = 'associations=contacts,companies';
  const dealResp: any = await hubspotGet(
    `/crm/v3/objects/deals/${encodeURIComponent(dealId)}?${propsParam}&${associationsParam}`,
  );

  const deal: HubspotDeal = {
    id: dealResp.id,
    dealname: dealResp.properties?.dealname ?? '',
    amount: dealResp.properties?.amount ?? null,
    dealstage: dealResp.properties?.dealstage ?? null,
    closedate: dealResp.properties?.closedate ?? null,
    notion_proposal_url: dealResp.properties?.notion_proposal_url ?? null,
    pipeline: dealResp.properties?.pipeline ?? null,
  };

  const contactId = dealResp.associations?.contacts?.results?.[0]?.id ?? null;
  const companyId = dealResp.associations?.companies?.results?.[0]?.id ?? null;

  const [contact, company] = await Promise.all([
    contactId ? fetchContact(contactId) : Promise.resolve(null),
    companyId ? fetchCompany(companyId) : Promise.resolve(null),
  ]);

  return { deal, contact, company };
}

async function fetchContact(contactId: string): Promise<HubspotContact | null> {
  try {
    const props = ['firstname', 'lastname', 'email', 'phone', 'jobtitle'];
    const resp: any = await hubspotGet(
      `/crm/v3/objects/contacts/${encodeURIComponent(contactId)}?properties=${props.join(',')}`,
    );
    return {
      id: resp.id,
      firstname: resp.properties?.firstname ?? '',
      lastname: resp.properties?.lastname ?? '',
      email: resp.properties?.email ?? '',
      phone: resp.properties?.phone ?? '',
      jobtitle: resp.properties?.jobtitle ?? '',
    };
  } catch {
    return null;
  }
}

async function fetchCompany(companyId: string): Promise<HubspotCompany | null> {
  try {
    const props = ['name', 'domain', 'industry', 'city', 'state', 'country'];
    const resp: any = await hubspotGet(
      `/crm/v3/objects/companies/${encodeURIComponent(companyId)}?properties=${props.join(',')}`,
    );
    return {
      id: resp.id,
      name: resp.properties?.name ?? '',
      domain: resp.properties?.domain ?? '',
      industry: resp.properties?.industry ?? '',
      city: resp.properties?.city ?? '',
      state: resp.properties?.state ?? '',
      country: resp.properties?.country ?? '',
    };
  } catch {
    return null;
  }
}

async function hubspotPatch<T>(path: string, body: unknown): Promise<T> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN is not set');
  const resp = await fetch(`${HUBSPOT_BASE}${path}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`HubSpot ${resp.status} ${path}: ${text}`);
  }
  return resp.json() as Promise<T>;
}

async function hubspotPost<T>(path: string, body: unknown): Promise<T> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN is not set');
  const resp = await fetch(`${HUBSPOT_BASE}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`HubSpot ${resp.status} ${path}: ${text}`);
  }
  return resp.json() as Promise<T>;
}

export async function updateDealStage(dealId: string, stage: string): Promise<void> {
  await hubspotPatch(`/crm/v3/objects/deals/${encodeURIComponent(dealId)}`, {
    properties: { dealstage: stage },
  });
}

export async function addDealNote(dealId: string, body: string): Promise<void> {
  // Create the note WITH a deal association in a single call.
  // associationTypeId 214 is HubSpot's standard "Note to Deal" type.
  await hubspotPost('/crm/v3/objects/notes', {
    properties: {
      hs_note_body: body,
      hs_timestamp: new Date().toISOString(),
    },
    associations: [
      {
        to: { id: dealId },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 214,
          },
        ],
      },
    ],
  });
}

/** Find an existing contact by email. Does not create. */
export async function findContactByEmail(
  emailRaw: string,
): Promise<{ id: string; email: string; firstname: string; lastname: string } | null> {
  const email = emailRaw.trim().toLowerCase();
  if (!email) return null;

  const search: any = await hubspotPost('/crm/v3/objects/contacts/search', {
    filterGroups: [
      {
        filters: [{ propertyName: 'email', operator: 'EQ', value: email }],
      },
    ],
    properties: ['email', 'firstname', 'lastname'],
    limit: 1,
  });

  const hit = search.results?.[0];
  if (!hit?.id) return null;
  return {
    id: String(hit.id),
    email: String(hit.properties?.email || email),
    firstname: String(hit.properties?.firstname || ''),
    lastname: String(hit.properties?.lastname || ''),
  };
}

/** Search contact by email; create or update with standard properties only (Free-tier friendly). */
export async function upsertContactByEmail(input: {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  website?: string;
  /** HubSpot lifecycle: subscriber | lead | opportunity | customer | evangelist | … */
  lifecyclestage?: string;
  /** Free-text source, e.g. go/missed-call */
  leadSourceDetail?: string;
}): Promise<{ id: string; created: boolean }> {
  const email = input.email.trim().toLowerCase();
  if (!email) throw new Error('email required');

  const existing = await findContactByEmail(email);
  const existingId = existing?.id;
  const nameParts = (input.firstname || '').trim().split(/\s+/).filter(Boolean);
  const firstname = nameParts[0] || input.firstname || '';
  const lastname =
    input.lastname ||
    (nameParts.length > 1 ? nameParts.slice(1).join(' ') : '');

  const properties: Record<string, string> = {
    email,
  };
  if (firstname) properties.firstname = firstname;
  if (lastname) properties.lastname = lastname;
  if (input.phone) properties.phone = input.phone;
  if (input.company) properties.company = input.company;
  if (input.website) properties.website = input.website;
  if (input.lifecyclestage) properties.lifecyclestage = input.lifecyclestage;
  if (input.leadSourceDetail) properties.lead_source_detail = input.leadSourceDetail;

  if (existingId) {
    await hubspotPatch(`/crm/v3/objects/contacts/${encodeURIComponent(existingId)}`, {
      properties,
    });
    return { id: existingId, created: false };
  }

  const created: any = await hubspotPost('/crm/v3/objects/contacts', { properties });
  return { id: String(created.id), created: true };
}

/** Note on a contact. associationTypeId 202 = Note to Contact. */
export async function addContactNote(contactId: string, body: string): Promise<void> {
  await hubspotPost('/crm/v3/objects/notes', {
    properties: {
      hs_note_body: body,
      hs_timestamp: new Date().toISOString(),
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 202,
          },
        ],
      },
    ],
  });
}

/**
 * Create a deal for a paid funnel (/go) product job and associate it to the contact.
 * associationTypeId 3 = Deal → Contact.
 *
 * Lands in Product · Paid (not Won) and tags sybilt_deal_kind=fixed_product so
 * relationship automations (proposal, 50% deposit) can exclude these deals.
 * Override stage with HUBSPOT_FUNNEL_ACCESS_DEAL_STAGE if needed.
 */
export async function createFunnelAccessDeal(input: {
  contactId: string;
  dealname: string;
  amount?: string;
  productCode?: string;
  noteBody?: string;
}): Promise<{ id: string }> {
  /** Product · Paid on the SYSBILT Sales pipeline (added for /go fixed products). */
  const PRODUCT_PAID_STAGE = '3461637581';
  const dealstage =
    process.env.HUBSPOT_FUNNEL_ACCESS_DEAL_STAGE?.trim() || PRODUCT_PAID_STAGE;
  const pipeline = process.env.HUBSPOT_FUNNEL_PIPELINE?.trim() || 'default';

  const properties: Record<string, string> = {
    dealname: input.dealname,
    dealstage,
    pipeline,
    closedate: String(Date.now()),
    sybilt_deal_kind: 'fixed_product',
  };
  if (input.amount) properties.amount = input.amount;
  if (input.productCode) properties.sybilt_product_code = input.productCode;

  const created: any = await hubspotPost('/crm/v3/objects/deals', {
    properties,
    associations: [
      {
        to: { id: input.contactId },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 3,
          },
        ],
      },
    ],
  });

  const dealId = String(created.id);
  if (input.noteBody) {
    try {
      await addDealNote(dealId, input.noteBody);
    } catch (err) {
      console.error('[hubspot] deal note failed', err);
    }
  }
  return { id: dealId };
}

// Pipeline order. Lower index = earlier in the pipeline. closedlost is special and never auto-progresses.
const STAGE_ORDER: Record<string, number> = {
  qualifiedtobuy: 1, // Discovery Booked
  presentationscheduled: 2, // Qualified
  decisionmakerboughtin: 3, // Proposal Sent
  contractsent: 4, // Negotiating
  closedwon: 5, // Won
};

/**
 * Move deal stage forward only. Never moves backwards. Never moves out of closedlost.
 * Returns true if stage was changed, false if it was a no-op.
 */
export async function progressDealStage(dealId: string, targetStage: string): Promise<boolean> {
  const dealResp: any = await hubspotGet(
    `/crm/v3/objects/deals/${encodeURIComponent(dealId)}?properties=dealstage`,
  );
  const currentStage = dealResp.properties?.dealstage ?? '';

  if (currentStage === 'closedlost') {
    return false;
  }

  const currentRank = STAGE_ORDER[currentStage] ?? 0;
  const targetRank = STAGE_ORDER[targetStage] ?? 0;

  if (targetRank <= currentRank) {
    return false;
  }

  await updateDealStage(dealId, targetStage);
  return true;
}
