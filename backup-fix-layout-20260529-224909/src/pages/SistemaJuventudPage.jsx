import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingPqrs from "../components/FloatingPqrs.jsx";
import { brand, Card, CardContent, SectionLabel, StatusPill, Button } from "../components/ui.jsx";
import { nivelesSistemaJuventud, mapaSistemaJuventud } from "../data/sistemaJuventud.js";
import { ArrowRight, GitBranch, Landmark, Network, Users, ExternalLink } from "lucide-react";

const iconos = [Landmark, Network, Users, GitBranch];

export default function SistemaJuventudPage() {
  return (
    <main className="min-h-screen bg-white text-[#2B2B2B]">
      <Header />

      <section className="relative overflow-hidden bg-slate-50 py-20">
        <img
          src="/brand/isotipo-cdj.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-80px] top-10 hidden w-[420px] opacity-10 lg:block"
        />

        <div className="relative mx-auto max-w-7xl px-5">
          <SectionLabel>Sistema de Juventud</SectionLabel>
          <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
            Del Sistema Nacional de Juventudes al territorio joven de Bogotá
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            Esta página ubica al Consejo Distrital de Juventud dentro de la arquitectura nacional, distrital y local
            de participación juvenil. El CDJ no es una entidad administrativa: es una instancia del Subsistema de
            Participación de las Juventudes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionLabel>Escala institucional y territorial</SectionLabel>
        <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
          La ruta va de lo nacional a lo microterritorial
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {nivelesSistemaJuventud.map((item, i) => {
            const Icon = iconos[i] || GitBranch;

            return (
              <Card key={item.titulo} className={item.titulo.includes("Consejo Distrital") ? "border-2 border-[#3871B7] shadow-xl" : ""}>
                <CardContent className="p-7">
                  <Icon className="mb-5 h-10 w-10" style={{ color: item.titulo.includes("Consejo Distrital") ? brand.blue : brand.gray }} />
                  <StatusPill tone={item.titulo.includes("Consejo Distrital") ? "blue" : "yellow"}>{item.nivel}</StatusPill>
                  <h3 className="mt-4 text-2xl font-black">{item.titulo}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{item.descripcion}</p>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                    <b>Base:</b> {item.norma}
                  </div>

                  <div className="mt-5 space-y-2">
                    {item.componentes.map((componente) => (
                      <div key={componente} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0" style={{ color: brand.blue }} />
                        <span>{componente}</span>
                      </div>
                    ))}
                  </div>

                  <a href={item.href} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="mt-6" style={{ borderColor: brand.blue, color: brand.blue }}>
                      Ver norma base <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-[#2B2B2B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: brand.yellow }}>
            Mapa del sistema
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Cómo se conecta la participación juvenil con la institucionalidad
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {mapaSistemaJuventud.map((bloque) => (
              <div key={bloque.titulo} className="rounded-[2rem] bg-white/10 p-7 ring-1 ring-white/10">
                <h3 className="text-2xl font-black">{bloque.titulo}</h3>

                <div className="mt-6 grid gap-4">
                  {bloque.hijos.map((hijo) => (
                    <div key={hijo.titulo} className="rounded-3xl bg-white/10 p-5">
                      <p className="font-black" style={{ color: brand.yellow }}>{hijo.titulo}</p>
                      <div className="mt-3 grid gap-2">
                        {hijo.hijos.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                            <GitBranch className="mt-1 h-4 w-4 shrink-0" style={{ color: brand.turquoise }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingPqrs />
      <Footer />
    </main>
  );
}
