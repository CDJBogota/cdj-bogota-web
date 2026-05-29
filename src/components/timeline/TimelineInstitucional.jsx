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
