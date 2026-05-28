import React from "react";
import { Mail, Send, FileText, MessageCircle, X } from "lucide-react";
import { Button } from "./ui.jsx";
import { mailtoLinks, correoInstitucional } from "../data/links.js";

export default function FloatingPqrs() {
  return (
    <details className="group fixed bottom-5 right-5 z-[60]">
      <summary className="list-none">
        <div className="flex cursor-pointer items-center gap-2 rounded-full bg-[#3871B7] px-5 py-4 font-black text-white shadow-2xl transition hover:scale-[1.02]">
          <MessageCircle className="h-5 w-5" />
          Participa / PQRSD
        </div>
      </summary>

      <div className="absolute bottom-16 right-0 w-[330px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="bg-slate-950 p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">Canal rápido</p>
              <h3 className="mt-1 text-xl font-black">Participación y PQRSD juvenil</h3>
            </div>
            <X className="hidden h-5 w-5 opacity-60 group-open:block" />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Usa estas rutas para enviar propuestas, solicitudes de información, alertas territoriales o pedir documentos.
          </p>
        </div>

        <div className="grid gap-3 p-4">
          <a href={mailtoLinks.propuesta}>
            <Button className="w-full justify-start">
              <Send className="mr-2 h-4 w-4" />
              Enviar propuesta
            </Button>
          </a>

          <a href={mailtoLinks.pqrs}>
            <Button variant="outline" className="w-full justify-start" style={{ borderColor: "#3871B7", color: "#3871B7" }}>
              <Mail className="mr-2 h-4 w-4" />
              Registrar PQRSD juvenil
            </Button>
          </a>

          <a href={mailtoLinks.documentos}>
            <Button variant="outline" className="w-full justify-start" style={{ borderColor: "#2B2B2B", color: "#2B2B2B" }}>
              <FileText className="mr-2 h-4 w-4" />
              Solicitar documentos
            </Button>
          </a>

          <div className="rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            Correo institucional:<br />
            <b>{correoInstitucional}</b>
          </div>
        </div>
      </div>
    </details>
  );
}
