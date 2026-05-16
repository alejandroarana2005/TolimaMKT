import type { Producto } from "./types";

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
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1625910513828-e9c038cd2c58?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop",
    rating: 4.7,
    totalReseñas: 25,
    stock: 14,
    esNuevo: false,
    tags: ["manilla", "hilo", "encerado", "artesanal", "pijao"],
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
