const estadoStyles = {
  actualizado: "bg-emerald-100 text-emerald-800",
  parcial: "bg-amber-100 text-amber-800",
  pendiente: "bg-red-100 text-red-800",
  "agenda-activa": "bg-sky-100 text-sky-800",
};

const estadoLabels = {
  actualizado: "Contacto actualizado",
  parcial: "Información parcial",
  pendiente: "Pendiente de datos",
  "agenda-activa": "Agenda activa",
};

export default function LocalidadCard({ localidad, onSelect }) {
  return (
    <button
      onClick={() => onSelect(localidad)}
      className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-black text-slate-950">{localidad.nombre}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${estadoStyles[localidad.estadoContacto]}`}>
          {estadoLabels[localidad.estadoContacto]}
        </span>
      </div>
      <p className="text-sm text-slate-600"><b>Delegado/a:</b> {localidad.delegadoCDJ}</p>
      <p className="mt-1 text-sm text-slate-600"><b>Compromisos activos:</b> {localidad.compromisosActivos}</p>
      <p className="mt-1 text-sm text-slate-600"><b>Propuestas:</b> {localidad.propuestas}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {localidad.prioridades.map((item) => (
          <span key={item} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">{item}</span>
        ))}
      </div>
    </button>
  );
}
