import type { Producto } from "./types";

// ── Moda images ─────────────────────────────────────────────────────────────
import imgHodieGris from "@/assets/images/Hodie-gris.jpg";
import imgCamisetaBlanca from "@/assets/images/Camiseta-blanca-basica.jpg";
import imgSudaderaVerde from "@/assets/images/Sudadera-verde-oliva.jpg";
import imgPoloAzul from "@/assets/images/Polo-azul-manga-corta.jpg";
import imgJeanAzul from "@/assets/images/jean-azul-slim-fit.jpg";
import imgGorraNegra from "@/assets/images/Gorra-negra-panel-plano.jpg";
import imgMochilaCafe from "@/assets/images/Mochila-cafe-cuero-sintetico.jpg";
import imgCinturon from "@/assets/images/Cinturon-trenzado-marron.jpg";
import imgToteBag from "@/assets/images/Tote-bag-lona-cafe.jpg";
import imgSandalias from "@/assets/images/sandalias-cuero-cafe.jpg";
import imgTenis from "@/assets/images/tenis-blancos-lona.jpg";
import imgChaleco from "@/assets/images/chaleco-denim-azul.jpg";
import imgTieDye from "@/assets/images/camiseta-tie-dye.morada.jpg";
import imgBolsoTejido from "@/assets/images/Bolso-tejido-multicolor.jpg";
import imgManilla from "@/assets/images/Manilla-hilo-encerado.jpg";

// ── New category images ──────────────────────────────────────────────────────
import imgCerveza from "@/assets/images/Cerveza-artesanal-la-patrona.jpg";
import imgMielCocoma from "@/assets/images/Miel-cocomá.jpg";
import imgPastel from "@/assets/images/pastel-dulce-primavera.jpg";
import imgCafeTolima from "@/assets/images/Cafe-colina-tolimense.jpg";
import imgPocillos from "@/assets/images/Juego-de-pocillos-decorados.jpg";
import imgVelas from "@/assets/images/Velas-aromaticas-manzanilla.jpg";
import imgPlatosCeramica from "@/assets/images/Juego-de-platos-ceramica.jpg";
import imgEspejo from "@/assets/images/Espejo-decorado.jpg";
import imgLampara from "@/assets/images/Lampara-de-mesa.jpg";
import imgShampoo from "@/assets/images/Shampoo-natural-coco.jpg";
import imgGelBano from "@/assets/images/Gel-para-baño.jpg";
import imgCremaArrugas from "@/assets/images/Crema-anti-arrugas.jpg";
import imgCremaHidratante from "@/assets/images/Crema-hidratante.jpg";
import imgBrocha from "@/assets/images/Brocha-pequeña.jpg";
import imgCafetera from "@/assets/images/Cafetera-Braun.jpg";
import imgCargador from "@/assets/images/Cargador-portatil.jpg";
import imgAirFryer from "@/assets/images/Air-fryer-Philips.jpg";
import imgForroIphone from "@/assets/images/Forro-para-Iphone.jpg";
import imgAudifonos from "@/assets/images/Audifonos-tipo-casco-sony.jpg";
import imgLapices from "@/assets/images/Lapices-de-colores.jpg";
import imgLibretas from "@/assets/images/Libretas.jpg";
import imgKitJuegos from "@/assets/images/Kit-de-juegos-artesanal-infantil.jpg";

