import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import { brand, Card, CardContent, SectionLabel, StatusPill } from "../components/ui.jsx";
import { oneDriveLinks, mailtoLinks } from "../data/links.js";
import { Archive, ExternalLink, FileText, FolderOpen, ShieldCheck } from "lucide-react";

const categorias = [
  ["Reglamento interno", "Norma interna vigente del CDJ.", oneDriveLinks.reglamentoInterno, "Vigente"],
  ["Archivo general OneDrive", "Repositorio documental oficial del Consejo.", oneDriveLinks.archivoGeneral, "Repositorio"],
  ["Actas", "Actas de plenaria, comisiones permanentes y accidentales.", oneDriveLinks.archivoGeneral, "Publicación"],
  ["Correspondencia", "Oficios enviados, recibidos, respuestas y radicados.", oneDriveLinks.archivoGeneral, "Trazabilidad"],
  ["Informes", "Informes semestrales, balances de gestión y rendición de cuentas.", oneDriveLinks.archivoGeneral, "Rendición"],
  ["Solicitud documental", "Pide documentos o versiones públicas al correo institucional.", mailtoLinks.documentos, "Solicitud"],
];

export default function DocumentosPage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]">
      <Header />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionLabel>Documentos</SectionLabel>
          <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
            Biblioteca documental del Consejo
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            Consulta documentos internos, actas, correspondencia, informes, reglamento y repositorio institucional.
            Cuando un documento tenga datos protegidos debe publicarse versión pública.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categorias.map(([titulo, descripcion, href, estado]) => (
            <a key={titulo} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="block">
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-7">
                  <FolderOpen className="mb-5 h-9 w-9" style={{ color: brand.blue }} />
                  <StatusPill tone={estado === "Vigente" ? "blue" : "yellow"}>{estado}</StatusPill>
                  <h2 className="mt-4 text-2xl font-black">{titulo}</h2>
                  <p className="mt-4 leading-7 text-slate-600">{descripcion}</p>
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
          <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>
            Criterios documentales
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Publicidad, reserva y trazabilidad
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [Archive, "Archivo organizado", "Cada documento debe tener fecha, asunto, consecutivo, responsable y ubicación."],
              [FileText, "Versión pública", "Cuando haya datos personales o información reservada se debe publicar una versión depurada."],
              [ShieldCheck, "Protección de datos", "La publicidad activa debe equilibrarse con reserva legal y protección de información sensible."],
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
