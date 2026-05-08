"""
Caso C1b — Validation run: same stack as C1 but minimal schema (3 fields only).

Goal: prove gemma3:12b on Coolify Ollama CAN extract structured JSON when the
schema is small enough to fit one inference window. This isolates "Ollama is too
slow for the workload" from "stack is broken".
"""

from __future__ import annotations

import asyncio
import json
import os
import time
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel, Field

from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMConfig
from crawl4ai.extraction_strategy import LLMExtractionStrategy

ENV_PATH = Path(__file__).parent.parent.parent.parent / ".env.local"
load_dotenv(ENV_PATH)

OLLAMA_BASE_URL = os.environ["OLLAMA_BASE_URL"]
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "gemma3:12b")
TARGET_URL = "https://www.pieterkoopt.nl/"
OUT_PATH = Path(__file__).parent / "c1b-crawl4ai-ollama-minimal.json"


class MinimalSchema(BaseModel):
    site_name: str
    tagline: str
    primary_cta: str


async def main() -> None:
    print(f"=== Caso C1b — minimal-schema validation ===")
    llm = LLMExtractionStrategy(
        llm_config=LLMConfig(
            provider=f"ollama/{OLLAMA_MODEL}",
            base_url=OLLAMA_BASE_URL,
            api_token="not-needed",
        ),
        schema=MinimalSchema.model_json_schema(),
        extraction_type="schema",
        instruction="Return only the site_name, tagline, and primary_cta visible on this page. JSON only.",
        input_format="markdown",
        chunk_token_threshold=4000,
        verbose=False,
    )
    config = CrawlerRunConfig(extraction_strategy=llm, cache_mode="bypass")
    t0 = time.time()
    async with AsyncWebCrawler(verbose=False) as crawler:
        result = await crawler.arun(url=TARGET_URL, config=config)
    elapsed = time.time() - t0

    out = {
        "_method": "C1b — crawl4ai + Ollama, minimal schema (3 fields)",
        "_wallTimeSec": round(elapsed, 1),
        "_success": result.success,
    }
    if result.success and result.extracted_content:
        try:
            out["data"] = json.loads(result.extracted_content)
        except json.JSONDecodeError as e:
            out["_extractionError"] = str(e)
            out["_raw"] = (result.extracted_content or "")[:1500]
    else:
        out["_extractionError"] = result.error_message or "no extracted_content"
    OUT_PATH.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"Wall time: {elapsed:.1f}s")
    print(f"Saved to: {OUT_PATH}")


if __name__ == "__main__":
    asyncio.run(main())
