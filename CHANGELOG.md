
### FOXFIRE [CORE] stabilize env loading, auth bootstrap, and schema meta 🦊🔥
- Load .env + .env.<NODE_ENV> deterministically
- Unblock session auth across ports
- Self-heal schema_meta on fresh DBs
- Restore single source of truth for schema version
- Eliminate startup crash cascade (env → auth → db)

### 2025-12-29

### FIX [SCMS] align lab notes fetch with API envelope + support new fields 🧬
### FIX [SCMS] support raw or enveloped Lab Notes API responses 🧬
### FIX [SCMS] Un-haunt Lab Notes API routing (strip /api, enable api source)
### UI [SCMS] Introduce Lab Notes loading cover 🌌
### FIX [SCMS] honor API envelope + expose Lab Note metadata in normalization 🧬
- Parse { ok, data } envelope for Lab Notes API mode
- Stop hardcoding status/type; derive status from published when absent
- Pass through optional fields (subtitle/summary/dept/type/status/author/locale)
- Improve sorting: published first, drafts by title
