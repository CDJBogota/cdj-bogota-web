#!/usr/bin/env bash
set -e

echo "==> Creando respaldo..."
STAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="backup-cdj-upgrade-$STAMP"
mkdir -p "$BACKUP_DIR"

backup_file () {
  if [ -f "$1" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$1")"
    cp "$1" "$BACKUP_DIR/$1"
  fi
}

backup_file src/App.jsx
backup_file src/pages/HomePage.jsx
backup_file src/pages/DocumentosPage.jsx
backup_file src/components/Header.jsx

echo "==> Creando carpetas nuevas..."
mkdir -p src/components/dashboard
mkdir -p src/components/documentos
mkdir -p src/components/territorio
mkdir -p src/components/timeline
mkdir -p src/components/home
mkdir -p src/data
mkdir -p src/pages

echo "==> Creando datos de navegación..."
cat > src/data/navigation.js <<'EONAV'
export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Consejo", href: "/institucional" },
  { label: "Integrantes", href: "/integrantes" },
  { label: "Territorio", href: "/localidades" },
  { label: "Transparencia", href: "/transparencia" },
  { label: "Participa", href: "/participa" },
];

export const transparenciaMenu = [
  { label: "Documentos", href: "/documentos" },
  { label: "Actas", href: "/documentos?tipo=Acta" },
  { label: "Compromisos", href: "/cumplimiento" },
  { label: "Línea de tiempo", href: "/historia" },
  { label: "Informes", href: "/documentos?tipo=Informe" },
  { label: "Datos abiertos", href: "/documentos?tipo=Datos%20abiertos" },
  { label: "Tratamiento de datos", href: "/transparencia#tratamiento-datos" },
];

export const participaMenu = [
  { label: "Enviar propuesta", href: "/participa#propuesta" },
  { label: "Reportar alerta territorial", href: "/participa#alerta-territorial" },
  { label: "Solicitar acompañamiento", href: "/participa#acompanamiento" },
  { label: "Inscribir organización/proceso juvenil", href: "/participa#organizacion" },
  { label: "Consultar estado de solicitud", href: "/cumplimiento" },
  { label: "Contactar al CDJ", href: "/participa#contacto" },
];

export const territorioMenu = [
  { label: "Ver mapa", href: "/mapa-territorial" },
  { label: "Ver localidades", href: "/localidades" },
  { label: "Ver compromisos por localidad", href: "/cumplimiento?filtro=localidad" },
  { label: "Ver correos de CLJ", href: "/localidades#correos" },
  { label: "Enviar alerta territorial", href: "/participa#alerta-territorial" },
];

export const documentosMenu = [
  { label: "Buscar", action: "buscar" },
  { label: "Descargar", action: "descargar" },
  { label: "Ver soporte", action: "soporte" },
  { label: "Ver versión pública", action: "version-publica" },
  { label: "Copiar cita", action: "copiar-cita" },
  { label: "Reportar error documental", href: "/participa#error-documental" },
  { label: "Solicitar documento no publicado", href: "/participa#documento-no-publicado" },
];

export const cumplimientoMenu = [
  { label: "Filtrar por entidad", action: "entidad" },
  { label: "Filtrar por localidad", action: "localidad" },
  { label: "Filtrar vencidos", action: "vencidos" },
  { label: "Exportar CSV", action: "exportar-csv" },
  { label: "Ver soporte", action: "soporte" },
  { label: "Reportar actualización", href: "/participa#actualizacion" },
  { label: "Solicitar seguimiento", href: "/participa#seguimiento" },
];
EONAV

echo "==> Creando modelos de datos..."
cat > src/data/compromisos.js <<'EOCOMP'
export const compromisos = [
  {
    id: "CDJ-COMP-2025-001",
    titulo: "Garantías de funcionamiento del Consejo Distrital de Juventud",
    entidad: "Secretaría Distrital de Gobierno",
    localidad: "Distrital",
    comision: "Mesa Directiva",
    tipo: "Compromiso institucional",
    fechaRadicacion: "2025-02-10",
    fechaLimite: "2025-03-01",
    estado: "en-tramite",
    prioridad: "alta",
    responsableCDJ: "Secretaría del CDJ",
    soporte: "#",
    respuesta: "#",
    resumen: "Seguimiento a condiciones logísticas, documentales, canales institucionales y apoyo para el funcionamiento autónomo del CDJ.",
    proximaAccion: "Solicitar actualización formal y dejar constancia en Plenaria.",
  },
  {
    id: "CDJ-COMP-2025-002",
    titulo: "Publicación de actas y repositorio documental",
    entidad: "Consejo Distrital de Juventud",
    localidad: "Distrital",
    comision: "Comunicación y Asuntos Públicos",
    tipo: "Gestión documental",
    fechaRadicacion: "2025-03-05",
    fechaLimite: "2025-03-20",
    estado: "cumplido",
    prioridad: "media",
    responsableCDJ: "Secretaría del CDJ",
    soporte: "#",
    respuesta: "#",
    resumen: "Organización del repositorio público con actas, acuerdos, informes y versiones públicas.",
    proximaAccion: "Mantener actualización periódica.",
  },
  {
    id: "CDJ-COMP-2025-003",
    titulo: "Respuesta pendiente a solicitud sobre política pública de juventud",
    entidad: "Entidad distrital por confirmar",
    localidad: "Distrital",
    comision: "Control y Veeduría",
    tipo: "Derecho de petición",
    fechaRadicacion: "2025-04-01",
    fechaLimite: "2025-04-22",
    estado: "vencido",
    prioridad: "alta",
    responsableCDJ: "Comisión de Control y Veeduría",
    soporte: "#",
    respuesta: "",
    resumen: "Solicitud de información sobre avances, presupuesto y metas dirigidas a juventudes.",
    proximaAccion: "Enviar reiteración y evaluar constancia pública.",
  },
  {
    id: "CDJ-COMP-2025-004",
    titulo: "Alerta territorial recibida sin respuesta institucional",
    entidad: "Alcaldía local por confirmar",
    localidad: "Kennedy",
    comision: "Planeación y Formulación",
    tipo: "Alerta territorial",
    fechaRadicacion: "2025-04-15",
    fechaLimite: "2025-05-06",
    estado: "sin-respuesta",
    prioridad: "media",
    responsableCDJ: "Delegación territorial",
    soporte: "#",
    respuesta: "",
    resumen: "Alerta juvenil sobre barreras de participación y acceso a espacios locales.",
    proximaAccion: "Trasladar a entidad competente y registrar seguimiento.",
  },
  {
    id: "CDJ-COMP-2025-005",
    titulo: "Cierre de solicitud por traslado de competencia",
    entidad: "IDPAC",
    localidad: "Distrital",
    comision: "Mesa Directiva",
    tipo: "Solicitud ciudadana",
    fechaRadicacion: "2025-01-12",
    fechaLimite: "2025-02-02",
    estado: "cerrado",
    prioridad: "baja",
    responsableCDJ: "Mesa Directiva",
    soporte: "#",
    respuesta: "#",
    resumen: "Solicitud cerrada por traslado formal a entidad competente.",
    proximaAccion: "Archivo con soporte.",
  },
];

