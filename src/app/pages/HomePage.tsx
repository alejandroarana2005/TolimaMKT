import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OrganismHeader } from "../components/organisms/OrganismHeader";
import { OrganismHero } from "../components/organisms/OrganismHero";
import { OrganismFooter } from "../components/organisms/OrganismFooter";

const FF = "'DM Sans', sans-serif";

// ─── Categorías ────────────────────────────────────────────────────────────────

const CATEGORIAS = [
  {
    id: "alimentacion",
    nombre: "Alimentación",
    foto: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
    activo: true,
    to: "/productos?categoria=Alimentacion",
  },
  {
    id: "artesania",
    nombre: "Artesanía",
    foto: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=700&q=80",
    activo: true,
    to: "/productos?categoria=Artesania",
  },
  {
    id: "industrial",
    nombre: "Suministros Industriales",
    foto: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=700&q=80",
    activo: false,
    to: null,
  },
  {
    id: "tecnologia",
    nombre: "Electrónica y Tecnología",
    foto: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?auto=format&fit=crop&w=700&q=80",
    activo: true,
    to: "/productos?categoria=Electronica",
  },
  {
    id: "hogar",
    nombre: "Hogar",
    foto: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
    activo: true,
    to: "/productos?categoria=Hogar",
  },
  {
    id: "jardin",
    nombre: "Jardín y Huerta",
    foto: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80",
    activo: false,
    to: null,
  },
  {
    id: "moda",
    nombre: "Moda y Accesorios",
    foto: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80",
    activo: true,
    to: "/moda",
  },
  {
    id: "papeleria",
    nombre: "Papelería y Entretenimiento",
    foto: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=700&q=80",
    activo: true,
    to: "/productos?categoria=Papeleria",
  },
  {
    id: "salud",
    nombre: "Salud y Belleza",
    foto: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80",
    activo: true,
    to: "/productos?categoria=Salud%20y%20Belleza",
  },
];

// ─── Category card ─────────────────────────────────────────────────────────────

function CategoriaCard({ cat }: { cat: typeof CATEGORIAS[0] }) {
  const inner = (
    <div
      className={`cat-card${cat.activo ? " cat-card--activo" : ""}`}
      style={{
        position: "relative",
        height: "210px",
        borderRadius: "14px",
        overflow: "hidden",
        cursor: cat.activo ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {/* Photo */}
      <div
        className="cat-photo"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${cat.foto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 350ms ease",
          willChange: "transform",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      {/* Category name */}
      <p
        style={{
          position: "absolute",
          bottom: "18px",
          left: "20px",
          right: "20px",
          fontFamily: FF,
          fontSize: "19px",
          fontWeight: 600,
          color: "#FFFFFF",
          margin: 0,
          lineHeight: 1.25,
          textShadow: "0 1px 6px rgba(0,0,0,0.35)",
        }}
      >
        {cat.nombre}
      </p>
    </div>
  );

  if (cat.activo && cat.to) {
    return (
      <Link to={cat.to} style={{ textDecoration: "none", display: "block" }}>
        {inner}
      </Link>
    );
  }
  return inner;
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => { document.title = "TolimaMKT — El mercado del Tolima"; }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      <OrganismHeader />

      <OrganismHero
        headline="El mercado del Tolima, todo aquí"
        subtitle="Descubre moda, alimentos, artesanía y más, directo de emprendedores tolimenses."
        searchPlaceholder="¿Qué estás buscando hoy?"
        onSearch={(q) => navigate(`/productos?q=${encodeURIComponent(q)}`)}
      />

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section style={{ background: "#F4F3F0", padding: "72px 24px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <p
              style={{
                fontFamily: FF,
                fontSize: "11px",
                fontWeight: 700,
                color: "#9D9C97",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                margin: "0 0 8px",
              }}
            >
              Categorías
            </p>
            <h2
              style={{
                fontFamily: FF,
                fontSize: "28px",
                fontWeight: 700,
                color: "#2C2C2A",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Explora por categoría
            </h2>
          </div>

          {/* Grid */}
          <div className="cat-grid">
            {CATEGORIAS.map((cat) => (
              <CategoriaCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why TolimaMKT ─────────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="why-grid">
            {[
              {
                emoji: "📍",
                titulo: "100% del Tolima",
                texto: "Todos los productos vienen de emprendedores y productores del departamento del Tolima.",
              },
              {
                emoji: "🤝",
                titulo: "Apoyo directo",
                texto: "Comprar aquí es apoyar directamente a las familias y negocios locales de tu región.",
              },
              {
                emoji: "✅",
                titulo: "Vendedores verificados",
                texto: "Cada tienda pasa por un proceso de verificación para garantizar calidad y confianza.",
              },
            ].map((item) => (
              <div key={item.titulo} style={{ textAlign: "center", padding: "8px" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "#F9F0F3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    margin: "0 auto 16px",
                  }}
                >
                  {item.emoji}
                </div>
                <h4
                  style={{
                    fontFamily: FF,
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#2C2C2A",
                    margin: "0 0 8px",
                  }}
                >
                  {item.titulo}
                </h4>
                <p
                  style={{
                    fontFamily: FF,
                    fontSize: "13px",
                    color: "#6B6A65",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrganismFooter
        tagline="El mercado del Tolima"
        copyright="© 2026 TolimaMKT. Hecho con ❤️ en el Tolima."
        onSocialClick={(p) => console.log("Social:", p)}
        onLinkClick={(l) => console.log("Link:", l)}
      />

      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        /* Only the active card gets hover effects */
        .cat-card--activo:hover .cat-photo {
          transform: scale(1.05);
        }
        .cat-card--activo:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.22);
        }
        @media (max-width: 900px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 540px) {
          .cat-grid { grid-template-columns: 1fr; }
          .cat-card { height: 180px !important; }
        }
      `}</style>
    </div>
  );
}
