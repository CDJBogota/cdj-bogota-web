import React from "react";
import { Button } from "./ui.jsx";
import LogoCDJ from "./LogoCDJ.jsx";

const navItems = [
  ["/", "Inicio"],
  ["/institucional", "Institucional"],
  ["/normativa", "Normativa"],
  ["/transparencia", "Transparencia"],
  ["/localidades", "Localidades"],
  ["/participa", "Participa"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <LogoCDJ />
        <div className="hidden items-center gap-5 text-sm font-bold text-slate-700 xl:flex">
          {navItems.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-[#3871B7]">
              {label}
            </a>
          ))}
        </div>
        <a href="/participa">
          <Button>Participa / PQRSD</Button>
        </a>
      </nav>
    </header>
  );
}
