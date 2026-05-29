import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import { Card, CardContent, SectionLabel, StatusPill, brand } from "../components/ui.jsx";
import { cljEmails, localidadMailto } from "../data/links.js";
import { Mail, MapPinned } from "lucide-react";

const localidades = Object.keys(cljEmails);

export default function LocalidadesPage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]">
      <Header />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionLabel>Consejos Locales de Juventud</SectionLabel>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Contacto territorial por localidades
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            Directorio de correos institucionales de los Consejos Locales de Juventud de Bogotá para solicitudes,
            articulación territorial, alertas, propuestas y seguimiento local.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {localidades.map((loc, i) => (
            <a key={loc} href={localidadMailto(loc)} className="block">
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <MapPinned className="h-6 w-6" style={{ color: brand.blue }} />
                    <StatusPill tone="yellow">CLJ</StatusPill>
                  </div>
                  <h2 className="text-xl font-black">{loc}</h2>
                  <p className="mt-3 break-words text-sm leading-6 text-slate-600">{cljEmails[loc]}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-black" style={{ color: brand.blue }}>
                    <Mail className="h-4 w-4" />
                    Contactar CLJ
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <FloatingPqrs />
      <Footer />
    </main>
  );
}
