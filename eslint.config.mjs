import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      // Referencias clonadas — son snapshots crudos de sitios externos, no código nuestro:
      "**/_evidence/**",            // evidence JS chunks de cada caso
      "**/caso-b-snapshot/**",      // snapshot completo descargado (goclone/archivebox)
      "**/caso-c-structured-data/**", // datos estructurados raw
      // Cualquier .min.js vendored
      "**/*.min.js",
      // Python virtualenvs locales (defensive; no llegan a CI pero limpia local)
      "**/.venv*/**",
      // Defensive: ESLint ignora node_modules por default, pero explicitamos
      "node_modules/**",
      // Archivos autogenerados por Next.js
      "next-env.d.ts",
      "**/next-env.d.ts",
      // Outputs de docs:export (no se commitea pero existe local)
      "exports/**",
    ],
  },
];

export default eslintConfig;
