import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import LogoCDJ from "./LogoCDJ";
import { mainNav, participaMenu, transparenciaMenu, territorioMenu } from "../data/navigation";

function navClass({ isActive }) {
  return `text-sm font-black transition hover:text-[#3871B7] ${
    isActive ? "text-[#3871B7]" : "text-slate-700"
  }`;
}

function DesktopDropdown({ label, items }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-black text-slate-700 transition hover:text-[#3871B7]"
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>

      <div className="invisible absolute left-0 top-full z-50 min-w-80 translate-y-2 rounded-3xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#3871B7]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileSection({ title, items, onNavigate }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-white p-3">
      <summary className="cursor-pointer list-none font-black text-slate-950">
        <span className="inline-flex w-full items-center justify-between">
          {title}
          <ChevronDown className="h-4 w-4" />
        </span>
      </summary>

      <div className="mt-3 grid gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className="rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#3871B7]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const simpleNav = mainNav.filter(
    (item) => !["Transparencia", "Participa", "Territorio"].includes(item.label)
  );

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" aria-label="Ir al inicio" onClick={closeMenu}>
          <LogoCDJ size="h-12 sm:h-14" />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {simpleNav.map((item) => (
            <NavLink key={item.href} to={item.href} className={navClass}>
              {item.label}
            </NavLink>
          ))}

          <DesktopDropdown label="Territorio" items={territorioMenu} />
          <DesktopDropdown label="Transparencia" items={transparenciaMenu} />
          <DesktopDropdown label="Participa" items={participaMenu} />
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/participa"
            className="hidden rounded-2xl bg-[#3871B7] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#2f609d] sm:inline-flex"
          >
            Radicar / Participar
          </Link>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-950 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {simpleNav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-black ${
                    isActive ? "bg-white text-[#3871B7]" : "text-slate-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <MobileSection title="Territorio" items={territorioMenu} onNavigate={closeMenu} />
            <MobileSection title="Transparencia" items={transparenciaMenu} onNavigate={closeMenu} />
            <MobileSection title="Participa" items={participaMenu} onNavigate={closeMenu} />

            <Link
              to="/participa"
              onClick={closeMenu}
              className="mt-2 rounded-2xl bg-[#3871B7] px-4 py-3 text-center text-sm font-black text-white"
            >
              Radicar / Participar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
