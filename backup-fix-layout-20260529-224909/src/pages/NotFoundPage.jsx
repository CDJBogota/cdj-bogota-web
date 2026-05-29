import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-24 text-center">
      <p className="text-8xl font-black text-[#3871B7]">404</p>
      <h1 className="mt-4 text-4xl font-black text-slate-950">Página no encontrada</h1>
      <p className="mt-4 text-slate-600">La ruta que intentas abrir no existe o fue movida.</p>
      <Link to="/" className="mt-8 inline-flex rounded-2xl bg-[#3871B7] px-6 py-3 font-black text-white">
        Volver al inicio
      </Link>
    </main>
  );
}
