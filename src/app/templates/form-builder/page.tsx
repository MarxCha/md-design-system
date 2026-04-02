"use client";

import { FormShell } from "@/components/templates/form-builder";

export default function FormBuilderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6">
      {/* Page header */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-500">
          MD Design System
        </p>
        <h1
          className="text-4xl font-normal text-slate-900 sm:text-5xl"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Create your account
        </h1>
        <p className="mt-3 text-base text-slate-500">
          A 4-step onboarding wizard — account, profile, preferences, review.
        </p>
      </div>

      {/* Form card — constrained width */}
      <div className="w-full max-w-2xl">
        <FormShell />
      </div>
    </main>
  );
}
