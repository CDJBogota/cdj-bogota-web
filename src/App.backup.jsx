import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  FileText,
  Users,
  MapPinned,
  Megaphone,
  Handshake,
  Search,
  ArrowRight,
  CheckCircle2,
  Building2,
  Mail,
  Eye,
  ClipboardList,
  Radio,
  Gavel,
  Archive,
  AlertCircle,
  LockKeyhole,
  Network,
  PenLine,
  Send,
  Scale,
  Vote,
  ShieldCheck,
  BookOpen,
  Landmark,
  ScrollText,
  Database,
  FolderOpen,
  Link2,
  Library,
  ClipboardCheck,
  FileSearch,
  ListChecks,
  Globe2,
  BadgeCheck,
} from "lucide-react";

const brand = {
  yellow: "#FBD416",
  coral: "#EE4C5B",
  turquoise: "#57C5CE",
  blue: "#3871B7",
  orange: "#F8A72C",
  pink: "#E5579D",
  black: "#2B2B2B",
  gray: "#545454",
  light: "#E7E3DF",
  white: "#FFFFFF",
};

function Button({ children, variant = "solid", className = "", style = {}, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-black transition active:scale-[0.98]";
  const variants = {
    solid: "text-white hover:opacity-90",
    outline: "border-2 bg-white hover:bg-slate-50",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === "solid" ? { background: brand.blue, ...style } : style}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

const localidades = [
  "Usaquén",
  "Chapinero",
  "Santa Fe",
  "San Cristóbal",
  "Usme",
  "Tunjuelito",
  "Bosa",
  "Kennedy",
  "Fontibón",
  "Engativá",
  "Suba",
  "Barrios Unidos",
  "Teusaquillo",
  "Los Mártires",
  "Antonio Nariño",
  "Puente Aranda",
  "La Candelaria",
  "Rafael Uribe Uribe",
  "Ciudad Bolívar",
  "Sumapaz",
];

const indicadores = [
  {
    label: "Localidades articuladas",
    value: "20",
    detail: "Delegación territorial y seguimiento por CLJ.",
  },
  {
    label: "Comisiones permanentes",
    value: "3",
    detail: "Veeduría, comunicaciones y formulación.",
  },
  {
    label: "Quórum decisorio",
    value: "9",
    detail: "Miembros habilitados/as según reglamento.",
  },
  {
    label: "Audiencias públicas",
    value: "2/año",
    detail: "Informes semestrales de gestión.",
  },
];

const accesosRapidos = [
  {
    icon: FileText,
    title: "Actas y decisiones",
    text: "Consulta actas aprobadas, constancias, salvamentos de voto y fe de erratas.",
    tag: "Transparencia",
  },
  {
    icon: ClipboardList,
    title: "Compromisos",
    text: "Matriz de seguimiento a entidades, responsables, fechas, respuestas y estado.",
    tag: "Control",
  },
  {
    icon: Megaphone,
    title: "Participa",
    text: "Envía problemáticas, propuestas, alertas territoriales o solicitudes de acompañamiento.",
    tag: "Ciudadanía",
  },
  {
    icon: Users,
    title: "Consejeros/as",
    text: "Directorio por localidad, comisión, delegación, mesa directiva y periodo.",
    tag: "Representación",
  },
];

const atribuciones = [
  "Interlocutar y concertar con entidades públicas y privadas sobre asuntos de juventud.",
  "Proponer políticas, planes, programas y proyectos para las juventudes.",
  "Concertar agendas juveniles e impulsar su inclusión en planes de desarrollo.",
  "Ejercer veeduría y control social sobre políticas públicas, planes y programas.",
  "Presentar informes semestrales de gestión y avances en audiencia pública.",
  "Elegir delegaciones ante instancias donde se traten asuntos de juventud.",
];

const comisiones = [
  {
    icon: Eye,
    title: "Control y Veeduría",
    color: brand.blue,
    text: "Seguimiento al cumplimiento de planes, decisiones, compromisos, políticas públicas y programas dirigidos a juventudes.",
  },
  {
    icon: Radio,
    title: "Comunicación y Asuntos Públicos",
    color: brand.coral,
    text: "Comunicación interna y externa, difusión de iniciativas, imagen institucional y relacionamiento con medios, organizaciones sociales y entidades afines.",
  },
  {
    icon: PenLine,
    title: "Planeación y Formulación",
    color: brand.turquoise,
    text: "Diseño, estudio y sustento técnico de proyectos, planes, propuestas de acuerdo, rutas de incidencia e iniciativas del Consejo.",
  },
];

const archivo = [
  { title: "Reglamento interno", estado: "Vigente", meta: "Acuerdos, reformas y versiones públicas." },
  { title: "Actas de Plenaria", estado: "Publicar", meta: "Aprobadas dentro de los tiempos reglamentarios." },
  { title: "Actas de Comisiones", estado: "Trazabilidad", meta: "Permanentes y accidentales." },
  { title: "Correspondencia", estado: "Radicación", meta: "Oficios enviados, recibidos y respuesta." },
  { title: "PQRSD juvenil", estado: "Canal", meta: "Peticiones, quejas, reclamos, sugerencias y denuncias." },
  { title: "Informes semestrales", estado: "Rendición", meta: "Gestión, avances, pendientes y compromisos." },
];

const ruta = [
  ["1", "Radicar", "La solicitud entra por canal oficial con consecutivo, fecha, asunto y soporte."],
  ["2", "Asignar", "La Secretaría distribuye a Mesa, comisión o delegación competente."],
  ["3", "Responder", "Se proyecta respuesta, remisión o pronunciamiento según competencia."],
  ["4", "Publicar", "Si procede, se sube versión pública protegiendo datos personales."],
  ["5", "Hacer seguimiento", "Queda en matriz de compromisos hasta cierre verificable."],
];

const agenda = [
  {
    tipo: "Sesión ordinaria",
    fecha: "Mensual",
    lugar: "Sede descentralizada / Concejo de Bogotá / entidad habilitada",
    estado: "Convocatoria con 5 días hábiles",
  },
  {
    tipo: "Sesión extraordinaria",
    fecha: "Cuando proceda",
    lugar: "Presencial, virtual o mixta según convocatoria",
    estado: "Convocatoria con 3 días hábiles",
  },
  {
    tipo: "Audiencia pública",
    fecha: "Semestral",
    lugar: "Amplia convocatoria juvenil e institucional",
    estado: "Informe de gestión",
  },
  {
    tipo: "Interlocución institucional",
    fecha: "Mínimo dos al año",
    lugar: "Gobierno Distrital / Concejo de Bogotá",
    estado: "Agenda juvenil",
  },
];

const marcoJuridico = [
  {
    icon: Scale,
    title: "Constitución Política",
    tag: "Participación",
    text: "Artículos 2, 40, 103 y 270: participación ciudadana, control del poder político y vigilancia de la gestión pública.",
  },
  {
    icon: ScrollText,
    title: "Ley 1622 de 2013",
    tag: "Estatuto Juvenil",
    text: "Marco general de la ciudadanía juvenil, derechos, deberes, sistema de juventudes y mecanismos de participación.",
  },
  {
    icon: ScrollText,
    title: "Ley 1885 de 2018",
    tag: "Reforma",
    text: "Modifica el Estatuto de Ciudadanía Juvenil y fortalece reglas sobre Consejos de Juventud y Sistema Nacional de Juventudes.",
  },
  {
    icon: FileText,
    title: "Reglamento Interno CDJ",
    tag: "Acuerdo 002 de 2025",
    text: "Regula organización, sesiones, quórum, comisiones, dignidades, gestión documental, archivo, disciplina y garantías internas.",
  },
  {
    icon: LockKeyhole,
    title: "Ley 1712 de 2014",
    tag: "Transparencia",
    text: "Acceso a información pública, publicidad activa, reservas legales y obligación de facilitar consulta ciudadana.",
  },
  {
    icon: ShieldCheck,
    title: "Ley 1581 de 2012",
    tag: "Datos personales",
    text: "Protección de datos personales, tratamiento responsable de información sensible y elaboración de versiones públicas.",
  },
];

const sistemaJuventud = [
  {
    title: "Subsistema de participación juvenil",
    text: "Consejos Locales de Juventud, Consejo Distrital, plataformas juveniles, prácticas organizativas, procesos juveniles y espacios de deliberación.",
  },
  {
    title: "Subsistema institucional",
    text: "Entidades distritales, alcaldías locales, sectores administrativos, programas, proyectos, presupuestos y dependencias responsables de juventud.",
  },
  {
    title: "Concertación y decisión",
    text: "Espacios donde la representación juvenil interlocuta con el Gobierno Distrital para discutir agendas, prioridades, políticas y compromisos.",
  },
  {
    title: "Control social y seguimiento",
    text: "Rutas de veeduría, solicitudes, derechos de petición, informes, alertas, audiencias públicas y matrices de cumplimiento.",
  },
];

const incidencia = [
  ["Diagnóstico territorial", "Recoger problemáticas juveniles por localidad, sector poblacional y derecho afectado."],
  ["Priorización pública", "Convertir problemas dispersos en agenda juvenil, propuestas y líneas de intervención."],
  ["Radicación formal", "Enviar solicitudes, proposiciones, derechos de petición o documentos técnicos a entidades competentes."],
  ["Concertación", "Abrir mesas de trabajo con entidades y exigir compromisos claros: responsable, plazo, producto y soporte."],
  ["Seguimiento", "Registrar respuestas, incumplimientos, avances, soportes y alertas en una matriz pública."],
  ["Rendición de cuentas", "Presentar informes semestrales, audiencias públicas y balances de cumplimiento ante jóvenes y ciudadanía."],
];

const biblioteca = [
  {
    title: "Normativa nacional",
    items: ["Constitución Política", "Ley 1622 de 2013", "Ley 1885 de 2018", "Ley 1755 de 2015", "Ley 1712 de 2014", "Ley 1581 de 2012"],
  },
  {
    title: "Normativa distrital",
    items: ["Política Pública de Juventud", "Plan Distrital de Desarrollo", "Decretos y actos administrativos", "Lineamientos del Sistema Distrital de Juventud"],
  },
  {
    title: "Documentos del CDJ",
    items: ["Reglamento interno", "Actas", "Resoluciones internas", "Informes semestrales", "Matriz de compromisos", "Comunicados oficiales"],
  },
  {
    title: "Fuentes académicas",
    items: ["Participación juvenil", "Control social", "Gobierno abierto", "Políticas públicas de juventud", "Democracia participativa", "Enfoque diferencial"],
  },
];

const jurisprudencia = [
  {
    title: "Participación ciudadana",
    text: "Líneas constitucionales sobre derecho a participar, democracia participativa, control del poder político e incidencia en decisiones públicas.",
  },
  {
    title: "Derecho de petición",
    text: "Criterios sobre respuesta clara, completa, de fondo y oportuna frente a solicitudes ciudadanas e institucionales.",
  },
  {
    title: "Transparencia y acceso a información",
    text: "Reglas sobre publicidad, reserva legal, versiones públicas y deber de facilitar información para control social.",
  },
  {
    title: "Debido proceso interno",
    text: "Garantías mínimas para actuaciones internas: contradicción, imparcialidad, motivación, proporcionalidad y derecho de defensa.",
  },
];

const compromisos = [
  { entidad: "Entidad distrital", asunto: "Solicitud o compromiso", estado: "Pendiente", plazo: "Por definir" },
  { entidad: "Alcaldía local", asunto: "Seguimiento territorial", estado: "En trámite", plazo: "Por definir" },
  { entidad: "Comisión CDJ", asunto: "Informe o producto", estado: "En elaboración", plazo: "Por definir" },
];

function InfoCard({ icon: Icon, title, text, tag }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: brand.light }}>
            <Icon className="h-6 w-6" style={{ color: brand.blue }} />
          </div>
          {tag && <StatusPill tone="yellow">{tag}</StatusPill>}
        </div>
        <h3 className="text-xl font-black">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
      </CardContent>
    </Card>
  );
}

