# Urechem Website Security Hardening

## Scope

This hardening pass protects the existing Urechem website without redesigning pages, removing content, changing product data, replacing animations, or altering responsive layouts. The two existing technical-assistance interfaces retain their catalogue-linked result cards and now share one protected server endpoint.

## Vulnerabilities corrected

- Public forms had no server submission or server-side validation path.
- Both technical-assistance tools executed entirely in the browser and had no enforceable cost/abuse controls.
- Public endpoints had no persistent rate limiting, request-size limits, origin enforcement, duplicate suppression, or bot trap.
- Production security headers and Content Security Policy were not configured.
- Build verification did not scan Git history or browser bundles for secrets and did not test security status codes.
- Credential file patterns beyond dotenv files were not explicitly ignored.
- Error responses and provider failures had no shared redaction policy because there was no backend layer.

## Server endpoints

### `POST /api/ai/solution`

- Limit: 8 requests per minute per hashed client identifier.
- Maximum JSON body: 8 KiB.
- Schema: exactly one `question` string, trimmed, 1–1200 characters.
- Returns catalogue-linked analysis as data only; generated content is never inserted as HTML.

### `POST /api/enquiries`

- Covers general enquiries, consultation, TDS, SDS, COA, compliance, processing-guide, sample, quotation and site-visit requests.
- Limit: 4 submissions per 10 minutes per hashed client identifier.
- Maximum JSON body: 16 KiB.
- Duplicate suppression: 120 seconds for equivalent submissions.
- Honeypot and minimum interaction-time checks.
- Server-only email delivery through Resend with a safe mailto/copy/download fallback retained in the interface.

## Production environment variables

Configure these in Vercel for Production, Preview and Development as appropriate:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RESEND_API_KEY`
- `URECHEM_ENQUIRY_EMAIL`
- `URECHEM_FROM_EMAIL`
- `URECHEM_ALLOWED_ORIGINS`
- `NEXT_PUBLIC_URECHEM_ENQUIRY_EMAIL` — public fallback inbox only; never place a secret in this variable.

The Redis and Resend secrets must remain server-only. The application deliberately has no client reference to them.

## Security headers

- Content-Security-Policy restricted to the site and its actual Pexels/Unsplash media dependencies.
- Strict-Transport-Security.
- X-Content-Type-Options.
- Referrer-Policy.
- Permissions-Policy.
- Frame protection through `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
- Cross-Origin-Opener-Policy.
- Cross-Origin-Resource-Policy.
- Origin-Agent-Cluster.
- `X-Powered-By` disabled and production browser source maps disabled.

## Verification

CI now performs dependency audit, lint, type checking, existing theme and image audits, production build, source/history/client-bundle secret scanning, full sitemap route smoke tests, and security smoke tests for 400, 403, 405, 413, 415, 429 and safe provider-failure behavior.

## Manual operations

- Create/configure the Upstash Redis database and Resend sending domain/inbox.
- Configure all server-only environment variables in Vercel and redeploy.
- Rotate any real credential reported by the history scanner. No credential should be considered safe merely because it was removed from the latest commit.
