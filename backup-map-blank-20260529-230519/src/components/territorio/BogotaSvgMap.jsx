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
