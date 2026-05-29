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
