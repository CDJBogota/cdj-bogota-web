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
