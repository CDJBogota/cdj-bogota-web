import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import { brand, Card, CardContent, SectionLabel, StatusPill, Button } from "../components/ui.jsx";
import { Handshake, Eye, Radio, PenLine, ArrowRight, Users, Landmark, GitBranch } from "lucide-react";
import { oneDriveLinks, externalNormativaLinks } from "../data/links.js";

const estructuraCDJ = [
  ["Plenaria", "Máxima instancia interna de deliberación y decisión del Consejo Distrital de Juventud."],
  ["Mesa Directiva", "Presidencia, Vicepresidencia y Secretaría. Ordena, convoca, coordina y garantiza trazabilidad."],
  ["Comisiones Permanentes", "Control y Veeduría; Comunicación y Asuntos Públicos; Planeación y Formulación."],
  ["Comisiones Accidentales", "Equipos temporales para asuntos específicos, coyunturales o de seguimiento."],
  ["Delegaciones", "Representaciones ante instancias distritales, nacionales o espacios donde se traten asuntos juveniles."],
  ["Archivo y Secretaría Técnica Interna", "Actas, correspondencia, versiones públicas, repositorio documental, PQRSD y empalme."],
];

const subsistemas = [
  {
    icon: Users,
    title: "Subsistema de Participación de las Juventudes",
    place: "Aquí se ubica el Consejo Distrital de Juventud",
    text: "Incluye actores, instancias, mecanismos, procesos y agendas propias de las juventudes. Según el Estatuto, se expresa a través de asambleas, plataformas y consejos de juventud.",
    items: ["Consejos Locales de Juventud", "Consejo Distrital de Juventud", "Plataformas juveniles", "Asambleas de juventud", "Procesos y prácticas organizativas"],
  },
  {
    icon: Landmark,
    title: "Subsistema Institucional de Juventudes",
    place: "Entidades, sectores y administración distrital",
    text: "Agrupa entidades públicas, sectores administrativos, alcaldías locales, programas, presupuestos y responsables institucionales de la garantía de derechos de las juventudes.",
    items: ["Secretaría Distrital de Gobierno", "IDPAC", "Secretaría de Integración Social", "Alcaldías Locales", "Sectores administrativos distritales"],
  },
  {
    icon: Handshake,
    title: "Concertación, coordinación y decisión",
    place: "Puente entre participación e institucionalidad",
    text: "Espacios de interlocución, coordinación y concertación donde las agendas juveniles se transforman en compromisos, planes, seguimiento e incidencia pública.",
    items: ["Comisión Distrital de Concertación y Decisión", "Mesas de trabajo", "Interlocuciones con Alcaldía", "Audiencias públicas", "Seguimiento a compromisos"],
  },
];

const comisiones = [
  [Eye, "Control y Veeduría", "Seguimiento a políticas, compromisos, planes, programas y gestión pública dirigida a juventudes."],
  [Radio, "Comunicación y Asuntos Públicos", "Difusión, imagen institucional, comunicación pública y relacionamiento con actores sociales e institucionales."],
  [PenLine, "Planeación y Formulación", "Formulación de propuestas, documentos técnicos, planes de trabajo y rutas de incidencia."],
];

const normasSistema = [
  ["Ley 1622 de 2013", "Estatuto de Ciudadanía Juvenil y Sistema Nacional de Juventudes.", externalNormativaLinks.ley1622],
  ["Ley 1885 de 2018", "Reforma el Estatuto y fortalece reglas de Consejos de Juventud.", externalNormativaLinks.ley1885],
  ["Decreto Distrital 499 de 2011", "Crea el Sistema Distrital de Juventud en Bogotá.", externalNormativaLinks.decreto499_2011],
  ["Decreto Distrital 058 de 2022", "Organiza estímulos, incentivos y apoyos para consejeros/as de juventud.", externalNormativaLinks.decreto058_2022],
  ["Decreto Distrital 614 de 2022", "Crea la Comisión Distrital de Concertación y Decisión en materia de juventud.", externalNormativaLinks.decreto614_2022],
  ["Decreto Distrital 628 de 2025", "Actualiza el Sistema Distrital de Juventud y sus subsistemas.", externalNormativaLinks.decreto628_2025],
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
            Qué es el Consejo Distrital de Juventud
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            El CDJ Bogotá es una instancia autónoma de participación, concertación, vigilancia, control social e interlocución
            de las juventudes del Distrito Capital. Hace parte del Subsistema de Participación de las Juventudes dentro del
            Sistema Distrital de Juventud.
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
              Canalizar propuestas, problemáticas y agendas de las juventudes de Bogotá para promover participación incidente,
              control social, articulación territorial y seguimiento verificable.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-7">
            <StatusPill tone="yellow">Visión</StatusPill>
            <h2 className="mt-4 text-2xl font-black">Memoria pública juvenil</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Consolidar un Consejo transparente, plural, territorial y técnicamente sólido, capaz de convertir participación
              juvenil en decisiones, compromisos y rendición de cuentas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-7">
            <StatusPill tone="coral">Principios</StatusPill>
            <h2 className="mt-4 text-2xl font-black">Autonomía y pluralismo</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Autonomía, coordinación, concertación, pluralidad, democracia interna, transparencia, enfoque diferencial,
              derecho al disenso, protección de datos y trazabilidad documental.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>
            Estructura interna del CDJ
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Cómo se organiza internamente el Consejo
          </h2>
          <p className="mt-5 max-w-4xl leading-8 text-slate-300">
            Esta estructura corresponde al funcionamiento propio del CDJ: deliberar, decidir, documentar, hacer seguimiento,
            comunicar y representar.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {estructuraCDJ.map(([title, text], i) => (
              <div key={title} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl font-black" style={{ background: [brand.yellow, brand.coral, brand.turquoise, brand.blue, brand.pink, brand.orange][i], color: i === 0 || i === 2 || i === 5 ? brand.black : brand.white }}>
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
        <SectionLabel>Sistema Distrital de Juventud</SectionLabel>
        <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
          Dónde se ubica el CDJ dentro del Sistema Distrital
        </h2>
        <p className="mt-5 max-w-4xl leading-8 text-slate-600">
          El Sistema Distrital de Juventud articula participación juvenil, institucionalidad, coordinación, gestión,
          seguimiento y evaluación de la política pública de juventud. El CDJ no es una entidad administrativa:
          está en el Subsistema de Participación de las Juventudes.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {subsistemas.map(({ icon: Icon, title, place, text, items }, i) => (
            <Card key={title} className={i === 0 ? "border-2 border-[#3871B7] shadow-xl" : ""}>
              <CardContent className="p-7">
                <Icon className="mb-5 h-10 w-10" style={{ color: i === 0 ? brand.blue : brand.gray }} />
                <StatusPill tone={i === 0 ? "blue" : "yellow"}>{place}</StatusPill>
                <h3 className="mt-4 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{text}</p>
                <div className="mt-5 space-y-2">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                      <GitBranch className="mt-1 h-4 w-4 shrink-0" style={{ color: brand.blue }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: brand.light }}>
        <div className="mx-auto max-w-7xl px-5">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionLabel>Normas que regulan el sistema y el consejo</SectionLabel>
        <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
          Base normativa de organización, apoyo, participación y concertación
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {normasSistema.map(([title, text, href]) => (
            <a key={title} href={href} target="_blank" rel="noreferrer" className="block">
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6">
                  <Landmark className="mb-4 h-8 w-8" style={{ color: brand.blue }} />
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                  <p className="mt-4 text-sm font-black" style={{ color: brand.blue }}>Abrir fuente oficial</p>
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
