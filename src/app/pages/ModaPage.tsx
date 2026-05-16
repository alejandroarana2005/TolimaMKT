import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("categoria");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCat && CATEGORIAS.includes(initialCat) ? [initialCat] : ["Todo"]
  );
  const [selectedMunicipios, setSelectedMunicipios] = useState<string[]>([]);
  const [cartCount] = useState(0);

  useEffect(() => { document.title = "Moda y Accesorios — TolimaMKT"; }, []);

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
        headline="La moda del Tolima, en un solo lugar"
        subtitle="Descubre emprendedores de Ibagué, Honda, El Espinal y más."
        searchPlaceholder="¿Qué deseas explorar en el Tolima?"
        onSearch={(q) => navigate(`/productos?q=${encodeURIComponent(q)}`)}
        backgroundImage="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80"
      />

      <OrganismCategoryFilter
        categories={CATEGORIAS}
        municipios={MUNICIPIO_NOMBRES}
        selectedCategories={selectedCategories}
        selectedMunicipios={selectedMunicipios}
        onCategoryChange={(cats) => {
          setSelectedCategories(cats);
          const cat = cats.find((c) => c !== "Todo");
          if (cat) navigate(`/productos?categoria=${encodeURIComponent(cat)}`);
        }}
        onMunicipioChange={(muns) => {
          setSelectedMunicipios(muns);
          if (muns.length > 0)
            navigate(`/productos?municipio=${encodeURIComponent(muns[0])}`);
        }}
      />

      <OrganismProductGrid
        title="Productos destacados"
        productos={productosConDescuento}
        onViewAll={() => navigate("/productos?orden=descuento")}
        onProductClick={(id) => navigate(`/producto/${id}`)}
      />

      <OrganismVendorSection
        title="Conoce a los creadores del Tolima"
        subtitle="Historias reales detrás de cada prenda"
        vendedores={vendedores}
        onVendorClick={(id) => navigate(`/tienda/${id}`)}
      />

      <OrganismProductGrid
        title="Recién llegados"
        productos={productosNuevos}
        onViewAll={() => navigate("/productos?estado=nuevo")}
        onProductClick={(id) => navigate(`/producto/${id}`)}
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
