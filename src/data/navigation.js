export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Consejo", href: "/institucional" },
  { label: "Integrantes", href: "/integrantes" },
  { label: "Territorio", href: "/localidades" },
  { label: "Transparencia", href: "/transparencia" },
  { label: "Participa", href: "/participa" },
];

export const transparenciaMenu = [
  { label: "Documentos", href: "/documentos" },
  { label: "Actas", href: "/documentos?tipo=Acta" },
  { label: "Compromisos", href: "/cumplimiento" },
  { label: "Línea de tiempo", href: "/historia" },
  { label: "Informes", href: "/documentos?tipo=Informe" },
  { label: "Datos abiertos", href: "/documentos?tipo=Datos%20abiertos" },
  { label: "Tratamiento de datos", href: "/transparencia#tratamiento-datos" },
];

export const participaMenu = [
  { label: "Enviar propuesta", href: "/participa#propuesta" },
  { label: "Reportar alerta territorial", href: "/participa#alerta-territorial" },
  { label: "Solicitar acompañamiento", href: "/participa#acompanamiento" },
  { label: "Inscribir organización/proceso juvenil", href: "/participa#organizacion" },
  { label: "Consultar estado de solicitud", href: "/cumplimiento" },
  { label: "Contactar al CDJ", href: "/participa#contacto" },
];

export const territorioMenu = [
  { label: "Ver mapa", href: "/mapa-territorial" },
  { label: "Ver localidades", href: "/localidades" },
  { label: "Ver compromisos por localidad", href: "/cumplimiento?filtro=localidad" },
  { label: "Ver correos de CLJ", href: "/localidades#correos" },
  { label: "Enviar alerta territorial", href: "/participa#alerta-territorial" },
];

export const documentosMenu = [
  { label: "Buscar", action: "buscar" },
  { label: "Descargar", action: "descargar" },
  { label: "Ver soporte", action: "soporte" },
  { label: "Ver versión pública", action: "version-publica" },
  { label: "Copiar cita", action: "copiar-cita" },
  { label: "Reportar error documental", href: "/participa#error-documental" },
  { label: "Solicitar documento no publicado", href: "/participa#documento-no-publicado" },
];

export const cumplimientoMenu = [
  { label: "Filtrar por entidad", action: "entidad" },
  { label: "Filtrar por localidad", action: "localidad" },
  { label: "Filtrar vencidos", action: "vencidos" },
  { label: "Exportar CSV", action: "exportar-csv" },
  { label: "Ver soporte", action: "soporte" },
  { label: "Reportar actualización", href: "/participa#actualizacion" },
  { label: "Solicitar seguimiento", href: "/participa#seguimiento" },
];
