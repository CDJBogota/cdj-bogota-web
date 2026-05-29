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