export const productos: Producto[] = [
  // ── Streetwear ─────────────────────────────────────────────────────────────
  {
    id: "1",
    nombre: "Hoodie gris oversize",
    precio: 89900,
    precioOriginal: 105000,
    descuento: 15,
    vendedorId: "v-001",
    municipio: "ibague",
    categoria: "Streetwear",
    descripcion:
      "Buzo oversize con bordado de motivos Pijao en el pecho. Algodón pesado 350g, interior afelpado. " +
      "Vinotinto con detalles en dorado. Talla única amplia.",
    imageUrl: imgHodieGris,
    rating: 4.9,
    totalReseñas: 34,
    stock: 12,
    esNuevo: false,
    tags: ["hoodie", "pijao", "oversize", "bordado", "vinotinto"],
  },
  {
    id: "2",
    nombre: "Camiseta blanca básica",
    precio: 52000,
    vendedorId: "v-008",
    municipio: "purificacion",
    categoria: "Streetwear",
    descripcion:
      "Camiseta de algodón 100% con gráfico serigrafía que representa el mapa del Tolima y el río Magdalena. " +
      "Corte relajado, cuello redondo reforzado. Disponible en crema y negro.",
    imageUrl: imgCamisetaBlanca,
    rating: 4.7,
    totalReseñas: 21,
    stock: 30,
    esNuevo: false,
    tags: ["camiseta", "tolima", "serigrafía", "mapa", "algodón"],
  },
  {
    id: "3",
    nombre: "Sudadera verde oliva",
    precio: 98000,
    vendedorId: "v-004",
    municipio: "libano",
    categoria: "Streetwear",
    descripcion:
      "Sudadera crew-neck en color verde musgo, inspirada en los páramos del Líbano. " +
      "Tela técnica reciclada con bolsillo canguro y costuras reforzadas. Producción limitada.",
    imageUrl: imgSudaderaVerde,
    rating: 4.8,
    totalReseñas: 18,
    stock: 6,
    esNuevo: true,
    tags: ["sudadera", "páramo", "sostenible", "líbano", "verde"],
  },
  {
    id: "4",
    nombre: "Polo azul manga corta",
    precio: 62000,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Streetwear",
    descripcion:
      "Polo de punto piqué con bordado del Puente de Navarro en el lado izquierdo del pecho. " +
      "Paleta de colores ocre y blanco, referencia directa a la arquitectura colonial de Honda.",
    imageUrl: imgPoloAzul,
    rating: 4.6,
    totalReseñas: 12,
    stock: 20,
    esNuevo: false,
    tags: ["polo", "honda", "patrimonio", "punto-piqué", "colonial"],
  },
  {
    id: "5",
    nombre: "Chaqueta negra ligera",
    precio: 175000,
    precioOriginal: 195000,
    descuento: 10,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Streetwear",
    descripcion:
      "Chaqueta tipo bomber en tela impermeable color azul oscuro con parches bordados del Magdalena. " +
      "Forro interior estampado con mapa fluvial del Tolima. Ideal para el frío ribereño.",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    rating: 5.0,
    totalReseñas: 27,
    stock: 5,
    esNuevo: false,
    tags: ["chaqueta", "bomber", "magdalena", "impermeable", "bordados"],
  },
  {
    id: "6",
    nombre: "Jean azul slim fit",
    precio: 95000,
    precioOriginal: 115000,
    descuento: 20,
    vendedorId: "v-008",
    municipio: "purificacion",
    categoria: "Streetwear",
    descripcion:
      "Segunda edición de la colección Pijao Nation. Serigrafía en cuatro tintas con iconografía indígena " +
      "reinterpretada. Algodón 180g, corte unisex. Edición numerada de 80 unidades.",
    imageUrl: imgJeanAzul,
    rating: 4.9,
    totalReseñas: 41,
    stock: 14,
    esNuevo: false,
    tags: ["jean", "slim", "denim", "azul", "clásico"],
  },

  // ── Accesorios ─────────────────────────────────────────────────────────────
  {
    id: "7",
    nombre: "Gorra negra panel plano",
    precio: 35000,
    vendedorId: "v-005",
    municipio: "mariquita",
    categoria: "Accesorios",
    descripcion:
      "Gorra dad hat en denim lavado con bordado del río Magdalena en hilo dorado. " +
      "Ajuste trasero metálico, visera curva. Un clásico del norte tolimense.",
    imageUrl: imgGorraNegra,
    rating: 4.7,
    totalReseñas: 15,
    stock: 25,
    esNuevo: true,
    tags: ["gorra", "denim", "magdalena", "bordado", "dad-hat"],
  },
  {
    id: "8",
    nombre: "Mochila café cuero sintético",
    precio: 85000,
    vendedorId: "v-001",
    municipio: "ibague",
    categoria: "Accesorios",
    descripcion:
      "Mochila urbana en lona reciclada color café con parches bordados de ramas de café tolimense. " +
      "Compartimento para laptop 14\", correas acolchadas. Producción artesanal del Líbano.",
    imageUrl: imgMochilaCafe,
    rating: 4.8,
    totalReseñas: 29,
    stock: 18,
    esNuevo: true,
    tags: ["mochila", "café", "reciclado", "artesanal", "líbano"],
  },
  {
    id: "9",
    nombre: "Cinturón trenzado marrón",
    precio: 28000,
    vendedorId: "v-004",
    municipio: "libano",
    categoria: "Accesorios",
    descripcion:
      "Cinturón en cuero curtido con hebilla artesanal y decoración de chaquira inspirada en la cultura Pijao. " +
      "Ancho 3cm, largo ajustable de 80 a 110cm. Acabado a mano.",
    imageUrl: imgCinturon,
    rating: 4.6,
    totalReseñas: 11,
    stock: 8,
    esNuevo: false,
    tags: ["cinturón", "cuero", "trenzado", "marrón", "artesanal"],
  },
  {
    id: "10",
    nombre: "Tote bag lona beige",
    precio: 42000,
    vendedorId: "v-007",
    municipio: "el-espinal",
    categoria: "Accesorios",
    descripcion:
      "Tote bag en lona natural con serigrafía del skyline de Ibagué y el nevado del Tolima al fondo. " +
      "Asas largas reforzadas, capacidad 15L. Perfecto para el mercado o la universidad.",
    imageUrl: imgToteBag,
    rating: 4.9,
    totalReseñas: 38,
    stock: 7,
    esNuevo: false,
    tags: ["tote-bag", "lona", "beige", "artesanal", "mercado"],
  },

  // ── Calzado ────────────────────────────────────────────────────────────────
  {
    id: "11",
    nombre: "Sandalias cuero café",
    precio: 78000,
    precioOriginal: 95000,
    descuento: 25,
    vendedorId: "v-004",
    municipio: "libano",
    categoria: "Calzado",
    descripcion:
      "Sandalias de cuero curtido artesanalmente en Honda. Plantilla acolchada en cuero natural, " +
      "suela de caucho antideslizante. Ajuste con hebilla de bronce. Tallas 35–42.",
    imageUrl: imgSandalias,
    rating: 4.8,
    totalReseñas: 22,
    stock: 10,
    esNuevo: false,
    tags: ["sandalias", "cuero", "honda", "artesanal", "verano"],
  },
  {
    id: "12",
    nombre: "Tenis blancos lona",
    precio: 120000,
    vendedorId: "v-007",
    municipio: "el-espinal",
    categoria: "Calzado",
    descripcion:
      "Zapatillas canvas de lona con estampado exclusivo de granos de café y hojas de café tolimense. " +
      "Puntera reforzada, cordones de algodón natural. Suela vulcanizada. Tallas 35–45.",
    imageUrl: imgTenis,
    rating: 4.7,
    totalReseñas: 16,
    stock: 15,
    esNuevo: false,
    tags: ["tenis", "canvas", "blancos", "lona", "vulcanizado"],
  },

  // ── Vintage ────────────────────────────────────────────────────────────────
  {
    id: "13",
    nombre: "Chaleco denim azul",
    precio: 88000,
    vendedorId: "v-002",
    municipio: "el-espinal",
    categoria: "Vintage",
    descripcion:
      "Chaleco denim clásico sin mangas con parches coleccionables de municipios del Tolima. " +
      "Lavado desgastado a la piedra. Ideal para customizar y coleccionar.",
    imageUrl: imgChaleco,
    rating: 4.6,
    totalReseñas: 19,
    stock: 9,
    esNuevo: true,
    tags: ["chaleco", "denim", "azul", "vintage", "coleccionable"],
  },
  {
    id: "14",
    nombre: "Camiseta tie-dye morada",
    precio: 55000,
    vendedorId: "v-002",
    municipio: "el-espinal",
    categoria: "Vintage",
    descripcion:
      "Jean recto de corte retro años 90, lavado vintage con desgastes manuales. " +
      "Parche bordado del escudo del Espinal en el bolsillo trasero. Algodón 100% denim.",
    imageUrl: imgTieDye,
    rating: 4.5,
    totalReseñas: 14,
    stock: 6,
    esNuevo: false,
    tags: ["camiseta", "tie-dye", "morada", "vintage", "retro"],
  },

  // ── Artesanal ──────────────────────────────────────────────────────────────
  {
    id: "15",
    nombre: "Bolso tejido multicolor",
    precio: 65000,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Artesanal",
    descripcion:
      "Bufanda en lana de oveja teñida con tintes naturales de la región cafetera. " +
      "Tejida a mano en telar vertical, patrón geométrico andino. 180 x 35 cm.",
    imageUrl: imgBolsoTejido,
    rating: 4.8,
    totalReseñas: 33,
    stock: 11,
    esNuevo: false,
    tags: ["bolso", "tejido", "multicolor", "artesanal", "lana"],
  },
  {
    id: "16",
    nombre: "Manilla hilo encerado",
    precio: 15000,
    vendedorId: "v-006",
    municipio: "chaparral",
    categoria: "Artesanal",
    descripcion:
      "Collar artesanal elaborado con semillas nativas del Tolima: tagua, chaquira y acaí. " +
      "Tejido en macramé con hilo encerado. Pieza única, no hay dos iguales.",
    imageUrl: imgManilla,
    rating: 4.7,
    totalReseñas: 25,
    stock: 14,
    esNuevo: false,
    tags: ["manilla", "hilo", "encerado", "artesanal", "pijao"],
  },

  // ── Alimentacion ───────────────────────────────────────────────────────────
  {
    id: "17",
    nombre: "Cerveza artesanal La Patrona",
    precio: 12000,
    vendedorId: "v-006",
    municipio: "chaparral",
    categoria: "Alimentacion",
    descripcion:
      "Cerveza rubia artesanal elaborada con agua de manantial del sur del Tolima y cebada malteada local. " +
      "Fermentación lenta de 14 días, leve toque frutal y final seco. Botella 330ml.",
    imageUrl: imgCerveza,
    rating: 4.8,
    totalReseñas: 42,
    stock: 60,
    esNuevo: true,
    tags: ["cerveza", "artesanal", "chaparral", "rubia", "local"],
  },
  {
    id: "18",
    nombre: "Miel de Cocomá",
    precio: 28000,
    vendedorId: "v-004",
    municipio: "libano",
    categoria: "Alimentacion",
    descripcion:
      "Miel pura de abejas nativas recolectada en los bosques de Cocomá, al norte del Tolima. " +
      "Sin procesar, sin aditivos. Rica en enzimas y antioxidantes. Frasco de 500g.",
    imageUrl: imgMielCocoma,
    rating: 4.9,
    totalReseñas: 31,
    stock: 24,
    esNuevo: false,
    tags: ["miel", "natural", "cocomá", "orgánica", "abejas"],
  },
  {
    id: "19",
    nombre: "Pastel Dulce Primavera",
    precio: 35000,
    vendedorId: "v-005",
    municipio: "mariquita",
    categoria: "Alimentacion",
    descripcion:
      "Pastel artesanal horneado al estilo de Mariquita, con base de bizcochuelo de vainilla, " +
      "crema pastelera y frutas tropicales de temporada. Porción individual 200g. Pedido con 24h anticipación.",
    imageUrl: imgPastel,
    rating: 4.7,
    totalReseñas: 18,
    stock: 10,
    esNuevo: true,
    tags: ["pastel", "artesanal", "dulce", "mariquita", "repostería"],
  },
  {
    id: "20",
    nombre: "Café Colina Tolimense",
    precio: 22000,
    precioOriginal: 27000,
    descuento: 18,
    vendedorId: "v-004",
    municipio: "libano",
    categoria: "Alimentacion",
    descripcion:
      "Café de origen único cultivado a 1.800 m.s.n.m. en las laderas del norte tolimense. " +
      "Tueste medio-oscuro, notas de chocolate amargo y caramelo. Molido o en grano, 250g.",
    imageUrl: imgCafeTolima,
    rating: 4.9,
    totalReseñas: 67,
    stock: 48,
    esNuevo: false,
    tags: ["café", "origen", "tolima", "arábica", "specialty"],
  },

  // ── Hogar ──────────────────────────────────────────────────────────────────
  {
    id: "21",
    nombre: "Juego de pocillos decorados",
    precio: 45000,
    vendedorId: "v-007",
    municipio: "el-espinal",
    categoria: "Hogar",
    descripcion:
      "Set de 4 pocillos en cerámica artesanal decorados con motivos florales del Tolima. " +
      "Pintados a mano con esmaltes no tóxicos, aptos para lavavajillas. Capacidad 200ml cada uno.",
    imageUrl: imgPocillos,
    rating: 4.8,
    totalReseñas: 29,
    stock: 15,
    esNuevo: true,
    tags: ["pocillos", "cerámica", "decorados", "artesanal", "juego"],
  },
  {
    id: "22",
    nombre: "Velas aromáticas manzanilla",
    precio: 18000,
    vendedorId: "v-005",
    municipio: "mariquita",
    categoria: "Hogar",
    descripcion:
      "Velas artesanales de cera de soja con esencia natural de manzanilla y lavanda. " +
      "Elaboradas a mano en Mariquita, mecha de algodón ecológico. Tiempo de quema 40h. Tarro de vidrio reciclado.",
    imageUrl: imgVelas,
    rating: 4.6,
    totalReseñas: 22,
    stock: 30,
    esNuevo: false,
    tags: ["velas", "aromáticas", "manzanilla", "soja", "artesanal"],
  },
  {
    id: "23",
    nombre: "Juego de platos cerámica",
    precio: 85000,
    precioOriginal: 98000,
    descuento: 13,
    vendedorId: "v-007",
    municipio: "el-espinal",
    categoria: "Hogar",
    descripcion:
      "Vajilla de 6 platos hondos en cerámica esmaltada a mano. Diseño inspirado en la celosía colonial " +
      "de los patios tolimenses. Resistentes al microondas. Diámetro 24cm.",
    imageUrl: imgPlatosCeramica,
    rating: 4.7,
    totalReseñas: 17,
    stock: 8,
    esNuevo: false,
    tags: ["platos", "cerámica", "vajilla", "colonial", "esmaltada"],
  },
  {
    id: "24",
    nombre: "Espejo decorado artesanal",
    precio: 75000,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Hogar",
    descripcion:
      "Espejo redondo de 40cm enmarcado en madera tallada con motivos del río Magdalena. " +
      "Acabado natural barnizado, apto para interior húmedo. Gancho de pared incluido.",
    imageUrl: imgEspejo,
    rating: 4.5,
    totalReseñas: 13,
    stock: 6,
    esNuevo: false,
    tags: ["espejo", "decorado", "madera", "magdalena", "artesanal"],
  },
  {
    id: "25",
    nombre: "Lámpara de mesa",
    precio: 110000,
    vendedorId: "v-001",
    municipio: "ibague",
    categoria: "Hogar",
    descripcion:
      "Lámpara de mesa en cerámica pintada a mano con diseño de palma de cera, símbolo del Tolima. " +
      "Base estable, pantalla de lino natural, casquillo E27. Altura 42cm. Cable 1,8m.",
    imageUrl: imgLampara,
    rating: 4.8,
    totalReseñas: 9,
    stock: 5,
    esNuevo: true,
    tags: ["lámpara", "cerámica", "palma", "tolima", "hogar"],
  },

  // ── Salud y Belleza ────────────────────────────────────────────────────────
  {
    id: "26",
    nombre: "Shampoo natural de coco",
    precio: 32000,
    vendedorId: "v-005",
    municipio: "mariquita",
    categoria: "Salud y Belleza",
    descripcion:
      "Shampoo elaborado con aceite de coco prensado en frío y extracto de aloe vera del norte tolimense. " +
      "Sin sulfatos ni parabenos. Para cabello seco o dañado. 300ml.",
    imageUrl: imgShampoo,
    rating: 4.7,
    totalReseñas: 36,
    stock: 28,
    esNuevo: false,
    tags: ["shampoo", "coco", "natural", "sulfato-free", "cabello"],
  },
  {
    id: "27",
    nombre: "Gel de baño refrescante",
    precio: 25000,
    vendedorId: "v-005",
    municipio: "mariquita",
    categoria: "Salud y Belleza",
    descripcion:
      "Gel de ducha con extractos de menta y limón de la huerta casera de Mariquita. " +
      "Fórmula pH neutro, dermatológicamente testeada. Sin colorantes artificiales. Envase 250ml.",
    imageUrl: imgGelBano,
    rating: 4.5,
    totalReseñas: 24,
    stock: 35,
    esNuevo: false,
    tags: ["gel", "baño", "menta", "natural", "refrescante"],
  },
  {
    id: "28",
    nombre: "Crema anti-arrugas",
    precio: 48000,
    precioOriginal: 58000,
    descuento: 17,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Salud y Belleza",
    descripcion:
      "Crema facial con aceite de rosa mosqueta y vitamina C natural extraída de la uchuva tolimense. " +
      "Reduce líneas de expresión con uso diario. Para todo tipo de piel. Tarro 50ml.",
    imageUrl: imgCremaArrugas,
    rating: 4.6,
    totalReseñas: 19,
    stock: 16,
    esNuevo: false,
    tags: ["crema", "anti-arrugas", "facial", "rosa-mosqueta", "vitamina-C"],
  },
  {
    id: "29",
    nombre: "Crema hidratante corporal",
    precio: 38000,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Salud y Belleza",
    descripcion:
      "Crema corporal con manteca de karité y aceites esenciales de plantas aromáticas del piedemonte tolimense. " +
      "Absorción rápida, sin residuo graso. Aroma suave a vainilla. 200ml.",
    imageUrl: imgCremaHidratante,
    rating: 4.8,
    totalReseñas: 28,
    stock: 22,
    esNuevo: true,
    tags: ["crema", "hidratante", "corporal", "karité", "natural"],
  },
  {
    id: "30",
    nombre: "Pincel pequeño de pintura",
    precio: 22000,
    vendedorId: "v-001",
    municipio: "ibague",
    categoria: "Papeleria",
    descripcion:
      "Pincel redondo de punta fina para acuarela y gouache, mango de bambú sostenible y cerdas sintéticas de alta densidad. " +
      "Ideal para detalles, líneas finas y miniaturas. Tamaño compacto, número 4.",
    imageUrl: imgBrocha,
    rating: 4.4,
    totalReseñas: 11,
    stock: 20,
    esNuevo: false,
    tags: ["pincel", "pintura", "acuarela", "bambú", "arte"],
  },

  // ── Electronica ────────────────────────────────────────────────────────────
  {
    id: "31",
    nombre: "Cafetera Braun",
    precio: 280000,
    precioOriginal: 320000,
    descuento: 12,
    vendedorId: "v-006",
    municipio: "chaparral",
    categoria: "Electronica",
    descripcion:
      "Cafetera de goteo Braun BrewSense 12 tazas con sistema de preparación óptima a 92°C. " +
      "Jarra de acero inoxidable con aislamiento térmico. Temporizador programable 24h. 1000W.",
    imageUrl: imgCafetera,
    rating: 4.7,
    totalReseñas: 14,
    stock: 7,
    esNuevo: false,
    tags: ["cafetera", "braun", "goteo", "hogar", "electrodoméstico"],
  },
  {
    id: "32",
    nombre: "Cargador portátil 10000mAh",
    precio: 65000,
    vendedorId: "v-008",
    municipio: "purificacion",
    categoria: "Electronica",
    descripcion:
      "Power bank de 10000mAh con carga rápida 22.5W compatible con USB-C y USB-A. " +
      "Pantalla LED indicadora de carga. Cuerpo compacto 148×70×15mm. Incluye cable USB-C.",
    imageUrl: imgCargador,
    rating: 4.6,
    totalReseñas: 31,
    stock: 18,
    esNuevo: false,
    tags: ["cargador", "portátil", "powerbank", "usb-c", "10000mah"],
  },
  {
    id: "33",
    nombre: "Air fryer Philips",
    precio: 450000,
    precioOriginal: 520000,
    descuento: 13,
    vendedorId: "v-006",
    municipio: "chaparral",
    categoria: "Electronica",
    descripcion:
      "Freidora de aire Philips Essential 4.1L con tecnología Rapid Air. Hasta un 90% menos de grasa vs. " +
      "fritura tradicional. Temperatura regulable 80–200°C. Canasta antiadherente apta para lavavajillas.",
    imageUrl: imgAirFryer,
    rating: 4.9,
    totalReseñas: 23,
    stock: 5,
    esNuevo: false,
    tags: ["air-fryer", "philips", "freidora", "sin-grasa", "cocina"],
  },
  {
    id: "34",
    nombre: "Forro para iPhone",
    precio: 25000,
    vendedorId: "v-008",
    municipio: "purificacion",
    categoria: "Electronica",
    descripcion:
      "Forro protector para iPhone 15/14/13 en material TPU flexible con diseño artístico del mapa del Tolima. " +
      "Protección contra caídas hasta 1.5m. Compatible con carga inalámbrica.",
    imageUrl: imgForroIphone,
    rating: 4.5,
    totalReseñas: 48,
    stock: 40,
    esNuevo: true,
    tags: ["forro", "iphone", "tolima", "protección", "tpu"],
  },
  {
    id: "35",
    nombre: "Audífonos tipo casco Sony",
    precio: 185000,
    precioOriginal: 220000,
    descuento: 16,
    vendedorId: "v-002",
    municipio: "el-espinal",
    categoria: "Electronica",
    descripcion:
      "Audífonos Sony WH-CH520 inalámbricos Bluetooth 5.2 con 50h de batería. " +
      "Diadema acolchada, plegables para viaje. Controlador de 30mm, respuesta de frecuencia 20Hz–20kHz.",
    imageUrl: imgAudifonos,
    rating: 4.8,
    totalReseñas: 37,
    stock: 9,
    esNuevo: false,
    tags: ["audífonos", "sony", "bluetooth", "inalámbrico", "casco"],
  },

  // ── Papeleria ──────────────────────────────────────────────────────────────
  {
    id: "36",
    nombre: "Lápices de colores",
    precio: 18000,
    vendedorId: "v-001",
    municipio: "ibague",
    categoria: "Papeleria",
    descripcion:
      "Set de 24 lápices de colores profesionales con pigmento de alta intensidad y mina resistente a la rotura. " +
      "Cuerpo hexagonal en madera de cedro. Ideales para ilustración y mandalas.",
    imageUrl: imgLapices,
    rating: 4.6,
    totalReseñas: 20,
    stock: 35,
    esNuevo: false,
    tags: ["lápices", "colores", "arte", "dibujo", "papelería"],
  },
  {
    id: "37",
    nombre: "Libretas artesanales",
    precio: 15000,
    vendedorId: "v-001",
    municipio: "ibague",
    categoria: "Papeleria",
    descripcion:
      "Pack de 3 libretas con tapa dura en papel kraft reciclado y páginas de papel bond 80g. " +
      "Encuadernación cosida a mano. Formatos A5, A6 y cuadrado. Motivos regionales tolimenses en la cubierta.",
    imageUrl: imgLibretas,
    rating: 4.7,
    totalReseñas: 16,
    stock: 28,
    esNuevo: true,
    tags: ["libretas", "kraft", "artesanal", "reciclado", "papelería"],
  },

  // ── Artesania ──────────────────────────────────────────────────────────────
  {
    id: "38",
    nombre: "Kit de juegos artesanal infantil",
    precio: 55000,
    vendedorId: "v-007",
    municipio: "el-espinal",
    categoria: "Artesania",
    descripcion:
      "Kit educativo con 6 juguetes artesanales en madera de balso: trompo, yoyo, balero, canicas, " +
      "trompo de colores y rana. Pintados con esmaltes no tóxicos. Ideal para niños de 4 a 12 años.",
    imageUrl: imgKitJuegos,
    rating: 4.9,
    totalReseñas: 44,
    stock: 12,
    esNuevo: true,
    tags: ["juguetes", "madera", "artesanal", "infantil", "tradicional"],
  },
];

