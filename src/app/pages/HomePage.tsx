import { useState } from "react";
import { OrganismHeader } from "../components/organisms/OrganismHeader";
import { OrganismHero } from "../components/organisms/OrganismHero";
import { OrganismCategoryFilter } from "../components/organisms/OrganismCategoryFilter";
import { OrganismProductGrid } from "../components/organisms/OrganismProductGrid";
import { OrganismVendorSection } from "../components/organisms/OrganismVendorSection";
import { OrganismFooter } from "../components/organisms/OrganismFooter";
import { productosConDescuento, productosNuevos } from "../../data/productos";
import { vendedores } from "../../data/vendedores";
import { municipios } from "../../data/municipios";

const CATEGORIAS = [
  "Todo",
  "Streetwear",
  "Accesorios",
  "Calzado",
  "Vintage",
  "Artesanal",
];

const MUNICIPIO_NOMBRES = municipios.map((m) => m.nombre);

export default function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Todo"]);
  const [selectedMunicipios, setSelectedMunicipios] = useState<string[]>([]);
  const [cartCount] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      <OrganismHeader
        cartCount={cartCount}
        wishlistCount={0}
        onCartClick={() => console.log("Carrito")}
        onWishlistClick={() => console.log("Favoritos")}
        onLogoClick={() => console.log("Logo")}
        onNavClick={(item) => console.log("Nav:", item)}
      />

      <OrganismHero
        headline="El streetwear del Tolima, en un solo lugar"
        subtitle="Descubre emprendedores de Ibagué, Honda, El Espinal y más."
        searchPlaceholder="¿Qué deseas explorar en el Tolima?"
        onSearch={(q) => console.log("Búsqueda:", q)}
        municipios={["Ibagué", "Honda", "El Espinal", "Líbano", "Melgar"]}
      />

      <OrganismCategoryFilter
        categories={CATEGORIAS}
        municipios={MUNICIPIO_NOMBRES}
        selectedCategories={selectedCategories}
        selectedMunicipios={selectedMunicipios}
        onCategoryChange={(cats) => setSelectedCategories(cats)}
        onMunicipioChange={(muns) => setSelectedMunicipios(muns)}
      />

      <OrganismProductGrid
        title="Productos destacados"
        productos={productosConDescuento}
        onViewAll={() => console.log("Ver todos los destacados")}
        onProductClick={(id) => console.log("Producto:", id)}
      />

      <OrganismVendorSection
        title="Conoce a los creadores del Tolima"
        subtitle="Historias reales detrás de cada prenda"
        vendedores={vendedores}
        onVendorClick={(id) => console.log("Vendedor:", id)}
      />

      <OrganismProductGrid
        title="Recién llegados"
        productos={productosNuevos}
        onViewAll={() => console.log("Ver todos los nuevos")}
        onProductClick={(id) => console.log("Producto:", id)}
      />

      <OrganismFooter
        tagline="El mercado de moda del Tolima"
        copyright="© 2026 TolimaMKT. Hecho con ❤️ en el Tolima."
        onSocialClick={(p) => console.log("Social:", p)}
        onLinkClick={(l) => console.log("Link:", l)}
      />
    </div>
  );
}
