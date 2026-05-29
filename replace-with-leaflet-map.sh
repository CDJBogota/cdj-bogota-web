#!/usr/bin/env bash
set -e

echo "==> Instalando Leaflet..."
npm install leaflet react-leaflet

echo "==> Creando respaldo..."
STAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="backup-leaflet-map-$STAMP"
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
backup_file src/index.css

mkdir -p public/data
mkdir -p src/components/territorio

echo "==> Intentando descargar GeoJSON oficial con geometría completa..."
curl -L \
  "https://datosabiertos.bogota.gov.co/dataset/856cb657-8ca3-4ee8-857f-37211173b1f8/resource/497b8756-0927-4aee-8da9-ca4e32ca3a8a/download/loca.geojson" \
  -o public/data/localidades-bogota.geojson || true

echo "==> Validando si el GeoJSON oficial sirve..."
node - <<'NODE'
const fs = require("fs");

function hasUsableGeometry(geo) {
  return geo?.features?.some((f) => {
    const g = f.geometry;
    return g && Array.isArray(g.coordinates) && g.coordinates.length > 0;
  });
}

const path = "public/data/localidades-bogota.geojson";

let ok = false;
try {
  const raw = fs.readFileSync(path, "utf8");
  const geo = JSON.parse(raw);
  ok = hasUsableGeometry(geo);
  console.log("Features:", geo.features?.length || 0);
  console.log("Geometría útil:", ok);
  console.log("Propiedades ejemplo:", Object.keys(geo.features?.[0]?.properties || {}));
} catch (error) {
  console.log("No se pudo validar GeoJSON oficial:", error.message);
}

if (!ok) {
  console.log("GeoJSON oficial no sirve para render directo. Se usará respaldo externo.");
  fs.writeFileSync("public/data/localidades-bogota.geojson", JSON.stringify({
    type: "FeatureCollection",
    features: []
  }));
}
NODE

echo "==> Agregando CSS de Leaflet..."
if ! grep -q "leaflet/dist/leaflet.css" src/index.css; then
  cat >> src/index.css <<'EOCSS'

@import "leaflet/dist/leaflet.css";

.leaflet-container {
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  font-family: inherit;
}

.leaflet-control-attribution {
  font-size: 10px;
}
EOCSS
fi

echo "==> Reemplazando componente de mapa con Leaflet real..."
cat > src/components/territorio/BogotaLeafletMap.jsx <<'EOLEAF'
import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import { Loader2 } from "lucide-react";
import { estadoTerritorial } from "../../data/localidades";

const BOGOTA_CENTER = [4.6486259, -74.2478932];

const BACKUP_ARCGIS_GEOJSON =
  "https://sig.car.gov.co/arcgis/rest/services/visor/Division_Territorial/FeatureServer/5/query?where=1%3D1&outFields=*&outSR=4326&f=geojson";

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
    p.LOCA_NOMBR ||
    p.LOCA_NOMBRE ||
    p.LOCNOMBRE ||
    p.NOMBRE ||
    p.Nombre ||
    p.nombre ||
    p.LOCALIDAD ||
    p.Localidad ||
    p.localidad ||
    p.NOM_LOC ||
    p.nom_loc ||
    p.NAME ||
    p.Name ||
    ""
  );
}

function geometryIsUsable(geojson) {
  return geojson?.features?.some((f) => {
    const g = f.geometry;
    return g && Array.isArray(g.coordinates) && g.coordinates.length > 0;
  });
}

function FitBounds({ geojson }) {
  const map = useMap();

  useEffect(() => {
    if (!geojson?.features?.length) return;

    const layer = window.L?.geoJSON(geojson);
    const bounds = layer?.getBounds?.();

    if (bounds?.isValid?.()) {
      map.fitBounds(bounds, { padding: [18, 18] });
    }
  }, [geojson, map]);

  return null;
}

