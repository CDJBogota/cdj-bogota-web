import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import { Card, CardContent, SectionLabel, StatusPill, Button, brand } from "../components/ui.jsx";
import { oneDriveLinks, mailtoLinks } from "../data/links.js";
import { Archive, FileText, ClipboardList, Mail, ExternalLink, ShieldCheck } from "lucide-react";

const bloques = [
  ["Reglamento interno", "Norma interna de organización y funcionamiento.", oneDriveLinks.reglamentoInterno, "Vigente"],
  ["Archivo oficial OneDrive", "Carpeta documental institucional del CDJ.", oneDriveLinks.archivoGeneral, "Repositorio"],
  ["Actas y decisiones", "Actas de plenaria, comisiones, constancias y decisiones.", oneDriveLinks.archivoGeneral, "Publicación"],
  ["Correspondencia", "Oficios enviados, recibidos, radicados y respuestas.", oneDriveLinks.archivoGeneral, "Trazabilidad"],
  ["Informes semestrales", "Rendición de cuentas, avances y compromisos.", oneDriveLinks.archivoGeneral, "Rendición"],
  ["Solicitud de documentos", "Solicita documentos o versiones públicas al correo institucional.", mailtoLinks.documentos, "Solicitud"],
];

export default function TransparenciaPage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]">
      <Header />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionLabel>Transparencia activa</SectionLabel>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Archivo público, trazabilidad y versiones públicas
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            Consulta el repositorio oficial del CDJ, reglamento interno, actas, informes, correspondencia y documentos
            sujetos a publicidad, reserva o versión pública.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bloques.map(([title, text, href, tag]) => (
            <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="block">
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-7">
                  <Archive className="mb-5 h-8 w-8" style={{ color: brand.blue }} />
                  <StatusPill tone="yellow">{tag}</StatusPill>
                  <h2 className="mt-4 text-2xl font-black">{title}</h2>
                  <p className="mt-4 leading-7 text-slate-600">{text}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-black" style={{ color: brand.blue }}>
                    Abrir recurso <ExternalLink className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>Reglas del archivo</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Publicar con trazabilidad, pero protegiendo datos personales
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [FileText, "Consecutivos y fechas", "Cada comunicación debe tener fecha, asunto, responsable y soporte de aprobación."],
              [ClipboardList, "Seguimiento", "Cada compromiso debe tener entidad, responsable, plazo, estado y soporte de cierre."],
              [ShieldCheck, "Versiones públicas", "Los documentos con datos sensibles deben publicarse con supresión o reserva cuando corresponda."],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
                <Icon className="mb-5 h-9 w-9" style={{ color: brand.yellow }} />
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingPqrs />
      <Footer />
    </main>
  );
}
