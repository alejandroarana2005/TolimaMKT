import { Link, useNavigate } from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { getMunicipio } from "../../data/municipios";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";
import { ButtonSecondary } from "../components/atoms/ButtonSecondary";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getTotalItems } = useCart();
  const navigate = useNavigate();
  const total = getTotal();

  /* ── Empty state ──────────────────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FFFFFF",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <TopBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
            gap: "20px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          {/* Bag illustration */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#F9F0F3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingBag size={44} strokeWidth={1.5} style={{ color: "#C9849A" }} />
          </div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#2C2C2A",
              margin: 0,
            }}
          >
            Tu carrito está vacío
          </h2>
          <p style={{ fontSize: "15px", color: "#9D9C97", margin: 0 }}>
            Descubre los productos de los emprendedores del Tolima.
          </p>
          <div style={{ marginTop: "8px" }}>
            <ButtonPrimary
              label="Explorar productos"
              onClick={() => navigate("/productos")}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ── Cart with items ─────────────────────────────────────────────── */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF8",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        .cart-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px 72px;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px;
          align-items: start;
        }
        .cart-summary {
          position: sticky;
          top: 80px;
          background: #FFFFFF;
          border: 1px solid #F0EFE9;
          border-radius: 16px;
          padding: 24px;
        }
        .cart-summary-cta button {
          width: 100%;
          justify-content: center;
        }
        .cart-item-row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #F0EFE9;
        }
        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr;
            padding: 16px 16px 56px;
            gap: 24px;
          }
          .cart-summary { position: static; }
          .cart-item-row {
            grid-template-columns: 72px 1fr;
            grid-template-rows: auto auto;
          }
          .cart-item-actions {
            grid-column: 1 / -1;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      `}</style>

      <TopBar />

      <div className="cart-layout">

        {/* ── Items list ────────────────────────────────────────── */}
        <div>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#2C2C2A",
                margin: 0,
              }}
            >
              Carrito
            </h1>
            <span style={{ fontSize: "14px", color: "#9D9C97" }}>
              {getTotalItems()} artículo{getTotalItems() !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Items */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #F0EFE9",
              padding: "0 20px",
            }}
          >
            {items.map((item) => {
              const { producto, cantidad } = item;
              const municipioNombre =
                getMunicipio(producto.municipio)?.nombre ?? producto.municipio;
              const subtotal = producto.precio * cantidad;

              return (
                <div key={producto.id} className="cart-item-row">
                  {/* Image */}
                  <Link to={`/producto/${producto.id}`}>
                    <img
                      src={producto.imageUrl}
                      alt={producto.nombre}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        display: "block",
                        background: "#F4F3F0",
                      }}
                    />
                  </Link>

                  {/* Info */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      minWidth: 0,
                    }}
                  >
                    <Link
                      to={`/producto/${producto.id}`}
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#2C2C2A",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                      }}
                    >
                      {producto.nombre}
                    </Link>
                    <span style={{ fontSize: "12px", color: "#9D9C97" }}>
                      {municipioNombre} · {producto.categoria}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#6B6A65",
                        marginTop: "2px",
                      }}
                    >
                      ${producto.precio.toLocaleString("es-CO")} c/u
                    </span>
                  </div>

                  {/* Actions: stepper + subtotal + remove */}
                  <div
                    className="cart-item-actions"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "10px",
                    }}
                  >
                    {/* Subtotal */}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#7A3048",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${subtotal.toLocaleString("es-CO")}
                    </span>

                    {/* Stepper + remove */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #E5E4E0",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <StepperBtn
                          label="−"
                          onClick={() => updateQuantity(producto.id, cantidad - 1)}
                          disabled={cantidad <= 1}
                        />
                        <span
                          style={{
                            width: "36px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#2C2C2A",
                            borderLeft: "1px solid #E5E4E0",
                            borderRight: "1px solid #E5E4E0",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {cantidad}
                        </span>
                        <StepperBtn
                          label="+"
                          onClick={() => updateQuantity(producto.id, cantidad + 1)}
                          disabled={cantidad >= producto.stock}
                        />
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeItem(producto.id)}
                        title="Eliminar"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          border: "1px solid #F0EFE9",
                          background: "#FAFAF8",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9D9C97",
                          transition: "background 150ms, color 150ms, border-color 150ms",
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#FDF0F3";
                          e.currentTarget.style.borderColor = "#E8C4D0";
                          e.currentTarget.style.color = "#7A3048";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#FAFAF8";
                          e.currentTarget.style.borderColor = "#F0EFE9";
                          e.currentTarget.style.color = "#9D9C97";
                        }}
                      >
                        <X size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue shopping */}
          <div style={{ marginTop: "20px" }}>
            <Link
              to="/productos"
              style={{
                fontSize: "13px",
                color: "#7A3048",
                textDecoration: "none",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ← Seguir explorando
            </Link>
          </div>
        </div>

        {/* ── Order summary sidebar ─────────────────────────────── */}
        <div className="cart-summary">
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#2C2C2A",
              margin: "0 0 20px",
            }}
          >
            Resumen del pedido
          </h2>

          {/* Lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <SummaryRow label="Subtotal" value={`$${total.toLocaleString("es-CO")}`} />
            <SummaryRow label="Envío" value="A calcular" muted />
            <hr style={{ border: "none", borderTop: "1px solid #F0EFE9", margin: "4px 0" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#2C2C2A",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#7A3048",
                }}
              >
                ${total.toLocaleString("es-CO")}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div
            className="cart-summary-cta"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "24px",
            }}
          >
            <ButtonPrimary
              label="Ir a pagar"
              onClick={() => navigate("/checkout")}
            />
            <ButtonSecondary
              label="Seguir comprando"
              onClick={() => navigate("/productos")}
            />
          </div>

          {/* Trust note */}
          <p
            style={{
              fontSize: "11px",
              color: "#B0AFA9",
              textAlign: "center",
              margin: "16px 0 0",
              lineHeight: 1.5,
            }}
          >
            Compra segura · Apoyas emprendedores del Tolima
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Helper components ────────────────────────────────────────────── */

function TopBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "#FFFFFF",
        borderBottom: "1px solid #F0EFE9",
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
          fontSize: "13px",
        }}
      >
        <Link
          to="/"
          style={{ color: "#7A3048", textDecoration: "none", fontWeight: 500 }}
        >
          Inicio
        </Link>
        <span style={{ color: "#D5D4D0" }}>›</span>
        <span style={{ color: "#2C2C2A", fontWeight: 500 }}>Carrito</span>
      </div>
    </div>
  );
}

function StepperBtn({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "32px",
        height: "32px",
        background: "transparent",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        color: disabled ? "#C0BFB9" : "#2C2C2A",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 150ms",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = "#F4F3F0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {label}
    </button>
  );
}

function SummaryRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: "14px", color: "#6B6A65" }}>{label}</span>
      <span
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: muted ? "#9D9C97" : "#2C2C2A",
          fontStyle: muted ? "italic" : "normal",
        }}
      >
        {value}
      </span>
    </div>
  );
}
