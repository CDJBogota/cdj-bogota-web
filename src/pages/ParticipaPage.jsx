import { Link } from "react-router-dom";
import { AlertTriangle, ClipboardList, FileQuestion, Mail, Megaphone, Send, Users, Wrench } from "lucide-react";

const canales = [
  {
    id: "propuesta",
    icon: Megaphone,
    title: "Enviar propuesta",
    text: "Presenta una idea, recomendación o iniciativa para que el CDJ la revise, la clasifique y defina si debe llevarse a comisión, Plenaria o interlocución institucional.",
    action: "Enviar propuesta",
  },
  {
    id: "alerta-territorial",
    icon: AlertTriangle,
    title: "Reportar alerta territorial",
    text: "Informa una situación que afecte a juventudes en una localidad: barreras de participación, problemas de acceso, riesgos, incumplimientos o necesidades urgentes.",
    action: "Reportar alerta",
  },
  {
    id: "acompanamiento",
    icon: Users,
    title: "Solicitar acompañamiento",
    text: "Solicita acompañamiento del CDJ para procesos juveniles, espacios locales, interlocuciones, mesas, asambleas, derechos de petición o seguimiento institucional.",
    action: "Solicitar acompañamiento",
  },
  {
    id: "organizacion",
    icon: ClipboardList,
    title: "Inscribir organización o proceso juvenil",
    text: "Registra organizaciones, colectivos, plataformas, semilleros, parches, grupos estudiantiles o procesos juveniles que quieran articularse con el CDJ.",
    action: "Registrar proceso",
  },
  {
    id: "documento-no-publicado",
    icon: FileQuestion,
    title: "Solicitar documento no publicado",
    text: "Pide un acta, informe, soporte, respuesta, constancia o documento que no esté cargado en el repositorio público.",
    action: "Solicitar documento",
  },
  {
    id: "seguimiento",
    icon: Send,
    title: "Solicitar seguimiento",
    text: "Pide que el CDJ haga seguimiento a una respuesta institucional, compromiso vencido, solicitud sin respuesta o tema priorizado por jóvenes.",
    action: "Solicitar seguimiento",
  },
  {
    id: "actualizacion",
    icon: Wrench,
    title: "Reportar actualización o error",
    text: "Reporta errores documentales, enlaces rotos, datos desactualizados, soportes faltantes o información que deba corregirse.",
    action: "Reportar actualización",
  },
  {
    id: "error-documental",
    icon: FileQuestion,
    title: "Reportar error documental",
    text: "Informa si un documento está mal clasificado, tiene fecha incorrecta, enlace roto, versión pública incompleta o metadatos equivocados.",
    action: "Reportar error",
  },
];

export default function ParticipaPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Participación ciudadana juvenil</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Participa, reporta y solicita seguimiento</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Usa estos canales para enviar propuestas, alertas territoriales, solicitudes de acompañamiento, documentos faltantes o reportes de actualización. Esta versión deja la estructura lista para conectar formularios reales.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#propuesta" className="rounded-2xl bg-[#3871B7] px-5 py-3 font-black text-white">Enviar propuesta</a>
          <a href="#alerta-territorial" className="rounded-2xl bg-[#FBD416] px-5 py-3 font-black text-slate-950">Reportar alerta</a>
          <a href="#contacto" className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-black text-slate-700">Contactar al CDJ</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-16 md:grid-cols-2">
        {canales.map(({ id, icon: Icon, title, text, action }) => (
          <article id={id} key={id} className="scroll-mt-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E7E3DF]">
                <Icon className="h-6 w-6 text-[#3871B7]" />
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">Canal</span>
            </div>
            <h2 className="text-2xl font-black text-slate-950">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{text}</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-950">Formulario pendiente de conexión</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Mientras se conecta un formulario real, usa el correo institucional del CDJ o los canales oficiales definidos.
              </p>
            </div>
            <a href="#contacto" className="mt-5 inline-flex rounded-2xl bg-[#3871B7] px-4 py-3 text-sm font-black text-white">
              {action}
            </a>
          </article>
        ))}
      </section>

      <section id="contacto" className="scroll-mt-28 bg-white py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#3871B7] to-[#EE4C5B] p-8 text-white">
            <Mail className="mb-5 h-10 w-10" />
            <h2 className="text-3xl font-black md:text-5xl">Contacto institucional</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90">
              Para radicar o consultar información, usa los canales institucionales confirmados del CDJ y del equipo de juventud.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white/15 p-5 ring-1 ring-white/20">
                <p className="text-sm font-black uppercase tracking-wide text-white/70">Correo CDJ</p>
                <a className="mt-2 block break-words text-xl font-black" href="mailto:ConsejoDistritaldeJuventud@gobiernobogota.gov.co">
                  ConsejoDistritaldeJuventud@gobiernobogota.gov.co
                </a>
              </div>

              <div className="rounded-3xl bg-white/15 p-5 ring-1 ring-white/20">
                <p className="text-sm font-black uppercase tracking-wide text-white/70">Equipo juventud Secretaría de Gobierno</p>
                <a className="mt-2 block break-words text-xl font-black" href="mailto:juventud@gobiernobogota.gov.co">
                  juventud@gobiernobogota.gov.co
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/cumplimiento" className="rounded-2xl bg-white px-5 py-3 font-black text-[#3871B7]">
                Consultar seguimiento
              </Link>
              <Link to="/documentos" className="rounded-2xl bg-[#FBD416] px-5 py-3 font-black text-slate-950">
                Buscar documentos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
