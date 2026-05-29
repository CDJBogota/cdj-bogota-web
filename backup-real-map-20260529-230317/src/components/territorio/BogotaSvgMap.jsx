import { estadoTerritorial } from "../../data/localidades";

export default function BogotaSvgMap({ localidades, selectedId, onSelect }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3871B7]">
            Mapa interactivo
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">
            Bogotá por localidades
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Haz clic sobre una localidad para consultar su ficha territorial, CLJ, prioridades,
            compromisos, documentos y canales pendientes de validación.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-black">
          {Object.entries(estadoTerritorial).map(([key, item]) => (
            <span key={key} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-slate-700">
              <span className="h-3 w-3 rounded-full" style={{ background: item.fill }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_.34fr]">
        <div className="overflow-hidden rounded-[1.5rem] bg-slate-50 p-3">
          <svg
            viewBox="-12 0 300 780"
            role="img"
            aria-label="Mapa interactivo esquemático de Bogotá por localidades"
            className="mx-auto h-[720px] max-h-[75vh] w-full max-w-xl"
          >
            <defs>
              <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="7" floodOpacity="0.18" />
              </filter>
            </defs>

            <g filter="url(#mapShadow)">
              {localidades.map((loc) => {
                const isSelected = loc.id === selectedId;
                const meta = estadoTerritorial[loc.estadoContacto] || estadoTerritorial.pendiente;

                return (
                  <g key={loc.id}>
                    <polygon
                      points={loc.shape}
                      fill={meta.fill}
                      stroke={isSelected ? "#2B2B2B" : "#ffffff"}
                      strokeWidth={isSelected ? 4 : 2.5}
                      opacity={isSelected ? 1 : 0.88}
                      className="cursor-pointer transition hover:opacity-100"
                      onClick={() => onSelect(loc)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") onSelect(loc);
                      }}
                      tabIndex={0}
                      aria-label={`Seleccionar ${loc.nombre}`}
                    >
                      <title>{loc.nombre}</title>
                    </polygon>

                    <circle
                      cx={loc.label.x}
                      cy={loc.label.y}
                      r={isSelected ? 5 : 3.5}
                      fill="#2B2B2B"
                      opacity="0.75"
                      pointerEvents="none"
                    />

                    <text
                      x={loc.label.x}
                      y={loc.label.y - 8}
                      textAnchor="middle"
                      fontSize={loc.nombre.length > 13 ? 7.5 : 9}
                      fontWeight="900"
                      fill="#2B2B2B"
                      paintOrder="stroke"
                      stroke="#ffffff"
                      strokeWidth="3"
                      pointerEvents="none"
                    >
                      {loc.nombre.length > 16 ? loc.nombre.split(" ")[0] : loc.nombre}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="rounded-[1.5rem] bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-950">Lectura rápida</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Este mapa permite pasar de una página informativa a una lectura territorial del CDJ:
            quién representa cada localidad, qué temas están priorizados y qué compromisos deben
            seguirse.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#3871B7]">{localidades.length}</p>
              <p className="text-sm font-bold text-slate-600">Localidades cargadas</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#EE4C5B]">
                {localidades.reduce((acc, item) => acc + item.compromisosActivos, 0)}
              </p>
              <p className="text-sm font-bold text-slate-600">Compromisos activos estimados</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-3xl font-black text-[#F8A72C]">
                {localidades.reduce((acc, item) => acc + item.propuestas, 0)}
              </p>
              <p className="text-sm font-bold text-slate-600">Propuestas registrables</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
