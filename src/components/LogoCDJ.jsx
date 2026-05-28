import React from "react";

export default function LogoCDJ({ size = "h-24" }) {
  return (
    <a href="#inicio" className="flex items-center gap-3">
      <img
        src="/brand/logo-horizontal.png"
        alt="Consejo Distrital de Juventud de Bogotá D.C."
        className={`${size} w-auto object-contain`}
      />
    </a>
  );
}
