export default function IndicadorCard({ label, value, detail }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-4xl font-black text-[#3871B7]">{value}</p>
      <p className="mt-1 font-black text-slate-950">{label}</p>
      {detail && <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>}
    </div>
  );
}
