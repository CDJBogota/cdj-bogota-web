import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import { brand, Card, CardContent, SectionLabel, StatusPill, Button } from "../components/ui.jsx";
import { Eye, Radio, PenLine, Send, ClipboardList, FileText } from "lucide-react";
import { mailtoLinks } from "../data/links.js";

const comisiones = [
  {
    icon: Eye,
    nombre: "Control y Veeduría",
    tipo: "Permanente",
    objetivo:
      "Hacer seguimiento a políticas públicas, programas, planes, compromisos, respuestas institucionales, presupuestos y gestión pública relacionada con juventudes.",
    productos: ["Matriz de compromisos", "Alertas de incumplimiento", "Informes de seguimiento", "Solicitudes a entidades"],
  },
  {
    icon: Radio,
    nombre: "Comunicación y Asuntos Públicos",
    tipo: "Permanente",
    objetivo:
      "Coordinar la comunicación interna y externa del Consejo, difusión de decisiones, pedagogía pública, redes sociales, comunicados e imagen institucional.",
    productos: ["Comunicados", "Piezas de difusión", "Boletines", "Estrategia de redes"],
  },
  {
    icon: PenLine,
    nombre: "Planeación y Formulación",
    tipo: "Permanente",
    objetivo:
      "Formular propuestas, documentos técnicos, planes de trabajo, rutas de incidencia, diagnósticos y proyectos para discusión del Consejo.",
    productos: ["Propuestas", "Documentos técnicos", "Planes de trabajo", "Conceptos y recomendaciones"],
  },
];

export default function ComisionesPage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]">
      <Header />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionLabel>Comisiones</SectionLabel>
          <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
            Trabajo permanente y especializado del Consejo
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            Las comisiones permiten organizar el trabajo interno, distribuir responsabilidades, preparar documentos,
            hacer seguimiento y presentar productos a la Plenaria del CDJ.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {comisiones.map(({ icon: Icon, nombre, tipo, objetivo, productos }) => (
            <Card key={nombre} className="h-full transition hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-7">
                <Icon className="mb-5 h-10 w-10" style={{ color: brand.blue }} />
                <StatusPill tone="yellow">{tipo}</StatusPill>
                <h2 className="mt-4 text-2xl font-black">{nombre}</h2>
                <p className="mt-4 leading-7 text-slate-600">{objetivo}</p>

                <div className="mt-6 space-y-2">
                  {productos.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                      <ClipboardList className="mt-1 h-4 w-4 shrink-0" style={{ color: brand.blue }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <a href={mailtoLinks.propuesta}>
                  <Button className="mt-6">
                    Contactar comisión <Send className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>
            Comisiones accidentales
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Equipos temporales para asuntos específicos
          </h2>
          <p className="mt-5 max-w-4xl leading-8 text-slate-300">
            Además de las comisiones permanentes, el Consejo puede organizar comisiones accidentales para estudiar temas
            concretos, preparar documentos, hacer seguimiento a coyunturas o atender asuntos definidos por la Plenaria.
          </p>

          <div className="mt-8 rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
            <FileText className="mb-4 h-9 w-9" style={{ color: brand.yellow }} />
            <p className="text-xl font-black">Regla de gestión documental</p>
            <p className="mt-3 leading-7 text-slate-300">
              Cada comisión debe dejar actas, responsables, tareas, productos, soportes y estado de avance para garantizar
              trazabilidad y empalme.
            </p>
          </div>
        </div>
      </section>

      <FloatingPqrs />
      <Footer />
    </main>
  );
}
