import React from "react";
import { ExternalLink } from "lucide-react";
import { socialLinks } from "../data/links.js";
import { StatusPill } from "./ui.jsx";

export default function SocialLinks({ compact = false, dark = false }) {
  return (
    <div className={compact ? "flex flex-wrap gap-2" : "grid gap-3"}>
      {socialLinks.map((item) => {
        const disabled = item.status === "pendiente";
        return (
          <a
            key={item.name}
            href={item.href}
            target={disabled ? undefined : "_blank"}
            rel={disabled ? undefined : "noreferrer"}
            className={[
              "group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-bold transition",
              compact ? "w-auto" : "w-full",
              dark
                ? "border-white/15 bg-white/10 text-white hover:bg-white/15"
                : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white hover:shadow-sm",
              disabled ? "opacity-65" : "",
            ].join(" ")}
          >
            <span>
              {item.name}
              {!compact && <span className="ml-2 font-normal text-slate-500">{item.handle}</span>}
            </span>
            {disabled ? <StatusPill tone="yellow">Pronto</StatusPill> : <ExternalLink className="h-4 w-4" />}
          </a>
        );
      })}
    </div>
  );
}
