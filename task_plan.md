# task_plan.md — Gemini Review del ProductShowcaseTemplate

## 1. Crítica Arquitectónica y Análisis de Riesgos

### 1.1. Gaps Identificados
- **Asset Pipeline (Crucial):** Para un showcase tipo Apple, el peso de los videos (pro-res/hevc) y modelos 3D (GLB) es crítico. Falta una estrategia de Preloading y Adaptive Loading basada en el ancho de banda.
- **Mobile-First Interaction:** El "scrubbing" de video y GSAP ScrollTrigger se comportan de forma errática en iOS (Safari) debido a la barra de direcciones dinámica y el "overscroll". No veo un `useTouchVelocity` o manejo de `pointer-events`.
- **Performance Metrics:** En una SPA con R3F y GSAP, el GC (Garbage Collector) es un enemigo. Falta un monitor de FPS/Memory para el modo "Lab".
- **Tailwind 4 Integration:** Tailwind 4 es CSS-first. El plan debe reflejar la migración de configuraciones a variables CSS dinámicas para facilitar el "Theming" del producto.

### 1.2. Dependencias Riesgosas
- **Video Scrubbing vs. Browser Engine:** Hacer scrub de video nativo con GSAP es costoso en CPU. Si no se usan técnicas de "Image Sequence" (Canvas) para secciones críticas, el frame-rate caerá en laptops de gama media.
- **Next.js 15 + R3F:** Verificar compatibilidad de react-three-fiber con React 19 y el manejo de Hydration en componentes 3D pesados.

### 1.3. Remotion: ¿Sprint 4 o Diferir?
- **Veredicto: DIFERIR.** Remotion es para generación de video programático. Integrarlo en el core de un Product Showcase Web añade complejidad innecesaria.
- **Alternativa:** Usar el tiempo del Sprint 4 para Asset Optimization (Draco/WebP) y Lighthouse Scoring.

## 2. Plan de Implementación Optimizado por Gemini

### Sprint 1: Foundation & Performance Core
- `useScrollTimeline`: Abstracción de ScrollTrigger para sincronización precisa
- `useAdaptiveQuality`: Hook para detectar performance del dispositivo y ajustar pixel ratio de R3F
- `useVideoScrub (Canvas Edition)`: Secuencias de frames en Canvas en vez de HTMLVideoElement
- `ScrollPinContainer`: Wrapper robusto para pinning con Lenis
- `AssetLoader`: Pre-carga con eventos de progreso

### Sprint 2: Product Visual Components
- `Hero3DStage`: Scene3D + GSAP para transiciones de cámara (iPhone-style)
- `VideoMaskReveal`: CSS mask-image que revela video en scrub
- `DynamicSpecGrid`: Grid que reutiliza StaggerChildren + AnimatedText existentes
- `Hotspot3D`: Puntos de interacción sobre modelo 3D

### Sprint 3: Template Integration & Orchestration
- `ProductShowcaseLayout`: Blueprint que organiza Hero -> Features -> Specs -> CTA
- `ScrollStoryProvider`: Contexto para compartir progreso de scroll entre componentes
- Demo page: /product-showcase

### Sprint 4: Polish, Optimization & R3F Refinement
- Draco Compression para modelos 3D
- Suspense + Error Boundaries para assets
- CustomEase en GSAP
- ReducedMotion compliance
- Web Vitals audit (LCP < 2.5s)
- Cross-browser testing (Safari iOS)

## 3. Cambios Estratégicos de Gemini
1. **Canvas sobre Video Nativo:** Pipeline que convierte video a secuencias de imágenes para Canvas vía GSAP (60fps constantes)
2. **CSS Container Queries:** Componentes responsive basados en container, no solo viewport
3. **R3F Instance Management:** Pooling para instancias de Three.js si hay múltiples productos
