import type { Municipio } from "./types";

export const municipios: Municipio[] = [
  // ── Norte ──────────────────────────────────────────────────────────────────
  { id: "honda",            nombre: "Honda",             region: "norte" },
  { id: "mariquita",        nombre: "San Sebastián de Mariquita", region: "norte" },
  { id: "fresno",           nombre: "Fresno",            region: "norte" },
  { id: "armero-guayabal",  nombre: "Armero-Guayabal",   region: "norte" },
  { id: "libano",           nombre: "Líbano",            region: "norte" },
  { id: "lerida",           nombre: "Lérida",            region: "norte" },
  { id: "ambalema",         nombre: "Ambalema",          region: "norte" },
  { id: "venadillo",        nombre: "Venadillo",         region: "norte" },
  { id: "falan",            nombre: "Falan",             region: "norte" },
  { id: "herveo",           nombre: "Herveo",            region: "norte" },
  { id: "palocabildo",      nombre: "Palocabildo",       region: "norte" },
  { id: "casabianca",       nombre: "Casabianca",        region: "norte" },
  { id: "villahermosa",     nombre: "Villahermosa",      region: "norte" },
  { id: "murillo",          nombre: "Murillo",           region: "norte" },
  { id: "santa-isabel",     nombre: "Santa Isabel",      region: "norte" },

  // ── Centro ─────────────────────────────────────────────────────────────────
  { id: "ibague",           nombre: "Ibagué",            region: "centro" },
  { id: "piedras",          nombre: "Piedras",           region: "centro" },
  { id: "anzoategui",       nombre: "Anzoátegui",        region: "centro" },
  { id: "alvarado",         nombre: "Alvarado",          region: "centro" },
  { id: "coello",           nombre: "Coello",            region: "centro" },
  { id: "valle-san-juan",   nombre: "Valle de San Juan", region: "centro" },
  { id: "rovira",           nombre: "Rovira",            region: "centro" },
  { id: "el-guamo",         nombre: "El Guamo",          region: "centro" },

  // ── Oriente ────────────────────────────────────────────────────────────────
  { id: "melgar",           nombre: "Melgar",            region: "oriente" },
  { id: "flandes",          nombre: "Flandes",           region: "oriente" },
  { id: "el-espinal",       nombre: "El Espinal",        region: "oriente" },
  { id: "carmen-apicala",   nombre: "Carmen de Apicalá", region: "oriente" },
  { id: "cunday",           nombre: "Cunday",            region: "oriente" },
  { id: "icononzo",         nombre: "Icononzo",          region: "oriente" },
  { id: "villarrica",       nombre: "Villarrica",        region: "oriente" },
  { id: "suarez",           nombre: "Suárez",            region: "oriente" },

  // ── Sur ────────────────────────────────────────────────────────────────────
  { id: "chaparral",        nombre: "Chaparral",         region: "sur" },
  { id: "ataco",            nombre: "Ataco",             region: "sur" },
  { id: "planadas",         nombre: "Planadas",          region: "sur" },
  { id: "rioblanco",        nombre: "Rioblanco",         region: "sur" },
  { id: "natagaima",        nombre: "Natagaima",         region: "sur" },
  { id: "coyaima",          nombre: "Coyaima",           region: "sur" },
  { id: "ortega",           nombre: "Ortega",            region: "sur" },
  { id: "purificacion",     nombre: "Purificación",      region: "sur" },
  { id: "saldana",          nombre: "Saldaña",           region: "sur" },
  { id: "san-antonio",      nombre: "San Antonio",       region: "sur" },
  { id: "san-luis",         nombre: "San Luis",          region: "sur" },
  { id: "dolores",          nombre: "Dolores",           region: "sur" },
  { id: "alpujarra",        nombre: "Alpujarra",         region: "sur" },
  { id: "prado",            nombre: "Prado",             region: "sur" },

  // ── Occidente ──────────────────────────────────────────────────────────────
  { id: "cajamarca",        nombre: "Cajamarca",         region: "occidente" },
  { id: "roncesvalles",     nombre: "Roncesvalles",      region: "occidente" },
];

export const municipiosPorRegion = (region: Municipio["region"]) =>
  municipios.filter((m) => m.region === region);

export const getMunicipio = (id: string) =>
  municipios.find((m) => m.id === id);
