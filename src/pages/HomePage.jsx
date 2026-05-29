import { Link } from "react-router-dom";
import { CalendarDays, Megaphone } from "lucide-react";
import AccessPanel from "../components/home/AccessPanel";
import LatestUpdates from "../components/home/LatestUpdates";
import IndicadorCard from "../components/dashboard/IndicadorCard";
import { indicadoresPublicos } from "../data/indicadores";

const agenda = [
  { tipo: "Sesión de Plenaria", fecha: "Por confirmar", detalle: "Sesión ordinaria del Consejo Distrital de Juventud" },
  { tipo: "Comisiones", fecha: "Por confirmar", detalle: "Trabajo de Control, Comunicación y Planeación" },
  { tipo: "Audiencia pública", fecha: "Semestral", detalle: "Rendición de cuentas e informe de gestión" },
  { tipo: "Encuentro territorial", fecha: "Por confirmar", detalle: "Articulación con Consejos Locales de Juventud" },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(251,212,22,.38),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(238,76,91,.22),transparent_30%),radial-gradient(circle_at_55%_95%,rgba(87,197,206,.28),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <p className="inline-flex rounded-full bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">Consejo Distrital de Juventud de Bogotá D.C.</p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight text-slate-950 md:text-7xl">
            Participación juvenil con memoria, trazabilidad e incidencia pública.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Portal público para consultar documentos, compromisos, agenda, localidades, integrantes y canales de participación del CDJ Bogotá.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/participa" className="rounded-2xl bg-[#3871B7] px-6 py-4 font-black text-white">
              Participa
            </Link>
            <Link to="/transparencia" className="rounded-2xl border-2 border-slate-950 px-6 py-4 font-black text-slate-950">
              Ver transparencia
            </Link>
          </div>
        </div>
      </section>

      <AccessPanel />

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Indicadores públicos</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">Estado general del portal</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {indicadoresPublicos.map((item) => (
              <IndicadorCard key={item.id} label={item.label} value={item.value} detail={item.detail} />
            ))}
          </div>
        </div>
      </section>

      <LatestUpdates />

      <section className="bg-[#2B2B2B] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FBD416]">Agenda pública</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">Sesiones, comisiones y encuentros</h2>
            </div>
            <CalendarDays className="hidden h-12 w-12 text-[#57C5CE] md:block" />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {agenda.map((item) => (
              <article key={item.tipo} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="font-black">{item.tipo}</p>
                <p className="mt-2 text-sm font-bold text-[#FBD416]">{item.fecha}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.detalle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#3871B7] to-[#EE4C5B] p-8 text-white md:p-12">
          <Megaphone className="mb-5 h-10 w-10" />
          <h2 className="text-3xl font-black md:text-5xl">¿Tienes una propuesta, alerta o solicitud para las juventudes de Bogotá?</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90">
            Usa los canales de participación para enviar propuestas, alertas territoriales, solicitudes de acompañamiento o documentos que requieran seguimiento.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/participa#propuesta" className="rounded-2xl bg-white px-6 py-4 font-black text-[#3871B7]">
              Enviar propuesta
            </Link>
            <Link to="/participa#alerta-territorial" className="rounded-2xl bg-[#FBD416] px-6 py-4 font-black text-slate-950">
              Reportar alerta territorial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