const CATEGORIAS_MODA = ["Streetwear", "Accesorios", "Calzado", "Vintage", "Artesanal"] as const;

export const productosModa = productos.filter((p) =>
  (CATEGORIAS_MODA as readonly string[]).includes(p.categoria)
);

export const productosGenerales = productos;

export function getSectorFromCategoria(categoria: Producto["categoria"]): { label: string; path: string } {
  if ((CATEGORIAS_MODA as readonly string[]).includes(categoria))
    return { label: "Moda y Accesorios", path: "/moda" };
  if (categoria === "Alimentacion") return { label: "Alimentación", path: "/" };
  if (categoria === "Hogar") return { label: "Hogar", path: "/" };
  if (categoria === "Electronica") return { label: "Electrónica", path: "/" };
  if (categoria === "Salud y Belleza") return { label: "Salud y Belleza", path: "/" };
  if (categoria === "Papeleria") return { label: "Papelería", path: "/" };
  if (categoria === "Artesania") return { label: "Artesanía", path: "/" };
  return { label: categoria, path: "/" };
}

export const getProducto = (id: string) =>
  productos.find((p) => p.id === id);

export const productosPorCategoria = (categoria: Producto["categoria"]) =>
  productos.filter((p) => p.categoria === categoria);

export const productosPorVendedor = (vendedorId: string) =>
  productos.filter((p) => p.vendedorId === vendedorId);

export const productosNuevos = productos.filter((p) => p.esNuevo);

export const productosConDescuento = productos.filter(
  (p) => p.descuento !== undefined
);
