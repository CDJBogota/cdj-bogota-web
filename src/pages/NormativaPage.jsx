import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import { Card, CardContent, SectionLabel, StatusPill, Button, brand } from "../components/ui.jsx";
import { externalNormativaLinks, oneDriveLinks } from "../data/links.js";
import { ExternalLink, Scale, ScrollText, ShieldCheck, Landmark } from "lucide-react";

const normas = [
  ["Constitución Política de 1991", "Constitución", "Base superior de participación, democracia participativa, derechos fundamentales, función administrativa, control político y control social.", externalNormativaLinks.constitucion1991, "Nacional"],
  ["Ley 1622 de 2013", "Estatuto de Ciudadanía Juvenil", "Marco general de ciudadanía juvenil, derechos, sistema de juventudes y consejos de juventud.", externalNormativaLinks.ley1622, "Nacional"],
  ["Ley 1885 de 2018", "Reforma al Estatuto Juvenil", "Modifica la Ley 1622 de 2013 y fortalece reglas de Consejos de Juventud.", externalNormativaLinks.ley1885, "Nacional"],
  ["Ley 1755 de 2015", "Derecho de petición", "Regula el derecho fundamental de petición y términos de respuesta.", externalNormativaLinks.ley1755, "Nacional"],
  ["Ley 1712 de 2014", "Transparencia", "Acceso a información pública, publicidad activa y reservas legales.", externalNormativaLinks.ley1712, "Nacional"],
  ["Ley 1581 de 2012", "Protección de datos", "Tratamiento de datos personales y protección de información sensible.", externalNormativaLinks.ley1581, "Nacional"],
  ["Decreto Distrital 499 de 2011", "Sistema Distrital de Juventud", "Crea el Sistema Distrital de Juventud en Bogotá.", externalNormativaLinks.decreto499_2011, "Distrital"],
  ["Decreto Distrital 058 de 2022", "Apoyos e incentivos", "Organiza estímulos, incentivos y apoyos para consejeros/as de juventud.", externalNormativaLinks.decreto058_2022, "Distrital"],
  ["Decreto Distrital 614 de 2022", "Concertación y decisión", "Crea la Comisión Distrital de Concertación y Decisión en materia de juventud.", externalNormativaLinks.decreto614_2022, "Distrital"],
  ["Decreto Distrital 628 de 2025", "Actualización SDJ", "Actualiza el Sistema Distrital de Juventud y sus subsistemas.", externalNormativaLinks.decreto628_2025, "Distrital"],
  ["Sentencia C-484 de 2017", "Jurisprudencia", "Revisión constitucional relacionada con el Estatuto de Ciudadanía Juvenil.", externalNormativaLinks.sentenciaC4842017, "Jurisprudencia"],
  ["Directiva 08 de 2021", "Apoyo a Consejos", "Lineamientos nacionales de apoyo institucional a consejos de juventud.", externalNormativaLinks.directiva08_2021, "Nacional"],
];

export default function NormativaPage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]">
      <Header />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionLabel>Normativa y jurisprudencia</SectionLabel>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Marco jurídico del CDJ y del Sistema Distrital de Juventud
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            Consulta normas nacionales en el Gestor Normativo de Función Pública y normas distritales en Régimen Legal
            de Bogotá/SISJUR cuando correspondan a actos propios del Distrito Capital.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={oneDriveLinks.reglamentoInterno} target="_blank" rel="noreferrer">
              <Button>Reglamento Interno CDJ</Button>
            </a>
            <a href={oneDriveLinks.archivoGeneral} target="_blank" rel="noreferrer">
              <Button variant="outline" style={{ borderColor: brand.black, color: brand.black }}>
                Archivo documental OneDrive
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {normas.map(([titulo, tipo, descripcion, href, nivel]) => (
            <a key={titulo} href={href} target="_blank" rel="noreferrer" className="block">
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-7">
                  <Scale className="mb-5 h-8 w-8" style={{ color: brand.blue }} />
                  <div className="flex flex-wrap gap-2">
                    <StatusPill tone={nivel === "Distrital" ? "coral" : nivel === "Jurisprudencia" ? "blue" : "yellow"}>{nivel}</StatusPill>
                    <StatusPill tone="black">{tipo}</StatusPill>
                  </div>
                  <h2 className="mt-4 text-2xl font-black">{titulo}</h2>
                  <p className="mt-4 leading-7 text-slate-600">{descripcion}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-black" style={{ color: brand.blue }}>
                    Abrir fuente oficial <ExternalLink className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>Criterios de uso</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Cómo usar este marco jurídico en la gestión del CDJ
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [ScrollText, "Sustentar solicitudes", "Cada oficio, derecho de petición o propuesta debe identificar norma, competencia, responsable y petición concreta."],
              [ShieldCheck, "Proteger datos", "Actas y documentos públicos deben tener versiones públicas cuando contengan datos sensibles o información reservada."],
              [Landmark, "Diferenciar vocerías", "Distinguir posiciones personales, decisiones de plenaria, comunicaciones de trámite y vocerías autorizadas."],
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
