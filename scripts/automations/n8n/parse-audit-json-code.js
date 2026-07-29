function repairAuditJson(raw) {
  let t = String(raw || '')
    .replace(/^```(?:json)?/mi, '')
    .replace(/```$/mi, '')
    .trim();
  t = t.replace(/[\u0000-\u001F]+/g, ' ');
  t = t.replace(/,\s*([}\]])/g, '$1');
  t = t.replace(/"([a-zA-Z_][a-zA-Z0-9_]*)"\s+"/g, '"$1": "');
  t = t.replace(/"([a-zA-Z_][a-zA-Z0-9_]*) "(?=[^:])/g, '"$1": "');
  const m = t.match(/\{[\s\S]*\}/);
  return m ? m[0] : t;
}

function parseAuditText(raw) {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
  const cleaned = repairAuditJson(raw);
  try {
    return JSON.parse(cleaned);
  } catch (first) {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(repairAuditJson(m[0]));
    throw first;
  }
}

function assertRealAudit(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    throw new Error('Audit JSON is not an object');
  }
  if (obj.helpful === true && typeof obj.response === 'string') {
    throw new Error('Model returned stub JSON, not an audit');
  }
  const crit = obj.diagnosis && obj.diagnosis.critical;
  if (!crit || typeof crit !== 'object') {
    throw new Error('Missing diagnosis.critical');
  }
  if (!String(crit.title || '').trim() || !String(crit.evidence || '').trim()) {
    throw new Error('Incomplete diagnosis.critical');
  }
  return obj;
}

/** SerpAPI knowledge_graph.unclaimed_listing is a known false positive. Strip claim findings. */
function isFalseGbpClaimText(text) {
  const t = String(text || '').toLowerCase();
  if (!t.trim()) return false;
  const aboutGoogle =
    /google\s*business|gbp\b|knowledge\s*panel|google\s*listing|business\s*profile|maps\s*listing/.test(t) ||
    (/google/.test(t) && /listing|profile|panel/.test(t));
  if (!aboutGoogle) return false;
  return /unclaimed|not\s+claimed|needs?\s+claim|claim\s+and\s+(?:verify|optimi[sz]e)|claim\s+your|verify\s+your\s+google|present\s+but\s+unclaimed|lack\s+access\s+to\s+edit/.test(
    t,
  );
}

function findingLooksLikeFalseGbpClaim(item) {
  if (!item || typeof item !== 'object') return false;
  // Titles / evidence / actions only. Metric labels like "Knowledge panel presence"
  // plus a bad value are rewritten, not deleted.
  return isFalseGbpClaimText(
    [item.title, item.evidence, item.consequence, item.point, item.text, item.name]
      .filter(Boolean)
      .join(' | '),
  );
}

function scrubFalseGbpClaimFindings(audit) {
  if (!audit || typeof audit !== 'object') return audit;
  const dx = audit.diagnosis;
  if (dx && typeof dx === 'object') {
    if (Array.isArray(dx.secondary)) {
      dx.secondary = dx.secondary.filter((item) => !findingLooksLikeFalseGbpClaim(item));
    }
    if (findingLooksLikeFalseGbpClaim(dx.critical)) {
      const promoted = Array.isArray(dx.secondary) && dx.secondary.length ? dx.secondary.shift() : null;
      if (promoted) {
        dx.critical = promoted;
      } else {
        dx.critical = {
          title: 'Search visibility needs work',
          evidence: 'Claim-status findings were removed because public unclaimed signals are unreliable.',
          consequence: 'Focus on ranking, conversion, and review response instead of listing claim status.',
        };
      }
    }
  }
  if (Array.isArray(audit.action_plan)) {
    audit.action_plan = audit.action_plan.filter((item) => !findingLooksLikeFalseGbpClaim(item));
  }
  if (audit.appendix && typeof audit.appendix === 'object' && Array.isArray(audit.appendix.action_plan)) {
    audit.appendix.action_plan = audit.appendix.action_plan.filter(
      (item) => !findingLooksLikeFalseGbpClaim(item),
    );
  }
  const metricBuckets = [audit.metrics, audit.find, audit.perceive, audit.what_we_found];
  for (const bucket of metricBuckets) {
    if (!bucket) continue;
    if (Array.isArray(bucket)) {
      for (let i = bucket.length - 1; i >= 0; i--) {
        const item = bucket[i];
        if (!item || typeof item !== 'object') continue;
        if (findingLooksLikeFalseGbpClaim(item)) {
          bucket.splice(i, 1);
          continue;
        }
        if (isFalseGbpClaimText(item.value) || /unclaimed/i.test(String(item.value || ''))) {
          item.value = 'Present';
        }
      }
    } else if (typeof bucket === 'object') {
      for (const [k, v] of Object.entries(bucket)) {
        if (Array.isArray(v)) {
          bucket[k] = v.filter((item) => !findingLooksLikeFalseGbpClaim(item));
        } else if (v && typeof v === 'object' && findingLooksLikeFalseGbpClaim(v)) {
          delete bucket[k];
        } else if (v && typeof v === 'object' && (isFalseGbpClaimText(v.value) || /unclaimed/i.test(String(v.value || '')))) {
          v.value = 'Present';
        }
      }
    }
  }
  const swot = audit.swot || audit.SWOT;
  if (swot && typeof swot === 'object') {
    for (const key of Object.keys(swot)) {
      if (!Array.isArray(swot[key])) continue;
      swot[key] = swot[key].filter((item) => {
        const text =
          typeof item === 'string'
            ? item
            : [item?.title, item?.point, item?.text, item?.evidence].filter(Boolean).join(' ');
        return !isFalseGbpClaimText(text);
      });
    }
  }
  return audit;
}

