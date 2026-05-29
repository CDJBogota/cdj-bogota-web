import { useState } from "react";
import { Mail, Send, FileText, MessageCircle, X, Users } from "lucide-react";
import { Button } from "./ui.jsx";
import { mailtoLinks, correoInstitucional, correoEquipoJuventud } from "../data/links.js";

export default function FloatingPqrs() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-5 sm:right-5">
      {open && (
        <div className="mb-3 max-h-[75vh] w-[calc(100vw-2rem)] max-w-[360px] overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="bg-slate-950 p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">Canal rápido</p>
                <h3 className="mt-1 text-xl font-black">Participación y PQRSD juvenil</h3>
              </div>

              <button
                type="button"
                aria-label="Cerrar panel de participación"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Envía propuestas, solicitudes de información, alertas territoriales o consulta documentos del CDJ.
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

            <a href={mailtoLinks.equipoJuventud}>
              <Button variant="outline" className="w-full justify-start" style={{ borderColor: "#EE4C5B", color: "#EE4C5B" }}>
                <Users className="mr-2 h-4 w-4" />
                Equipo de Juventud SDG
              </Button>
            </a>

            <div className="rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
              Correo CDJ:<br />
              <b className="break-words">{correoInstitucional}</b>
              <br /><br />
              Equipo de Juventud SDG:<br />
              <b className="break-words">{correoEquipoJuventud}</b>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full bg-[#3871B7] px-4 py-3 text-sm font-black text-white shadow-2xl transition hover:scale-[1.02] sm:px-5 sm:py-4 sm:text-base"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Cerrar" : "Participa / PQRSD"}</span>
        <span className="sm:hidden">{open ? "Cerrar" : "PQRSD"}</span>
      </button>
    </div>
  );
}
