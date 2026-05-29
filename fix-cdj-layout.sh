#!/usr/bin/env bash
set -e

echo "==> Creando respaldo de seguridad..."
STAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="backup-fix-layout-$STAMP"
mkdir -p "$BACKUP_DIR"

backup_file () {
  if [ -f "$1" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$1")"
    cp "$1" "$BACKUP_DIR/$1"
  fi
}

backup_file src/App.jsx
backup_file src/components/Header.jsx
backup_file src/components/Footer.jsx
backup_file src/components/ui.jsx
backup_file src/components/FloatingPqrs.jsx

for f in src/pages/*.jsx; do
  backup_file "$f"
done

echo "==> Corrigiendo App.jsx para tener Header, Footer y FloatingPqrs una sola vez..."
cat > src/App.jsx <<'EOAPP'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingPqrs from "./components/FloatingPqrs";

import HomePage from "./pages/HomePage";
import InstitucionalPage from "./pages/InstitucionalPage";
import NormativaPage from "./pages/NormativaPage";
import TransparenciaPage from "./pages/TransparenciaPage";
import DocumentosPage from "./pages/DocumentosPage";
import ParticipaPage from "./pages/ParticipaPage";
import LocalidadesPage from "./pages/LocalidadesPage";
import SistemaJuventudPage from "./pages/SistemaJuventudPage";
import ComisionesPage from "./pages/ComisionesPage";
import IntegrantesPage from "./pages/IntegrantesPage";
import CumplimientoPage from "./pages/CumplimientoPage";
import MapaTerritorialPage from "./pages/MapaTerritorialPage";
import TimelinePage from "./pages/TimelinePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/normativa" element={<NormativaPage />} />
        <Route path="/transparencia" element={<TransparenciaPage />} />
        <Route path="/documentos" element={<DocumentosPage />} />
        <Route path="/participa" element={<ParticipaPage />} />
        <Route path="/localidades" element={<LocalidadesPage />} />
        <Route path="/sistema-juventud" element={<SistemaJuventudPage />} />
        <Route path="/comisiones" element={<ComisionesPage />} />
        <Route path="/integrantes" element={<IntegrantesPage />} />
        <Route path="/cumplimiento" element={<CumplimientoPage />} />
        <Route path="/mapa-territorial" element={<MapaTerritorialPage />} />
        <Route path="/historia" element={<TimelinePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <FloatingPqrs />
    </BrowserRouter>
  );
}
EOAPP

echo "==> Corrigiendo Header con menú móvil, menús desplegables y botón destacado..."
cat > src/components/Header.jsx <<'EOHEADER'
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
EOHEADER

echo "==> Corrigiendo Button para que pueda renderizar enlaces reales sin HTML inválido..."
cat > src/components/ui.jsx <<'EOUI'
export const brand = {
  yellow: "#FBD416",
  coral: "#EE4C5B",
  turquoise: "#57C5CE",
  blue: "#3871B7",
  orange: "#F8A72C",
  pink: "#E5579D",
  black: "#2B2B2B",
  gray: "#545454",
  light: "#E7E3DF",
  white: "#FFFFFF",
};

export function Button({
  children,
  variant = "solid",
  className = "",
  style = {},
  href,
  target,
  rel,
  type = "button",
  ...props
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-3 text-sm font-black transition active:scale-[0.98] sm:px-5 sm:text-base";

  const variants = {
    solid: "bg-[#3871B7] text-white shadow-lg shadow-blue-900/10 hover:brightness-105",
    outline: "border bg-white hover:bg-slate-50",
    ghost: "hover:bg-slate-100",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noreferrer" : undefined)}
        className={classes}
        style={style}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} style={style} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function SectionLabel({ children }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.blue }}>
      {children}
    </p>
  );
}

export function StatusPill({ children, tone = "blue" }) {
  const map = {
    blue: brand.blue,
    coral: brand.coral,
    yellow: brand.yellow,
    turquoise: brand.turquoise,
    black: brand.black,
  };
  const bg = map[tone] || brand.blue;
  const text = tone === "yellow" || tone === "turquoise" ? brand.black : brand.white;

  return (
    <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: bg, color: text }}>
      {children}
    </span>
  );
}

export function InfoCard({ icon: Icon, title, text, tag }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: brand.light }}>
            <Icon className="h-6 w-6" style={{ color: brand.blue }} />
          </div>
          {tag && <StatusPill tone="yellow">{tag}</StatusPill>}
        </div>
        <h3 className="text-xl font-black">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
      </CardContent>
    </Card>
  );
}
EOUI

echo "==> Limpiando páginas que tenían Header/Footer/FloatingPqrs duplicados..."
python3 <<'PY'
from pathlib import Path
import re

pages = Path("src/pages")

for path in pages.glob("*.jsx"):
    text = path.read_text(encoding="utf-8")

    text = re.sub(r'import Header from "\.\./components/Header\.jsx";\n', "", text)
    text = re.sub(r'import Footer from "\.\./components/Footer\.jsx";\n', "", text)
    text = re.sub(r'import FloatingPqrs from "\.\./components/FloatingPqrs\.jsx";\n', "", text)

    text = re.sub(r'\n\s*<Header />\n', "\n", text)
    text = re.sub(r'\n\s*<Footer />\n', "\n", text)
    text = re.sub(r'\n\s*<FloatingPqrs />\n', "\n", text)

    # Convierte <a ...><Button ...>...</Button></a> en <Button ... href=...>...</Button>
    # para evitar HTML inválido de enlaces que contienen botones.
    pattern = re.compile(r'<a\s+([^>]+)>\s*<Button([^>]*)>(.*?)</Button>\s*</a>', re.DOTALL)

    def repl(match):
        a_attrs = match.group(1).strip()
        button_attrs = match.group(2).strip()
        children = match.group(3)
        attrs = " ".join(part for part in [button_attrs, a_attrs] if part).strip()
        return f"<Button {attrs}>{children}</Button>"

    text = pattern.sub(repl, text)

    path.write_text(text, encoding="utf-8")
PY

echo "==> Corrigiendo FloatingPqrs para usar Button como enlace, no botón dentro de enlace..."
python3 <<'PY'
from pathlib import Path
import re

path = Path("src/components/FloatingPqrs.jsx")
text = path.read_text(encoding="utf-8")

pattern = re.compile(r'<a\s+([^>]+)>\s*<Button([^>]*)>(.*?)</Button>\s*</a>', re.DOTALL)

def repl(match):
    a_attrs = match.group(1).strip()
    button_attrs = match.group(2).strip()
    children = match.group(3)
    attrs = " ".join(part for part in [button_attrs, a_attrs] if part).strip()
    return f"<Button {attrs}>{children}</Button>"

text = pattern.sub(repl, text)
path.write_text(text, encoding="utf-8")
PY

echo "==> Mejorando Footer para incluir las rutas nuevas..."
cat > src/components/Footer.jsx <<'EOFOOTER'
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
EOFOOTER

echo "==> Revisión rápida de duplicados..."
echo "Páginas que todavía importan Header/Footer/FloatingPqrs:"
grep -R "import Header\|import Footer\|import FloatingPqrs" src/pages || true

echo "Uso duplicado de Header/Footer/FloatingPqrs en páginas:"
grep -R "<Header />\|<Footer />\|<FloatingPqrs />" src/pages || true

echo "Botones dentro de enlaces:"
grep -R "<a .*<Button\|<a.*$" src/components src/pages | grep Button || true

echo "==> Compilando..."
npm run build

echo "==> Corrección terminada. Respaldo en: $BACKUP_DIR"
