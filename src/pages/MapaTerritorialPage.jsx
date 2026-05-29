import MapaBogota from "../components/territorio/MapaBogota";

export default function MapaTerritorialPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#3871B7]">Territorio</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Mapa de Bogotá por localidades</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Consulta estado de contacto, delegaciones, prioridades, documentos, propuestas y compromisos activos por localidad.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <MapaBogota />
      </section>
    </main>
  );
}
