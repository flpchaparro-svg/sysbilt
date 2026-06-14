#!/usr/bin/env bash
# Postiz API smoke test (Phase 2.5) — run after channels are connected.
set -euo pipefail

API_KEY="${POSTIZ_API_KEY:?Set POSTIZ_API_KEY}"
BASE="${POSTIZ_BASE_URL:-https://postiz.sysbilt.com/api/public/v1}"
CURL_OPTS=(--resolve postiz.sysbilt.com:443:104.21.33.174)

echo "==> List integrations"
INTEGRATIONS=$(curl -s "${CURL_OPTS[@]}" -H "Authorization: ${API_KEY}" "${BASE}/integrations")
echo "${INTEGRATIONS}" | python3 -m json.tool
COUNT=$(echo "${INTEGRATIONS}" | python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d) if isinstance(d,list) else 0)")
if [[ "${COUNT}" -lt 1 ]]; then
  echo "No integrations connected yet. Complete OAuth in Postiz UI first." >&2
  exit 1
fi

IMAGE_URL="${SMOKE_IMAGE_URL:-https://cdn.sanity.io/images/wdlc9pg8/production/placeholder.jpg}"
echo "==> Upload image from URL"
UPLOAD=$(curl -s "${CURL_OPTS[@]}" -X POST "${BASE}/upload-from-url" \
  -H "Authorization: ${API_KEY}" -H "Content-Type: application/json" \
  -d "{\"url\":\"${IMAGE_URL}\"}")
echo "${UPLOAD}" | python3 -m json.tool
UPLOAD_ID=$(echo "${UPLOAD}" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))")
UPLOAD_PATH=$(echo "${UPLOAD}" | python3 -c "import json,sys; print(json.load(sys.stdin).get('path',''))")

echo "==> Create draft posts per integration"
echo "${INTEGRATIONS}" | python3 - <<'PY' | while read -r line; do
import json,sys,os,subprocess
items=json.load(sys.stdin)
if not isinstance(items,list): items=[]
base=os.environ.get("POSTIZ_BASE_URL","https://postiz.sysbilt.com/api/public/v1")
key=os.environ["POSTIZ_API_KEY"]
img_id=os.environ.get("UPLOAD_ID","")
img_path=os.environ.get("UPLOAD_PATH","")
for it in items:
    iid=it.get("id") or it.get("integrationId")
    provider=it.get("providerIdentifier") or it.get("provider") or it.get("identifier") or ""
    if not iid or not provider: continue
    body={
      "type":"draft",
      "date":"2026-06-20T22:00:00.000Z",
      "shortLink":False,
      "tags":[],
      "posts":[{
        "integration":{"id":iid},
        "value":[{"content":f"API smoke test — {provider} draft only","image":[{"id":img_id,"path":os.environ.get("SMOKE_IMAGE_URL","https://cdn.sanity.io/images/wdlc9pg8/production/placeholder.jpg")}] if img_id else []}],
        "settings":{"__type":provider}
      }]
    }
    print(json.dumps({"provider":provider,"id":iid,"body":body}))
PY
  provider=$(echo "$line" | python3 -c "import json,sys; print(json.load(sys.stdin)['provider'])")
  echo "--- draft: ${provider}"
  echo "$line" | python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin)['body']))" | \
    curl -s "${CURL_OPTS[@]}" -X POST "${BASE}/posts" \
      -H "Authorization: ${API_KEY}" -H "Content-Type: application/json" -d @- | python3 -m json.tool
done

echo "==> Done. Check https://postiz.sysbilt.com calendar for drafts."