export default function BogotaLeafletMap({ localidades, selectedId, onSelect }) {
  const [geojson, setGeojson] = useState(null);
  const [source, setSource] = useState("oficial");
  const [error, setError] = useState("");

  const metaByName = useMemo(() => {
    return new Map(localidades.map((loc) => [normalizeName(loc.nombre), loc]));
  }, [localidades]);

  useEffect(() => {
    let mounted = true;

    async function loadGeojson() {
      try {
        const localResponse = await fetch("/data/localidades-bogota.geojson");
        const localGeojson = await localResponse.json();

        if (geometryIsUsable(localGeojson)) {
          if (mounted) {
            setGeojson(localGeojson);
            setSource("Datos Abiertos Bogotá / IDECA");
          }
          return;
        }

        const backupResponse = await fetch(BACKUP_ARCGIS_GEOJSON);
        if (!backupResponse.ok) {
          throw new Error("No se pudo cargar la capa alternativa de localidades.");
        }

        const backupGeojson = await backupResponse.json();

        if (!geometryIsUsable(backupGeojson)) {
          throw new Error("La capa alternativa tampoco trae geometría útil.");
        }

        if (mounted) {
          setGeojson(backupGeojson);
          setSource("Servicio ArcGIS de respaldo");
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "No se pudo cargar el mapa.");
        }
      }
    }

    loadGeojson();

    return () => {
      mounted = false;
    };
  }, []);

  const orderedFeatures = useMemo(() => {
    if (!geojson?.features) return [];

    return geojson.features.map((feature, index) => {
      const featureName = getFeatureName(feature);
      const metadata =
        metaByName.get(normalizeName(featureName)) ||
        localidades[index] ||
        null;

      return {
        ...feature,
        properties: {
          ...(feature.properties || {}),
          __cdjName: metadata?.nombre || featureName || `Localidad ${index + 1}`,
          __cdjId: metadata?.id || normalizeName(featureName) || `localidad-${index + 1}`,
          __cdjEstado: metadata?.estadoContacto || "pendiente",
        },
      };
    });
  }, [geojson, localidades, metaByName]);

  const enrichedGeojson = useMemo(() => {
    if (!geojson) return null;
    return {
      ...geojson,
      features: orderedFeatures,
    };
  }, [geojson, orderedFeatures]);

  function styleFeature(feature) {
    const estado = feature.properties?.__cdjEstado || "pendiente";
    const meta = estadoTerritorial[estado] || estadoTerritorial.pendiente;
    const isSelected = feature.properties?.__cdjId === selectedId;

    return {
      fillColor: meta.fill,
      color: isSelected ? "#2B2B2B" : "#ffffff",
      weight: isSelected ? 4 : 1.5,
      fillOpacity: isSelected ? 0.88 : 0.68,
      opacity: 1,
    };
  }

  function onEachFeature(feature, layer) {
    const name = feature.properties?.__cdjName;
    const id = feature.properties?.__cdjId;
    const metadata = localidades.find((loc) => loc.id === id);

    layer.bindTooltip(name, {
      sticky: true,
      direction: "top",
      className: "font-bold",
    });

    layer.on({
      click: () => {
        if (metadata) onSelect(metadata);
      },
      mouseover: (event) => {
        event.target.setStyle({
          weight: 4,
          fillOpacity: 0.9,
        });
      },
      mouseout: (event) => {
        event.target.setStyle(styleFeature(feature));
      },
    });
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-800">
        <p className="font-black">No se pudo cargar el mapa.</p>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  if (!enrichedGeojson) {
    return (
      <div className="grid min-h-[560px] place-items-center rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[#3871B7]" />
          <p className="font-black text-slate-950">Cargando mapa de localidades...</p>
          <p className="mt-2 text-sm text-slate-600">Conectando capa geográfica.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3871B7]">
            Mapa interactivo
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">
            Bogotá por localidades
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Haz clic sobre una localidad para consultar su ficha territorial, CLJ, prioridades,
            documentos, propuestas y compromisos.
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

      <div className="h-[680px] overflow-hidden rounded-[1.5rem] bg-slate-100">
        <MapContainer center={BOGOTA_CENTER} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON
            key={`${selectedId}-${orderedFeatures.length}`}
            data={enrichedGeojson}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />

          <FitBounds geojson={enrichedGeojson} />
        </MapContainer>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-3xl font-black text-[#3871B7]">{orderedFeatures.length}</p>
          <p className="text-sm font-bold text-slate-600">Localidades cargadas</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-3xl font-black text-[#EE4C5B]">
            {localidades.reduce((acc, item) => acc + item.compromisosActivos, 0)}
          </p>
          <p className="text-sm font-bold text-slate-600">Compromisos activos</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-3xl font-black text-[#F8A72C]">
            {localidades.reduce((acc, item) => acc + item.propuestas, 0)}
          </p>
          <p className="text-sm font-bold text-slate-600">Propuestas registradas</p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Fuente cartográfica principal: Datos Abiertos Bogotá / IDECA. Fuente cargada actualmente: {source}.
      </p>
    </div>
  );
}
EOLEAF

echo "==> Reemplazando MapaBogota para usar Leaflet..."
cat > src/components/territorio/MapaBogota.jsx <<'EOMAPA'
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { localidades, estadoTerritorial } from "../../data/localidades";
import BogotaLeafletMap from "./BogotaLeafletMap";
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

        <BogotaLeafletMap
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
