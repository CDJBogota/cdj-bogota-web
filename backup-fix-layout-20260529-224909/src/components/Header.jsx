import { Link, NavLink } from "react-router-dom";
import LogoCDJ from "./LogoCDJ";
import { mainNav, participaMenu, transparenciaMenu } from "../data/navigation";

function navClass({ isActive }) {
  return `text-sm font-black transition hover:text-[#3871B7] ${isActive ? "text-[#3871B7]" : "text-slate-700"}`;
}

function Dropdown({ label, items }) {
  return (
    <div className="group relative">
      <button className="text-sm font-black text-slate-700 transition hover:text-[#3871B7]">
        {label}
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-72 translate-y-2 rounded-3xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => (
          <Link key={item.href} to={item.href} className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#3871B7]">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const visibleNav = mainNav.filter((item) => !["Transparencia", "Participa"].includes(item.label));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="Ir al inicio">
          <LogoCDJ />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {visibleNav.map((item) => (
            <NavLink key={item.href} to={item.href} className={navClass}>
              {item.label}
            </NavLink>
          ))}
          <Dropdown label="Transparencia" items={transparenciaMenu} />
          <Dropdown label="Participa" items={participaMenu} />
        </div>

        <Link to="/participa" className="rounded-2xl bg-[#3871B7] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#2f609d]">
          Radicar / Participar
        </Link>
      </nav>
    </header>
  );
}
