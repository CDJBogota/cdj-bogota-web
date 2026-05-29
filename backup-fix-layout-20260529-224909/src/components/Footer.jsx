import LogoCDJ from "./LogoCDJ.jsx";
import SocialLinks from "./SocialLinks.jsx";

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

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="font-black">Navegación</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Inicio · Consejo · Marco jurídico · Localidades
            </p>
          </div>

          <div>
            <p className="font-black">Transparencia</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Actas · Oficios · Informes · PQRSD
            </p>
          </div>

          <div>
            <p className="font-black">Redes oficiales</p>
            <div className="mt-3">
              <SocialLinks compact />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
