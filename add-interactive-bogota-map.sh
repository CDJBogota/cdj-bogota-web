#!/usr/bin/env bash
set -e

echo "==> Creando respaldo..."
STAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="backup-interactive-map-$STAMP"
mkdir -p "$BACKUP_DIR"

backup_file () {
  if [ -f "$1" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$1")"
    cp "$1" "$BACKUP_DIR/$1"
  fi
}

backup_file src/data/localidades.js
backup_file src/components/territorio/MapaBogota.jsx
backup_file src/components/territorio/LocalidadPanel.jsx

mkdir -p src/components/territorio

echo "==> Reemplazando datos de localidades con información ampliada..."
cat > src/data/localidades.js <<'EOLOC'
export const estadoTerritorial = {
  actualizado: {
    label: "Contacto actualizado",
    fill: "#57C5CE",
    className: "bg-emerald-100 text-emerald-800",
  },
  parcial: {
    label: "Información parcial",
    fill: "#FBD416",
    className: "bg-amber-100 text-amber-800",
  },
  pendiente: {
    label: "Pendiente de validar",
    fill: "#EE4C5B",
    className: "bg-red-100 text-red-800",
  },
  "agenda-activa": {
    label: "Agenda activa",
    fill: "#3871B7",
    className: "bg-sky-100 text-sky-800",
  },
};

export const localidades = [
  {
    id: "usaquen",
    nombre: "Usaquén",
    zona: "Norte",
    estadoContacto: "parcial",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Educación", "Ambiente", "Participación"],
    compromisosActivos: 2,
    propuestas: 4,
    documentos: 3,
    organizaciones: 5,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad del norte de Bogotá. La ficha debe consolidar información del CLJ, delegación al CDJ, alertas territoriales, organizaciones juveniles y compromisos con entidades.",
    shape: "142,18 202,32 194,96 132,96 112,54",
    label: { x: 158, y: 62 },
  },
  {
    id: "suba",
    nombre: "Suba",
    zona: "Noroccidente",
    estadoContacto: "agenda-activa",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Ambiente", "Movilidad", "Participación"],
    compromisosActivos: 4,
    propuestas: 6,
    documentos: 5,
    organizaciones: 9,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad noroccidental con alta población joven y múltiples procesos territoriales. Se recomienda priorizar seguimiento a educación, ambiente, cultura y participación.",
    shape: "44,36 112,54 132,96 120,148 52,142 24,92",
    label: { x: 75, y: 96 },
  },
  {
    id: "chapinero",
    nombre: "Chapinero",
    zona: "Centro-norte",
    estadoContacto: "actualizado",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Diversidad", "Educación", "Cultura"],
    compromisosActivos: 2,
    propuestas: 5,
    documentos: 4,
    organizaciones: 7,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad de centralidad universitaria, cultural y diversa. Puede articular procesos juveniles estudiantiles, culturales, LGBTIQ+, ambientales y de espacio público.",
    shape: "132,96 194,96 184,166 126,166 120,148",
    label: { x: 150, y: 134 },
  },
  {
    id: "engativa",
    nombre: "Engativá",
    zona: "Occidente",
    estadoContacto: "parcial",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Deporte", "Educación", "Seguridad"],
    compromisosActivos: 3,
    propuestas: 4,
    documentos: 2,
    organizaciones: 6,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad occidental con alta densidad poblacional y fuerte necesidad de seguimiento a equipamientos, cultura, deporte y acceso a oportunidades juveniles.",
    shape: "52,142 120,148 126,166 114,220 48,218 18,174",
    label: { x: 70, y: 182 },
  },
  {
    id: "barrios-unidos",
    nombre: "Barrios Unidos",
    zona: "Centro-norte",
    estadoContacto: "actualizado",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Cultura", "Deporte", "Participación"],
    compromisosActivos: 1,
    propuestas: 3,
    documentos: 2,
    organizaciones: 4,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad de articulación entre equipamientos, deporte, comercio y vida barrial. Puede servir como nodo de encuentros juveniles distritales.",
    shape: "126,166 184,166 178,214 114,220",
    label: { x: 142, y: 194 },
  },
  {
    id: "teusaquillo",
    nombre: "Teusaquillo",
    zona: "Centro",
    estadoContacto: "agenda-activa",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Participación", "Universidades", "Cultura"],
    compromisosActivos: 3,
    propuestas: 7,
    documentos: 6,
    organizaciones: 8,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad central con presencia universitaria, cultural e institucional. Puede ser eje para pedagogía, control social y articulación distrital juvenil.",
    shape: "114,220 178,214 174,264 108,270 90,240",
    label: { x: 128, y: 244 },
  },
  {
    id: "santa-fe",
    nombre: "Santa Fe",
    zona: "Centro-oriente",
    estadoContacto: "parcial",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Cultura", "Derechos", "Centro histórico"],
    compromisosActivos: 2,
    propuestas: 4,
    documentos: 3,
    organizaciones: 5,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad de centralidad institucional, patrimonial y cultural. Requiere seguimiento a derechos, espacio público, habitabilidad y participación juvenil.",
    shape: "174,214 220,224 212,292 174,264",
    label: { x: 188, y: 252 },
  },
  {
    id: "fontibon",
    nombre: "Fontibón",
    zona: "Occidente",
    estadoContacto: "parcial",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Movilidad", "Empleo", "Educación"],
    compromisosActivos: 2,
    propuestas: 3,
    documentos: 2,
    organizaciones: 5,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad occidental estratégica por movilidad, aeropuerto, empleo y conexiones regionales. Se recomienda priorizar oportunidades laborales y educativas.",
    shape: "48,218 90,240 108,270 92,324 34,318 12,262",
    label: { x: 58, y: 276 },
  },
  {
    id: "los-martires",
    nombre: "Los Mártires",
    zona: "Centro",
    estadoContacto: "pendiente",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Derechos", "Seguridad", "Cultura"],
    compromisosActivos: 3,
    propuestas: 2,
    documentos: 1,
    organizaciones: 4,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad del centro ampliado con retos sociales complejos. Requiere manejo cuidadoso de información sensible y versiones públicas.",
    shape: "108,270 174,264 166,314 98,318 92,324",
    label: { x: 125, y: 296 },
  },
  {
    id: "la-candelaria",
    nombre: "La Candelaria",
    zona: "Centro histórico",
    estadoContacto: "actualizado",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Patrimonio", "Cultura", "Educación"],
    compromisosActivos: 1,
    propuestas: 3,
    documentos: 2,
    organizaciones: 4,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad patrimonial y universitaria. Puede concentrar acciones de pedagogía democrática, cultura, memoria y participación juvenil.",
    shape: "166,314 212,292 208,338 164,352",
    label: { x: 178, y: 326 },
  },
  {
    id: "puente-aranda",
    nombre: "Puente Aranda",
    zona: "Centro-occidente",
    estadoContacto: "agenda-activa",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Ambiente", "Trabajo", "Educación"],
    compromisosActivos: 4,
    propuestas: 5,
    documentos: 4,
    organizaciones: 6,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad industrial y residencial. Puede priorizar ambiente, trabajo juvenil, movilidad, educación técnica y espacios culturales.",
    shape: "92,324 166,314 164,352 134,386 72,372 34,318",
    label: { x: 98, y: 352 },
  },
  {
    id: "antonio-narino",
    nombre: "Antonio Nariño",
    zona: "Centro-sur",
    estadoContacto: "pendiente",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Salud", "Cultura", "Participación"],
    compromisosActivos: 1,
    propuestas: 2,
    documentos: 1,
    organizaciones: 3,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad de escala media con posibilidad de articular salud, cultura, participación barrial y seguimiento a equipamientos juveniles.",
    shape: "134,386 164,352 202,372 188,420 140,424",
    label: { x: 154, y: 392 },
  },
  {
    id: "kennedy",
    nombre: "Kennedy",
    zona: "Suroccidente",
    estadoContacto: "agenda-activa",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Educación", "Seguridad", "Cultura"],
    compromisosActivos: 5,
    propuestas: 8,
    documentos: 5,
    organizaciones: 10,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Una de las localidades con mayor población joven. Prioridad para seguimiento a educación, cultura, seguridad, convivencia y oportunidades.",
    shape: "34,318 72,372 70,438 24,456 0,398 10,346",
    label: { x: 42, y: 392 },
  },
  {
    id: "bosa",
    nombre: "Bosa",
    zona: "Suroccidente",
    estadoContacto: "parcial",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Educación", "Derechos", "Ambiente"],
    compromisosActivos: 4,
    propuestas: 6,
    documentos: 3,
    organizaciones: 8,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad del suroccidente con fuertes procesos comunitarios y juveniles. Requiere seguimiento a derechos, educación, ambiente y equipamientos.",
    shape: "24,456 70,438 94,496 78,552 22,536 0,494",
    label: { x: 42, y: 504 },
  },
  {
    id: "tunjuelito",
    nombre: "Tunjuelito",
    zona: "Sur",
    estadoContacto: "pendiente",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Ambiente", "Cultura", "Deporte"],
    compromisosActivos: 2,
    propuestas: 3,
    documentos: 2,
    organizaciones: 4,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad del sur con retos ambientales, culturales y de acceso a espacios de participación juvenil.",
    shape: "70,438 140,424 156,468 94,496",
    label: { x: 104, y: 462 },
  },
  {
    id: "rafael-uribe-uribe",
    nombre: "Rafael Uribe Uribe",
    zona: "Suroriente",
    estadoContacto: "parcial",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Derechos", "Educación", "Convivencia"],
    compromisosActivos: 3,
    propuestas: 4,
    documentos: 3,
    organizaciones: 5,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad suroriental con agendas juveniles de convivencia, educación, cultura, derechos y participación comunitaria.",
    shape: "140,424 188,420 218,466 184,516 156,468",
    label: { x: 168, y: 462 },
  },
  {
    id: "san-cristobal",
    nombre: "San Cristóbal",
    zona: "Suroriente",
    estadoContacto: "agenda-activa",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Ambiente", "Cultura", "Educación"],
    compromisosActivos: 4,
    propuestas: 5,
    documentos: 4,
    organizaciones: 7,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad de borde oriental con alta relevancia ambiental, cultural y comunitaria. Requiere seguimiento territorial e interlocal.",
    shape: "202,372 246,388 252,470 218,466 188,420",
    label: { x: 220, y: 424 },
  },
  {
    id: "ciudad-bolivar",
    nombre: "Ciudad Bolívar",
    zona: "Sur",
    estadoContacto: "agenda-activa",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Derechos", "Educación", "Cultura"],
    compromisosActivos: 6,
    propuestas: 9,
    documentos: 5,
    organizaciones: 11,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad extensa del sur con alta prioridad para garantías de participación, derechos, cultura, educación, movilidad y oportunidades juveniles.",
    shape: "78,552 94,496 156,468 184,516 160,600 92,622 34,592",
    label: { x: 110, y: 552 },
  },
  {
    id: "usme",
    nombre: "Usme",
    zona: "Suroriente",
    estadoContacto: "parcial",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Ruralidad", "Ambiente", "Educación"],
    compromisosActivos: 4,
    propuestas: 5,
    documentos: 3,
    organizaciones: 6,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad con componente urbano-rural y borde ambiental. Debe incluir agendas juveniles rurales, ambientales y de conectividad territorial.",
    shape: "184,516 252,470 274,570 230,644 160,600",
    label: { x: 210, y: 560 },
  },
  {
    id: "sumapaz",
    nombre: "Sumapaz",
    zona: "Rural",
    estadoContacto: "pendiente",
    delegadoCDJ: "Por confirmar",
    correoCLJ: "Por confirmar",
    correoInstitucional: "Por confirmar",
    prioridades: ["Ruralidad", "Ambiente", "Derechos"],
    compromisosActivos: 3,
    propuestas: 4,
    documentos: 2,
    organizaciones: 4,
    ultimaActualizacion: "Pendiente de validación",
    descripcion:
      "Localidad rural de Bogotá. Debe tener tratamiento diferencial por ruralidad, conectividad, ambiente, participación campesina y acceso institucional.",
    shape: "92,622 160,600 230,644 208,736 118,760 52,704",
    label: { x: 134, y: 690 },
  },
];
EOLOC

echo "==> Creando componente SVG interactivo..."
cat > src/components/territorio/BogotaSvgMap.jsx <<'EOSVG'
import { estadoTerritorial } from "../../data/localidades";

export default function BogotaSvgMap({ localidades, selectedId, onSelect }) {
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
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Haz clic sobre una localidad para consultar su ficha territorial, CLJ, prioridades,
            compromisos, documentos y canales pendientes de validación.
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
            viewBox="-12 0 300 780"
            role="img"
            aria-label="Mapa interactivo esquemático de Bogotá por localidades"
            className="mx-auto h-[720px] max-h-[75vh] w-full max-w-xl"
          >
            <defs>
              <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="7" floodOpacity="0.18" />
              </filter>
            </defs>

            <g filter="url(#mapShadow)">
              {localidades.map((loc) => {
                const isSelected = loc.id === selectedId;
                const meta = estadoTerritorial[loc.estadoContacto] || estadoTerritorial.pendiente;

                return (
                  <g key={loc.id}>
                    <polygon
                      points={loc.shape}
                      fill={meta.fill}
                      stroke={isSelected ? "#2B2B2B" : "#ffffff"}
                      strokeWidth={isSelected ? 4 : 2.5}
                      opacity={isSelected ? 1 : 0.88}
                      className="cursor-pointer transition hover:opacity-100"
                      onClick={() => onSelect(loc)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") onSelect(loc);
                      }}
                      tabIndex={0}
                      aria-label={`Seleccionar ${loc.nombre}`}
                    >
                      <title>{loc.nombre}</title>
                    </polygon>

                    <circle
                      cx={loc.label.x}
                      cy={loc.label.y}
                      r={isSelected ? 5 : 3.5}
                      fill="#2B2B2B"
                      opacity="0.75"
                      pointerEvents="none"
                    />

                    <text
                      x={loc.label.x}
                      y={loc.label.y - 8}
                      textAnchor="middle"
                      fontSize={loc.nombre.length > 13 ? 7.5 : 9}
                      fontWeight="900"
                      fill="#2B2B2B"
                      paintOrder="stroke"
                      stroke="#ffffff"
                      strokeWidth="3"
                      pointerEvents="none"
                    >
                      {loc.nombre.length > 16 ? loc.nombre.split(" ")[0] : loc.nombre}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="rounded-[1.5rem] bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-950">Lectura rápida</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Este mapa permite pasar de una página informativa a una lectura territorial del CDJ:
            quién representa cada localidad, qué temas están priorizados y qué compromisos deben
            seguirse.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#3871B7]">{localidades.length}</p>
              <p className="text-sm font-bold text-slate-600">Localidades cargadas</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#EE4C5B]">
                {localidades.reduce((acc, item) => acc + item.compromisosActivos, 0)}
              </p>
              <p className="text-sm font-bold text-slate-600">Compromisos activos estimados</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#F8A72C]">
                {localidades.reduce((acc, item) => acc + item.propuestas, 0)}
              </p>
              <p className="text-sm font-bold text-slate-600">Propuestas registrables</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
EOSVG

echo "==> Reemplazando panel lateral de localidad..."
cat > src/components/territorio/LocalidadPanel.jsx <<'EOPANEL'
import { ExternalLink, FileText, Mail, MapPin, Users } from "lucide-react";
import { estadoTerritorial } from "../../data/localidades";

export default function LocalidadPanel({ localidad }) {
  if (!localidad) {
    return (
      <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <MapPin className="mb-4 h-8 w-8 text-[#3871B7]" />
        <h2 className="text-2xl font-black text-slate-950">Selecciona una localidad</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Consulta delegado/a, CLJ, prioridades, compromisos activos, documentos, organizaciones y estado de contacto.
        </p>
      </aside>
    );
  }

  const estado = estadoTerritorial[localidad.estadoContacto] || estadoTerritorial.pendiente;

  return (
    <aside className="sticky top-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3871B7]">
            Ficha territorial
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">{localidad.nombre}</h2>
          <p className="mt-1 text-sm font-bold text-slate-500">{localidad.zona}</p>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-black ${estado.className}`}>
          {estado.label}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{localidad.descripcion}</p>

      <div className="mt-6 grid gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 font-black text-slate-950">
            <Users className="h-4 w-4 text-[#3871B7]" />
            Consejo Local de Juventud
          </div>
          <p className="text-sm text-slate-600"><b>Delegado/a al CDJ:</b> {localidad.delegadoCDJ}</p>
          <p className="mt-1 text-sm text-slate-600"><b>Correo CLJ:</b> {localidad.correoCLJ}</p>
          <p className="mt-1 text-sm text-slate-600"><b>Correo institucional:</b> {localidad.correoInstitucional}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 font-black text-slate-950">
            <FileText className="h-4 w-4 text-[#3871B7]" />
            Seguimiento territorial
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white p-3">
              <p className="text-2xl font-black text-[#3871B7]">{localidad.compromisosActivos}</p>
              <p className="text-[11px] font-bold text-slate-500">Compromisos</p>
            </div>
            <div className="rounded-xl bg-white p-3">
              <p className="text-2xl font-black text-[#EE4C5B]">{localidad.propuestas}</p>
              <p className="text-[11px] font-bold text-slate-500">Propuestas</p>
            </div>
            <div className="rounded-xl bg-white p-3">
              <p className="text-2xl font-black text-[#F8A72C]">{localidad.documentos}</p>
              <p className="text-[11px] font-bold text-slate-500">Docs</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="mb-3 font-black text-slate-950">Prioridades juveniles</p>
          <div className="flex flex-wrap gap-2">
            {localidad.prioridades.map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs font-bold text-slate-500">
        Última actualización: {localidad.ultimaActualizacion}
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <a
          href={`/cumplimiento?localidad=${encodeURIComponent(localidad.nombre)}`}
          className="inline-flex items-center justify-center rounded-2xl bg-[#3871B7] px-4 py-3 text-sm font-black text-white"
        >
          Ver compromisos
        </a>

        <a
          href="/participa#alerta-territorial"
          className="inline-flex items-center justify-center rounded-2xl bg-[#FBD416] px-4 py-3 text-sm font-black text-slate-950"
        >
          Enviar alerta
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>

        <a
          href="/documentos"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700"
        >
          Ver documentos
        </a>

        <a
          href="/participa#contacto"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700"
        >
          Contactar
          <Mail className="ml-2 h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
EOPANEL

echo "==> Reemplazando MapaBogota para usar SVG interactivo..."
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

echo "==> Listo. Respaldo guardado en: $BACKUP_DIR"
