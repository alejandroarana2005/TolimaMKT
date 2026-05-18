import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OrganismHeader } from "../components/organisms/OrganismHeader";
import { OrganismHero } from "../components/organisms/OrganismHero";
import { OrganismCategoryFilter } from "../components/organisms/OrganismCategoryFilter";
import { OrganismProductGrid } from "../components/organisms/OrganismProductGrid";
import { OrganismVendorSection } from "../components/organisms/OrganismVendorSection";
import { OrganismFooter } from "../components/organisms/OrganismFooter";
import { productosModa } from "../../data/productos";

const modaConDescuento = productosModa.filter((p) => p.descuento !== undefined);
const modaNuevos = productosModa.filter((p) => p.esNuevo);
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
        catalogPath="/moda/catalogo"
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
          if (cat) navigate(`/moda/catalogo?categoria=${encodeURIComponent(cat)}`);
          else navigate("/moda/catalogo");
        }}
        onMunicipioChange={(muns) => {
          setSelectedMunicipios(muns);
          if (muns.length > 0)
            navigate(`/moda/catalogo?municipio=${encodeURIComponent(muns[0])}`);
        }}
      />

      <OrganismProductGrid
        title="Productos destacados"
        productos={modaConDescuento}
        onViewAll={() => navigate("/moda/catalogo?orden=descuento")}
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
        productos={modaNuevos}
        onViewAll={() => navigate("/moda/catalogo?estado=nuevo")}
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
