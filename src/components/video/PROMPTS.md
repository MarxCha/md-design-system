# Video Generation Prompts — Remotion + Claude Code

Prompt templates for generating programmatic videos with the md-design-system
Remotion compositions. Copy a template, fill in the blanks, paste into Claude Code.

---

## 1. Product Demo (20-30s)

```
Genera un video ProductDemo de [APP_NAME] con estas secciones:

Brand: logo en public/logo.svg, tagline "[TAGLINE]"
Hook: "[HOOK_TEXT]" / subtitle "[SUBTITLE]"
Screens (iPhone):
  1. public/screens/[screen-1].png — "[CAPTION_1]"
  2. public/screens/[screen-2].png — "[CAPTION_2]"
  3. public/screens/[screen-3].png — "[CAPTION_3]"
Features:
  - [EMOJI] [TITLE]: [DESC]
  - [EMOJI] [TITLE]: [DESC]
  - [EMOJI] [TITLE]: [DESC]
CTA: "[CTA_TEXT]" / url "[URL]"

Orientacion: vertical (1080x1920) para reels
Duracion total: ~25 segundos
```

## 2. Brand Reveal (3-5s)

```
Genera un BrandReveal de 4 segundos:
- Logo: public/[LOGO_PATH]
- Tagline: "[TAGLINE]"
- Orientacion: [vertical/horizontal]
- Color fondo: usa vc.primary900 (default) o "[CUSTOM_HSL]"
- Color acento glow: usa vc.accent (default) o "[CUSTOM_HSL]"
```

## 3. Social Reel Hook (2-3s)

```
Genera un TextHook para reel:
- Texto principal: "[BOLD_TEXT]" (max 6 palabras)
- Subtitulo: "[SUBTITLE]"
- Orientacion: vertical
- Fondo: dark (vc.primary900)
```

## 4. Feature Explainer (4-5s)

```
Genera un FeatureShowcase:
- Heading: "[SECTION_TITLE]"
- Features:
  1. [EMOJI] [TITLE] — [DESC]
  2. [EMOJI] [TITLE] — [DESC]
  3. [EMOJI] [TITLE] — [DESC]
  4. [EMOJI] [TITLE] — [DESC]
- Orientacion: [vertical/horizontal]
```

## 5. App Walkthrough (multiple screens)

```
Genera una secuencia DeviceMockup con [N] pantallas:
1. public/screens/[FILE].png — device: [iphone/laptop] — caption: "[TEXT]"
2. public/screens/[FILE].png — device: [iphone/laptop] — caption: "[TEXT]"
...
Duracion por pantalla: 3.5s
Orientacion: vertical
```

## 6. CTA Closer (3s)

```
Genera un CTAEnd:
- Texto boton: "[CTA_TEXT]"
- URL: "[DOMAIN]"
- Gradiente: primaryDark (default)
- Color boton: accent (default) o "[CUSTOM]"
```

---

## Render Commands

```bash
# Preview in studio
npm run video:studio

# Render specific composition (vertical reel)
npx remotion render AuditorCiudadano-Vertical out/auditor-reel.mp4

# Render horizontal version
npx remotion render AuditorCiudadano-Horizontal out/auditor-demo.mp4

# Render single composition
npx remotion render BrandReveal out/brand-reveal.mp4

# Render with custom props (JSON)
npx remotion render TextHook out/hook.mp4 --props='{"text":"Haz mas con menos","subtitle":"Automatiza tu negocio"}'
```

---

## Adding Screenshots

1. Take screenshots at the correct device resolution:
   - iPhone: 390x844 (logical) or 1170x2532 (retina)
   - Laptop: 1440x900

2. Place in `public/screens/` with descriptive names

3. For Playwright-captured screenshots:
```bash
npx playwright screenshot --viewport-size=390,844 http://localhost:3000 public/screens/app-home.png
```

---

## Customization Guide

All compositions accept props for colors, text, and assets.
Design tokens from `video-tokens.ts`:

| Token | Usage |
|-------|-------|
| `vc.primary900` | Dark backgrounds |
| `vc.primary800` | Medium dark backgrounds |
| `vc.accent` | CTA buttons, highlights |
| `vc.secondary` | Warm accent, underlines |
| `vc.white` | Text on dark backgrounds |
| `gradients.primaryDark` | Gradient backgrounds |
| `gradients.primaryToAccent` | Vibrant gradient |

Spring configs for timing:
- `springConfigs.snappy` — Quick entries
- `springConfigs.smooth` — Standard transitions
- `springConfigs.bouncy` — Playful reveals
- `springConfigs.gentle` — Slow, elegant
- `springConfigs.elastic` — Exaggerated bounce
