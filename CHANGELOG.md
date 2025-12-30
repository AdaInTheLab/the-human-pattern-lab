## [0.6.2] — Cognitive Hygiene

### Changed
- Updated Lab Note data shape to surface newly supported database fields (metadata, safety flags, coherence scoring).
- Relocated `NotesStore` to its canonical home to reduce cross-context coupling and improve architectural clarity.

### Added
- New Lab Note documenting context switching, interruptions, and their impact on cognitive flow and error rates.

### Notes
- No intended behavioral or visual UI changes.
- This release prioritizes cognitive load reduction, data integrity, and future extensibility.


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
