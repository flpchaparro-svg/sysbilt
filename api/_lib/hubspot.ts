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
  // Create a Note engagement and associate it to the deal
  const noteResp: any = await hubspotPost('/crm/v3/objects/notes', {
    properties: {
      hs_note_body: body,
      hs_timestamp: new Date().toISOString(),
    },
  });
  const noteId = noteResp.id;
  // Default association type for Note → Deal is 214
  await hubspotPost(
    `/crm/v3/objects/notes/${noteId}/associations/deals/${encodeURIComponent(dealId)}/note_to_deal`,
    {},
  );
}
