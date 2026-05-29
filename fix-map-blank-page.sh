#!/usr/bin/env bash
set -e

echo "==> Respaldando BogotaSvgMap..."
STAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="backup-map-blank-$STAMP"
mkdir -p "$BACKUP_DIR/src/components/territorio"
cp src/components/territorio/BogotaSvgMap.jsx "$BACKUP_DIR/src/components/territorio/BogotaSvgMap.jsx"

echo "==> Corrigiendo conflicto Map de lucide vs Map nativo..."
python3 <<'PY'
from pathlib import Path

path = Path("src/components/territorio/BogotaSvgMap.jsx")
text = path.read_text(encoding="utf-8")

text = text.replace('import { Loader2, Map } from "lucide-react";', 'import { Loader2, Map as MapIcon } from "lucide-react";')
text = text.replace('return new Map(entries);', 'return new globalThis.Map(entries);')
text = text.replace('<Map className="h-5 w-5 text-[#3871B7]" />', '<MapIcon className="h-5 w-5 text-[#3871B7]" />')

path.write_text(text, encoding="utf-8")
PY

echo "==> Agregando fallback para GeoJSON sin propiedades..."
python3 <<'PY'
from pathlib import Path

path = Path("src/components/territorio/BogotaSvgMap.jsx")
text = path.read_text(encoding="utf-8")

old = '''return features.map((feature) => {
      const officialName = getFeatureName(feature);
      const metadata = metaByName.get(normalizeName(officialName));
      const centroid = getCentroid(feature, project);
      return {
        feature,
        officialName,
        code: getFeatureCode(feature),
        metadata,
        centroid,
        path: featureToPath(feature, project),
      };
    });'''

new = '''return features.map((feature, index) => {
      const officialName = getFeatureName(feature);
      const fallbackMetadata = localidades[index] || null;
      const metadata = metaByName.get(normalizeName(officialName)) || fallbackMetadata;
      const displayName = metadata?.nombre || officialName || `Localidad ${index + 1}`;
      const centroid = getCentroid(feature, project);

      return {
        feature,
        officialName: displayName,
        code: getFeatureCode(feature),
        metadata,
        centroid,
        path: featureToPath(feature, project),
      };
    });'''

if old not in text:
    raise SystemExit("No encontré el bloque exacto para reemplazar. Abre BogotaSvgMap.jsx y revisamos manualmente.")

text = text.replace(old, new)
path.write_text(text, encoding="utf-8")
PY

echo "==> Compilando..."
npm run build

echo "==> Listo. Respaldo en: $BACKUP_DIR"
