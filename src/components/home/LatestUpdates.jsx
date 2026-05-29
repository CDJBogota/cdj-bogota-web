import { Link } from "react-router-dom";
import { compromisos } from "../../data/compromisos";
import { documentos } from "../../data/documentos";
import { timeline } from "../../data/timeline";

export default function LatestUpdates() {
  const latestDocs = documentos.slice(0, 3);
  const latestCompromisos = compromisos.slice(0, 3);
  const latestTimeline = timeline.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Últimos movimientos</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">Actividad reciente del portal</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">Documentos cargados</h3>
          <div className="mt-5 space-y-4">
            {latestDocs.map((doc) => (
              <Link key={doc.id} to="/documentos" className="block rounded-2xl bg-slate-50 p-4 hover:bg-slate-100">
                <p className="font-bold text-slate-950">{doc.titulo}</p>
                <p className="text-xs text-slate-500">{doc.fecha} · {doc.tipo}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">Respuestas y compromisos</h3>
          <div className="mt-5 space-y-4">
            {latestCompromisos.map((item) => (
              <Link key={item.id} to="/cumplimiento" className="block rounded-2xl bg-slate-50 p-4 hover:bg-slate-100">
                <p className="font-bold text-slate-950">{item.titulo}</p>
                <p className="text-xs text-slate-500">{item.entidad} · {item.estado}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">Hitos institucionales</h3>
          <div className="mt-5 space-y-4">
            {latestTimeline.map((item) => (
              <Link key={item.id} to="/historia" className="block rounded-2xl bg-slate-50 p-4 hover:bg-slate-100">
                <p className="font-bold text-slate-950">{item.titulo}</p>
                <p className="text-xs text-slate-500">{item.fecha} · {item.categoria}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
