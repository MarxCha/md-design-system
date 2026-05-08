"""
Caso A1 — browser-use + Ollama (gemma3:12b)

License: MIT (browser-use). Text-only LLM (gemma3:12b has no vision).

This is the experiment Juan recommended: drive a real browser with an LLM agent
and ask it to extract design tokens from a live page. We expect mediocre results
because gemma3:12b is text-only — vision-driven extraction is the natural fit
here, but Coolify Ollama doesn't host a vision model. Run anyway and report.

Output: caso-a-shadcn-rebuild/a1-browseruse-output/
"""

from __future__ import annotations

import asyncio
import json
import os
import time
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel, Field

from browser_use import Agent
from browser_use.llm import ChatOllama

# Load Ollama endpoint from .env.local (gitignored)
ENV_PATH = Path(__file__).parent.parent.parent.parent / ".env.local"
load_dotenv(ENV_PATH)

OLLAMA_BASE_URL = os.environ["OLLAMA_BASE_URL"]
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "gemma3:12b")
TARGET_URL = "https://www.pieterkoopt.nl/"
OUT_DIR = Path(__file__).parent / "a1-browseruse-output"
OUT_DIR.mkdir(exist_ok=True)


class DesignTokens(BaseModel):
    """Schema for the agent to fill in."""
    primary_color: str = Field(description="Hex of the dominant brand colour")
    secondary_color: str = ""
    background_color: str = Field(description="Page canvas background")
    text_color: str = Field(description="Default body text colour")
    accent_color: str = ""
    body_font_family: str = Field(description="Computed font-family on body")
    heading_font_family: str = ""
    h1_text: str = Field(description="The hero H1 heading text")
    primary_cta_text: str = Field(description="Most prominent call-to-action text")
    primary_cta_color: str = ""
    primary_cta_background: str = ""
    section_count_observed: int = 0
    notes: str = Field(description="Anything noteworthy about the design", default="")


async def main() -> None:
    print(f"=== Caso A1 — browser-use + Ollama ({OLLAMA_MODEL}) ===")
    print(f"Endpoint: {OLLAMA_BASE_URL}")
    print(f"Target: {TARGET_URL}\n")
    print("Note: gemma3:12b is text-only. use_vision=False forces DOM-text grounding.\n")

    llm = ChatOllama(
        model=OLLAMA_MODEL,
        host=OLLAMA_BASE_URL,
        timeout=120,
    )

    task = (
        f"Open the URL {TARGET_URL} in the browser. "
        "On the loaded page, inspect the DOM and the computed styles to find:\n"
        "1. The dominant brand colour (background of the main page canvas)\n"
        "2. The default body text colour\n"
        "3. The accent colour used on primary buttons\n"
        "4. The font-family used on the body\n"
        "5. The exact text of the hero H1 heading\n"
        "6. The exact text of the most prominent call-to-action button\n"
        "Return a structured DesignTokens object with these values. Do not invent — "
        "use 'unknown' if you cannot determine a value."
    )

    t0 = time.time()
    agent = Agent(
        task=task,
        llm=llm,
        use_vision=False,
        output_model_schema=DesignTokens,
    )

    try:
        result = await agent.run(max_steps=15)
    except Exception as exc:
        elapsed = time.time() - t0
        (OUT_DIR / "a1-error.json").write_text(json.dumps({
            "_method": "A1 — browser-use + Ollama",
            "_wallTimeSec": round(elapsed, 1),
            "_status": "ERROR",
            "_exception": f"{type(exc).__name__}: {exc}",
        }, indent=2))
        print(f"\n⚠️ Run failed after {elapsed:.1f}s: {exc}")
        return

    elapsed = time.time() - t0

    # Best-effort serialization of the result
    payload = {
        "_method": "A1 — browser-use + Ollama (gemma3:12b)",
        "_wallTimeSec": round(elapsed, 1),
        "_licenseStatus": "MIT (browser-use). Self-hosted Ollama, $0 marginal cost.",
        "_useVision": False,
        "_visionModelAvailable": False,
        "_visionLimitationNote": (
            "gemma3:12b is text-only. browser-use therefore feeds DOM-text/a11y-tree "
            "context to the model instead of screenshots. Token extraction quality is "
            "expected to be lower than a vision-capable model would deliver."
        ),
    }

    final = None
    if hasattr(result, "final_result"):
        try:
            fr = result.final_result()
            final = fr.model_dump() if hasattr(fr, "model_dump") else fr
        except Exception as e:
            payload["_finalResultError"] = str(e)
    payload["data"] = final
    if hasattr(result, "is_done"):
        payload["_isDone"] = bool(result.is_done())
    if hasattr(result, "is_successful"):
        payload["_isSuccessful"] = result.is_successful()

    OUT_DIR.joinpath("a1-result.json").write_text(json.dumps(payload, indent=2, ensure_ascii=False, default=str))
    print(f"Wall time: {elapsed:.1f}s")
    print(f"Saved to: {OUT_DIR / 'a1-result.json'}")


if __name__ == "__main__":
    asyncio.run(main())
