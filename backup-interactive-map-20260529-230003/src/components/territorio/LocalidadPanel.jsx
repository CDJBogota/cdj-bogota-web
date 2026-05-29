import { ExternalLink, MapPin } from "lucide-react";

export default function LocalidadPanel({ localidad }) {
  if (!localidad) {
    return (
      <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <MapPin className="mb-4 h-8 w-8 text-[#3871B7]" />
        <h2 className="text-2xl font-black text-slate-950">Selecciona una localidad</h2>
        <p className="mt-3 leading-7 text-slate-600">Consulta delegado/a, prioridades, compromisos activos, documentos y estado de contacto.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-[#3871B7]">Ficha territorial</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{localidad.nombre}</h2>
      <div className="mt-5 space-y-3 text-sm text-slate-700">
        <p><b>Delegado/a al CDJ:</b> {localidad.delegadoCDJ}</p>
        <p><b>Correo CLJ:</b> {localidad.correoCLJ}</p>
        <p><b>Compromisos activos:</b> {localidad.compromisosActivos}</p>
        <p><b>Propuestas registradas:</b> {localidad.propuestas}</p>
        <p><b>Documentos:</b> {localidad.documentos}</p>
        <p><b>Última actualización:</b> {localidad.ultimaActualizacion}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <a href={`/cumplimiento?localidad=${encodeURIComponent(localidad.nombre)}`} className="rounded-2xl bg-[#3871B7] px-4 py-2 text-sm font-black text-white">
          Ver compromisos
        </a>
        <a href="/participa#alerta-territorial" className="inline-flex items-center rounded-2xl bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">
          Enviar alerta <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