/**
 * Sentiment from Maps star histogram (all counted Google ratings), not review-text sample.
 * Positive = 4–5★, neutral = 3★, negative = 1–2★.
 */
function sentimentFromRatingSummary(summary) {
  if (!Array.isArray(summary) || !summary.length) return null;
  let pos = 0;
  let neu = 0;
  let neg = 0;
  let total = 0;
  for (const row of summary) {
    if (!row || typeof row !== 'object') continue;
    const stars = Number(row.stars);
    const amount = Number(row.amount);
    if (!Number.isFinite(stars) || !Number.isFinite(amount) || amount <= 0) continue;
    total += amount;
    if (stars >= 4) pos += amount;
    else if (stars === 3) neu += amount;
    else if (stars >= 1 && stars < 3) neg += amount;
  }
  if (total <= 0) return null;

  const raw = [
    { key: 'positive', n: pos },
    { key: 'neutral', n: neu },
    { key: 'negative', n: neg },
  ];
  const rounded = raw.map((r) => ({
    key: r.key,
    pct: Math.round((r.n / total) * 100),
    n: r.n,
  }));
  let drift = 100 - rounded.reduce((s, r) => s + r.pct, 0);
  if (drift !== 0) {
    rounded.sort((a, b) => b.n - a.n);
    rounded[0].pct += drift;
  }
  const out = { positive: 0, neutral: 0, negative: 0 };
  for (const r of rounded) out[r.key] = Math.max(0, r.pct);
  return { sentiment: out, total };
}

function readMapsPlace() {
  try {
    const maps = $('Maps Lookup').item.json;
    return maps?.place_results || (Array.isArray(maps?.local_results) ? maps.local_results[0] : null) || null;
  } catch (e) {
    return null;
  }
}

function applyGoogleReviewFacts(audit) {
  if (!audit || typeof audit !== 'object') return audit;
  const place = readMapsPlace();
  if (!place) return audit;

  const fromStars = sentimentFromRatingSummary(place.rating_summary);
  if (!audit.what_people_say || typeof audit.what_people_say !== 'object') {
    audit.what_people_say = {};
  }
  const say = audit.what_people_say;
  if (fromStars) {
    say.sentiment = fromStars.sentiment;
  } else if (!say.sentiment || typeof say.sentiment !== 'object') {
    say.sentiment = { positive: 0, neutral: 0, negative: 0 };
  }

  const rating = place.rating != null && place.rating !== '' ? String(place.rating) : '';
  const count =
    place.reviews != null && place.reviews !== ''
      ? String(place.reviews)
      : fromStars
        ? String(fromStars.total)
        : '';

  if (!Array.isArray(say.review_sources)) say.review_sources = [];
  let google = say.review_sources.find((s) => s && /google/i.test(String(s.platform || '')));
  if (!google && (rating || count)) {
    google = {
      platform: 'Google',
      rating: rating || 'N/A',
      count: count || 'N/A',
      recent_theme: 'Not enough recent review text to summarise a theme',
    };
    say.review_sources.unshift(google);
  } else if (google) {
    if (rating) google.rating = rating;
    if (count) google.count = count;
  }

  if (Array.isArray(say.metrics)) {
    for (const m of say.metrics) {
      if (!m || typeof m !== 'object') continue;
      const label = String(m.label || '').toLowerCase();
      if (rating && /google.*rating|review rating|star rating/.test(label)) m.value = rating;
      if (count && /google.*volume|review (count|volume)|number of reviews/.test(label)) m.value = count;
    }
  }

  return audit;
}

