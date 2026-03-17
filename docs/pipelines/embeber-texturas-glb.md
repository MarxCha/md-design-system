# Pipeline: Embeber Texturas Externas en GLB

## Problema

Modelos 3D descargados de Sketchfab (y otras plataformas) vienen como ZIP con:
- `scene.gltf` — JSON que referencia archivos externos
- `scene.bin` — geometria binaria
- `textures/albedo.png`, `normal.png`, `roughness.png` — texturas separadas

Al servir solo el `.glb` sin las texturas, model-viewer muestra el modelo **blanco**.

## Diagnostico: ¿Tiene texturas embebidas o externas?

```bash
# Inspeccion rapida
npx @gltf-transform/cli inspect modelo.glb

# Si en "Textures" ves rutas de archivo (textures/albedo.png)
# en vez de [embedded], las texturas son EXTERNAS
```

**Diagnostico programatico (Node.js):**
```js
const b = fs.readFileSync('model.glb');
const jsonLen = b.readUInt32LE(12);
const gltf = JSON.parse(b.slice(20, 20 + jsonLen).toString('utf8'));
const hasExternal = gltf.images?.some(img => img.uri && !img.uri.startsWith('data:'));
console.log('Texturas externas:', hasExternal);
```

## Pipeline completo: Sketchfab ZIP -> GLB self-contained optimizado

### Paso 1: Extraer ZIP
```bash
unzip sketchfab-download.zip -d model-source/
cd model-source/
```

### Paso 2: Convertir .gltf -> .glb (embebe todo automaticamente)

**Opcion A — gltf-pipeline (mas simple):**
```bash
npx gltf-pipeline -i scene.gltf -o model.glb
# Al convertir .gltf a .glb, embebe TODOS los archivos externos automaticamente
```

**Opcion B — gltf-transform copy:**
```bash
npx @gltf-transform/cli copy scene.gltf model.glb
# Escribir como .glb causa que embeba todas las refs externas
```

### Paso 3: Verificar que es self-contained
```bash
npx @gltf-transform/cli inspect model.glb
# Todas las texturas deben mostrar [embedded]
```

### Paso 4: Optimizar (Draco + WebP)
```bash
npx @gltf-transform/cli optimize model.glb model-opt.glb \
  --compress draco \
  --texture-compress webp \
  --texture-size 2048
```

## Manejo de formatos PBR

| Formato de descarga | Accion |
|---------------------|--------|
| PBR Metallic-Roughness | Directo a optimizacion |
| PBR Specular-Glossiness | Convertir primero: `gltf-transform metalrough input.gltf output.glb` |
| KHR_materials_common | gltf-pipeline convierte automaticamente con `--keepLegacyExtensions false` |

## Script batch automatizado

```bash
#!/bin/bash
# embed-and-optimize.sh
# Uso: ./embed-and-optimize.sh modelo-sketchfab.zip nombre-salida

ZIP="$1"
NAME="$2"
OUTDIR="${3:-public/artesanias}"

# Extraer
TMPDIR=$(mktemp -d)
unzip -q "$ZIP" -d "$TMPDIR"

# Buscar .gltf
GLTF=$(find "$TMPDIR" -name "*.gltf" -type f | head -1)

if [ -z "$GLTF" ]; then
  echo "Error: No se encontro .gltf en el ZIP"
  rm -rf "$TMPDIR"
  exit 1
fi

# Convertir a GLB self-contained
echo "Embebiendo texturas..."
npx gltf-pipeline -i "$GLTF" -o "$TMPDIR/embedded.glb"

# Optimizar con Draco + WebP
echo "Optimizando con Draco + WebP..."
npx @gltf-transform/cli optimize "$TMPDIR/embedded.glb" "$OUTDIR/$NAME.glb" \
  --compress draco \
  --texture-compress webp \
  --texture-size 2048

# Verificar
echo "Verificando..."
npx @gltf-transform/cli inspect "$OUTDIR/$NAME.glb" 2>&1 | head -20

# Limpiar
rm -rf "$TMPDIR"
echo "Listo: $OUTDIR/$NAME.glb"
ls -lh "$OUTDIR/$NAME.glb"
```

## Herramientas

| Herramienta | Instalacion | Mejor para |
|-------------|-------------|------------|
| `gltf-pipeline` | `npx gltf-pipeline` | .gltf -> .glb con embed (Sketchfab ZIPs) |
| `gltf-transform copy` | `npx @gltf-transform/cli` | Embed limpio + SDK moderno |
| `gltf-transform optimize` | mismo | Embed + Draco + WebP en un paso |
| `gltfpack` | `npx gltfpack` | Velocidad, meshopt + texturas |

## Notas importantes

- **GLB vs glTF:** Un `.glb` DEBERIA ser self-contained, pero algunos exportadores
  generan GLBs con URIs externas. Siempre verificar con `inspect`.
- **texture-size 2048:** Muchos modelos Sketchfab vienen con texturas 4K innecesarias
  para web. 1024-2048px es el sweet spot para model-viewer.
- **Draco en model-viewer:** model-viewer 3.5+ carga el decoder Draco automaticamente
  desde Google CDN. No requiere configuracion extra.
- **Meshopt en model-viewer:** model-viewer 3.5 NO soporta meshopt. Solo usar Draco.

## Proyecto origen
Alebrije 3D Creator — Guelaguetza AR (Secretaria de Turismo de Oaxaca)