export const estadosCompromiso = {
  "cumplido": {
    label: "Cumplido",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  "en-tramite": {
    label: "En trámite",
    className: "bg-sky-100 text-sky-800 border-sky-200",
  },
  "vencido": {
    label: "Vencido",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  "sin-respuesta": {
    label: "Sin respuesta",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  "cerrado": {
    label: "Cerrado",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
  "priorizado": {
    label: "Priorizado",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
};
EOCOMP

cat > src/data/documentos.js <<'EODOCS'
export const documentos = [
  {
    id: "DOC-2025-001",
    titulo: "Acuerdo 002 de 2025 - Reglamento Interno del CDJ",
    tipo: "Reglamento",
    fecha: "2025-01-15",
    anio: 2025,
    comision: "Plenaria",
    localidad: "Distrital",
    entidad: "CDJ Bogotá",
    estado: "vigente",
    versionPublica: true,
    etiquetas: ["reglamento", "organización interna", "comisiones", "trazabilidad"],
    resumen: "Reforma del Reglamento Interno del Consejo Distrital de Juventud de Bogotá.",
    enlace: "#",
    soporte: "#",
  },
  {
    id: "DOC-2025-002",
    titulo: "Acta de sesión ordinaria del CDJ",
    tipo: "Acta",
    fecha: "2025-03-10",
    anio: 2025,
    comision: "Plenaria",
    localidad: "Distrital",
    entidad: "CDJ Bogotá",
    estado: "aprobada",
    versionPublica: true,
    etiquetas: ["plenaria", "sesión", "decisiones"],
    resumen: "Acta de sesión ordinaria con asistencia, decisiones, constancias y compromisos.",
    enlace: "#",
    soporte: "#",
  },
  {
    id: "DOC-2025-003",
    titulo: "Informe semestral de gestión",
    tipo: "Informe",
    fecha: "2025-06-30",
    anio: 2025,
    comision: "Mesa Directiva",
    localidad: "Distrital",
    entidad: "CDJ Bogotá",
    estado: "borrador",
    versionPublica: false,
    etiquetas: ["gestión", "rendición de cuentas", "audiencia pública"],
    resumen: "Informe de avances, pendientes, compromisos y resultados del periodo.",
    enlace: "#",
    soporte: "#",
  },
  {
    id: "DOC-2025-004",
    titulo: "Matriz pública de compromisos",
    tipo: "Datos abiertos",
    fecha: "2025-05-15",
    anio: 2025,
    comision: "Control y Veeduría",
    localidad: "Distrital",
    entidad: "CDJ Bogotá",
    estado: "publicado",
    versionPublica: true,
    etiquetas: ["compromisos", "seguimiento", "datos abiertos"],
    resumen: "Base pública de compromisos, estados, entidades responsables y soportes.",
    enlace: "#",
    soporte: "#",
  },
];

export const tiposDocumento = [
  "Acta",
  "Reglamento",
  "Acuerdo",
  "Resolución interna",
  "Comunicado oficial",
  "Derecho de petición",
  "Respuesta institucional",
  "Informe",
  "Constancia",
  "Salvamento de voto",
  "Fe de erratas",
  "Matriz de seguimiento",
  "Datos abiertos",
  "Documento de empalme",
];
EODOCS

cat > src/data/localidades.js <<'EOLOC'
export const localidades = [
  { id: "usaquen", nombre: "Usaquén" },
  { id: "chapinero", nombre: "Chapinero" },
  { id: "santa-fe", nombre: "Santa Fe" },
  { id: "san-cristobal", nombre: "San Cristóbal" },
  { id: "usme", nombre: "Usme" },
  { id: "tunjuelito", nombre: "Tunjuelito" },
  { id: "bosa", nombre: "Bosa" },
  { id: "kennedy", nombre: "Kennedy" },
  { id: "fontibon", nombre: "Fontibón" },
  { id: "engativa", nombre: "Engativá" },
  { id: "suba", nombre: "Suba" },
  { id: "barrios-unidos", nombre: "Barrios Unidos" },
  { id: "teusaquillo", nombre: "Teusaquillo" },
  { id: "los-martires", nombre: "Los Mártires" },
  { id: "antonio-narino", nombre: "Antonio Nariño" },
  { id: "puente-aranda", nombre: "Puente Aranda" },
  { id: "la-candelaria", nombre: "La Candelaria" },
  { id: "rafael-uribe-uribe", nombre: "Rafael Uribe Uribe" },
  { id: "ciudad-bolivar", nombre: "Ciudad Bolívar" },
  { id: "sumapaz", nombre: "Sumapaz" },
].map((item, index) => ({
  ...item,
  estadoContacto: index % 4 === 0 ? "actualizado" : index % 4 === 1 ? "parcial" : index % 4 === 2 ? "pendiente" : "agenda-activa",
  delegadoCDJ: "Por confirmar",
  correoCLJ: "Por confirmar",
  prioridades: ["Participación", "Educación", "Cultura"],
  compromisosActivos: (index % 5) + 1,
  propuestas: (index % 6) + 2,
  documentos: (index % 7) + 1,
  ultimaActualizacion: "2025-05-20",
}));
EOLOC

cat > src/data/timeline.js <<'EOTIME'
export const timeline = [
  {
    id: "TL-2025-001",
    fecha: "2025-01-15",
    titulo: "Reforma del Reglamento Interno",
    categoria: "Normativa interna",
    descripcion: "Adopción del Acuerdo 002 de 2025 para actualizar reglas de funcionamiento, archivo, comisiones, publicidad y régimen interno.",
    soporte: "#",
    destacado: true,
  },
  {
    id: "TL-2025-002",
    fecha: "2025-02-01",
    titulo: "Instalación de comisiones permanentes",
    categoria: "Organización interna",
    descripcion: "Organización del trabajo en Control y Veeduría, Comunicación y Asuntos Públicos, y Planeación y Formulación.",
    soporte: "#",
    destacado: true,
  },
  {
    id: "TL-2025-003",
    fecha: "2025-03-10",
    titulo: "Sesión ordinaria de seguimiento",
    categoria: "Sesiones",
    descripcion: "Sesión de Plenaria con revisión de compromisos, solicitudes y agenda pública.",
    soporte: "#",
    destacado: false,
  },
  {
    id: "TL-2025-004",
    fecha: "2025-06-30",
    titulo: "Informe semestral de gestión",
    categoria: "Rendición de cuentas",
    descripcion: "Presentación pública de avances, pendientes y compromisos del CDJ.",
    soporte: "#",
    destacado: true,
  },
];
EOTIME

cat > src/data/indicadores.js <<'EOIND'
export const indicadoresPublicos = [
  { id: "total-compromisos", label: "Total compromisos", value: 5, detail: "Registrados en matriz pública" },
  { id: "vencidos", label: "Vencidos", value: 1, detail: "Requieren seguimiento" },
  { id: "documentos", label: "Documentos publicados", value: 4, detail: "Con metadatos públicos" },
  { id: "localidades", label: "Localidades con contacto actualizado", value: 5, detail: "En validación permanente" },
  { id: "agenda", label: "Próximas sesiones", value: 3, detail: "Plenaria, comisiones y audiencia" },
];
EOIND

echo "==> Creando componentes del tablero..."
cat > src/components/dashboard/SemaforoEstado.jsx <<'EOSEM'
import { estadosCompromiso } from "../../data/compromisos";

export default function SemaforoEstado({ estado }) {
  const meta = estadosCompromiso[estado] || estadosCompromiso["cerrado"];
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${meta.className}`}>
      {meta.label}
    </span>
  );
}
EOSEM

cat > src/components/dashboard/IndicadorCard.jsx <<'EOICARD'
export default function IndicadorCard({ label, value, detail }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-4xl font-black text-[#3871B7]">{value}</p>
      <p className="mt-1 font-black text-slate-950">{label}</p>
      {detail && <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>}
    </div>
  );
}
EOICARD

cat > src/components/dashboard/CumplimientoDashboard.jsx <<'EODASH'
import { useMemo, useState } from "react";
import { Download, ExternalLink, Filter, Search } from "lucide-react";
import { compromisos } from "../../data/compromisos";
import SemaforoEstado from "./SemaforoEstado";
import IndicadorCard from "./IndicadorCard";

function exportCsv(rows) {
  const headers = [
    "id",
    "titulo",
    "entidad",
    "localidad",
    "comision",
    "tipo",
    "fechaRadicacion",
    "fechaLimite",
    "estado",
    "prioridad",
    "responsableCDJ",
    "resumen",
    "proximaAccion",
  ];

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((key) => `"${String(row[key] ?? "").replaceAll('"', '""')}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "compromisos-cdj-bogota.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function CumplimientoDashboard() {
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("todos");
  const [localidad, setLocalidad] = useState("todas");
  const [entidad, setEntidad] = useState("todas");

  const localidades = [...new Set(compromisos.map((item) => item.localidad))];
  const entidades = [...new Set(compromisos.map((item) => item.entidad))];

  const filtrados = useMemo(() => {
    return compromisos.filter((item) => {
      const texto = `${item.titulo} ${item.entidad} ${item.localidad} ${item.comision} ${item.tipo} ${item.resumen}`.toLowerCase();
      const matchQuery = texto.includes(query.toLowerCase());
      const matchEstado = estado === "todos" || item.estado === estado;
      const matchLocalidad = localidad === "todas" || item.localidad === localidad;
      const matchEntidad = entidad === "todas" || item.entidad === entidad;
      return matchQuery && matchEstado && matchLocalidad && matchEntidad;
    });
  }, [query, estado, localidad, entidad]);

  const stats = {
    total: compromisos.length,
    cumplidos: compromisos.filter((item) => item.estado === "cumplido").length,
    tramite: compromisos.filter((item) => item.estado === "en-tramite").length,
    vencidos: compromisos.filter((item) => item.estado === "vencido").length,
    sinRespuesta: compromisos.filter((item) => item.estado === "sin-respuesta").length,
  };

  return (
    <section className="space-y-8">
      <div className="grid gap-4 md:grid-cols-5">
        <IndicadorCard label="Total" value={stats.total} detail="Compromisos registrados" />
        <IndicadorCard label="Cumplidos" value={stats.cumplidos} detail="Con soporte verificable" />
        <IndicadorCard label="En trámite" value={stats.tramite} detail="Gestión activa" />
        <IndicadorCard label="Vencidos" value={stats.vencidos} detail="Fuera de plazo" />
        <IndicadorCard label="Sin respuesta" value={stats.sinRespuesta} detail="Pendientes de contestación" />
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Semáforo de cumplimiento</h2>
            <p className="text-sm text-slate-600">Filtra por entidad, localidad, estado o palabra clave.</p>
          </div>
          <button
            onClick={() => exportCsv(filtrados)}
            className="inline-flex items-center justify-center rounded-2xl bg-[#3871B7] px-4 py-3 text-sm font-black text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </button>
        </div>

        <div className="grid gap-3 lg:grid-cols-4">
          <label className="relative lg:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar compromiso..."
              className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[#3871B7]"
            />
          </label>

          <select value={estado} onChange={(e) => setEstado(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todos">Todos los estados</option>
            <option value="cumplido">Cumplido</option>
            <option value="en-tramite">En trámite</option>
            <option value="vencido">Vencido</option>
            <option value="sin-respuesta">Sin respuesta</option>
            <option value="cerrado">Cerrado</option>
          </select>

          <select value={entidad} onChange={(e) => setEntidad(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todas">Todas las entidades</option>
            {entidades.map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={localidad} onChange={(e) => setLocalidad(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todas">Todas las localidades</option>
            {localidades.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200">
          <div className="hidden grid-cols-[1.2fr_.8fr_.7fr_.7fr_.7fr] bg-slate-50 px-5 py-3 text-xs font-black uppercase tracking-wide text-slate-500 lg:grid">
            <span>Compromiso</span>
            <span>Entidad</span>
            <span>Localidad</span>
            <span>Estado</span>
            <span>Soporte</span>
          </div>

          <div className="divide-y divide-slate-200">
            {filtrados.map((item) => (
              <article key={item.id} className="grid gap-4 px-5 py-5 lg:grid-cols-[1.2fr_.8fr_.7fr_.7fr_.7fr] lg:items-center">
                <div>
                  <p className="font-black text-slate-950">{item.titulo}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.resumen}</p>
                  <p className="mt-2 text-xs font-bold text-slate-500">{item.id} · Límite: {item.fechaLimite}</p>
                </div>
                <p className="text-sm font-bold text-slate-700">{item.entidad}</p>
                <p className="text-sm text-slate-600">{item.localidad}</p>
                <SemaforoEstado estado={item.estado} />
                <div className="flex flex-wrap gap-2">
                  <a href={item.soporte || "#"} className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-50">
                    Ver soporte <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                  <a href="/participa#seguimiento" className="inline-flex items-center rounded-xl bg-[#FBD416] px-3 py-2 text-xs font-black text-slate-950">
                    Solicitar seguimiento
                  </a>
                </div>
              </article>
            ))}

            {filtrados.length === 0 && (
              <div className="p-8 text-center text-slate-600">
                <Filter className="mx-auto mb-3 h-8 w-8 text-slate-400" />
                No hay compromisos con esos filtros.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
EODASH

echo "==> Creando componentes de documentos..."
cat > src/components/documentos/DocumentCard.jsx <<'EODOCCARD'
import { Copy, Download, ExternalLink, FileText } from "lucide-react";

export default function DocumentCard({ doc }) {
  const citation = `${doc.titulo}. ${doc.entidad}, ${doc.fecha}.`;

  async function copyCitation() {
    await navigator.clipboard.writeText(citation);
    alert("Cita copiada al portapapeles.");
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#E7E3DF]">
            <FileText className="h-5 w-5 text-[#3871B7]" />
          </div>
          <div>
            <h3 className="font-black text-slate-950">{doc.titulo}</h3>
            <p className="mt-1 text-xs font-bold text-slate-500">{doc.tipo} · {doc.fecha} · {doc.comision}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{doc.estado}</span>
      </div>

      <p className="text-sm leading-6 text-slate-600">{doc.resumen}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {doc.etiquetas?.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">#{tag}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a href={doc.enlace || "#"} className="inline-flex items-center rounded-2xl bg-[#3871B7] px-4 py-2 text-sm font-black text-white">
          Descargar <Download className="ml-2 h-4 w-4" />
        </a>
        <a href={doc.soporte || "#"} className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-700">
          Ver soporte <ExternalLink className="ml-2 h-4 w-4" />
        </a>
        {doc.versionPublica && (
          <a href={doc.enlace || "#"} className="inline-flex items-center rounded-2xl bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">
            Versión pública
          </a>
        )}
        <button onClick={copyCitation} className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-700">
          Copiar cita <Copy className="ml-2 h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
EODOCCARD

cat > src/components/documentos/DocumentSearch.jsx <<'EODOCSEARCH'
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { documentos, tiposDocumento } from "../../data/documentos";
import DocumentCard from "./DocumentCard";

export default function DocumentSearch() {
  const [query, setQuery] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [anio, setAnio] = useState("todos");
  const [comision, setComision] = useState("todas");
  const [localidad, setLocalidad] = useState("todas");
  const [versionPublica, setVersionPublica] = useState("todas");

  const anios = [...new Set(documentos.map((doc) => doc.anio))].sort((a, b) => b - a);
  const comisiones = [...new Set(documentos.map((doc) => doc.comision))];
  const localidades = [...new Set(documentos.map((doc) => doc.localidad))];

  const filtrados = useMemo(() => {
    return documentos.filter((doc) => {
      const texto = `${doc.titulo} ${doc.tipo} ${doc.comision} ${doc.localidad} ${doc.entidad} ${doc.estado} ${doc.resumen} ${doc.etiquetas?.join(" ")}`.toLowerCase();
      return (
        texto.includes(query.toLowerCase()) &&
        (tipo === "todos" || doc.tipo === tipo) &&
        (anio === "todos" || String(doc.anio) === anio) &&
        (comision === "todas" || doc.comision === comision) &&
        (localidad === "todas" || doc.localidad === localidad) &&
        (versionPublica === "todas" || String(doc.versionPublica) === versionPublica)
      );
    });
  }, [query, tipo, anio, comision, localidad, versionPublica]);

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-6">
          <label className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por palabra clave..."
              className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[#3871B7]"
            />
          </label>

          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todos">Todos los tipos</option>
            {tiposDocumento.map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={anio} onChange={(e) => setAnio(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todos">Todos los años</option>
            {anios.map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={comision} onChange={(e) => setComision(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todas">Todas las comisiones</option>
            {comisiones.map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={versionPublica} onChange={(e) => setVersionPublica(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todas">Todas las versiones</option>
            <option value="true">Solo versión pública</option>
            <option value="false">No publicada</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-600">{filtrados.length} documento(s) encontrado(s)</p>
        <a href="/participa#documento-no-publicado" className="rounded-2xl bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">
          Solicitar documento no publicado
        </a>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtrados.map((doc) => <DocumentCard key={doc.id} doc={doc} />)}
      </div>
    </section>
  );
}
EODOCSEARCH

echo "==> Creando componentes territoriales..."
cat > src/components/territorio/LocalidadCard.jsx <<'EOLOCCARD'
const estadoStyles = {
  actualizado: "bg-emerald-100 text-emerald-800",
  parcial: "bg-amber-100 text-amber-800",
  pendiente: "bg-red-100 text-red-800",
  "agenda-activa": "bg-sky-100 text-sky-800",
};

const estadoLabels = {
  actualizado: "Contacto actualizado",
  parcial: "Información parcial",
  pendiente: "Pendiente de datos",
  "agenda-activa": "Agenda activa",
};

export default function LocalidadCard({ localidad, onSelect }) {
  return (
    <button
      onClick={() => onSelect(localidad)}
      className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-black text-slate-950">{localidad.nombre}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${estadoStyles[localidad.estadoContacto]}`}>
          {estadoLabels[localidad.estadoContacto]}
        </span>
      </div>
      <p className="text-sm text-slate-600"><b>Delegado/a:</b> {localidad.delegadoCDJ}</p>
      <p className="mt-1 text-sm text-slate-600"><b>Compromisos activos:</b> {localidad.compromisosActivos}</p>
      <p className="mt-1 text-sm text-slate-600"><b>Propuestas:</b> {localidad.propuestas}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {localidad.prioridades.map((item) => (
          <span key={item} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">{item}</span>
        ))}
      </div>
    </button>
  );
}
EOLOCCARD

cat > src/components/territorio/LocalidadPanel.jsx <<'EOLOCPANEL'
import { ExternalLink, MapPin } from "lucide-react";

export default function LocalidadPanel({ localidad }) {
  if (!localidad) {
    return (
      <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <MapPin className="mb-4 h-8 w-8 text-[#3871B7]" />
        <h2 className="text-2xl font-black text-slate-950">Selecciona una localidad</h2>
        <p className="mt-3 leading-7 text-slate-600">Consulta delegado/a, prioridades, compromisos activos, documentos y estado de contacto.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-[#3871B7]">Ficha territorial</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{localidad.nombre}</h2>
      <div className="mt-5 space-y-3 text-sm text-slate-700">
        <p><b>Delegado/a al CDJ:</b> {localidad.delegadoCDJ}</p>
        <p><b>Correo CLJ:</b> {localidad.correoCLJ}</p>
        <p><b>Compromisos activos:</b> {localidad.compromisosActivos}</p>
        <p><b>Propuestas registradas:</b> {localidad.propuestas}</p>
        <p><b>Documentos:</b> {localidad.documentos}</p>
        <p><b>Última actualización:</b> {localidad.ultimaActualizacion}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <a href={`/cumplimiento?localidad=${encodeURIComponent(localidad.nombre)}`} className="rounded-2xl bg-[#3871B7] px-4 py-2 text-sm font-black text-white">
          Ver compromisos
        </a>
        <a href="/participa#alerta-territorial" className="inline-flex items-center rounded-2xl bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">
          Enviar alerta <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
EOLOCPANEL

cat > src/components/territorio/MapaBogota.jsx <<'EOMAPA'
import { useState } from "react";
import { localidades } from "../../data/localidades";
import LocalidadCard from "./LocalidadCard";
import LocalidadPanel from "./LocalidadPanel";

export default function MapaBogota() {
  const [selected, setSelected] = useState(localidades[0]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 rounded-3xl bg-slate-50 p-6">
          <h2 className="text-2xl font-black text-slate-950">Mapa territorial de Bogotá</h2>
          <p className="mt-2 leading-7 text-slate-600">
            Primera versión en grilla territorial enriquecida. Luego puede reemplazarse por un SVG interactivo de Bogotá con las 20 localidades.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {localidades.map((localidad) => (
            <LocalidadCard key={localidad.id} localidad={localidad} onSelect={setSelected} />
          ))}
        </div>
      </div>
      <LocalidadPanel localidad={selected} />
    </section>
  );
}
EOMAPA

echo "==> Creando componentes de línea de tiempo..."
cat > src/components/timeline/TimelineInstitucional.jsx <<'EOTL'
import { useMemo, useState } from "react";
import { timeline } from "../../data/timeline";

export default function TimelineInstitucional() {
  const [categoria, setCategoria] = useState("todas");
  const categorias = ["todas", ...new Set(timeline.map((item) => item.categoria))];

  const items = useMemo(() => {
    return timeline
      .filter((item) => categoria === "todas" || item.categoria === categoria)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }, [categoria]);

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <label className="text-sm font-black text-slate-700">Filtrar por categoría</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm md:w-96">
          {categorias.map((item) => <option key={item} value={item}>{item === "todas" ? "Todas las categorías" : item}</option>)}
        </select>
      </div>

      <div className="relative border-l-4 border-[#3871B7] pl-6">
        {items.map((item) => (
          <article key={item.id} className="relative mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="absolute -left-[38px] top-7 h-5 w-5 rounded-full border-4 border-white bg-[#FBD416] shadow" />
            <p className="text-sm font-black text-[#3871B7]">{item.fecha} · {item.categoria}</p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">{item.titulo}</h3>
            <p className="mt-3 leading-7 text-slate-600">{item.descripcion}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.destacado && <span className="rounded-full bg-[#FBD416] px-3 py-1 text-xs font-black text-slate-950">Hito destacado</span>}
              <a href={item.soporte || "#"} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-slate-700">Ver soporte</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
EOTL

echo "==> Creando componentes del home..."
cat > src/components/home/AccessPanel.jsx <<'EOACCESS'
import { Link } from "react-router-dom";
import { Archive, BarChart3, Clock3, FileSearch, MapPinned, Send, Users } from "lucide-react";

const cards = [
  {
    title: "Tablero de cumplimiento",
    text: "Semáforo público de compromisos, solicitudes, entidades, vencimientos y soportes.",
    href: "/cumplimiento",
    icon: BarChart3,
    color: "bg-[#3871B7]",
  },
  {
    title: "Mapa territorial",
    text: "Consulta localidades, delegaciones, prioridades, compromisos y alertas juveniles.",
    href: "/mapa-territorial",
    icon: MapPinned,
    color: "bg-[#57C5CE]",
  },
  {
    title: "Buscador documental",
    text: "Encuentra actas, informes, reglamentos, respuestas, constancias y versiones públicas.",
    href: "/documentos",
    icon: FileSearch,
    color: "bg-[#EE4C5B]",
  },
  {
    title: "Línea de tiempo",
    text: "Histórico de elecciones, sesiones, reformas, informes, audiencias e hitos de incidencia.",
    href: "/historia",
    icon: Clock3,
    color: "bg-[#F8A72C]",
  },
  {
    title: "Participa / radica",
    text: "Envía propuestas, alertas territoriales, solicitudes de acompañamiento o requerimientos.",
    href: "/participa",
    icon: Send,
    color: "bg-[#E5579D]",
  },
  {
    title: "Consejeros/as",
    text: "Conoce integrantes, Mesa Directiva, comisiones, delegaciones y representación territorial.",
    href: "/integrantes",
    icon: Users,
    color: "bg-[#2B2B2B]",
  },
];

export default function AccessPanel() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Centro de seguimiento juvenil</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">Consulta, participa y haz seguimiento.</h2>
        </div>
        <Link to="/transparencia" className="inline-flex items-center justify-center rounded-2xl bg-[#FBD416] px-5 py-3 text-sm font-black text-slate-950">
          <Archive className="mr-2 h-4 w-4" />
          Ver transparencia
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ title, text, href, icon: Icon, color }) => (
          <Link key={title} to={href} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className={`mb-5 grid h-14 w-14 place-items-center rounded-3xl ${color}`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-950">{title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{text}</p>
            <p className="mt-5 text-sm font-black text-[#3871B7]">Abrir módulo →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
EOACCESS

cat > src/components/home/LatestUpdates.jsx <<'EOLATEST'
import { Link } from "react-router-dom";
import { compromisos } from "../../data/compromisos";
import { documentos } from "../../data/documentos";
import { timeline } from "../../data/timeline";

export default function LatestUpdates() {
  const latestDocs = documentos.slice(0, 3);
  const latestCompromisos = compromisos.slice(0, 3);
  const latestTimeline = timeline.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Últimos movimientos</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">Actividad reciente del portal</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">Documentos cargados</h3>
          <div className="mt-5 space-y-4">
            {latestDocs.map((doc) => (
              <Link key={doc.id} to="/documentos" className="block rounded-2xl bg-slate-50 p-4 hover:bg-slate-100">
                <p className="font-bold text-slate-950">{doc.titulo}</p>
                <p className="text-xs text-slate-500">{doc.fecha} · {doc.tipo}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">Respuestas y compromisos</h3>
          <div className="mt-5 space-y-4">
            {latestCompromisos.map((item) => (
              <Link key={item.id} to="/cumplimiento" className="block rounded-2xl bg-slate-50 p-4 hover:bg-slate-100">
                <p className="font-bold text-slate-950">{item.titulo}</p>
                <p className="text-xs text-slate-500">{item.entidad} · {item.estado}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">Hitos institucionales</h3>
          <div className="mt-5 space-y-4">
            {latestTimeline.map((item) => (
              <Link key={item.id} to="/historia" className="block rounded-2xl bg-slate-50 p-4 hover:bg-slate-100">
                <p className="font-bold text-slate-950">{item.titulo}</p>
                <p className="text-xs text-slate-500">{item.fecha} · {item.categoria}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
EOLATEST

echo "==> Creando páginas nuevas..."
cat > src/pages/CumplimientoPage.jsx <<'EOCUMPAGE'
import CumplimientoDashboard from "../components/dashboard/CumplimientoDashboard";

export default function CumplimientoPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Control social</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Tablero de cumplimiento</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Semáforo público para consultar compromisos, solicitudes, respuestas, vencimientos, soportes y próximas acciones del CDJ.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <CumplimientoDashboard />
      </section>
    </main>
  );
}
EOCUMPAGE

cat > src/pages/MapaTerritorialPage.jsx <<'EOMAPPAGE'
import MapaBogota from "../components/territorio/MapaBogota";

export default function MapaTerritorialPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Territorio</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Mapa de Bogotá por localidades</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Consulta estado de contacto, delegaciones, prioridades, documentos, propuestas y compromisos activos por localidad.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <MapaBogota />
      </section>
    </main>
  );
}
EOMAPPAGE

cat > src/pages/TimelinePage.jsx <<'EOTLPAGE'
import TimelineInstitucional from "../components/timeline/TimelineInstitucional";

export default function TimelinePage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Memoria institucional</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Línea de tiempo del CDJ</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Histórico de elecciones, sesiones, reformas reglamentarias, audiencias públicas, informes, hitos de incidencia y empalmes.
        </p>
      </section>
      <section className="mx-auto max-w-5xl px-5 pb-20">
        <TimelineInstitucional />
      </section>
    </main>
  );
}
EOTLPAGE

if [ ! -f src/pages/IntegrantesPage.jsx ]; then
cat > src/pages/IntegrantesPage.jsx <<'EOINT'
export default function IntegrantesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Representación</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-6xl">Integrantes del CDJ</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        Página base para publicar Mesa Directiva, consejeros/as por localidad, comisiones, delegaciones y periodo.
      </p>
    </main>
  );
}
EOINT
fi

if [ ! -f src/pages/NotFoundPage.jsx ]; then
cat > src/pages/NotFoundPage.jsx <<'EONOT'
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-24 text-center">
      <p className="text-8xl font-black text-[#3871B7]">404</p>
      <h1 className="mt-4 text-4xl font-black text-slate-950">Página no encontrada</h1>
      <p className="mt-4 text-slate-600">La ruta que intentas abrir no existe o fue movida.</p>
      <Link to="/" className="mt-8 inline-flex rounded-2xl bg-[#3871B7] px-6 py-3 font-black text-white">
        Volver al inicio
      </Link>
    </main>
  );
}
EONOT
fi

echo "==> Reemplazando DocumentosPage con buscador..."
cat > src/pages/DocumentosPage.jsx <<'EODOCPAGE'
import DocumentSearch from "../components/documentos/DocumentSearch";

export default function DocumentosPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Archivo público</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Buscador documental</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Consulta actas, informes, reglamentos, respuestas institucionales, constancias, versiones públicas y documentos de trazabilidad.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <DocumentSearch />
      </section>
    </main>
  );
}
EODOCPAGE

echo "==> Reemplazando HomePage con portada viva..."
cat > src/pages/HomePage.jsx <<'EOHOME'
import { Link } from "react-router-dom";
import { CalendarDays, Megaphone } from "lucide-react";
import AccessPanel from "../components/home/AccessPanel";
import LatestUpdates from "../components/home/LatestUpdates";
import IndicadorCard from "../components/dashboard/IndicadorCard";
import { indicadoresPublicos } from "../data/indicadores";

const agenda = [
  { tipo: "Sesión de Plenaria", fecha: "Por confirmar", detalle: "Sesión ordinaria del Consejo Distrital de Juventud" },
  { tipo: "Comisiones", fecha: "Por confirmar", detalle: "Trabajo de Control, Comunicación y Planeación" },
  { tipo: "Audiencia pública", fecha: "Semestral", detalle: "Rendición de cuentas e informe de gestión" },
  { tipo: "Encuentro territorial", fecha: "Por confirmar", detalle: "Articulación con Consejos Locales de Juventud" },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(251,212,22,.38),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(238,76,91,.22),transparent_30%),radial-gradient(circle_at_55%_95%,rgba(87,197,206,.28),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <p className="inline-flex rounded-full bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">Consejo Distrital de Juventud de Bogotá D.C.</p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight text-slate-950 md:text-7xl">
            Participación juvenil con memoria, trazabilidad e incidencia pública.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Portal público para consultar documentos, compromisos, agenda, localidades, integrantes y canales de participación del CDJ Bogotá.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/participa" className="rounded-2xl bg-[#3871B7] px-6 py-4 font-black text-white">
              Participa
            </Link>
            <Link to="/transparencia" className="rounded-2xl border-2 border-slate-950 px-6 py-4 font-black text-slate-950">
              Ver transparencia
            </Link>
          </div>
        </div>
      </section>

      <AccessPanel />

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Indicadores públicos</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">Estado general del portal</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {indicadoresPublicos.map((item) => (
              <IndicadorCard key={item.id} label={item.label} value={item.value} detail={item.detail} />
            ))}
          </div>
        </div>
      </section>

      <LatestUpdates />

      <section className="bg-[#2B2B2B] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FBD416]">Agenda pública</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">Sesiones, comisiones y encuentros</h2>
            </div>
            <CalendarDays className="hidden h-12 w-12 text-[#57C5CE] md:block" />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {agenda.map((item) => (
              <article key={item.tipo} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="font-black">{item.tipo}</p>
                <p className="mt-2 text-sm font-bold text-[#FBD416]">{item.fecha}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.detalle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#3871B7] to-[#EE4C5B] p-8 text-white md:p-12">
          <Megaphone className="mb-5 h-10 w-10" />
          <h2 className="text-3xl font-black md:text-5xl">¿Tienes una propuesta, alerta o solicitud para las juventudes de Bogotá?</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90">
            Usa los canales de participación para enviar propuestas, alertas territoriales, solicitudes de acompañamiento o documentos que requieran seguimiento.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/participa#propuesta" className="rounded-2xl bg-white px-6 py-4 font-black text-[#3871B7]">
              Enviar propuesta
            </Link>
            <Link to="/participa#alerta-territorial" className="rounded-2xl bg-[#FBD416] px-6 py-4 font-black text-slate-950">
              Reportar alerta territorial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
EOHOME

echo "==> Reemplazando Header con navegación simplificada y menús..."
cat > src/components/Header.jsx <<'EOHEADER'
import { Link, NavLink } from "react-router-dom";
import LogoCDJ from "./LogoCDJ";
import { mainNav, participaMenu, transparenciaMenu } from "../data/navigation";

function navClass({ isActive }) {
  return `text-sm font-black transition hover:text-[#3871B7] ${isActive ? "text-[#3871B7]" : "text-slate-700"}`;
}

function Dropdown({ label, items }) {
  return (
    <div className="group relative">
      <button className="text-sm font-black text-slate-700 transition hover:text-[#3871B7]">
        {label}
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-72 translate-y-2 rounded-3xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => (
          <Link key={item.href} to={item.href} className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#3871B7]">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const visibleNav = mainNav.filter((item) => !["Transparencia", "Participa"].includes(item.label));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="Ir al inicio">
          <LogoCDJ />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {visibleNav.map((item) => (
            <NavLink key={item.href} to={item.href} className={navClass}>
              {item.label}
            </NavLink>
          ))}
          <Dropdown label="Transparencia" items={transparenciaMenu} />
          <Dropdown label="Participa" items={participaMenu} />
        </div>

        <Link to="/participa" className="rounded-2xl bg-[#3871B7] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#2f609d]">
          Radicar / Participar
        </Link>
      </nav>
    </header>
  );
}
EOHEADER

echo "==> Reemplazando App.jsx con rutas completas..."
cat > src/App.jsx <<'EOAPP'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import InstitucionalPage from "./pages/InstitucionalPage";
import NormativaPage from "./pages/NormativaPage";
import TransparenciaPage from "./pages/TransparenciaPage";
import DocumentosPage from "./pages/DocumentosPage";
import ParticipaPage from "./pages/ParticipaPage";
import LocalidadesPage from "./pages/LocalidadesPage";
import SistemaJuventudPage from "./pages/SistemaJuventudPage";
import ComisionesPage from "./pages/ComisionesPage";
import IntegrantesPage from "./pages/IntegrantesPage";
import CumplimientoPage from "./pages/CumplimientoPage";
import MapaTerritorialPage from "./pages/MapaTerritorialPage";
import TimelinePage from "./pages/TimelinePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/normativa" element={<NormativaPage />} />
        <Route path="/transparencia" element={<TransparenciaPage />} />
        <Route path="/documentos" element={<DocumentosPage />} />
        <Route path="/participa" element={<ParticipaPage />} />
        <Route path="/localidades" element={<LocalidadesPage />} />
        <Route path="/sistema-juventud" element={<SistemaJuventudPage />} />
        <Route path="/comisiones" element={<ComisionesPage />} />
        <Route path="/integrantes" element={<IntegrantesPage />} />
        <Route path="/cumplimiento" element={<CumplimientoPage />} />
        <Route path="/mapa-territorial" element={<MapaTerritorialPage />} />
        <Route path="/historia" element={<TimelinePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
EOAPP

echo "==> Listo. Respaldo guardado en: $BACKUP_DIR"
echo "==> Ahora ejecuta: npm run build"