function metricValueEmpty(value) {
  const v = String(value || '').trim().toLowerCase();
  if (!v) return true;
  if (v === 'not found' || v === 'missing' || v === 'n/a' || v === 'na') return true;
  if (v.startsWith('not ')) return true;
  return false;
}

/** Fill blank scorecard tiles from detail the model already wrote. */
function enrichEmptyMetrics(audit) {
  if (!audit || typeof audit !== 'object') return audit;

  const find = audit.how_they_find_you;
  if (find && typeof find === 'object') {
    const grid = Array.isArray(find.keyword_grid) ? find.keyword_grid : [];
    if (Array.isArray(find.metrics)) {
      for (const m of find.metrics) {
        if (!m || typeof m !== 'object' || !metricValueEmpty(m.value)) continue;
        const label = String(m.label || '');
        if (/google rankings|rankings on key/i.test(label) && grid.length) {
          const bits = grid
            .map((k) => {
              const kw = String(k?.keyword || '').trim();
              const pos = String(k?.position || '').trim();
              if (!kw || !pos || /not found/i.test(pos)) return '';
              return kw + ': ' + pos;
            })
            .filter(Boolean)
            .slice(0, 3);
          if (bits.length) {
            m.value = bits.join('; ');
            const anyRanked = grid.some((k) => {
              const p = String(k?.position || '');
              return /\d/.test(p) && !/not ranking/i.test(p);
            });
            m.rating = anyRanked ? 'medium' : 'low';
          }
        }
        if (/knowledge panel/i.test(label)) {
          m.value = 'Could not verify in this pass';
          m.rating = m.rating || 'medium';
        }
      }
    }
  }

  const perceive = audit.how_they_perceive_you;
  if (perceive && typeof perceive === 'object' && Array.isArray(perceive.metrics)) {
    const headline = String(perceive.headline?.finding || '').trim();
    const hRating = String(perceive.headline?.rating || '').toLowerCase();
    for (const m of perceive.metrics) {
      if (!m || typeof m !== 'object' || !metricValueEmpty(m.value)) continue;
      if (!/value proposition|call to action|brand consistency|copy readability/i.test(String(m.label || ''))) {
        continue;
      }
      if (headline) {
        m.value = headline.length > 90 ? headline.slice(0, 87) + '...' : headline;
        m.rating = hRating === 'green' ? 'high' : hRating === 'red' ? 'low' : 'medium';
      } else {
        m.value = 'Could not verify in this pass';
        m.rating = 'medium';
      }
    }
  }

  return audit;
}

const filter = $('Filter').item.json;
const sheet = filter._sheetRow || {};
const company = filter.properties.company?.value || sheet['Business Name'] || 'Unknown';
const firstName = filter.properties.firstname?.value || '';
const email = filter._realEmail || filter.properties.email?.value || 'Unknown';
const offerProduct = String(sheet['Offer Product'] || '').trim();
const lhMobile = String(sheet['LH Mobile'] || '').trim();

const rawStr = $('Master Analyst').item.json.content.parts[0].text;
const auditObj = enrichEmptyMetrics(
  applyGoogleReviewFacts(scrubFalseGbpClaimFindings(assertRealAudit(parseAuditText(rawStr)))),
);

const out = {
  contact_first_name: firstName,
  contact_email: email,
  company_name: company,
  audit_data: auditObj,
};
if (offerProduct && !/^(auto|none|n\/a|-|routed)$/i.test(offerProduct)) {
  out.offer_product = offerProduct;
}
if (lhMobile) out.lh_mobile = lhMobile;

return [{ json: out }];
