# Browserless (Mac Mini) — HTML → PNG

Local headless Chromium for LinkedIn card generation. n8n (and any host process on the Mini) calls it on loopback. It is **not** public and must **never** get a Cloudflare tunnel or subdomain.

**Installed:** 28 Jul 2026  
**Host:** Felipes-Mac-mini (`x86_64` / Docker `amd64`), 16 GB RAM

---

## Container

| Item | Value |
|------|--------|
| Name | `sysbilt-browserless` |
| Image | `ghcr.io/browserless/chromium:latest` |
| Digest at install | `sha256:80554ddd879b22d668dc85f0fb18765d1cbcb1c9ebc8a22d5ab0fec4616ad7ce` |
| Host bind | `127.0.0.1:3010` → container `3000` |
| Restart policy | `unless-stopped` |
| Memory limit | 2 GB (`--memory=2g --memory-swap=2g`) |

### Exact `docker run` used (token redacted)

```bash
docker run -d \
  --name sysbilt-browserless \
  --restart unless-stopped \
  -p 127.0.0.1:3010:3000 \
  -e "TOKEN=<TOKEN>" \
  -e "HOST=0.0.0.0" \
  -e "CONCURRENT=2" \
  -e "QUEUED=10" \
  -e "TIMEOUT=60000" \
  --memory=2g \
  --memory-swap=2g \
  ghcr.io/browserless/chromium:latest
```

Notes:

- Host publish is **loopback only** (`127.0.0.1:3010`). Do not change this to `0.0.0.0`.
- `HOST=0.0.0.0` is the bind **inside** the container so Docker port mapping works.
- Open-source Browserless uses env `QUEUED` (not `MAX_QUEUE_LENGTH`).

---

## Secrets (path only — never commit the value)

| File | Purpose |
|------|---------|
| `~/.config/sysbilt/browserless-secrets.env` | Mode `600`. Outside any git repo. |

Contents shape:

```bash
BROWSERLESS_TOKEN=<TOKEN>
BROWSERLESS_URL=http://localhost:3010
```

Do **not** put the token in the SYSBILT repo, `.env`, or `.env.local`.

---

## Screenshot endpoint (confirmed)

Both returned HTTP 200; prefer the explicit v2 path:

```text
POST http://127.0.0.1:3010/chromium/screenshot?token=<TOKEN>
```

Alias that also works: `POST /screenshot?token=<TOKEN>`

### n8n reachability

n8n on this Mini is a **host Node process** (not Docker), listening on `5678`.  
Use `http://127.0.0.1:3010` (or `http://localhost:3010`) from n8n.  
If n8n were ever moved into Docker, switch to `http://host.docker.internal:3010`.

---

## Request body that produced a correct LinkedIn-sized render

Verified: PNG **2160 × 2700** (viewport 1080×1350, `deviceScaleFactor: 2`), Google Fonts loaded with `networkidle0`.

```json
{
  "html": "<html>…your card markup…</html>",
  "options": { "type": "png" },
  "viewport": {
    "width": 1080,
    "height": 1350,
    "deviceScaleFactor": 2
  },
  "gotoOptions": { "waitUntil": "networkidle0" }
}
```

Use `waitUntil: "networkidle0"` when the HTML loads Google Fonts or other network assets. If that ever fails, fall back to `"waitForTimeout": 3000` (or similar) and re-test.

Font smoke test file (visual check): `~/Desktop/browserless-font-test.png` on the Mini.

---

## Ops commands

```bash
# Status
docker ps --filter name=sysbilt-browserless

# Logs
docker logs sysbilt-browserless --tail 100

# Restart
docker restart sysbilt-browserless

# Confirm restart policy
docker inspect sysbilt-browserless --format '{{.HostConfig.RestartPolicy.Name}}'

# Confirm loopback bind only
lsof -nP -iTCP:3010 -sTCP:LISTEN
# expect: 127.0.0.1:3010  (not *:3010 / 0.0.0.0)
```

### Update image (manual, deliberate)

```bash
docker pull ghcr.io/browserless/chromium:latest
docker rm -f sysbilt-browserless
# re-run the docker run block above with TOKEN from browserless-secrets.env
# prefer pinning a version tag/digest after a known-good pull
```

---

## Security rules (non-negotiable)

1. Bind host port to **`127.0.0.1` only**.
2. **Never** add a Cloudflare Tunnel hostname, DNS record, or subdomain for Browserless.
3. **Never** commit `BROWSERLESS_TOKEN` or the secrets file into git.
4. Token auth on every request (`?token=`).

---

## Related

- Postiz secrets pattern: `~/.config/sysbilt/postiz-secrets.env`
- Tunnel (n8n + Postiz only): `~/.cloudflared/config.yml` — Browserless must stay off this list
- Content lanes that will call this later: Industry News cards (LinkedIn), then Website News landscape cards
