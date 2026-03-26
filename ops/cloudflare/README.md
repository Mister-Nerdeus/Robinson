# Cloudflare Tunnel Ops Assets

This folder contains redacted templates and operator guidance only.

## Files
- `config.template.yml`: redacted tunnel config pattern for app-only public routing with future multi-site placeholders.

## Security Rules
- Never commit real tunnel UUIDs, credentials-file paths, API tokens, or hostname secrets.
- Keep real config at `%USERPROFILE%\\.cloudflared\\config.yml` (untracked).

## In-Scope Public Surface
- `http://localhost:3001` only.

## Out of Scope
- `http://localhost:4001` (Mailpit)
- admin/dev tools
