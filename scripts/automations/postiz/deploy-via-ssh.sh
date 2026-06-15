#!/usr/bin/env bash
# Deploy Postiz to Mac Mini from MacBook (Tailscale SSH).
# Requires: SSH access to felipechaparro@felipes-mac-mini.tail1e2dea.ts.net
set -euo pipefail

HOST="${POSTIZ_SSH_HOST:-felipes-mac-mini-1.tail1e2dea.ts.net}"
USER="${POSTIZ_SSH_USER:-sysbilt}"
REMOTE_DIR="${POSTIZ_REMOTE_DIR:-~/services/postiz-bootstrap}"
REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
ENV_LOCAL="${REPO_ROOT}/.env.local"
POSTIZ_SCRIPTS="${REPO_ROOT}/scripts/automations/postiz"

SSH_OPTS=(-o ConnectTimeout=15 -o StrictHostKeyChecking=accept-new)
if [[ -f "${HOME}/.ssh/id_ed25519" ]]; then
  SSH_OPTS+=(-o IdentitiesOnly=yes -i "${HOME}/.ssh/id_ed25519")
fi

ssh_cmd() { ssh "${SSH_OPTS[@]}" "${USER}@${HOST}" "$@"; }
scp_cmd() { scp "${SSH_OPTS[@]}" "$@"; }

echo "==> Checking SSH to ${USER}@${HOST}"
ssh_cmd "echo ok && hostname && docker --version"

echo "==> Uploading bootstrap scripts"
ssh_cmd "mkdir -p ${REMOTE_DIR}"
scp_cmd "${POSTIZ_SCRIPTS}/bootstrap-mac-mini.sh" "${POSTIZ_SCRIPTS}/load-secrets-from-env.sh" "${POSTIZ_SCRIPTS}/patch-cloudflared.sh" "${USER}@${HOST}:${REMOTE_DIR}/"
scp_cmd "${ENV_LOCAL}" "${USER}@${HOST}:${REMOTE_DIR}/.env.local"

echo "==> Running bootstrap on Mac Mini"
ssh_cmd "bash ${REMOTE_DIR}/load-secrets-from-env.sh ${REMOTE_DIR}/.env.local && POSTIZ_SECRETS_FILE=\${HOME}/.config/sysbilt/postiz-secrets.env bash ${REMOTE_DIR}/bootstrap-mac-mini.sh"

echo "==> Done. Open https://postiz.sysbilt.com"
