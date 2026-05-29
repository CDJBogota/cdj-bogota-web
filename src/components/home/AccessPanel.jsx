import { Link } from "react-router-dom";
import { Archive, BarChart3, Clock3, FileSearch, MapPinned, Send, Users } from "lucide-react";

const cards = [
  {
    title: "Tablero de cumplimiento",
    text: "Semáforo público de compromisos, solicitudes, entidades, vencimientos y soportes.",
    href: "/cumplimiento",
    icon: BarChart3,
    color: "bg-[#3871B7]",
  },
  {
    title: "Mapa territorial",
    text: "Consulta localidades, delegaciones, prioridades, compromisos y alertas juveniles.",
    href: "/mapa-territorial",
    icon: MapPinned,
    color: "bg-[#57C5CE]",
  },
  {
    title: "Buscador documental",
    text: "Encuentra actas, informes, reglamentos, respuestas, constancias y versiones públicas.",
    href: "/documentos",
    icon: FileSearch,
    color: "bg-[#EE4C5B]",
  },
  {
    title: "Línea de tiempo",
    text: "Histórico de elecciones, sesiones, reformas, informes, audiencias e hitos de incidencia.",
    href: "/historia",
    icon: Clock3,
    color: "bg-[#F8A72C]",
  },
  {
    title: "Participa / radica",
    text: "Envía propuestas, alertas territoriales, solicitudes de acompañamiento o requerimientos.",
    href: "/participa",
    icon: Send,
    color: "bg-[#E5579D]",
  },
  {
    title: "Consejeros/as",
    text: "Conoce integrantes, Mesa Directiva, comisiones, delegaciones y representación territorial.",
    href: "/integrantes",
    icon: Users,
    color: "bg-[#2B2B2B]",
  },
];

export default function AccessPanel() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Centro de seguimiento juvenil</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">Consulta, participa y haz seguimiento.</h2>
        </div>
        <Link to="/transparencia" className="inline-flex items-center justify-center rounded-2xl bg-[#FBD416] px-5 py-3 text-sm font-black text-slate-950">
          <Archive className="mr-2 h-4 w-4" />
          Ver transparencia
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ title, text, href, icon: Icon, color }) => (
          <Link key={title} to={href} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className={`mb-5 grid h-14 w-14 place-items-center rounded-3xl ${color}`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-950">{title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{text}</p>
            <p className="mt-5 text-sm font-black text-[#3871B7]">Abrir módulo →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
