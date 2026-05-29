
export const brand = {
  yellow: "#FBD416",
  coral: "#EE4C5B",
  turquoise: "#57C5CE",
  blue: "#3871B7",
  orange: "#F8A72C",
  pink: "#E5579D",
  black: "#2B2B2B",
  gray: "#545454",
  light: "#E7E3DF",
  white: "#FFFFFF",
};

export function Button({ children, variant = "solid", className = "", style = {}, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-black transition active:scale-[0.98]";
  const variants = {
    solid: "text-white hover:opacity-90",
    outline: "border-2 bg-white hover:bg-slate-50",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === "solid" ? { background: brand.blue, ...style } : style}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function SectionLabel({ children }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.blue }}>
      {children}
    </p>
  );
}

export function StatusPill({ children, tone = "blue" }) {
  const map = {
    blue: brand.blue,
    coral: brand.coral,
    yellow: brand.yellow,
    turquoise: brand.turquoise,
    black: brand.black,
  };
  const bg = map[tone] || brand.blue;
  const text = tone === "yellow" || tone === "turquoise" ? brand.black : brand.white;

  return (
    <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: bg, color: text }}>
      {children}
    </span>
  );
}

export function InfoCard({ icon: Icon, title, text, tag }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: brand.light }}>
            <Icon className="h-6 w-6" style={{ color: brand.blue }} />
          </div>
          {tag && <StatusPill tone="yellow">{tag}</StatusPill>}
        </div>
        <h3 className="text-xl font-black">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
      </CardContent>
    </Card>
  );
}
