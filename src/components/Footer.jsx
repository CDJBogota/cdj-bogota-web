import React from "react";
import LogoCDJ from "./LogoCDJ.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <LogoCDJ size="h-20" />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            Portal de participación, transparencia y seguimiento ciudadano del Consejo Distrital de Juventud de Bogotá D.C.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Navegación", "Inicio · Consejo · Comisiones · Localidades"],
            ["Transparencia", "Actas · Oficios · Informes · PQRSD"],
            ["Redes", "Instagram · X · Facebook · YouTube"],
          ].map(([title, text]) => (
            <div key={title}>
              <p className="font-black">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
