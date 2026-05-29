import { Link } from "react-router-dom";
import LogoCDJ from "./LogoCDJ.jsx";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <LogoCDJ size="h-20" />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            Portal de participación, transparencia, memoria institucional y seguimiento ciudadano del Consejo Distrital de Juventud de Bogotá D.C.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-black">Consejo</p>
            <div className="mt-2 grid gap-2 text-sm text-slate-600">
              <Link to="/institucional">Qué es el CDJ</Link>
              <Link to="/integrantes">Integrantes</Link>
              <Link to="/comisiones">Comisiones</Link>
              <Link to="/sistema-juventud">Sistema de Juventud</Link>
            </div>
          </div>

          <div>
            <p className="font-black">Transparencia</p>
            <div className="mt-2 grid gap-2 text-sm text-slate-600">
              <Link to="/documentos">Documentos</Link>
              <Link to="/cumplimiento">Compromisos</Link>
              <Link to="/historia">Línea de tiempo</Link>
              <Link to="/transparencia">Archivo público</Link>
            </div>
          </div>

          <div>
            <p className="font-black">Territorio</p>
            <div className="mt-2 grid gap-2 text-sm text-slate-600">
              <Link to="/mapa-territorial">Mapa territorial</Link>
              <Link to="/localidades">Localidades</Link>
              <Link to="/participa#alerta-territorial">Enviar alerta</Link>
            </div>
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
