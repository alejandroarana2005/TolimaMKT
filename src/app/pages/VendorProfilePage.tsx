import { useParams, Link, useNavigate } from "react-router-dom";
import { vendedores } from "../../data/vendedores";
import { productosPorVendedor } from "../../data/productos";
import { getMunicipio } from "../../data/municipios";
import { MoleculeRating } from "../components/molecules/MoleculeRating";
import { MoleculeMunicipioChip } from "../components/molecules/MoleculeMunicipioChip";
import { MoleculeProductCard } from "../components/molecules/MoleculeProductCard";
import { MoleculeDiscountPill } from "../components/molecules/MoleculeDiscountPill";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";
import { ButtonSecondary } from "../components/atoms/ButtonSecondary";

export default function VendorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vendedor = vendedores.find((v) => v.id === id);
  const productosVendedor = id ? productosPorVendedor(id) : [];
  const municipioNombre =
    getMunicipio(vendedor?.municipio ?? "")?.nombre ?? vendedor?.municipio ?? "";
  const añoRegistro = vendedor?.fechaRegistro
    ? new Date(vendedor.fechaRegistro).getFullYear()
    : null;

  /* ── 404 ──────────────────────────────────────────────────────────── */
  if (!vendedor) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FFFFFF",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", lineHeight: 1, marginBottom: "8px" }}>🏪</div>
        <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#2C2C2A", margin: 0 }}>
          Vendedor no encontrado
        </h1>
        <p style={{ fontSize: "15px", color: "#6B6A65", margin: 0 }}>
          Esta tienda no existe o fue eliminada.
        </p>
        <Link
          to="/"
          style={{
            marginTop: "8px",
            color: "#7A3048",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  /* ── Page ─────────────────────────────────────────────────────────── */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        /* Sticky top bar */
        .vpp-topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          background: #FFFFFF;
          border-bottom: 1px solid #F0EFE9;
        }
        .vpp-topbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Breadcrumb */
        .vpp-breadcrumb {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px 0;
        }

        /* Hero section */
        .vpp-hero {
          background: #F9F0F3;
          padding: 56px 24px;
        }
        .vpp-hero-inner {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
        }

        /* Metrics row */
        .vpp-metrics {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* CTA row */
        .vpp-cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .vpp-cta button {
          min-width: 160px;
          justify-content: center;
        }

        /* Products section */
        .vpp-products {
          padding: 56px 24px 72px;
        }
        .vpp-products-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .vpp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 32px;
        }

        @media (max-width: 1024px) {
          .vpp-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .vpp-breadcrumb { padding: 16px 16px 0; }
          .vpp-hero { padding: 40px 16px; }
          .vpp-products { padding: 40px 16px 56px; }
          .vpp-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .vpp-metrics { gap: 16px; }
          .vpp-cta button { min-width: 140px; }
        }
        @media (max-width: 480px) {
          .vpp-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
      `}</style>

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div className="vpp-topbar">
        <div className="vpp-topbar-inner">
          <Link
            to="/"
            style={{
              color: "#7A3048",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            ← Inicio
          </Link>
        </div>
      </div>

      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav className="vpp-breadcrumb">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            style={{ color: "#7A3048", textDecoration: "none", fontWeight: 500 }}
          >
            Inicio
          </Link>
          <span style={{ color: "#D5D4D0" }}>›</span>
          <span style={{ color: "#9D9C97" }}>Tiendas</span>
          <span style={{ color: "#D5D4D0" }}>›</span>
          <span style={{ color: "#2C2C2A", fontWeight: 500 }}>
            {vendedor.nombreTienda}
          </span>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="vpp-hero">
        <div className="vpp-hero-inner">

          {/* Avatar + verified badge */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                overflow: "hidden",
                background: vendedor.avatarUrl
                  ? "transparent"
                  : "linear-gradient(135deg, #9D3D5E, #D4AA50)",
                border: "3px solid #FFFFFF",
                boxShadow: "0 4px 16px rgba(122, 48, 72, 0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "32px",
                fontWeight: 700,
              }}
            >
              {vendedor.avatarUrl ? (
                <img
                  src={vendedor.avatarUrl}
                  alt={vendedor.nombreTienda}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                vendedor.nombreTienda.charAt(0)
              )}
            </div>

            {/* Gold verified badge */}
            {vendedor.verificado && (
              <div
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "#D4AA50",
                  border: "2px solid #FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
                title="Vendedor verificado"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6L4.5 8.5L10 3.5"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Names */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#2C2C2A",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {vendedor.nombreTienda}
            </h1>
            <p
              style={{
                fontSize: "15px",
                color: "#6B6A65",
                margin: 0,
                fontWeight: 400,
              }}
            >
              por {vendedor.nombre}
            </p>
          </div>

          {/* Municipio chip */}
          <MoleculeMunicipioChip label={municipioNombre} />

          {/* Rating */}
          <MoleculeRating
            rating={vendedor.rating}
            reviewCount={vendedor.totalReseñas}
            starSize={16}
          />

          {/* Metrics row */}
          <div className="vpp-metrics">
            <Metric value={vendedor.totalProductos} label="productos" />
            <MetricDivider />
            <Metric value={vendedor.totalReseñas} label="reseñas" />
            <MetricDivider />
            <Metric value={añoRegistro ?? "—"} label="miembro desde" />
          </div>

          {/* Quote / narrative */}
          <div
            style={{
              maxWidth: "600px",
              padding: "8px 0",
              position: "relative",
            }}
          >
            {/* Opening quote */}
            <span
              aria-hidden
              style={{
                display: "block",
                fontFamily: "Georgia, serif",
                fontSize: "64px",
                lineHeight: 0.6,
                color: "#D4AA50",
                marginBottom: "12px",
                userSelect: "none",
              }}
            >
              "
            </span>
            <p
              style={{
                fontSize: "16px",
                color: "#4A4A48",
                lineHeight: 1.8,
                margin: 0,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {vendedor.descripcion}
            </p>
            {/* Closing quote */}
            <span
              aria-hidden
              style={{
                display: "block",
                fontFamily: "Georgia, serif",
                fontSize: "64px",
                lineHeight: 0.6,
                color: "#D4AA50",
                marginTop: "16px",
                textAlign: "right",
                userSelect: "none",
              }}
            >
              "
            </span>
          </div>

          {/* CTA buttons */}
          <div className="vpp-cta">
            <ButtonPrimary
              label="Seguir tienda"
              onClick={() => console.log("Seguir", vendedor.id)}
            />
            <ButtonSecondary
              label="Contactar"
              onClick={() => console.log("Contactar", vendedor.id)}
            />
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────── */}
      <section className="vpp-products">
        <div className="vpp-products-inner">

          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#2C2C2A",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Productos de {vendedor.nombreTienda}
            </h2>
            {productosVendedor.length > 0 && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#9D9C97",
                  fontWeight: 400,
                }}
              >
                {productosVendedor.length} artículo{productosVendedor.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Grid or empty state */}
          {productosVendedor.length === 0 ? (
            <div
              style={{
                marginTop: "48px",
                padding: "56px 24px",
                background: "#FAFAF8",
                borderRadius: "16px",
                border: "1px dashed #E5E4E0",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "40px", lineHeight: 1 }}>📦</span>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#2C2C2A",
                  margin: 0,
                }}
              >
                Aún no hay productos
              </p>
              <p style={{ fontSize: "14px", color: "#9D9C97", margin: 0 }}>
                Este vendedor aún no ha publicado productos. ¡Vuelve pronto!
              </p>
            </div>
          ) : (
            <div className="vpp-grid">
              {productosVendedor.map((p) => (
                <div key={p.id} style={{ position: "relative" }}>
                  <MoleculeProductCard
                    id={p.id}
                    imageUrl={p.imageUrl}
                    categoria={p.categoria}
                    municipio={getMunicipio(p.municipio)?.nombre ?? p.municipio}
                    productName={p.nombre}
                    price={`$${p.precio.toLocaleString("es-CO")}`}
                  />
                  {/* Discount/Nuevo overlay */}
                  {(p.descuento || p.esNuevo) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        pointerEvents: "none",
                      }}
                    >
                      <MoleculeDiscountPill
                        text={p.esNuevo ? "NUEVO" : `−${p.descuento}%`}
                        variant={p.esNuevo ? "nuevo" : "descuento"}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ── Helper components ──────────────────────────────────────────────── */

function Metric({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <span
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#2C2C2A",
          display: "block",
          lineHeight: 1.2,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "12px",
          color: "#9D9C97",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function MetricDivider() {
  return (
    <div
      style={{
        width: "1px",
        height: "32px",
        background: "#E8C4D0",
        flexShrink: 0,
      }}
    />
  );
}
