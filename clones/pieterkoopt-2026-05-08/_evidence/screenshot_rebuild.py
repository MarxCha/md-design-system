"""Capture full-page screenshots of the A3 rebuild and the live original side-by-side."""

from __future__ import annotations

import asyncio
from pathlib import Path

from playwright.async_api import async_playwright

OUT = Path(__file__).parent
TARGETS = {
    "caso-a3-rebuild-1440": "http://localhost:3010/clones/pieterkoopt",
    "caso-a3-rebuild-mobile": "http://localhost:3010/clones/pieterkoopt",
}


HIDE_DEV = """
[data-nextjs-toast],
[data-nextjs-dialog-overlay],
[data-nextjs-build-error],
nextjs-portal,
nextjs-dev-tools,
nextjs-dev-tools-button,
[data-nextjs-dev-tools-button],
.__next-dev-overlay-mounted-container,
#__next-build-watcher,
[data-nextjs-toast-wrapper],
[class*="styles-module__toolbar"],
[class*="styles-module__drawCanvas"],
[class*="styles-module__fixedMarkersLayer"],
[class*="agentation"] { display: none !important; visibility: hidden !important; pointer-events: none !important; }
"""


async def capture(url: str, out: Path, *, width: int, height: int, mobile: bool = False) -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": width, "height": height},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/537.36 Chrome/130.0 Safari/537.36",
        )
        page = await context.new_page()
        await page.goto(url, wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(1500)
        # Strip the Next.js dev overlay nodes (bottom-left build indicator, etc.) so
        # they don't leak into the screenshot.
        await page.add_style_tag(content=HIDE_DEV)
        await page.evaluate("""
            const tags = ['nextjs-portal','nextjs-dev-tools','nextjs-dev-tools-button'];
            for (const tag of tags) document.querySelectorAll(tag).forEach(n => n.remove());
        """)
        await page.wait_for_timeout(500)
        await page.screenshot(path=str(out), full_page=True)
        await browser.close()


async def main() -> None:
    await capture("http://localhost:3010/clones/pieterkoopt", OUT / "caso-a3-rebuild-1440.png", width=1440, height=900)
    await capture("http://localhost:3010/clones/pieterkoopt", OUT / "caso-a3-rebuild-mobile.png", width=390, height=844, mobile=True)
    print("ok")


if __name__ == "__main__":
    asyncio.run(main())
