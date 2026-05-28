export const correoInstitucional = "ConsejoDistritaldeJuventud@gobiernobogota.gov.co";

export const correoEquipoJuventud = "juventud@gobiernobogota.gov.co";

export const socialLinks = [
  {
    name: "Instagram",
    handle: "@cdjbogotaoficial",
    href: "https://www.instagram.com/cdjbogotaoficial/",
    status: "verificado",
  },
  {
    name: "Facebook",
    handle: "CDJBOGOTAOFICIAL",
    href: "https://www.facebook.com/CDJBOGOTAOFICIAL/",
    status: "verificado",
  },
  {
    name: "X",
    handle: "@CDJBOGOFICIAL",
    href: "https://x.com/CDJBOGOFICIAL",
    status: "verificado",
  },
  {
    name: "TikTok",
    handle: "@cdjbogotaoficial",
    href: "https://www.tiktok.com/@cdjbogotaoficial",
    status: "verificado",
  },
  {
    name: "YouTube",
    handle: "@CDJ_BOGOTA.OFICIAL",
    href: "https://www.youtube.com/@CDJ_BOGOTA.OFICIAL",
    status: "verificado",
  },
];

export const externalNormativaLinks = {
  constitucion: "https://www.constitucioncolombia.com/",
  ley1622: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=52971",
  ley1885: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=85540",
  ley1755: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=65334",
  ley1712: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=56882",
  ley1581: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981",
};

export const cljEmails = {
  "Usaquén": "consejojuventud_usaquen@gobiernobogota.gov.co",
  "Chapinero": "consejojuventud_chapinero@gobiernobogota.gov.co",
  "Santa Fe": "consejojuventud_santafe@gobiernobogota.gov.co",
  "San Cristóbal": "consejojuventud_scristobal@gobiernobogota.gov.co",
  "Usme": "consejojuventud_usme@gobiernobogota.gov.co",
  "Tunjuelito": "consejojuventud_tunjuelito@gobiernobogota.gov.co",
  "Bosa": "consejojuventud_bosa@gobiernobogota.gov.co",
  "Kennedy": "consejojuventud_kennedy@gobiernobogota.gov.co",
  "Fontibón": "consejojuventud_fontibon@gobiernobogota.gov.co",
  "Engativá": "consejojuventud.engativa@gobiernobogota.gov.co",
  "Suba": "consejojuventud_suba@gobiernobogota.gov.co",
  "Barrios Unidos": "consejojuventud_bunidos@gobiernobogota.gov.co",
  "Teusaquillo": "consejojuventud_teusaquillo@gobiernobogota.gov.co",
  "Los Mártires": "consejojuventud_martires@gobiernobogota.gov.co",
  "Antonio Nariño": "consejojuventud_anarino@gobiernobogota.gov.co",
  "Puente Aranda": "consejojuventud_paranda@gobiernobogota.gov.co",
  "La Candelaria": "consejojuventud_candelaria@gobiernobogota.gov.co",
  "Rafael Uribe Uribe": "consejojuventud_ruribe@gobiernobogota.gov.co",
  "Ciudad Bolívar": "consejojuventud_ciudadbolivar@gobiernobogota.gov.co",
  "Sumapaz": "consejojuventud_sumapaz@gobiernobogota.gov.co",
};

export const mailtoLinks = {
  propuesta:
    "mailto:ConsejoDistritaldeJuventud@gobiernobogota.gov.co?subject=Propuesta%20ciudadana%20para%20el%20Consejo%20Distrital%20de%20Juventud&body=Nombre:%0D%0ALocalidad:%0D%0AOrganizaci%C3%B3n%20o%20proceso:%0D%0AAsunto:%0D%0ADescripci%C3%B3n%20de%20la%20propuesta:%0D%0ASoportes%20o%20enlaces:%0D%0A",
  pqrs:
    "mailto:ConsejoDistritaldeJuventud@gobiernobogota.gov.co?subject=PQRSD%20juvenil%20-%20Consejo%20Distrital%20de%20Juventud&body=Tipo%20de%20solicitud%20%28petici%C3%B3n%2C%20queja%2C%20reclamo%2C%20sugerencia%2C%20denuncia%20o%20solicitud%20de%20informaci%C3%B3n%29:%0D%0ANombre:%0D%0ALocalidad:%0D%0ACorreo%20de%20contacto:%0D%0AHechos%20o%20solicitud:%0D%0AEntidad%20relacionada%20si%20aplica:%0D%0ASoportes%20o%20enlaces:%0D%0A",
  documentos:
    "mailto:ConsejoDistritaldeJuventud@gobiernobogota.gov.co?subject=Solicitud%20de%20documentos%20del%20CDJ&body=Documento%20solicitado:%0D%0ANombre:%0D%0ACorreo:%0D%0AObservaciones:%0D%0A",
  equipoJuventud:
    "mailto:juventud@gobiernobogota.gov.co?subject=Consulta%20institucional%20sobre%20juventud%20-%20Bogot%C3%A1&body=Nombre:%0D%0AEntidad%20u%20organizaci%C3%B3n:%0D%0AAsunto:%0D%0ADescripci%C3%B3n:%0D%0A",
};

export function localidadMailto(localidad) {
  const correo = cljEmails[localidad] || correoInstitucional;
  const subject = encodeURIComponent(`Consulta territorial juvenil - ${localidad}`);
  const body = encodeURIComponent(
    `Localidad: ${localidad}\nNombre:\nOrganización o proceso:\nAsunto:\nDescripción:\n`
  );

  return `mailto:${correo}?cc=${correoInstitucional}&subject=${subject}&body=${body}`;
}
