import CumplimientoDashboard from "../components/dashboard/CumplimientoDashboard";

export default function CumplimientoPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Control social</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Tablero de cumplimiento</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Semáforo público para consultar compromisos, solicitudes, respuestas, vencimientos, soportes y próximas acciones del CDJ.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <CumplimientoDashboard />
      </section>
    </main>
  );
}
