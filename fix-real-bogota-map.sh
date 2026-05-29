#!/usr/bin/env bash
set -e

echo "==> Creando respaldo..."
STAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="backup-real-map-$STAMP"
mkdir -p "$BACKUP_DIR"

backup_file () {
  if [ -f "$1" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$1")"
    cp "$1" "$BACKUP_DIR/$1"
  fi
}

backup_file src/components/territorio/BogotaSvgMap.jsx
backup_file src/components/territorio/MapaBogota.jsx
backup_file src/data/localidades.js

mkdir -p public/data

echo "==> Descargando GeoJSON oficial de Localidades Bogotá desde Datos Abiertos / IDECA..."
curl -L \
  "https://datosabiertos.bogota.gov.co/dataset/856cb657-8ca3-4ee8-857f-37211173b1f8/resource/497b8756-0927-4aee-8da9-ca4e32ca3a8a/download/loca.geojson" \
  -o public/data/localidades-bogota.geojson

echo "==> Validando archivo descargado..."
node - <<'NODE'
const fs = require("fs");
const path = "public/data/localidades-bogota.geojson";
const raw = fs.readFileSync(path, "utf8");
const geo = JSON.parse(raw);

if (!geo.features || !Array.isArray(geo.features) || geo.features.length < 20) {
  throw new Error("El GeoJSON no parece tener las localidades esperadas.");
}

console.log("GeoJSON válido. Features:", geo.features.length);
console.log("Propiedades ejemplo:", Object.keys(geo.features[0].properties || {}));
NODE

echo "==> Reemplazando BogotaSvgMap por mapa real con GeoJSON..."
cat > src/components/territorio/BogotaSvgMap.jsx <<'EOSVG'
import { useEffect, useMemo, useState } from "react";
import { Loader2, Map } from "lucide-react";
import { estadoTerritorial } from "../../data/localidades";

const MAP_WIDTH = 720;
const MAP_HEIGHT = 920;
const PADDING = 28;

function normalizeName(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getFeatureName(feature) {
  const p = feature?.properties || {};
  return (
    p.LocNombre ||
    p.LOCNOMBRE ||
    p.locnombre ||
    p.NOMBRE ||
    p.Nombre ||
    p.nombre ||
    p.LOCALIDAD ||
    p.Localidad ||
    p.localidad ||
    p.LOCA_NOMBRE ||
    p.LocaNombre ||
    p.nom_loc ||
    p.NOM_LOC ||
    "Localidad"
  );
}

function getFeatureCode(feature) {
  const p = feature?.properties || {};
  return (
    p.LocCodigo ||
    p.LOCCODIGO ||
    p.CODIGO ||
    p.Codigo ||
    p.codigo ||
    p.COD_LOC ||
    p.cod_loc ||
    ""
  );
}

function extractRings(geometry) {
  if (!geometry) return [];

  if (geometry.type === "Polygon") {
    return geometry.coordinates || [];
  }

  if (geometry.type === "MultiPolygon") {
    return (geometry.coordinates || []).flat();
  }

  return [];
}

function extractAllPoints(features) {
  const points = [];

  features.forEach((feature) => {
    extractRings(feature.geometry).forEach((ring) => {
      ring.forEach((coord) => {
        if (Array.isArray(coord) && coord.length >= 2) {
          points.push([Number(coord[0]), Number(coord[1])]);
        }
      });
    });
  });

  return points.filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
}

function buildProjector(features) {
  const points = extractAllPoints(features);

  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const geoWidth = maxX - minX;
  const geoHeight = maxY - minY;

  const scale = Math.min(
    (MAP_WIDTH - PADDING * 2) / geoWidth,
    (MAP_HEIGHT - PADDING * 2) / geoHeight
  );

  const drawnWidth = geoWidth * scale;
  const drawnHeight = geoHeight * scale;

  const offsetX = (MAP_WIDTH - drawnWidth) / 2;
  const offsetY = (MAP_HEIGHT - drawnHeight) / 2;

  return ([lon, lat]) => {
    const x = offsetX + (lon - minX) * scale;
    const y = offsetY + (maxY - lat) * scale;
    return [x, y];
  };
}

function ringToPath(ring, project) {
  if (!ring || ring.length === 0) return "";

  return ring
    .map((coord, index) => {
      const [x, y] = project(coord);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

function featureToPath(feature, project) {
  return extractRings(feature.geometry)
    .map((ring) => ringToPath(ring, project))
    .join(" ");
}

function getCentroid(feature, project) {
  const points = [];

  extractRings(feature.geometry).forEach((ring) => {
    ring.forEach((coord) => points.push(project(coord)));
  });

  if (!points.length) return [0, 0];

  const x = points.reduce((sum, point) => sum + point[0], 0) / points.length;
  const y = points.reduce((sum, point) => sum + point[1], 0) / points.length;

  return [x, y];
}

function shortLabel(name) {
  const map = {
    "rafael uribe uribe": "R. Uribe",
    "antonio narino": "A. Nariño",
    "puente aranda": "P. Aranda",
    "san cristobal": "S. Cristóbal",
    "ciudad bolivar": "C. Bolívar",
    "la candelaria": "Candelaria",
    "los martires": "Mártires",
    "barrios unidos": "B. Unidos",
  };

  return map[normalizeName(name)] || name;
}

export default function BogotaSvgMap({ localidades, selectedId, onSelect }) {
  const [geojson, setGeojson] = useState(null);
  const [error, setError] = useState("");

  const metaByName = useMemo(() => {
    const entries = localidades.map((localidad) => [normalizeName(localidad.nombre), localidad]);
    return new Map(entries);
  }, [localidades]);

  useEffect(() => {
    let mounted = true;

    fetch("/data/localidades-bogota.geojson")
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo cargar el GeoJSON oficial.");
        return response.json();
      })
      .then((data) => {
        if (mounted) setGeojson(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Error al cargar el mapa.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const features = geojson?.features || [];

  const project = useMemo(() => {
    if (!features.length) return null;
    return buildProjector(features);
  }, [features]);

  const enrichedFeatures = useMemo(() => {
    if (!features.length || !project) return [];

    return features.map((feature) => {
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
    });
  }, [features, project, metaByName]);

  if (error) {
    return (
      <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-800">
        <p className="font-black">No se pudo cargar el mapa real.</p>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  if (!geojson || !project) {
    return (
      <div className="grid min-h-[480px] place-items-center rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[#3871B7]" />
          <p className="font-black text-slate-950">Cargando mapa oficial de localidades...</p>
          <p className="mt-2 text-sm text-slate-600">Fuente: Datos Abiertos Bogotá / IDECA.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3871B7]">
            Mapa oficial interactivo
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">
            Bogotá por localidades
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Polígonos reales cargados desde la capa oficial de localidades. Haz clic sobre una localidad
            para consultar su ficha territorial, CLJ, prioridades, documentos y compromisos.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-black">
          {Object.entries(estadoTerritorial).map(([key, item]) => (
            <span key={key} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-slate-700">
              <span className="h-3 w-3 rounded-full" style={{ background: item.fill }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_.34fr]">
        <div className="overflow-hidden rounded-[1.5rem] bg-slate-50 p-3">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            role="img"
            aria-label="Mapa oficial interactivo de Bogotá por localidades"
            className="mx-auto h-[720px] max-h-[75vh] w-full"
          >
            <defs>
              <filter id="realMapShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="7" floodOpacity="0.15" />
              </filter>
            </defs>

            <g filter="url(#realMapShadow)">
              {enrichedFeatures.map(({ feature, officialName, metadata, centroid, path }) => {
                const id = metadata?.id || normalizeName(officialName);
                const isSelected = selectedId === id;
                const estado = metadata?.estadoContacto || "pendiente";
                const metaEstado = estadoTerritorial[estado] || estadoTerritorial.pendiente;

                return (
                  <g key={officialName}>
                    <path
                      d={path}
                      fill={metaEstado.fill}
                      stroke={isSelected ? "#2B2B2B" : "#ffffff"}
                      strokeWidth={isSelected ? 4 : 1.6}
                      opacity={isSelected ? 1 : 0.9}
                      className="cursor-pointer transition hover:opacity-100"
                      onClick={() => {
                        if (metadata) onSelect(metadata);
                      }}
                      onKeyDown={(event) => {
                        if ((event.key === "Enter" || event.key === " ") && metadata) {
                          onSelect(metadata);
                        }
                      }}
                      tabIndex={0}
                      aria-label={`Seleccionar ${officialName}`}
                    >
                      <title>{officialName}</title>
                    </path>

                    <text
                      x={centroid[0]}
                      y={centroid[1]}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={officialName.length > 14 ? 11 : 13}
                      fontWeight="900"
                      fill="#1f2937"
                      paintOrder="stroke"
                      stroke="#ffffff"
                      strokeWidth="4"
                      pointerEvents="none"
                    >
                      {shortLabel(officialName)}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="rounded-[1.5rem] bg-slate-50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Map className="h-5 w-5 text-[#3871B7]" />
            <h3 className="text-lg font-black text-slate-950">Lectura rápida</h3>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Esta versión usa la geometría real de las localidades y superpone información política
            y documental del CDJ.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#3871B7]">{features.length}</p>
              <p className="text-sm font-bold text-slate-600">Localidades oficiales</p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#EE4C5B]">
                {localidades.reduce((acc, item) => acc + item.compromisosActivos, 0)}
              </p>
              <p className="text-sm font-bold text-slate-600">Compromisos activos cargados</p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#F8A72C]">
                {localidades.reduce((acc, item) => acc + item.propuestas, 0)}
              </p>
              <p className="text-sm font-bold text-slate-600">Propuestas registradas</p>
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Fuente cartográfica: capa Localidad. Bogotá D.C. de Datos Abiertos Bogotá / IDECA.
          </p>
        </div>
      </div>
    </div>
  );
}
EOSVG

echo "==> Ajustando MapaBogota para usar el mapa oficial real..."
cat > src/components/territorio/MapaBogota.jsx <<'EOMAPA'
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { localidades, estadoTerritorial } from "../../data/localidades";
import BogotaSvgMap from "./BogotaSvgMap";
import LocalidadPanel from "./LocalidadPanel";

export default function MapaBogota() {
  const [selected, setSelected] = useState(localidades[0]);
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("todos");

  const filtradas = useMemo(() => {
    return localidades.filter((localidad) => {
      const texto = `${localidad.nombre} ${localidad.zona} ${localidad.delegadoCDJ} ${localidad.prioridades.join(" ")} ${localidad.descripcion}`.toLowerCase();
      const matchQuery = texto.includes(query.toLowerCase());
      const matchEstado = estado === "todos" || localidad.estadoContacto === estado;
      return matchQuery && matchEstado;
    });
  }, [query, estado]);

  return (
    <section className="grid gap-6 xl:grid-cols-[1.55fr_.75fr]">
      <div className="space-y-5">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_260px]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar localidad, zona o prioridad..."
                className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[#3871B7]"
              />
            </label>

            <select
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
              className="rounded-2xl border border-slate-200 px-3 py-3 text-sm"
            >
              <option value="todos">Todos los estados</option>
              {Object.entries(estadoTerritorial).map(([key, item]) => (
                <option key={key} value={key}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

        <BogotaSvgMap
          localidades={localidades}
          selectedId={selected?.id}
          onSelect={setSelected}
        />

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-2xl font-black text-slate-950">Localidades filtradas</h3>
          <p className="mt-2 text-sm text-slate-600">
            Usa esta lista como apoyo al mapa. La selección actual se refleja en la ficha territorial.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtradas.map((localidad) => {
              const meta = estadoTerritorial[localidad.estadoContacto] || estadoTerritorial.pendiente;
              const active = selected?.id === localidad.id;

              return (
                <button
                  key={localidad.id}
                  onClick={() => setSelected(localidad)}
                  className={`rounded-2xl border p-4 text-left transition hover:-translate-y-1 hover:shadow-md ${
                    active ? "border-[#3871B7] bg-sky-50" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <p className="font-black text-slate-950">{localidad.nombre}</p>
                    <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: meta.fill }} />
                  </div>

                  <p className="text-xs font-bold text-slate-500">{localidad.zona}</p>
                  <p className="mt-2 text-xs text-slate-600">
                    {localidad.compromisosActivos} compromisos · {localidad.propuestas} propuestas
                  </p>
                </button>
              );
            })}

            {filtradas.length === 0 && (
              <div className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-600 sm:col-span-2 lg:col-span-3">
                No hay localidades con esos filtros.
              </div>
            )}
          </div>
        </div>
      </div>

      <LocalidadPanel localidad={selected} />
    </section>
  );
}
EOMAPA

echo "==> Compilando..."
npm run build

echo "==> Listo. Respaldo en: $BACKUP_DIR"
