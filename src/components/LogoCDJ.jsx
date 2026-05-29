export default function LogoCDJ({ size = "h-14 sm:h-16 md:h-20" }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/brand/logo-horizontal.png"
        alt="Consejo Distrital de Juventud de Bogotá"
        className={`${size} w-auto object-contain`}
      />
    </div>
  );
}
