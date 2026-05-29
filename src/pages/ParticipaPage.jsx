import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { Card, CardContent, SectionLabel, Button, brand } from "../components/ui.jsx";
import { mailtoLinks, correoInstitucional, correoEquipoJuventud } from "../data/links.js";
import { Send, Mail, FileText, Users } from "lucide-react";

const acciones = [
  [Send, "Enviar propuesta", "Presenta una propuesta juvenil, territorial, sectorial o de política pública.", mailtoLinks.propuesta],
  [Mail, "Registrar PQRSD juvenil", "Envía petición, queja, reclamo, sugerencia, denuncia o solicitud de información.", mailtoLinks.pqrs],
  [FileText, "Solicitar documentos", "Pide actas, informes, comunicaciones o versiones públicas.", mailtoLinks.documentos],
  [Users, "Contactar Equipo de Juventud SDG", "Canal institucional de referencia de juventud de la Secretaría Distrital de Gobierno.", mailtoLinks.equipoJuventud],
];

export default function ParticipaPage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]">
      <Header />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionLabel>Participa</SectionLabel>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Envía propuestas, PQRSD, alertas territoriales o solicitudes de información
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            Esta página conecta a jóvenes, organizaciones, procesos juveniles, Consejos Locales y ciudadanía con el CDJ
            mediante canales formales y trazables.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {acciones.map(([Icon, title, text, href]) => (
            <Card key={title} className="transition hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-7">
                <Icon className="mb-5 h-9 w-9" style={{ color: brand.blue }} />
                <h2 className="text-2xl font-black">{title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{text}</p>
                <a href={href}>
                  <Button className="mt-6">Abrir formato por correo</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>Contacto formal</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Canales institucionales</h2>
            <div className="mt-8 space-y-3 text-slate-200">
              <div className="rounded-2xl bg-white/10 p-4"><b>CDJ Bogotá:</b> {correoInstitucional}</div>
              <div className="rounded-2xl bg-white/10 p-4"><b>Equipo de Juventud SDG:</b> {correoEquipoJuventud}</div>
            </div>
          </div>

          <div>
            <p className="mb-4 font-black">Redes oficiales</p>
            <SocialLinks dark />
          </div>
        </div>
      </section>

      <FloatingPqrs />
      <Footer />
    </main>
  );
}
