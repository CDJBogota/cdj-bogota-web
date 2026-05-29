import { Link } from "react-router-dom";
import { Button } from "./ui.jsx";
import LogoCDJ from "./LogoCDJ.jsx";

const navItems = [
  ["/", "Inicio"],
  ["/institucional", "Institucional"],
  ["/sistema-juventud", "Sistema"],
  ["/normativa", "Normativa"],
  ["/transparencia", "Transparencia"],
  ["/documentos", "Documentos"],
  ["/comisiones", "Comisiones"],
  ["/localidades", "Localidades"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
        <Link to="/">
          <LogoCDJ />
        </Link>

        <div className="hidden items-center gap-4 text-sm font-bold text-slate-700 xl:flex">
          {navItems.map(([href, label]) => (
            <Link key={href} to={href} className="hover:text-[#3871B7]">
              {label}
            </Link>
          ))}
        </div>

        <Link to="/participa">
          <Button>Participa / PQRSD</Button>
        </Link>
      </nav>
    </header>
  );
}