function LogoCDJ() {
  return (
    <a href="#inicio" className="flex items-center gap-3">
      <img
        src="/brand/logo-horizontal.png"
        alt="Consejo Distrital de Juventud de Bogotá D.C."
        className="h-24 w-auto object-contain"
      />
    </a>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.blue }}>
      {children}
    </p>
  );
}

function StatusPill({ children, tone = "blue" }) {
  const map = {
    blue: brand.blue,
    coral: brand.coral,
    yellow: brand.yellow,
    turquoise: brand.turquoise,
    black: brand.black,
  };
  const bg = map[tone] || brand.blue;
  const text = tone === "yellow" || tone === "turquoise" ? brand.black : brand.white;

  return (
    <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: bg, color: text }}>
      {children}
    </span>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]" style={{ fontFamily: "Inter, Arial, sans-serif" }}>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <LogoCDJ />
          <div className="hidden items-center gap-5 text-sm font-bold text-slate-700 xl:flex">
            <a href="#inicio" className="hover:text-[#3871B7]">Inicio</a>
            <a href="#consejo" className="hover:text-[#3871B7]">Consejo</a>
            <a href="#marco-juridico" className="hover:text-[#3871B7]">Marco jurídico</a>
            <a href="#sistema" className="hover:text-[#3871B7]">Sistema</a>
            <a href="#incidencia" className="hover:text-[#3871B7]">Incidencia</a>
            <a href="#biblioteca" className="hover:text-[#3871B7]">Biblioteca</a>
            <a href="#territorio" className="hover:text-[#3871B7]">Localidades</a>
            <a href="#contacto" className="hover:text-[#3871B7]">Contacto</a>
          </div>
          <a href="#contacto"><Button>Participa</Button></a>
        </nav>
      </header>

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
              La voz joven de Bogotá con memoria, incidencia y seguimiento público.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Portal público del Consejo Distrital de Juventud de Bogotá D.C. para informar, convocar, publicar
              documentos, recibir propuestas y hacer trazabilidad a compromisos con entidades distritales, locales y
              nacionales.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="px-6 py-4 text-base">
                Enviar propuesta <Send className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="px-6 py-4 text-base" style={{ borderColor: brand.black, color: brand.black }}>
                Ver actas y documentos
              </Button>
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
                    <p className="text-sm font-bold text-slate-500">Tablero público</p>
                    <h2 className="text-2xl font-black">Estado de la gestión juvenil</h2>
                  </div>
                  <Search className="h-8 w-8" style={{ color: brand.blue }} />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {indicadores.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                      <p className="text-4xl font-black" style={{ color: brand.blue }}>
                        {item.value}
                      </p>
                      <p className="mt-1 font-black">{item.label}</p>
                      <p className="mt-2 text-sm leading-5 text-slate-600">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl p-5" style={{ background: brand.light }}>
                  <p className="font-black">Próxima mejora clave</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    Conectar este tablero a una base de datos real: actas, oficios, compromisos, respuestas, vencimientos y responsables.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {accesosRapidos.map(({ icon: Icon, title, text, tag }) => (
            <Card key={title} className="transition hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: brand.light }}>
                    <Icon className="h-6 w-6" style={{ color: brand.blue }} />
                  </div>
                  <StatusPill tone="yellow">{tag}</StatusPill>
                </div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="consejo" className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>
                Naturaleza y funciones
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                Un mecanismo autónomo de participación, concertación, veeduría e interlocución.
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                El CDJ no es una dependencia de la Alcaldía. Es una instancia juvenil de representación, articulación,
                incidencia, seguimiento y control social frente a los asuntos que afectan a las juventudes del Distrito Capital.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {atribuciones.map((item, i) => (
                <div key={item} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                  <div
                    className="mb-4 grid h-10 w-10 place-items-center rounded-2xl font-black"
                    style={{
                      background: [brand.yellow, brand.coral, brand.turquoise, brand.blue, brand.orange, brand.pink][i],
                      color: i === 0 || i === 2 || i === 4 ? brand.black : brand.white,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p className="leading-6 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionLabel>Organización interna</SectionLabel>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Cómo se organiza el CDJ</h2>
            <p className="mt-5 leading-8 text-slate-600">
              La página debe mostrar la estructura real y mantenerla actualizada por periodo, delegación, comisión y responsabilidad.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              [Gavel, "Plenaria", "Máxima instancia de deliberación y decisión, integrada por la totalidad de miembros del CDJ."],
              [Building2, "Mesa Directiva", "Presidencia, Vicepresidencia y Secretaría, elegidas por la Plenaria para periodos de un año."],
              [Handshake, "Comisión Distrital de Concertación", "Instancia de interlocución entre Gobierno Distrital y representación juvenil."],
              [Network, "Delegaciones externas", "Consejo Nacional de Juventud y demás espacios de participación donde se traten asuntos juveniles."],
            ].map(([Icon, title, text]) => (
              <Card key={title}>
                <CardContent className="p-6">
                  <Icon className="mb-5 h-8 w-8" style={{ color: brand.blue }} />
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="comisiones" className="py-20" style={{ background: brand.light }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-3xl">
            <SectionLabel>Trabajo permanente</SectionLabel>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Comisiones del Consejo</h2>
            <p className="mt-5 leading-8 text-slate-700">
              Cada comisión debe tener página propia con integrantes, actas, plan de trabajo, informes, productos, solicitudes y compromisos abiertos.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {comisiones.map(({ icon: Icon, title, text, color }) => (
              <Card key={title} className="rounded-[2rem] border-0 bg-white shadow-lg">
                <CardContent className="p-7">
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded-3xl" style={{ background: color }}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{text}</p>
                  <Button variant="outline" className="mt-6" style={{ borderColor: brand.blue, color: brand.blue }}>
                    Ver comisión <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="transparencia" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionLabel>Transparencia activa</SectionLabel>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Archivo, versiones públicas y trazabilidad documental
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              El micrositio debe evitar que las decisiones queden perdidas en chats. Todo documento debe tener fecha,
              consecutivo, estado, responsable, soporte de aprobación y versión pública cuando contenga datos protegidos.
            </p>
            <div className="mt-6 rounded-3xl p-5" style={{ background: brand.yellow }}>
              <div className="flex gap-3">
                <AlertCircle className="mt-1 h-6 w-6 shrink-0" />
                <p className="font-bold leading-7">
                  Regla de diseño: publicar lo máximo posible, pero con protección de datos personales, reservas legales
                  y versiones públicas cuando sea necesario.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {archivo.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Archive className="h-6 w-6" style={{ color: brand.blue }} />
                  <StatusPill tone={item.estado === "Vigente" ? "blue" : item.estado === "Canal" ? "coral" : "yellow"}>
                    {item.estado}
                  </StatusPill>
                </div>
                <h3 className="font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionLabel>Ruta de solicitudes</SectionLabel>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                Del mensaje ciudadano al compromiso verificable
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                La página debe funcionar como ventanilla de participación y sistema de seguimiento, no solo como vitrina informativa.
              </p>
            </div>

            <div className="space-y-4">
              {ruta.map(([n, title, text]) => (
                <div key={title} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-black text-white" style={{ background: brand.blue }}>
                    {n}
                  </div>
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="marco-juridico" className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <SectionLabel>Marco jurídico y documental</SectionLabel>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              La base legal para participar, incidir y hacer control social
            </h2>
          </div>
          <p className="max-w-2xl leading-7 text-slate-600">
            Esta sección organiza las normas, documentos internos y criterios jurídicos que sustentan la actuación del CDJ,
            la publicidad de sus decisiones, la protección de datos y la trazabilidad documental.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {marcoJuridico.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section id="sistema" className="py-20" style={{ background: brand.light }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <SectionLabel>Sistema Distrital de Juventud</SectionLabel>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                De la representación juvenil a la decisión pública verificable
              </h2>
              <p className="mt-5 leading-8 text-slate-700">
                El portal debe mostrar cómo se conectan las juventudes organizadas, los Consejos Locales,
                el Consejo Distrital, las entidades públicas y los espacios de concertación. La clave no es solo reunirse:
                es dejar compromisos, responsables, plazos y evidencias.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sistemaJuventud.map((item, i) => (
                <div key={item.title} className="rounded-3xl bg-white p-6 shadow-sm">
                  <div
                    className="mb-4 grid h-11 w-11 place-items-center rounded-2xl font-black"
                    style={{
                      background: [brand.yellow, brand.coral, brand.turquoise, brand.blue][i % 4],
                      color: i === 0 || i === 2 ? brand.black : brand.white,
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="incidencia" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionLabel>Ruta de incidencia</SectionLabel>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Cómo pasa una necesidad juvenil a compromiso público
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Esta ruta convierte la participación en gestión verificable: problema, propuesta, radicación,
              concertación, seguimiento y rendición de cuentas.
            </p>
          </div>

          <div className="space-y-4">
            {incidencia.map(([title, text], i) => (
              <div key={title} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-black text-white" style={{ background: brand.blue }}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="biblioteca" className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>
                Biblioteca pública
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                Normativa, documentos oficiales y fuentes académicas
              </h2>
            </div>
            <p className="max-w-2xl leading-7 text-slate-300">
              Este módulo servirá como repositorio público para que cualquier joven, consejero/a, organización o entidad
              pueda consultar las bases que sustentan las actuaciones del CDJ.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {biblioteca.map((grupo) => (
              <div key={grupo.title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
                <Library className="mb-5 h-8 w-8" style={{ color: brand.yellow }} />
                <h3 className="text-xl font-black">{grupo.title}</h3>
                <div className="mt-4 space-y-2">
                  {grupo.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-200">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" style={{ color: brand.turquoise }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jurisprudencia" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionLabel>Jurisprudencia y criterios de consulta</SectionLabel>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Criterios para actuar con seguridad jurídica
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Esta sección no reemplaza asesoría jurídica. Su función es organizar líneas de consulta para que el CDJ
              fundamente mejor sus decisiones, solicitudes, respuestas, versiones públicas y actuaciones internas.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {jurisprudencia.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <Landmark className="mb-5 h-8 w-8" style={{ color: brand.blue }} />
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="compromisos" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionLabel>Tablero de compromisos</SectionLabel>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                Seguimiento público a entidades, comisiones y solicitudes
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                Esta tabla será reemplazada por datos reales cuando conectemos una hoja de cálculo,
                Airtable, Notion o una base de datos. Por ahora deja definida la estructura pública.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-4 gap-0 bg-slate-900 px-5 py-4 text-sm font-black text-white">
                <div>Entidad</div>
                <div>Asunto</div>
                <div>Estado</div>
                <div>Plazo</div>
              </div>
              {compromisos.map((item, i) => (
                <div key={`${item.entidad}-${i}`} className="grid grid-cols-4 gap-0 border-t border-slate-100 px-5 py-4 text-sm">
                  <div className="font-bold">{item.entidad}</div>
                  <div className="text-slate-600">{item.asunto}</div>
                  <div>
                    <StatusPill tone={item.estado === "Pendiente" ? "yellow" : "blue"}>{item.estado}</StatusPill>
                  </div>
                  <div className="text-slate-600">{item.plazo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="territorio" className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <SectionLabel>Territorio</SectionLabel>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Bogotá por localidades</h2>
          </div>
          <p className="max-w-2xl leading-7 text-slate-600">
            Cada localidad debe tener micrositio: delegación al CDJ, CLJ, actas, prioridades, propuestas, organizaciones,
            alertas territoriales y compromisos de alcaldía local.
          </p>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {localidades.map((loc, i) => (
            <a key={loc} href="#" className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div
                className="mb-3 h-2 rounded-full"
                style={{
                  background: [brand.yellow, brand.coral, brand.turquoise, brand.blue, brand.orange, brand.pink][i % 6],
                }}
              />
              <p className="font-black">{loc}</p>
              <p className="mt-1 text-xs text-slate-500">Ver perfil territorial</p>
            </a>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: brand.black }}>
        <div className="mx-auto max-w-7xl px-5 text-white">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>
                Agenda pública
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Sesiones, audiencias e interlocución</h2>
              <p className="mt-5 leading-8 text-slate-300">
                El calendario debe permitir filtrar por Plenaria, comisiones, audiencias públicas, encuentros territoriales,
                sesiones con entidades y vencimientos de compromisos.
              </p>
            </div>

            <div className="grid gap-4">
              {agenda.map((item) => (
                <div key={item.tipo} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-white">{item.tipo}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.lugar}</p>
                    </div>
                    <StatusPill tone="yellow">{item.fecha}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm font-bold" style={{ color: brand.turquoise }}>
                    {item.estado}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="overflow-hidden rounded-[2rem] border-0 shadow-xl">
            <div className="h-3" style={{ background: `linear-gradient(90deg, ${brand.blue}, ${brand.turquoise}, ${brand.yellow})` }} />
            <CardContent className="p-7">
              <Mail className="mb-5 h-9 w-9" style={{ color: brand.blue }} />
              <h2 className="text-3xl font-black">Canales de contacto</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Estos canales permiten orientar solicitudes ciudadanas, participación juvenil y comunicaciones institucionales.
                El CDJ podrá actualizar esta sección cuando defina nuevos correos, formularios o canales propios.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <b>Instagram:</b> @cdjbogotaoficial
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <b>PQRSD Secretaría de Gobierno:</b> radicacionsdg.nivelcentral@gobiernobogota.gov.co
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <b>Atención IDPAC:</b> atencionalaciudadania@participacionbogota.gov.co
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <b>Canal propio del CDJ:</b> en proceso de consolidación institucional.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-0 text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${brand.blue}, ${brand.coral})` }}>
            <CardContent className="p-7">
              <LockKeyhole className="mb-5 h-9 w-9" />
              <h2 className="text-3xl font-black">Privacidad y datos</h2>
              <p className="mt-4 leading-7 text-white/90">
                Los formularios deben tener autorización de tratamiento de datos, opción de anonimizar alertas sensibles y
                reglas claras para publicar versiones públicas sin exponer información protegida.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  "Autorización de datos personales",
                  "Clasificación de información reservada",
                  "Versiones públicas de documentos",
                  "Historial de modificaciones y responsables",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/15 p-4 font-bold ring-1 ring-white/15">
                    <CheckCircle2 className="h-5 w-5" /> {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <LogoCDJ />
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Portal de participación, transparencia y seguimiento ciudadano del Consejo Distrital de Juventud de Bogotá D.C.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Navegación", "Inicio · Consejo · Comisiones · Localidades"],
              ["Transparencia", "Actas · Oficios · Informes · PQRSD"],
              ["Redes", "Instagram · X · Facebook · YouTube"],
            ].map(([title, text]) => (
              <div key={title}>
                <p className="font-black">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}