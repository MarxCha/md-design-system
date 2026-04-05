"use client";

import { OnePager } from "@/docs-kit/one-pager";
import config from "@/docs-kit/one-pager/metabase-mexico/config";

export default function OnePagerDemoPage() {
  return (
    <div className="min-h-screen bg-[hsl(213_15%_94%)] py-12">
      <div className="onepager__no-print mb-6 text-center text-sm text-[hsl(213_15%_60%)]">
        Cmd+P para exportar a PDF
      </div>
      <OnePager config={config} />
    </div>
  );
}
