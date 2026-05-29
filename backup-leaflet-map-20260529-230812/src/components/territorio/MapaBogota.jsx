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
