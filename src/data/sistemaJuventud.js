import { externalNormativaLinks } from "./links.js";

export const nivelesSistemaJuventud = [
  {
    nivel: "Nacional",
    titulo: "Sistema Nacional de Juventudes",
    descripcion:
      "Marco nacional creado por el Estatuto de Ciudadanía Juvenil para articular actores, procesos, instancias, herramientas jurídicas, agendas, planes, programas y proyectos dirigidos a la garantía de derechos de las juventudes.",
    norma: "Ley 1622 de 2013 y Ley 1885 de 2018",
    href: externalNormativaLinks.ley1622,
    componentes: [
      "Subsistema Institucional de las Juventudes",
      "Subsistema de Participación de las Juventudes",
      "Comisiones de Concertación y Decisión",
      "Consejos de Juventud",
      "Plataformas juveniles",
      "Asambleas juveniles",
    ],
  },
  {
    nivel: "Distrital",
    titulo: "Sistema Distrital de Juventud de Bogotá",
    descripcion:
      "Sistema de articulación distrital para coordinar institucionalidad, participación juvenil, política pública, seguimiento, concertación y evaluación de acciones dirigidas a jóvenes en Bogotá.",
    norma: "Decreto Distrital 499 de 2011 y Decreto Distrital 628 de 2025",
    href: externalNormativaLinks.decreto628_2025,
    componentes: [
      "Subsistema Institucional de Juventudes",
      "Subsistema de Participación de las Juventudes",
      "Instancias de coordinación y concertación",
      "Política Pública de Juventud",
      "Sectores administrativos distritales",
      "Alcaldías locales",
    ],
  },
  {
    nivel: "Participación Distrital",
    titulo: "Consejo Distrital de Juventud de Bogotá",
    descripcion:
      "Instancia autónoma de participación, interlocución, concertación, vigilancia y control social de las juventudes del Distrito Capital. Se ubica dentro del Subsistema de Participación de las Juventudes.",
    norma: "Estatuto de Ciudadanía Juvenil y Reglamento Interno CDJ",
    href: externalNormativaLinks.ley1885,
    componentes: [
      "Plenaria del CDJ",
      "Mesa Directiva",
      "Comisiones permanentes",
      "Comisiones accidentales",
      "Delegaciones externas",
      "Archivo y trazabilidad documental",
    ],
  },
  {
    nivel: "Local",
    titulo: "Consejos Locales de Juventud",
    descripcion:
      "Instancias de representación juvenil por localidad. Permiten recoger problemáticas, agendas, propuestas, alertas territoriales y rutas de interlocución con alcaldías locales y entidades distritales.",
    norma: "Ley 1622 de 2013, Ley 1885 de 2018 y normativa distrital aplicable",
    href: externalNormativaLinks.ley1885,
    componentes: [
      "CLJ por localidad",
      "Asambleas juveniles locales",
      "Plataformas juveniles locales",
      "Procesos juveniles territoriales",
      "Organizaciones juveniles",
      "Interlocución con alcaldías locales",
    ],
  },
];

export const mapaSistemaJuventud = [
  {
    titulo: "Sistema Nacional de Juventudes",
    hijos: [
      {
        titulo: "Subsistema Institucional",
        hijos: ["Consejo Nacional de Políticas Públicas de Juventud", "Instancias territoriales de juventud"],
      },
      {
        titulo: "Subsistema de Participación",
        hijos: ["Consejos de Juventud", "Plataformas juveniles", "Asambleas juveniles"],
      },
      {
        titulo: "Concertación y decisión",
        hijos: ["Comisiones de Concertación y Decisión", "Agendas juveniles", "Seguimiento a compromisos"],
      },
    ],
  },
  {
    titulo: "Sistema Distrital de Juventud de Bogotá",
    hijos: [
      {
        titulo: "Subsistema Institucional Distrital",
        hijos: ["Secretarías distritales", "Alcaldías locales", "Entidades y sectores responsables"],
      },
      {
        titulo: "Subsistema de Participación Distrital",
        hijos: ["Consejo Distrital de Juventud", "Consejos Locales de Juventud", "Plataformas y procesos juveniles"],
      },
      {
        titulo: "Microterritorio",
        hijos: ["Localidades", "UPZ/UPL", "Barrios", "Instituciones educativas", "Organizaciones juveniles"],
      },
    ],
  },
];
