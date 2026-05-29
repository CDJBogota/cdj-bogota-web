import { ExternalLink, FileText, Mail, MapPin, Users } from "lucide-react";
import { estadoTerritorial } from "../../data/localidades";

export default function LocalidadPanel({ localidad }) {
  if (!localidad) {
    return (
      <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <MapPin className="mb-4 h-8 w-8 text-[#3871B7]" />
        <h2 className="text-2xl font-black text-slate-950">Selecciona una localidad</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Consulta delegado/a, CLJ, prioridades, compromisos activos, documentos, organizaciones y estado de contacto.
        </p>
      </aside>
    );
  }

  const estado = estadoTerritorial[localidad.estadoContacto] || estadoTerritorial.pendiente;

  return (
    <aside className="sticky top-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3871B7]">
            Ficha territorial
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">{localidad.nombre}</h2>
          <p className="mt-1 text-sm font-bold text-slate-500">{localidad.zona}</p>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-black ${estado.className}`}>
          {estado.label}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{localidad.descripcion}</p>

      <div className="mt-6 grid gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 font-black text-slate-950">
            <Users className="h-4 w-4 text-[#3871B7]" />
            Consejo Local de Juventud
          </div>
          <p className="text-sm text-slate-600"><b>Delegado/a al CDJ:</b> {localidad.delegadoCDJ}</p>
          <p className="mt-1 text-sm text-slate-600"><b>Correo CLJ:</b> {localidad.correoCLJ}</p>
          <p className="mt-1 text-sm text-slate-600"><b>Correo institucional:</b> {localidad.correoInstitucional}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 font-black text-slate-950">
            <FileText className="h-4 w-4 text-[#3871B7]" />
            Seguimiento territorial
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white p-3">
              <p className="text-2xl font-black text-[#3871B7]">{localidad.compromisosActivos}</p>
              <p className="text-[11px] font-bold text-slate-500">Compromisos</p>
            </div>
            <div className="rounded-xl bg-white p-3">
              <p className="text-2xl font-black text-[#EE4C5B]">{localidad.propuestas}</p>
              <p className="text-[11px] font-bold text-slate-500">Propuestas</p>
            </div>
            <div className="rounded-xl bg-white p-3">
              <p className="text-2xl font-black text-[#F8A72C]">{localidad.documentos}</p>
              <p className="text-[11px] font-bold text-slate-500">Docs</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="mb-3 font-black text-slate-950">Prioridades juveniles</p>
          <div className="flex flex-wrap gap-2">
            {localidad.prioridades.map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs font-bold text-slate-500">
        Última actualización: {localidad.ultimaActualizacion}
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <a
          href={`/cumplimiento?localidad=${encodeURIComponent(localidad.nombre)}`}
          className="inline-flex items-center justify-center rounded-2xl bg-[#3871B7] px-4 py-3 text-sm font-black text-white"
        >
          Ver compromisos
        </a>

        <a
          href="/participa#alerta-territorial"
          className="inline-flex items-center justify-center rounded-2xl bg-[#FBD416] px-4 py-3 text-sm font-black text-slate-950"
        >
          Enviar alerta
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>

        <a
          href="/documentos"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700"
        >
          Ver documentos
        </a>

        <a
          href="/participa#contacto"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700"
        >
          Contactar
          <Mail className="ml-2 h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
