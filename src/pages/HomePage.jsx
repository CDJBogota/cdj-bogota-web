import { motion } from "framer-motion";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { brand, Button, Card, CardContent, SectionLabel, StatusPill } from "../components/ui.jsx";
import { oneDriveLinks } from "../data/links.js";
import {
  Search,
  Send,
  ClipboardList,
  ArrowRight,
  Building2,
  Scale,
  Archive,
  MapPinned,
  MessageCircle,
} from "lucide-react";

const indicadores = [
  { label: "Localidades articuladas", value: "20", detail: "Consejos Locales de Juventud y representación territorial." },
  { label: "Comisiones permanentes", value: "3", detail: "Control, comunicaciones y planeación/formulación." },
  { label: "Archivo oficial", value: "OneDrive", detail: "Repositorio institucional del CDJ." },
  { label: "Audiencias públicas", value: "2/año", detail: "Informes semestrales y rendición de cuentas." },
];

const accesos = [
  {
    icon: Building2,
    title: "Institucional",
    text: "Qué es el CDJ, misión, visión, estructura interna, comisiones y ubicación dentro del Sistema Distrital de Juventud.",
    href: "/institucional",
    tag: "Consejo",
  },
  {
    icon: Scale,
    title: "Normativa",
    text: "Constitución, Estatuto de Ciudadanía Juvenil, decretos distritales, transparencia, datos y jurisprudencia.",
    href: "/normativa",
    tag: "Marco jurídico",
  },
  {
    icon: Users,
    title: "Sistema de Juventud",
    text: "Del Sistema Nacional de Juventudes al Sistema Distrital, el Subsistema de Participación, el CDJ y los CLJ.",
    href: "/sistema-juventud",
    tag: "Sistema",
  },
  {
    icon: Archive,
    title: "Transparencia",
    text: "Reglamento interno, archivo oficial, actas, informes, correspondencia y versiones públicas.",
    href: "/transparencia",
    tag: "Archivo",
  },
  {
    icon: MessageCircle,
    title: "Participa",
    text: "Envía propuestas, PQRSD juvenil, alertas territoriales o solicitudes de documentos.",
    href: "/participa",
    tag: "Ciudadanía",
  },
  {
    icon: MapPinned,
    title: "Localidades",
    text: "Directorio de Consejos Locales de Juventud y correos institucionales por localidad.",
    href: "/localidades",
    tag: "Territorio",
  },
  {
    icon: ClipboardList,
    title: "Documentos",
    text: "Biblioteca documental del CDJ: reglamento, actas, informes, correspondencia y archivo oficial.",
    href: "/documentos",
    tag: "Archivo",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]" style={{ fontFamily: "Inter, Arial, sans-serif" }}>
      <Header />

      <section id="inicio" className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 8% 15%, ${brand.yellow}55, transparent 26%), radial-gradient(circle at 92% 12%, ${brand.coral}44, transparent 28%), radial-gradient(circle at 55% 90%, ${brand.turquoise}44, transparent 32%), linear-gradient(135deg, #ffffff, #f8fafc)`,
          }}
        />
        <img
          src="/brand/isotipo-cdj.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-80px] top-20 hidden w-[420px] opacity-10 lg:block"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 flex flex-wrap gap-2">
              <StatusPill tone="yellow">Autonomía juvenil</StatusPill>
              <StatusPill tone="blue">Control social</StatusPill>
              <StatusPill tone="coral">Participación incidente</StatusPill>
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              Consejo Distrital de Juventud de Bogotá D.C.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Portal público para participación juvenil, transparencia, archivo documental, interlocución institucional
              y seguimiento ciudadano a compromisos con las juventudes de Bogotá.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/participa">
                <Button className="px-6 py-4 text-base">
                  Participa / PQRSD <Send className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href={oneDriveLinks.archivoGeneral} target="_blank" rel="noreferrer">
                <Button variant="outline" className="px-6 py-4 text-base" style={{ borderColor: brand.black, color: brand.black }}>
                  Archivo oficial OneDrive
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
            <Card className="overflow-hidden rounded-[2rem] border-0 bg-white shadow-2xl">
              <div
                className="h-3"
                style={{
                  background: `linear-gradient(90deg, ${brand.yellow}, ${brand.coral}, ${brand.turquoise}, ${brand.blue}, ${brand.pink})`,
                }}
              />
              <CardContent className="p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-500">Panel de acceso</p>
                    <h2 className="text-2xl font-black">Consulta rápida</h2>
                  </div>
                  <Search className="h-8 w-8" style={{ color: brand.blue }} />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {indicadores.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                      <p className="text-3xl font-black" style={{ color: brand.blue }}>{item.value}</p>
                      <p className="mt-1 font-black">{item.label}</p>
                      <p className="mt-2 text-sm leading-5 text-slate-600">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl p-5" style={{ background: brand.light }}>
                  <p className="font-black">Ruta principal</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    Conoce el CDJ, consulta normativa, revisa documentos, participa y contacta tu Consejo Local.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionLabel>Accesos principales</SectionLabel>
        <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
          Navega el portal por temas
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {accesos.map(({ icon: Icon, title, text, href, tag }) => (
            <a key={title} href={href} className="block">
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: brand.light }}>
                      <Icon className="h-6 w-6" style={{ color: brand.blue }} />
                    </div>
                    <StatusPill tone="yellow">{tag}</StatusPill>
                  </div>
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-black" style={{ color: brand.blue }}>
                    Abrir sección <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>
              Canales oficiales
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Información, contacto y redes del CDJ Bogotá
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Usa los canales oficiales para propuestas, solicitudes, seguimiento documental, articulación territorial
              y comunicación pública.
            </p>
          </div>
          <div>
            <SocialLinks dark />
          </div>
        </div>
      </section>

      <FloatingPqrs />
      <Footer />
    </main>
  );
}
