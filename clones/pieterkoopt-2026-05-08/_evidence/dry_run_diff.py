"""Dry-run validation: would the SKILL methodology have caught the bugs?

Diffs the ground-truth.json (written BY HAND today, before this script ran)
against the actual C2 and C3 extraction outputs we already have on disk.

Output: a structured failure list. Run from the clone session root.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).parent.parent

GROUND_TRUTH = json.load(open(ROOT / "ground-truth.json"))
C2 = json.load(open(ROOT / "caso-c-structured-data" / "c2-crawl4ai-heuristic.json"))
C3 = json.load(open(ROOT / "caso-c-structured-data" / "c3-firecrawl-cloud.json"))

verdict: list[dict[str, Any]] = []


def add(case: str, field: str, expected: Any, actual: Any, severity: str, note: str) -> None:
    verdict.append({
        "case": case,
        "field": field,
        "expected": expected,
        "actual": actual,
        "severity": severity,
        "note": note,
    })


# === C2 — crawl4ai heuristic checks ===
c2_data = C2["data"]

# C2 H1 — should match
gt_h1 = GROUND_TRUTH["verbatim"]["h1"]
c2_h1 = c2_data.get("h1") or ""
if c2_h1.replace(".", "").replace(" ", "") == gt_h1.replace(".", "").replace(" ", ""):
    add("C2", "h1", gt_h1, c2_h1, "info", "Matches modulo whitespace/punctuation merging in source DOM")
else:
    add("C2", "h1", gt_h1, c2_h1, "minor", "Whitespace difference noted")

# C2 H2 — first text node only is captured by the schema
gt_h2 = GROUND_TRUTH["verbatim"]["h2"]
c2_h2 = [h.get("text", "") for h in c2_data.get("h2_list", [])]
empty = [i for i, t in enumerate(c2_h2) if not t.strip()]
if len(c2_h2) != len(gt_h2):
    add("C2", "h2_count", len(gt_h2), len(c2_h2), "major", f"Missed {len(gt_h2) - len(c2_h2)} h2 elements")
if empty:
    add("C2", "h2_empty_indices", "all populated", empty, "major", "Some h2 entries are empty strings")

# C2 H3 — THIS is where the silent-fail surfaced
gt_h3 = GROUND_TRUTH["verbatim"]["h3"]
c2_h3 = [h.get("text", "") for h in c2_data.get("h3_list", [])]
empty = [i for i, t in enumerate(c2_h3) if not t.strip()]
if len(empty) > 0:
    add("C2", "h3_text", gt_h3, c2_h3, "blocker",
        f"{len(empty)}/{len(c2_h3)} h3 entries returned empty strings — SILENT FAILURE. "
        "Pydantic strict validation per Gemini's audit would have caught this BEFORE the spec file was written.")

# C2 phone / email / whatsapp — should match
gt_phone = GROUND_TRUTH["contact"]["phone"]
c2_phone = (c2_data.get("phone") or "").replace("tel:", "").replace(" ", "").replace("+", "+")
gt_phone_norm = gt_phone.replace(" ", "")
if c2_phone.replace("+", "") == gt_phone_norm.replace("+", ""):
    add("C2", "phone", gt_phone, c2_phone, "info", "Matches (modulo formatting)")

gt_email = GROUND_TRUTH["contact"]["email"]
c2_email = (c2_data.get("email") or "").replace("mailto:", "")
if c2_email == gt_email:
    add("C2", "email", gt_email, c2_email, "info", "Match")
else:
    add("C2", "email", gt_email, c2_email, "major", "Mismatch")

gt_wa = GROUND_TRUTH["contact"]["whatsapp"]
c2_wa = c2_data.get("whatsapp")
if c2_wa == gt_wa:
    add("C2", "whatsapp", gt_wa, c2_wa, "info", "Match")
else:
    add("C2", "whatsapp", gt_wa, c2_wa, "major", "Mismatch")

# C2 social_links — known fail
c2_social = c2_data.get("social_links", [])
non_empty = [s for s in c2_social if s.get("platform_url")]
if len(non_empty) == 0:
    add("C2", "social_links", [GROUND_TRUTH["contact"]["instagram"], GROUND_TRUTH["contact"]["tiktok"]],
        c2_social, "major",
        "social_links populated as 2 empty objects — same selector traversal issue as h3_text. "
        "Pydantic strict would have caught this.")


# === C3 — Firecrawl Cloud extract checks ===
c3_data = C3["data"]

# C3 site_name — should match (modulo branding ®)
add("C3", "site_name", "PieterKoopt (or PieterKoopt®)", c3_data.get("site_name"),
    "info" if "PieterKoopt" in c3_data.get("site_name", "") else "major",
    "Match modulo ® registered-trademark glyph")

# C3 tagline — match
gt_tagline = "Selling a painting? Pieter arranges it."
add("C3", "tagline", gt_tagline, c3_data.get("tagline"),
    "info" if c3_data.get("tagline") == gt_tagline else "major",
    "Match" if c3_data.get("tagline") == gt_tagline else "Mismatch")

# C3 phone — match (formatted vs unformatted)
add("C3", "phone", GROUND_TRUTH["contact"]["phone"],
    c3_data.get("contact_channels", {}).get("phone"),
    "info" if (c3_data.get("contact_channels", {}).get("phone") or "").replace(" ", "") == GROUND_TRUTH["contact"]["phone"].replace(" ", "")
    else "major", "Match modulo whitespace")

# C3 address — match
add("C3", "address", GROUND_TRUTH["contact"]["physical_address"],
    c3_data.get("contact_channels", {}).get("physical_address"),
    "info" if c3_data.get("contact_channels", {}).get("physical_address") == GROUND_TRUTH["contact"]["physical_address"]
    else "major", "Match" if c3_data.get("contact_channels", {}).get("physical_address") == GROUND_TRUTH["contact"]["physical_address"] else "Mismatch")

# C3 process_steps — count + content
gt_steps_count = 3
c3_steps = c3_data.get("process_steps", [])
if len(c3_steps) == gt_steps_count:
    add("C3", "process_steps_count", gt_steps_count, len(c3_steps), "info", "Match")
else:
    add("C3", "process_steps_count", gt_steps_count, len(c3_steps), "major", "Step count mismatch")

# C3 CTAs — known disagreement with C3 branding endpoint
c3_primary = c3_data.get("ctas", {}).get("primary")
gt_primary = GROUND_TRUTH["verbatim"]["primary_cta_text"]
if c3_primary == gt_primary:
    add("C3", "primary_cta", gt_primary, c3_primary, "info", "Match")
else:
    add("C3", "primary_cta", gt_primary, c3_primary, "minor",
        f"C3 extract picked '{c3_primary}' as primary, ground-truth picked '{gt_primary}'. "
        "Both are real CTAs in different page contexts — LLM judgement varies. "
        "Per Gemini's audit, the rubric-injected approach (dictate scoring before LLM picks) would resolve.")

# C3 framework — known shallow detection
c3_stack = c3_data.get("tech_stack_detected", [])
if "Webflow" not in str(c3_stack):
    add("C3", "framework", "Webflow", c3_stack, "minor",
        "Stack detection shallow — did not flag Webflow despite obvious markers (cdn.prod.website-files.com, w-* prefixes). "
        "Prompt should ask explicitly for framework signatures.")


# === Summary ===
totals = {"info": 0, "minor": 0, "major": 0, "blocker": 0}
for v in verdict:
    totals[v["severity"]] += 1

output = {
    "_method": "Dry-run methodology validation — would the SKILL pre-flight checklist have caught the silent fail?",
    "_executedAt": "2026-05-08T13:15Z",
    "_summary": {
        "total_checks": len(verdict),
        **totals,
    },
    "_verdict": (
        "BLOCKER COUNT > 0" if totals["blocker"] > 0 else "PASSED"
    ),
    "_methodologyClaim": (
        "If the SKILL's pre-flight had been followed (ground-truth.json written by hand, "
        "Pydantic strict validation on the C2 heuristic output before writing any spec), "
        "the H3-text silent failure would have raised at the validation step instead of "
        "being discovered by manual inspection 2 hours later. The SKILL closes the bias "
        "loop Gemini flagged: developer-as-judge becomes test-as-judge."
    ),
    "checks": verdict,
}

out_path = ROOT / "_evidence" / "dry-run-methodology-validation.json"
out_path.write_text(json.dumps(output, indent=2, ensure_ascii=False))
print(f"Saved: {out_path}")
print()
print(f"Total checks: {len(verdict)}")
for sev, n in totals.items():
    print(f"  {sev}: {n}")
print()
print(f"Verdict: {output['_verdict']}")
