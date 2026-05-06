import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productos } from "../../data/productos";
import { vendedores } from "../../data/vendedores";
import { getMunicipio } from "../../data/municipios";
import { MoleculeDiscountPill } from "../components/molecules/MoleculeDiscountPill";
import { MoleculeRating } from "../components/molecules/MoleculeRating";
import { MoleculeMunicipioChip } from "../components/molecules/MoleculeMunicipioChip";
import { MoleculeMiniVendor } from "../components/molecules/MoleculeMiniVendor";
import { TagCategoria } from "../components/atoms/TagCategoria";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";
import { ButtonSecondary } from "../components/atoms/ButtonSecondary";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const producto = productos.find((p) => p.id === id);
  const vendedor = producto
    ? vendedores.find((v) => v.id === producto.vendedorId)
    : undefined;
  const municipioNombre =
    getMunicipio(producto?.municipio ?? "")?.nombre ?? producto?.municipio ?? "";

  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
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
        <div
          style={{
            fontSize: "48px",
            lineHeight: 1,
            marginBottom: "8px",
          }}
        >
          🔍
        </div>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#2C2C2A",
            margin: 0,
          }}
        >
          Producto no encontrado
        </h1>
        <p style={{ fontSize: "15px", color: "#6B6A65", margin: 0 }}>
          El producto que buscas no existe o fue eliminado.
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        /* Responsive layout */
        .pdp-breadcrumb {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px 0;
        }
        .pdp-grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 56px;
          max-width: 1200px;
          margin: 36px auto 64px;
          padding: 0 24px;
          align-items: start;
        }
        .pdp-img-wrapper {
          position: sticky;
          top: 24px;
        }
        /* Full-width CTA buttons */
        .pdp-cta button {
          width: 100%;
          justify-content: center;
        }
        /* Quantity stepper disabled */
        .pdp-qty-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .pdp-breadcrumb {
            padding: 16px 16px 0;
          }
          .pdp-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            margin: 24px auto 48px;
            padding: 0 16px;
          }
          .pdp-img-wrapper {
            position: static;
          }
        }
      `}</style>

      {/* Top bar */}
      <div
        style={{
          borderBottom: "1px solid #F0EFE9",
          background: "#FFFFFF",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#7A3048",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            ← Inicio
          </Link>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="pdp-breadcrumb">
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
          <Link
            to="/productos"
            style={{ color: "#9D9C97", textDecoration: "none" }}
          >
            {producto.categoria}
          </Link>
          <span style={{ color: "#D5D4D0" }}>›</span>
          <span
            style={{
              color: "#2C2C2A",
              fontWeight: 500,
              maxWidth: "240px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {producto.nombre}
          </span>
        </div>
      </nav>

      {/* Two-column layout */}
      <div className="pdp-grid">
        {/* ── Left column: image ─────────────────────────────── */}
        <div className="pdp-img-wrapper">
          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#F4F3F0",
              aspectRatio: "1 / 1",
            }}
          >
            <img
              src={producto.imageUrl}
              alt={producto.nombre}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Discount pill — bottom left */}
            {producto.descuento && !producto.esNuevo && (
              <div
                style={{ position: "absolute", bottom: "16px", left: "16px" }}
              >
                <MoleculeDiscountPill
                  text={`−${producto.descuento}%`}
                  variant="descuento"
                />
              </div>
            )}

            {/* Nuevo badge — top right */}
            {producto.esNuevo && (
              <div
                style={{ position: "absolute", top: "16px", right: "16px" }}
              >
                <MoleculeDiscountPill text="NUEVO" variant="nuevo" />
              </div>
            )}

            {/* Discount + Nuevo: both can show */}
            {producto.descuento && producto.esNuevo && (
              <div
                style={{ position: "absolute", bottom: "16px", left: "16px" }}
              >
                <MoleculeDiscountPill
                  text={`−${producto.descuento}%`}
                  variant="descuento"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Right column: info ─────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Municipio chip */}
          <div>
            <MoleculeMunicipioChip label={municipioNombre} />
          </div>

          {/* Product name */}
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#2C2C2A",
              margin: 0,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            {producto.nombre}
          </h1>

          {/* Rating */}
          <MoleculeRating
            rating={producto.rating}
            reviewCount={producto.totalReseñas}
            starSize={16}
          />

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span
              style={{ fontSize: "28px", fontWeight: 700, color: "#7A3048" }}
            >
              ${producto.precio.toLocaleString("es-CO")}
            </span>
            {producto.precioOriginal && (
              <span
                style={{
                  fontSize: "18px",
                  color: "#9D9C97",
                  textDecoration: "line-through",
                }}
              >
                ${producto.precioOriginal.toLocaleString("es-CO")}
              </span>
            )}
            {producto.descuento && (
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#B08A2E",
                  background: "#FBF7ED",
                  border: "1px solid #F2E4B8",
                  padding: "2px 8px",
                  borderRadius: "20px",
                }}
              >
                −{producto.descuento}% off
              </span>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "15px",
              color: "#6B6A65",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {producto.descripcion}
          </p>

          {/* Tags */}
          {producto.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {producto.tags.map((tag) => (
                <TagCategoria key={tag} label={tag} />
              ))}
            </div>
          )}

          {/* Divider */}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #F0EFE9",
              margin: 0,
            }}
          />

          {/* Vendedor */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#9D9C97",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Vendedor
            </p>
            {vendedor ? (
              <MoleculeMiniVendor
                id={vendedor.id}
                avatarUrl={vendedor.avatarUrl}
                vendorName={vendedor.nombreTienda}
                municipio={
                  getMunicipio(vendedor.municipio)?.nombre ?? vendedor.municipio
                }
                isVerified={vendedor.verificado}
                rating={vendedor.rating}
              />
            ) : (
              <p style={{ fontSize: "14px", color: "#9D9C97" }}>
                Vendedor no disponible
              </p>
            )}
          </div>

          {/* Divider */}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #F0EFE9",
              margin: 0,
            }}
          />

          {/* Quantity selector */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#9D9C97",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Cantidad
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
              <button
                type="button"
                className="pdp-qty-btn"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                disabled={cantidad <= 1}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#F4F3F0",
                  border: "1px solid #E5E4E0",
                  borderRadius: "8px 0 0 8px",
                  fontSize: "20px",
                  lineHeight: 1,
                  cursor: "pointer",
                  color: "#2C2C2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 150ms ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (cantidad > 1)
                    e.currentTarget.style.background = "#E5E4E0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F4F3F0";
                }}
              >
                −
              </button>

              <span
                style={{
                  width: "56px",
                  height: "40px",
                  border: "1px solid #E5E4E0",
                  borderLeft: "none",
                  borderRight: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#2C2C2A",
                  flexShrink: 0,
                }}
              >
                {cantidad}
              </span>

              <button
                type="button"
                className="pdp-qty-btn"
                onClick={() =>
                  setCantidad((c) => Math.min(producto.stock, c + 1))
                }
                disabled={cantidad >= producto.stock}
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#F4F3F0",
                  border: "1px solid #E5E4E0",
                  borderRadius: "0 8px 8px 0",
                  fontSize: "20px",
                  lineHeight: 1,
                  cursor: "pointer",
                  color: "#2C2C2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 150ms ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (cantidad < producto.stock)
                    e.currentTarget.style.background = "#E5E4E0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F4F3F0";
                }}
              >
                +
              </button>

              <span
                style={{
                  fontSize: "12px",
                  color: "#B0AFA9",
                  marginLeft: "12px",
                }}
              >
                {producto.stock} disponibles
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="pdp-cta" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <ButtonPrimary
              label={`Agregar al carrito · ${cantidad}`}
              showIcon
              onClick={() => console.log("Agregar al carrito", { id: producto.id, cantidad })}
            />
            <ButtonSecondary
              label="Ver tienda del vendedor"
              showIcon
              onClick={() => navigate(`/tienda/${producto.vendedorId}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
