import type { Vendedor } from "./types";

export const vendedores: Vendedor[] = [
  {
    id: "v-001",
    nombre: "María Catalina Gómez",
    nombreTienda: "Raíces Store",
    municipio: "ibague",
    descripcion:
      "Nací en el barrio Jordán de Ibagué y aprendí a coser con mi abuela, que hacía trajes para el Sanjuanero. " +
      "Hoy mezclo ese saber ancestral con el streetwear urbano para contar quiénes somos los tolimenses.",
    categorias: ["Streetwear", "Artesanal"],
    rating: 4.9,
    totalReseñas: 127,
    totalProductos: 18,
    verificado: true,
    fechaRegistro: "2023-03-12",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=MaríaCatalina",
    telefono: "3001234567",
  },
  {
    id: "v-002",
    nombre: "Sebastián Montoya Ríos",
    nombreTienda: "Pijao Threads",
    municipio: "el-espinal",
    descripcion:
      "Crecí entre las fincas arroceras del Espinal y el olor a bizcocho de achira nunca se me ha ido. " +
      "Mis prendas vintage recogen el espíritu festivo de la capital folclórica del Tolima.",
    categorias: ["Vintage", "Streetwear"],
    rating: 4.8,
    totalReseñas: 89,
    totalProductos: 14,
    verificado: true,
    fechaRegistro: "2023-06-20",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastián",
    telefono: "3112345678",
    galeria: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&fit=crop",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&fit=crop",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&fit=crop",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&fit=crop",
    ],
  },
  {
    id: "v-003",
    nombre: "Ana María Reyes Vargas",
    nombreTienda: "Honda Heritage",
    municipio: "honda",
    descripcion:
      "Honda me enseñó que el río Magdalena no es solo agua, es historia viva. " +
      "Diseño accesorios y prendas que rinden homenaje a los bogas y a los puentes que conectan el país.",
    categorias: ["Accesorios", "Vintage"],
    rating: 5.0,
    totalReseñas: 156,
    totalProductos: 22,
    verificado: true,
    fechaRegistro: "2022-11-05",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnaMaría",
    telefono: "3223456789",
  },
  {
    id: "v-004",
    nombre: "Diego Andrés Ospina",
    nombreTienda: "Cafetal Urbano",
    municipio: "libano",
    descripcion:
      "Vengo de las montañas cafeteras del Líbano, donde el frío de la madrugada te enseña a valorar una buena prenda. " +
      "Trabajo con telas sostenibles y tintes naturales de la región andina tolimense.",
    categorias: ["Streetwear", "Artesanal"],
    rating: 4.7,
    totalReseñas: 64,
    totalProductos: 11,
    verificado: false,
    fechaRegistro: "2024-01-18",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiegoAndrés",
    telefono: "3134567890",
  },
  {
    id: "v-005",
    nombre: "Valentina Cruz Penagos",
    nombreTienda: "Magdalena Flow",
    municipio: "mariquita",
    descripcion:
      "Mi abuela bordaba manteles en Mariquita mientras me contaba historias del Dorado. " +
      "Hoy convierto esas técnicas de bordado en accesorios que llevan el alma del norte tolimense.",
    categorias: ["Accesorios", "Artesanal"],
    rating: 4.6,
    totalReseñas: 43,
    totalProductos: 9,
    verificado: false,
    fechaRegistro: "2024-03-07",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
    telefono: "3205678901",
  },
  {
    id: "v-006",
    nombre: "Jhon Jairo Perdomo",
    nombreTienda: "Sur Colectivo",
    municipio: "chaparral",
    descripcion:
      "Soy del Chaparral, tierra de café y de rebeldía. " +
      "Diseño streetwear y calzado para los jóvenes del sur que quieren mostrar que desde aquí también se hace cultura.",
    categorias: ["Streetwear", "Calzado"],
    rating: 4.5,
    totalReseñas: 31,
    totalProductos: 8,
    verificado: false,
    fechaRegistro: "2024-04-22",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=JhonJairo",
    telefono: "3016789012",
  },
  {
    id: "v-007",
    nombre: "Luisa Fernanda Torres",
    nombreTienda: "Espinal Craft",
    municipio: "el-espinal",
    descripcion:
      "Aprendí cerámica y cestería en el SENA de Ibagué, pero mi corazón siempre estuvo en el Espinal. " +
      "Traslado las técnicas artesanales Pijao a bolsos, accesorios y complementos de moda contemporánea.",
    categorias: ["Artesanal", "Accesorios"],
    rating: 4.8,
    totalReseñas: 72,
    totalProductos: 16,
    verificado: true,
    fechaRegistro: "2023-09-14",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuisaFernanda",
    telefono: "3157890123",
  },
  {
    id: "v-008",
    nombre: "Camilo Andrés Ríos",
    nombreTienda: "Pijao Nation",
    municipio: "purificacion",
    descripcion:
      "Crecí escuchando historias del pueblo Pijao en Purificación y quise que esa identidad no se perdiera. " +
      "Mis estampados reinterpretan la iconografía indígena tolimense en colecciones de streetwear de autor.",
    categorias: ["Streetwear"],
    rating: 4.9,
    totalReseñas: 98,
    totalProductos: 13,
    verificado: true,
    fechaRegistro: "2023-02-28",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CamiloAndrés",
    telefono: "3048901234",
  },
];

export const getVendedor = (id: string) =>
  vendedores.find((v) => v.id === id);

export const vendedoresVerificados = vendedores.filter((v) => v.verificado);
