import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import { brand, Card, CardContent, SectionLabel, StatusPill, Button } from "../components/ui.jsx";
import { Building2, Gavel, Network, Handshake, Eye, Radio, PenLine, ArrowRight } from "lucide-react";
import { oneDriveLinks } from "../data/links.js";

const organigrama = [
  ["Plenaria", "Máxima instancia de deliberación y decisión del Consejo."],
  ["Mesa Directiva", "Presidencia, Vicepresidencia y Secretaría."],
  ["Comisiones Permanentes", "Control y Veeduría; Comunicación y Asuntos Públicos; Planeación y Formulación."],
  ["Delegaciones", "Consejo Nacional de Juventud, Comisión Distrital de Concertación y otras instancias."],
  ["Sistema documental", "Archivo, correspondencia, actas, repositorio, versiones públicas y trazabilidad."],
];

const comisiones = [
  [Eye, "Control y Veeduría", "Seguimiento a políticas, compromisos, planes, programas y gestión pública dirigida a juventudes."],
  [Radio, "Comunicación y Asuntos Públicos", "Difusión, imagen institucional, comunicación pública y relacionamiento con actores sociales e institucionales."],
  [PenLine, "Planeación y Formulación", "Formulación de propuestas, documentos técnicos, planes de trabajo y rutas de incidencia."],
];

export default function InstitucionalPage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]">
      <Header />

      <section className="relative overflow-hidden bg-slate-50 py-20">
        <img src="/brand/isotipo-cdj.png" alt="" aria-hidden="true" className="pointer-events-none absolute right-[-80px] top-10 hidden w-[420px] opacity-10 lg:block" />
        <div className="relative mx-auto max-w-7xl px-5">
          <SectionLabel>Institucional</SectionLabel>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Consejo Distrital de Juventud de Bogotá D.C.
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            Instancia autónoma de participación, concertación, vigilancia, control social e interlocución de las juventudes
            del Distrito Capital frente a asuntos públicos que les afectan, interesan o conciernen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={oneDriveLinks.reglamentoInterno} target="_blank" rel="noreferrer">
              <Button>Ver Reglamento Interno <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </a>
            <a href={oneDriveLinks.archivoGeneral} target="_blank" rel="noreferrer">
              <Button variant="outline" style={{ borderColor: brand.black, color: brand.black }}>
                Archivo oficial OneDrive
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-3">
        <Card>
          <CardContent className="p-7">
            <StatusPill tone="blue">Misión</StatusPill>
            <h2 className="mt-4 text-2xl font-black">Representar e incidir</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Canalizar las propuestas, problemáticas y agendas de las juventudes de Bogotá para promover participación incidente,
              control social, articulación territorial y seguimiento verificable a la gestión pública.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-7">
            <StatusPill tone="yellow">Visión</StatusPill>
            <h2 className="mt-4 text-2xl font-black">Un CDJ con memoria pública</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Consolidar un Consejo transparente, plural, territorial y técnicamente sólido, capaz de transformar la participación
              juvenil en decisiones, compromisos, documentos, seguimiento y rendición de cuentas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-7">
            <StatusPill tone="coral">Principios</StatusPill>
            <h2 className="mt-4 text-2xl font-black">Autonomía y pluralismo</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Autonomía, coordinación, concertación, pluralidad, democracia interna, derecho al disenso, transparencia,
              enfoque diferencial, protección de datos y trazabilidad documental.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>Organigrama funcional</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Estructura interna para deliberar, decidir, documentar y hacer seguimiento
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {organigrama.map(([title, text], i) => (
              <div key={title} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl font-black" style={{ background: [brand.yellow, brand.coral, brand.turquoise, brand.blue, brand.pink][i], color: i === 0 || i === 2 ? brand.black : brand.white }}>
                  {i + 1}
                </div>
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionLabel>Comisiones permanentes</SectionLabel>
        <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Trabajo interno del Consejo</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {comisiones.map(([Icon, title, text]) => (
            <Card key={title}>
              <CardContent className="p-7">
                <Icon className="mb-5 h-9 w-9" style={{ color: brand.blue }} />
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <FloatingPqrs />
      <Footer />
    </main>
  );
}
