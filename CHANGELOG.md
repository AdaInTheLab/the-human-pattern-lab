### 2025-12-29

### FIX [SCMS] honor API envelope + expose Lab Note metadata in normalization 🧬
- Parse { ok, data } envelope for Lab Notes API mode
- Stop hardcoding status/type; derive status from published when absent
- Pass through optional fields (subtitle/summary/dept/type/status/author/locale)
- Improve sorting: published first, drafts by title
