"use client";

import { SlideDeck } from "@/docs-kit/slide-deck";
import config from "@/docs-kit/slide-deck/metabase-mexico/config";

export default function SlideDeckDemoPage() {
  return <SlideDeck config={config} />;
}
