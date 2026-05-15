"""
Caso C2 — crawl4ai with heuristic CSS-selector extraction (no LLM)

License: Apache-2.0 (crawl4ai). Pure deterministic extraction.

Usage:
    cd clones/pieterkoopt-2026-05-08
    .venv-clone/bin/python caso-c-structured-data/c2_crawl4ai_heuristic.py

Strategy:
- JsonCssExtractionStrategy with selectors targeting Webflow's class patterns
- Compares against C1 (LLM) and C3 (Firecrawl Cloud) on identical fields
- Will fail gracefully if selectors don't match — that's also a finding
"""

from __future__ import annotations

import asyncio
import json
import time
from pathlib import Path

from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy

TARGET_URL = "https://www.pieterkoopt.nl/"
OUT_PATH = Path(__file__).parent / "c2-crawl4ai-heuristic.json"

# Selector schema based on visual inspection of rendered HTML.
# Webflow uses w-* prefixed classes, but section_* and heading-m are project classes.
SCHEMA = {
    "name": "PieterKooptInfo",
    "baseSelector": "body",
    "fields": [
        {"name": "page_title", "selector": "title", "type": "text"},
        {"name": "h1", "selector": "h1", "type": "text"},
        {
            "name": "h2_list",
            "selector": "h2",
            "type": "list",
            "fields": [{"name": "text", "selector": "*", "type": "text"}],
        },
        {
            "name": "h3_list",
            "selector": "h3",
            "type": "list",
            "fields": [{"name": "text", "selector": "*", "type": "text"}],
        },
        {
            "name": "navigation_links",
            "selector": "nav a",
            "type": "list",
            "fields": [
                {"name": "text", "selector": "*", "type": "text"},
                {"name": "href", "selector": "*", "type": "attribute", "attribute": "href"},
            ],
        },
        {
            "name": "phone",
            "selector": "a[href^='tel:']",
            "type": "attribute",
            "attribute": "href",
        },
        {
            "name": "email",
            "selector": "a[href^='mailto:']",
            "type": "attribute",
            "attribute": "href",
        },
        {
            "name": "whatsapp",
            "selector": "a[href*='wa.me']",
            "type": "attribute",
            "attribute": "href",
        },
        {
            "name": "social_links",
            "selector": "a[href*='instagram.com'], a[href*='tiktok.com'], a[href*='facebook.com']",
            "type": "list",
            "fields": [
                {"name": "platform_url", "selector": "*", "type": "attribute", "attribute": "href"},
            ],
        },
        {
            "name": "buttons",
            "selector": "a.button, button, .button-primary, .button-secondary, [class*='button']",
            "type": "list",
            "fields": [
                {"name": "text", "selector": "*", "type": "text"},
                {"name": "href", "selector": "*", "type": "attribute", "attribute": "href"},
            ],
        },
    ],
}


async def main() -> None:
    print("=== Caso C2 — crawl4ai heuristic (CSS selectors, no LLM) ===")
    print(f"Target: {TARGET_URL}\n")

    extraction = JsonCssExtractionStrategy(SCHEMA, verbose=False)
    config = CrawlerRunConfig(extraction_strategy=extraction, cache_mode="bypass")

    t0 = time.time()
    async with AsyncWebCrawler(verbose=False) as crawler:
        result = await crawler.arun(url=TARGET_URL, config=config)
    elapsed = time.time() - t0

    output = {
        "_method": "C2 — crawl4ai heuristic CSS extraction (no LLM)",
        "_wallTimeSec": round(elapsed, 1),
        "_licenseStatus": "Apache-2.0 (crawl4ai). Pure deterministic, $0 cost.",
        "_success": result.success,
        "_statusCode": result.status_code,
    }

    if result.success and result.extracted_content:
        try:
            data = json.loads(result.extracted_content)
            if isinstance(data, list) and len(data) == 1:
                data = data[0]
            output["data"] = data
            print(f"Extracted keys: {list(data.keys()) if isinstance(data, dict) else type(data)}")
        except json.JSONDecodeError as e:
            output["data"] = None
            output["_extractionError"] = f"JSON decode: {e}"
            output["_rawExtracted"] = (result.extracted_content or "")[:2000]
    else:
        output["data"] = None
        output["_extractionError"] = result.error_message or "no extracted_content"

    print(f"Wall time: {elapsed:.1f}s")
    OUT_PATH.write_text(json.dumps(output, indent=2, ensure_ascii=False))
    print(f"Saved to: {OUT_PATH}")


if __name__ == "__main__":
    asyncio.run(main())
