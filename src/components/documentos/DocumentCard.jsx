import { Copy, Download, ExternalLink, FileText, LockKeyhole } from "lucide-react";

function hasRealUrl(value) {
  return value && value !== "#";
}

export default function DocumentCard({ doc }) {
  const citation = `${doc.titulo}. ${doc.entidad}, ${doc.fecha}.`;

  async function copyCitation() {
    await navigator.clipboard.writeText(citation);
    alert("Cita copiada al portapapeles.");
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#E7E3DF]">
            <FileText className="h-5 w-5 text-[#3871B7]" />
          </div>
          <div>
            <h3 className="font-black text-slate-950">{doc.titulo}</h3>
            <p className="mt-1 text-xs font-bold text-slate-500">{doc.tipo} · {doc.fecha} · {doc.comision}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{doc.estado}</span>
      </div>

      <p className="text-sm leading-6 text-slate-600">{doc.resumen}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {doc.etiquetas?.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">#{tag}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {hasRealUrl(doc.enlace) ? (
          <a href={doc.enlace} className="inline-flex items-center rounded-2xl bg-[#3871B7] px-4 py-2 text-sm font-black text-white">
            Descargar <Download className="ml-2 h-4 w-4" />
          </a>
        ) : (
          <a href="/participa#documento-no-publicado" className="inline-flex items-center rounded-2xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-600">
            Solicitar documento
          </a>
        )}

        {hasRealUrl(doc.soporte) ? (
          <a href={doc.soporte} className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-700">
            Ver soporte <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        ) : (
          <span className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-slate-500">
            Soporte pendiente
          </span>
        )}

        {doc.versionPublica ? (
          hasRealUrl(doc.enlace) ? (
            <a href={doc.enlace} className="inline-flex items-center rounded-2xl bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">
              Versión pública
            </a>
          ) : (
            <span className="inline-flex items-center rounded-2xl bg-[#FBD416] px-4 py-2 text-sm font-black text-slate-950">
              Versión pública pendiente
            </span>
          )
        ) : (
          <span className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-500">
            <LockKeyhole className="mr-2 h-4 w-4" />
            No publicable aún
          </span>
        )}

        <button onClick={copyCitation} className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-700">
          Copiar cita <Copy className="ml-2 h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
