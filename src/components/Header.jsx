import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-5">
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <LogoCDJ />
        </Link>

        <div className="hidden items-center gap-4 text-sm font-bold text-slate-700 xl:flex">
          {navItems.map(([href, label]) => (
            <Link key={href} to={href} className="whitespace-nowrap hover:text-[#3871B7]">
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden xl:block">
          <Link to="/participa">
            <Button>Participa / PQRSD</Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-sm xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          Menú
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white shadow-xl xl:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
              Navegación
              <ChevronDown className="h-4 w-4" />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {navItems.map(([href, label]) => (
                <Link
                  key={href}
                  to={href}
                  onClick={closeMenu}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-800 transition hover:bg-white hover:text-[#3871B7] hover:shadow-sm"
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/participa"
                onClick={closeMenu}
                className="rounded-2xl bg-[#3871B7] px-4 py-3 font-black text-white transition hover:brightness-105 sm:col-span-2"
              >
                Participa / PQRSD
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
