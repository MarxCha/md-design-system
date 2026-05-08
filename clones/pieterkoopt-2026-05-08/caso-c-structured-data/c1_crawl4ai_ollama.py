"""
Caso C1 — crawl4ai with Ollama LLM extraction (gemma3:12b via Coolify)

License: Apache-2.0 (crawl4ai)
LLM: gemma3:12b text-only, hosted on Coolify (vuln H-07 sin auth, secreto operacional)

Usage:
    cd clones/pieterkoopt-2026-05-08
    .venv-clone/bin/python caso-c-structured-data/c1_crawl4ai_ollama.py
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

# Load .env.local for Ollama endpoint
ENV_PATH = Path(__file__).parent.parent.parent.parent / ".env.local"
load_dotenv(ENV_PATH)

OLLAMA_BASE_URL = os.environ["OLLAMA_BASE_URL"]
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "gemma3:12b")
TARGET_URL = "https://www.pieterkoopt.nl/"
OUT_PATH = Path(__file__).parent / "c1-crawl4ai-ollama.json"


class ProcessStep(BaseModel):
    step_number: str = Field(description="Number like '01', '02'")
    title: str
    description: str


class ContactChannels(BaseModel):
    phone: str = ""
    whatsapp: str = ""
    email: str = ""
    physical_address: str = ""


class CTAs(BaseModel):
    primary: str = ""
    secondary: str = ""


class PieterKooptInfo(BaseModel):
    site_name: str
    tagline: str = ""
    value_prop: str = ""
    services: list[str] = Field(default_factory=list)
    process_steps: list[ProcessStep] = Field(default_factory=list)
    pricing_info: str = ""
    geographic_coverage: str = ""
    contact_channels: ContactChannels = Field(default_factory=ContactChannels)
    ctas: CTAs = Field(default_factory=CTAs)
    target_audience: str = ""
    languages_supported: list[str] = Field(default_factory=list)


async def main() -> None:
    print(f"=== Caso C1 — crawl4ai + Ollama ({OLLAMA_MODEL}) ===")
    print(f"Endpoint: {OLLAMA_BASE_URL}")
    print(f"Target: {TARGET_URL}\n")

    llm_strategy = LLMExtractionStrategy(
        llm_config=LLMConfig(
            provider=f"ollama/{OLLAMA_MODEL}",
            base_url=OLLAMA_BASE_URL,
            api_token="not-needed",
        ),
        schema=PieterKooptInfo.model_json_schema(),
        extraction_type="schema",
        instruction=(
            "Extract structured business intelligence about this site. "
            "The site is a B2C lead-gen service that buys paintings from owners. "
            "Capture value proposition, services, the 3-step process (with step numbers, "
            "titles, descriptions), pricing/fees policy, geographic coverage, "
            "contact channels (phone, whatsapp, email, address), primary and secondary CTAs, "
            "target audience, and languages supported. "
            "Return ONLY valid JSON matching the schema. Do NOT invent fields."
        ),
        input_format="markdown",
        verbose=False,
    )

    config = CrawlerRunConfig(
        extraction_strategy=llm_strategy,
        cache_mode="bypass",
    )

    t0 = time.time()
    async with AsyncWebCrawler(verbose=False) as crawler:
        result = await crawler.arun(url=TARGET_URL, config=config)

    elapsed = time.time() - t0
    print(f"Wall time: {elapsed:.1f}s")
    print(f"Crawl success: {result.success}")
    print(f"Status: {result.status_code}")

    output = {
        "_method": "C1 — crawl4ai + Ollama (gemma3:12b)",
        "_endpoint": OLLAMA_BASE_URL.replace(OLLAMA_BASE_URL.split('@')[-1].split(':')[0] if '@' in OLLAMA_BASE_URL else OLLAMA_BASE_URL.split('//')[1].split(':')[0], "REDACTED"),
        "_model": OLLAMA_MODEL,
        "_wallTimeSec": round(elapsed, 1),
        "_licenseStatus": "Apache-2.0 (crawl4ai) + self-hosted Ollama (no license cost). $0 marginal cost.",
        "_success": result.success,
        "_statusCode": result.status_code,
    }

    if result.success and result.extracted_content:
        try:
            extracted = json.loads(result.extracted_content)
            output["data"] = extracted
            llm_usage = (llm_strategy.show_usage() if hasattr(llm_strategy, "show_usage") else None)
            output["_llmUsage"] = llm_usage
            print(f"\nExtracted keys: {list(extracted.keys()) if isinstance(extracted, dict) else 'list of len ' + str(len(extracted))}")
        except json.JSONDecodeError as e:
            output["data"] = None
            output["_extractionError"] = f"JSON decode failed: {e}"
            output["_rawExtracted"] = result.extracted_content[:2000]
            print(f"⚠️ JSON decode failed: {e}")
    else:
        output["data"] = None
        output["_extractionError"] = result.error_message or "no extracted_content"
        print(f"⚠️ Extraction failed: {output['_extractionError']}")

    OUT_PATH.write_text(json.dumps(output, indent=2, ensure_ascii=False))
    print(f"\nSaved to: {OUT_PATH}")


if __name__ == "__main__":
    asyncio.run(main())
