import type { Producto } from "./types";

export const productos: Producto[] = [
  // ── Streetwear ─────────────────────────────────────────────────────────────
  {
    id: "p-001",
    nombre: "Hoodie Pijao Roots",
    precio: 89900,
    precioOriginal: 105900,
    descuento: 15,
    vendedorId: "v-001",
    municipio: "ibague",
    categoria: "Streetwear",
    descripcion:
      "Buzo oversize con bordado de motivos Pijao en el pecho. Algodón pesado 350g, interior afelpado. " +
      "Vinotinto con detalles en dorado. Talla única amplia.",
    imageUrl: "https://picsum.photos/seed/hoodie-pijao/400/400",
    rating: 4.9,
    totalReseñas: 34,
    stock: 12,
    esNuevo: false,
    tags: ["hoodie", "pijao", "oversize", "bordado", "vinotinto"],
  },
  {
    id: "p-002",
    nombre: "Camiseta Tolima Tierra",
    precio: 52000,
    vendedorId: "v-008",
    municipio: "purificacion",
    categoria: "Streetwear",
    descripcion:
      "Camiseta de algodón 100% con gráfico serigrafía que representa el mapa del Tolima y el río Magdalena. " +
      "Corte relajado, cuello redondo reforzado. Disponible en crema y negro.",
    imageUrl: "https://picsum.photos/seed/camiseta-tolima/400/400",
    rating: 4.7,
    totalReseñas: 21,
    stock: 30,
    esNuevo: false,
    tags: ["camiseta", "tolima", "serigrafía", "mapa", "algodón"],
  },
  {
    id: "p-003",
    nombre: "Sudadera Cordillera Central",
    precio: 98000,
    vendedorId: "v-004",
    municipio: "libano",
    categoria: "Streetwear",
    descripcion:
      "Sudadera crew-neck en color verde musgo, inspirada en los páramos del Líbano. " +
      "Tela técnica reciclada con bolsillo canguro y costuras reforzadas. Producción limitada.",
    imageUrl: "https://picsum.photos/seed/sudadera-cordillera/400/400",
    rating: 4.8,
    totalReseñas: 18,
    stock: 6,
    esNuevo: true,
    tags: ["sudadera", "páramo", "sostenible", "líbano", "verde"],
  },
  {
    id: "p-004",
    nombre: "Polo Heritage Honda",
    precio: 62000,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Streetwear",
    descripcion:
      "Polo de punto piqué con bordado del Puente de Navarro en el lado izquierdo del pecho. " +
      "Paleta de colores ocre y blanco, referencia directa a la arquitectura colonial de Honda.",
    imageUrl: "https://picsum.photos/seed/polo-honda/400/400",
    rating: 4.6,
    totalReseñas: 12,
    stock: 20,
    esNuevo: false,
    tags: ["polo", "honda", "patrimonio", "punto-piqué", "colonial"],
  },
  {
    id: "p-005",
    nombre: "Chaqueta Río Magdalena",
    precio: 175000,
    precioOriginal: 195000,
    descuento: 10,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Streetwear",
    descripcion:
      "Chaqueta tipo bomber en tela impermeable color azul oscuro con parches bordados del Magdalena. " +
      "Forro interior estampado con mapa fluvial del Tolima. Ideal para el frío ribereño.",
    imageUrl: "https://picsum.photos/seed/chaqueta-magdalena/400/400",
    rating: 5.0,
    totalReseñas: 27,
    stock: 5,
    esNuevo: false,
    tags: ["chaqueta", "bomber", "magdalena", "impermeable", "bordados"],
  },
  {
    id: "p-006",
    nombre: "Camiseta Pijao Nation Vol.2",
    precio: 55000,
    vendedorId: "v-008",
    municipio: "purificacion",
    categoria: "Streetwear",
    descripcion:
      "Segunda edición de la colección Pijao Nation. Serigrafía en cuatro tintas con iconografía indígena " +
      "reinterpretada. Algodón 180g, corte unisex. Edición numerada de 80 unidades.",
    imageUrl: "https://picsum.photos/seed/pijao-nation-v2/400/400",
    rating: 4.9,
    totalReseñas: 41,
    stock: 14,
    esNuevo: true,
    tags: ["camiseta", "pijao", "edición-limitada", "serigrafía", "indígena"],
  },

  // ── Accesorios ─────────────────────────────────────────────────────────────
  {
    id: "p-007",
    nombre: "Gorra Río Magdalena",
    precio: 45000,
    vendedorId: "v-005",
    municipio: "mariquita",
    categoria: "Accesorios",
    descripcion:
      "Gorra dad hat en denim lavado con bordado del río Magdalena en hilo dorado. " +
      "Ajuste trasero metálico, visera curva. Un clásico del norte tolimense.",
    imageUrl: "https://picsum.photos/seed/gorra-magdalena/400/400",
    rating: 4.7,
    totalReseñas: 15,
    stock: 25,
    esNuevo: false,
    tags: ["gorra", "denim", "magdalena", "bordado", "dad-hat"],
  },
  {
    id: "p-008",
    nombre: "Tote Bag Ibagué",
    precio: 38000,
    vendedorId: "v-001",
    municipio: "ibague",
    categoria: "Accesorios",
    descripcion:
      "Tote bag en lona natural con serigrafía del skyline de Ibagué y el nevado del Tolima al fondo. " +
      "Asas largas reforzadas, capacidad 15L. Perfecto para el mercado o la universidad.",
    imageUrl: "https://picsum.photos/seed/tote-ibague/400/400",
    rating: 4.8,
    totalReseñas: 29,
    stock: 18,
    esNuevo: false,
    tags: ["tote-bag", "ibagué", "lona", "skyline", "nevado"],
  },
  {
    id: "p-009",
    nombre: "Mochila Cafetal Urban",
    precio: 85000,
    vendedorId: "v-004",
    municipio: "libano",
    categoria: "Accesorios",
    descripcion:
      "Mochila urbana en lona reciclada color café con parches bordados de ramas de café tolimense. " +
      "Compartimento para laptop 14\", correas acolchadas. Producción artesanal del Líbano.",
    imageUrl: "https://picsum.photos/seed/mochila-cafetal/400/400",
    rating: 4.6,
    totalReseñas: 11,
    stock: 8,
    esNuevo: true,
    tags: ["mochila", "café", "reciclado", "artesanal", "líbano"],
  },
  {
    id: "p-010",
    nombre: "Collar Semillas Nativas",
    precio: 28000,
    vendedorId: "v-007",
    municipio: "el-espinal",
    categoria: "Accesorios",
    descripcion:
      "Collar artesanal elaborado con semillas nativas del Tolima: tagua, chaquira y acaí. " +
      "Tejido en macramé con hilo encerado. Pieza única, no hay dos iguales.",
    imageUrl: "https://picsum.photos/seed/collar-semillas/400/400",
    rating: 4.9,
    totalReseñas: 38,
    stock: 7,
    esNuevo: false,
    tags: ["collar", "semillas", "tagua", "macramé", "artesanal"],
  },

  // ── Artesanal ──────────────────────────────────────────────────────────────
  {
    id: "p-011",
    nombre: "Bufanda Tejida Líbano",
    precio: 42000,
    vendedorId: "v-004",
    municipio: "libano",
    categoria: "Artesanal",
    descripcion:
      "Bufanda en lana de oveja teñida con tintes naturales de la región cafetera. " +
      "Tejida a mano en telar vertical, patrón geométrico andino. 180 x 35 cm.",
    imageUrl: "https://picsum.photos/seed/bufanda-libano/400/400",
    rating: 4.8,
    totalReseñas: 22,
    stock: 10,
    esNuevo: false,
    tags: ["bufanda", "lana", "tejida", "tintes-naturales", "andino"],
  },
  {
    id: "p-012",
    nombre: "Cinturón Tejido Pijao",
    precio: 35000,
    vendedorId: "v-007",
    municipio: "el-espinal",
    categoria: "Artesanal",
    descripcion:
      "Cinturón en cuero curtido con hebilla artesanal y decoración de chaquira inspirada en la cultura Pijao. " +
      "Ancho 3cm, largo ajustable de 80 a 110cm. Acabado a mano.",
    imageUrl: "https://picsum.photos/seed/cinturon-pijao/400/400",
    rating: 4.7,
    totalReseñas: 16,
    stock: 15,
    esNuevo: false,
    tags: ["cinturón", "cuero", "pijao", "chaquira", "artesanal"],
  },

  // ── Vintage ────────────────────────────────────────────────────────────────
  {
    id: "p-013",
    nombre: "Jean Retro Espinal",
    precio: 95000,
    precioOriginal: 120000,
    descuento: 20,
    vendedorId: "v-002",
    municipio: "el-espinal",
    categoria: "Vintage",
    descripcion:
      "Jean recto de corte retro años 90, lavado vintage con desgastes manuales. " +
      "Parche bordado del escudo del Espinal en el bolsillo trasero. Algodón 100% denim.",
    imageUrl: "https://picsum.photos/seed/jean-espinal/400/400",
    rating: 4.6,
    totalReseñas: 19,
    stock: 9,
    esNuevo: false,
    tags: ["jean", "vintage", "retro", "espinal", "denim"],
  },
  {
    id: "p-014",
    nombre: "Chaleco Denim Río Grande",
    precio: 88000,
    vendedorId: "v-002",
    municipio: "el-espinal",
    categoria: "Vintage",
    descripcion:
      "Chaleco denim clásico sin mangas con parches coleccionables de municipios del Tolima. " +
      "Lavado desgastado a la piedra. Ideal para customizar y coleccionar.",
    imageUrl: "https://picsum.photos/seed/chaleco-denim/400/400",
    rating: 4.5,
    totalReseñas: 14,
    stock: 6,
    esNuevo: true,
    tags: ["chaleco", "denim", "parches", "vintage", "coleccionable"],
  },

  // ── Calzado ────────────────────────────────────────────────────────────────
  {
    id: "p-015",
    nombre: "Sandalias Cuero Honda",
    precio: 78000,
    precioOriginal: 104000,
    descuento: 25,
    vendedorId: "v-003",
    municipio: "honda",
    categoria: "Calzado",
    descripcion:
      "Sandalias de cuero curtido artesanalmente en Honda. Plantilla acolchada en cuero natural, " +
      "suela de caucho antideslizante. Ajuste con hebilla de bronce. Tallas 35–42.",
    imageUrl: "https://picsum.photos/seed/sandalias-honda/400/400",
    rating: 4.8,
    totalReseñas: 33,
    stock: 11,
    esNuevo: false,
    tags: ["sandalias", "cuero", "honda", "artesanal", "verano"],
  },
  {
    id: "p-016",
    nombre: "Tenis Canvas Cafetero",
    precio: 135000,
    vendedorId: "v-006",
    municipio: "chaparral",
    categoria: "Calzado",
    descripcion:
      "Zapatillas canvas de lona con estampado exclusivo de granos de café y hojas de café tolimense. " +
      "Puntera reforzada, cordones de algodón natural. Suela vulcanizada. Tallas 35–45.",
    imageUrl: "https://picsum.photos/seed/tenis-cafetero/400/400",
    rating: 4.7,
    totalReseñas: 25,
    stock: 14,
    esNuevo: true,
    tags: ["tenis", "canvas", "café", "estampado", "vulcanizado"],
  },
];

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
