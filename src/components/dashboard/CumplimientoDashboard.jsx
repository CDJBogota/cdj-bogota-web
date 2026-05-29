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
