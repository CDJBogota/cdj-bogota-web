import { useEffect, useMemo, useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { documentos, tiposDocumento } from "../../data/documentos";
import DocumentCard from "./DocumentCard";

export default function DocumentSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [tipo, setTipo] = useState(searchParams.get("tipo") || "todos");
  const [anio, setAnio] = useState(searchParams.get("anio") || "todos");
  const [comision, setComision] = useState(searchParams.get("comision") || "todas");
  const [localidad, setLocalidad] = useState(searchParams.get("localidad") || "todas");
  const [versionPublica, setVersionPublica] = useState(searchParams.get("versionPublica") || "todas");

  const anios = [...new Set(documentos.map((doc) => doc.anio))].sort((a, b) => b - a);
  const comisiones = [...new Set(documentos.map((doc) => doc.comision))];
  const localidades = [...new Set(documentos.map((doc) => doc.localidad))];

  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    if (tipo !== "todos") params.tipo = tipo;
    if (anio !== "todos") params.anio = anio;
    if (comision !== "todas") params.comision = comision;
    if (localidad !== "todas") params.localidad = localidad;
    if (versionPublica !== "todas") params.versionPublica = versionPublica;
    setSearchParams(params, { replace: true });
  }, [query, tipo, anio, comision, localidad, versionPublica, setSearchParams]);

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

  function clearFilters() {
    setQuery("");
    setTipo("todos");
    setAnio("todos");
    setComision("todas");
    setLocalidad("todas");
    setVersionPublica("todas");
  }

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

          <select value={localidad} onChange={(e) => setLocalidad(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todas">Todas las localidades</option>
            {localidades.map((item) => <option key={item}>{item}</option>)}
          </select>

          <select value={versionPublica} onChange={(e) => setVersionPublica(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm">
            <option value="todas">Todas las versiones</option>
            <option value="true">Solo versión pública</option>
            <option value="false">No publicada</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-600">{filtrados.length} documento(s) encontrado(s)</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={clearFilters} className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-50">
            <RotateCcw className="mr-2 h-4 w-4" />
            Limpiar filtros
          </button>
          <a href="/participa#documento-no-publicado" className="rounded-2xl bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">
            Solicitar documento no publicado
          </a>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtrados.map((doc) => <DocumentCard key={doc.id} doc={doc} />)}
      </div>

      {filtrados.length === 0 && (
        <div className="rounded-[2rem] bg-white p-8 text-center text-slate-600">
          No hay documentos con esos filtros. Puedes solicitar su publicación o corrección documental.
        </div>
      )}
    </section>
  );
}
