import { estadosCompromiso } from "../../data/compromisos";

export default function SemaforoEstado({ estado }) {
  const meta = estadosCompromiso[estado] || estadosCompromiso["cerrado"];
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${meta.className}`}>
      {meta.label}
    </span>
  );
}
