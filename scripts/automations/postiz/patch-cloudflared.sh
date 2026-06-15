#!/usr/bin/env bash
# Add postiz.sysbilt.com ingress to existing cloudflared config on Mac Mini.
set -euo pipefail

HOSTNAME="${1:-postiz.sysbilt.com}"
SERVICE="${2:-http://localhost:5000}"

find_config() {
  local c
  for c in \
    "${HOME}/.cloudflared/config.yml" \
    "${HOME}/.cloudflared/config.yaml" \
    "${HOME}/Library/Application Support/cloudflared/config.yml"; do
    [[ -f "${c}" ]] && { echo "${c}"; return 0; }
  done
  return 1
}

CFG="$(find_config)" || { echo "No cloudflared config found" >&2; exit 1; }

if grep -q "hostname: ${HOSTNAME}" "${CFG}"; then
  echo "Already configured: ${HOSTNAME} in ${CFG}"
  exit 0
fi

cp "${CFG}" "${CFG}.bak.$(date +%Y%m%d%H%M%S)"
python3 - "${CFG}" "${HOSTNAME}" "${SERVICE}" <<'PY'
import pathlib, sys
cfg, host, svc = sys.argv[1:4]
text = pathlib.Path(cfg).read_text()
needle = "ingress:"
if needle not in text:
    raise SystemExit("No ingress: block in cloudflared config")
block = f"\n  - hostname: {host}\n    service: {svc}\n"
# Insert before catch-all http_status:404 rule if present
catch = "service: http_status:404"
idx = text.find(catch)
if idx != -1:
    line_start = text.rfind("\n", 0, idx)
    text = text[:line_start] + block + text[line_start:]
else:
    text = text.rstrip() + block
pathlib.Path(cfg).write_text(text)
print(f"Added {host} -> {svc}")
PY

echo "Restart cloudflared to apply (e.g. brew services restart cloudflared or launchctl kickstart)."
