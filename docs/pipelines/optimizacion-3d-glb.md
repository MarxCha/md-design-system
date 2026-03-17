# Pipeline de Optimizacion de Modelos 3D (.glb)

## Contexto

Los modelos 3D descargados de plataformas como Sketchfab, Turbosquid o generados con
herramientas como TRELLIS suelen pesar entre 3-70 MB. Para despliegue web con `model-viewer`
necesitamos reducir el peso sin perder calidad visual perceptible.

## Herramienta

```bash
npm install -g @gltf-transform/cli
# o usar con npx (sin instalar)
npx @gltf-transform/cli --version
```

**Version probada:** 4.3.0

## Comando de optimizacion

```bash
npx @gltf-transform/cli optimize input.glb output.glb \
  --compress draco \
  --texture-compress webp
```

### Que hace cada flag

| Flag | Funcion | Impacto |
|------|---------|---------|
| `--compress draco` | Comprime geometria (vertices, normales, UVs) con Google Draco | 70-95% reduccion en mallas |
| `--texture-compress webp` | Convierte texturas PNG/JPEG embebidas a WebP | 50-80% reduccion en texturas |

### Transformaciones automaticas incluidas en `optimize`

1. **dedup** — elimina texturas/materiales/mallas duplicados
2. **instance** — instancia geometria repetida
3. **flatten** — aplana jerarquia de nodos innecesarios
4. **join** — une mallas compatibles
5. **weld** — fusiona vertices cercanos
6. **simplify** — simplifica mallas preservando apariencia
7. **prune** — elimina nodos/materiales sin usar
8. **resample** — optimiza keyframes de animacion

## CRITICO: Modelos con Specular-Glossiness (se ven blancos)

Muchos modelos de Sketchfab usan la extension `KHR_materials_pbrSpecularGlossiness`
en vez del estandar `pbrMetallicRoughness`. Google model-viewer NO renderiza
Specular-Glossiness correctamente — el modelo se ve **completamente blanco**
aunque las texturas esten embebidas.

### Como detectar

```bash
node -e "
const b = require('fs').readFileSync('modelo.glb');
const jsonLen = b.readUInt32LE(12);
const gltf = JSON.parse(b.slice(20, 20 + jsonLen).toString('utf8'));
console.log('Extensions:', gltf.extensionsUsed);
console.log('Material PBR:', gltf.materials?.[0]?.pbrMetallicRoughness?.baseColorTexture);
"
```

Si ves `KHR_materials_pbrSpecularGlossiness` y `baseColorTexture: undefined` → necesita conversion.

### Solucion: convertir con metalrough

```bash
# Paso 1: Convertir Specular-Glossiness → Metallic-Roughness
npx @gltf-transform/cli metalrough input.glb converted.glb

# Paso 2: Optimizar normalmente
npx @gltf-transform/cli optimize converted.glb output.glb \
  --compress draco --texture-compress webp
```

### Pipeline completo en un solo flujo

```bash
npx @gltf-transform/cli metalrough input.glb /tmp/mr.glb && \
npx @gltf-transform/cli optimize /tmp/mr.glb output.glb \
  --compress draco --texture-compress webp && \
rm /tmp/mr.glb
```

### Resultados reales con este pipeline

| Modelo | Problema | Original | Final | Reduccion |
|--------|----------|----------|-------|-----------|
| Urna Funeraria Zapoteca | Spec-Gloss, sin color | 69 MB | 2.1 MB | 96.9% |
| Alebrije Mistico | Spec-Gloss, sin color | 4.8 MB | 437 KB | 91.1% |

**IMPORTANTE:** `gltf-pipeline --keepLegacyExtensions false` NO convierte
Specular-Glossiness. Solo `gltf-transform metalrough` funciona correctamente.

## Resultados reales (Alebrije 3D Creator)

| Modelo | Original | Optimizado | Reduccion |
|--------|----------|------------|-----------|
| Sol y Luna | 24 MB | 586 KB | 97.6% |
| Lagartija Alebrije | 21 MB | 1.8 MB | 91.4% |
| Oso Alebrije | 19 MB | 816 KB | 95.8% |
| Petate Tradicional | 12 MB | 1.7 MB | 85.8% |
| Welf | 10 MB | 1.7 MB | 83.4% |
| Gato Alebrije | 8.4 MB | 1.1 MB | 86.9% |
| Alebrije Clasico | 6.6 MB | 866 KB | 87.2% |
| Gallina de Barro | 4 MB | 472 KB | 88.2% |
| Gato de Barro | 3 MB | 249 KB | 91.7% |
| **Total** | **103 MB** | **9.3 MB** | **~91%** |

## Compatibilidad

| Visor | Draco | WebP | Funciona |
|-------|-------|------|----------|
| Google model-viewer 3.5+ | Si | Si | Si |
| Three.js (con DRACOLoader) | Si | Si | Si |
| Babylon.js | Si | Si | Si |
| macOS Quick Look / Reality Composer | No | Parcial | No |
| iOS AR Quick Look (.usdz) | No | No | No — requiere conversion a USDZ |

> **Nota:** Para AR nativo en iOS se necesita conversion a `.usdz` sin Draco.
> Usar: `npx @gltf-transform/cli optimize input.glb output.glb --texture-compress webp`
> (sin `--compress draco`) y luego convertir con `usdzconvert`.

## Script batch para optimizar multiples archivos

```bash
#!/bin/bash
# optimize-glb.sh — Optimiza todos los GLB de un directorio
# Uso: ./optimize-glb.sh /ruta/a/directorio

DIR="${1:-.}"
for f in "$DIR"/*.glb; do
  [ -f "$f" ] || continue
  echo "Optimizando: $(basename "$f")"
  npx @gltf-transform/cli optimize "$f" "${f%.glb}-opt.glb" \
    --compress draco \
    --texture-compress webp
  mv "${f%.glb}-opt.glb" "$f"
done
echo "Listo."
```

## Cuando usar cada estrategia

| Escenario | Comando |
|-----------|---------|
| Web con model-viewer | `--compress draco --texture-compress webp` |
| Web + AR iOS (Quick Look) | `--texture-compress webp` (sin Draco) |
| Maxima compresion web | `--compress draco --texture-compress webp` + `--simplify-ratio 0.5` |
| Preservar 100% geometria | `--texture-compress webp` (solo texturas) |

## Integracion con CI/CD

Para automatizar en un pipeline de deploy:

```yaml
# .github/workflows/optimize-3d.yml
- name: Optimize GLB files
  run: |
    npx @gltf-transform/cli --version
    for f in public/**/*.glb; do
      npx @gltf-transform/cli optimize "$f" "${f%.glb}-opt.glb" \
        --compress draco --texture-compress webp
      mv "${f%.glb}-opt.glb" "$f"
    done
```

## Referencias

- [gltf-transform docs](https://gltf-transform.dev/)
- [Google Draco](https://google.github.io/draco/)
- [model-viewer](https://modelviewer.dev/)
- Proyecto origen: `alebrije-3d-creator` (Guelaguetza AR)
