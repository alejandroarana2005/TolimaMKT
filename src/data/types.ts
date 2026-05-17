export type Region = "norte" | "sur" | "oriente" | "occidente" | "centro";

export type Categoria =
  | "Streetwear"
  | "Accesorios"
  | "Calzado"
  | "Vintage"
  | "Artesanal"
  | "Alimentacion"
  | "Hogar"
  | "Salud y Belleza"
  | "Electronica"
  | "Papeleria"
  | "Artesania";

export interface Municipio {
  id: string;
  nombre: string;
  region: Region;
}

export interface Vendedor {
  id: string;
  nombre: string;
  nombreTienda: string;
  municipio: string;
  descripcion: string;
  categorias: Categoria[];
  rating: number;
  totalReseñas: number;
  totalProductos: number;
  verificado: boolean;
  fechaRegistro: string;
  avatarUrl: string;
  telefono?: string;
  galeria?: string[];
}

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  precioOriginal?: number;
  descuento?: number;
  vendedorId: string;
  municipio: string;
  categoria: Categoria;
  descripcion: string;
  imageUrl: string;
  rating: number;
  totalReseñas: number;
  stock: number;
  esNuevo: boolean;
  tags: string[];
}
