import { useNavigate } from "react-router-dom";
import { vendedores } from "../../data/vendedores";
import { productos } from "../../data/productos";
import { getMunicipio } from "../../data/municipios";
import { MoleculeProductCard } from "../components/molecules/MoleculeProductCard";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";

const vendedor = vendedores[0];
const misProductos = productos.filter((p) => p.vendedorId === vendedor.id);

const VENTAS_MES = 24;
const INGRESOS_MES = misProductos.reduce((sum, p) => sum + p.precio, 0) * 0.8;
const VISITAS_HOY = 142;

export default function VendorDashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "960px" }}>
      <style>{`
        .dash-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        .dash-products-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .dash-metrics { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .dash-metrics { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Greeting */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#2C2C2A",
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          Hola, {vendedor.nombreTienda} 👋
        </h1>
        <p style={{ fontSize: "14px", color: "#9D9C97", margin: 0 }}>
          Aquí tienes un resumen de cómo va tu tienda hoy
        </p>
      </div>

      {/* Metric cards */}
      <div className="dash-metrics">
        <MetricCard
          icon="📦"
          label="Tus productos"
          value={String(vendedor.totalProductos)}
          sublabel="publicados"
        />
        <MetricCard
          icon="🛍️"
          label="Ventas este mes"
          value={String(VENTAS_MES)}
          sublabel="pedidos recibidos"
        />
        <MetricCard
          icon="⭐"
          label="Tu calificación"
          value={String(vendedor.rating)}
          sublabel={`de ${vendedor.totalReseñas} reseñas`}
          gold
        />
        <MetricCard
          icon="👀"
          label="Visitas hoy"
          value={String(VISITAS_HOY)}
          sublabel="personas vieron tu tienda"
        />
      </div>

      {/* Recent products */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h2
            style={{ fontSize: "20px", fontWeight: 700, color: "#2C2C2A", margin: 0 }}
          >
            Tus últimos productos
          </h2>
          <ButtonPrimary
            label="+ Agregar producto"
            showIcon={false}
            onClick={() => navigate("/vendedor/catalogo")}
          />
        </div>

        {misProductos.length > 0 ? (
          <div className="dash-products-grid">
            {misProductos.slice(0, 4).map((p) => (
              <MoleculeProductCard
                key={p.id}
                id={p.id}
                imageUrl={p.imageUrl}
                categoria={p.categoria}
                municipio={getMunicipio(p.municipio)?.nombre ?? p.municipio}
                productName={p.nombre}
                price={`$${p.precio.toLocaleString("es-CO")}`}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "2px dashed #E8C4D0",
            }}
          >
            <p style={{ color: "#9D9C97", fontSize: "15px", margin: "0 0 16px" }}>
              Aún no tienes productos. ¡Agrega el primero!
            </p>
            <ButtonPrimary
              label="+ Agregar producto"
              showIcon={false}
              onClick={() => navigate("/vendedor/catalogo")}
            />
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div
        style={{
          marginTop: "40px",
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(44,44,42,0.06)",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "200px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#9D9C97",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Acciones rápidas
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <QuickAction
              icon="👕"
              label="Ver mis productos"
              onClick={() => navigate("/vendedor/catalogo")}
            />
            <QuickAction
              icon="📦"
              label="Ver mis pedidos"
              onClick={() => navigate("/vendedor/pedidos")}
            />
            <QuickAction
              icon="🏪"
              label="Ver mi tienda"
              onClick={() => navigate(`/tienda/${vendedor.id}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  sublabel,
  gold,
}: {
  icon: string;
  label: string;
  value: string;
  sublabel?: string;
  gold?: boolean;
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "24px 20px",
        boxShadow: "0 2px 8px rgba(44,44,42,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "32px", lineHeight: 1 }}>{icon}</span>
      <p
        style={{
          fontSize: "11px",
          color: "#9D9C97",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: gold ? "#B08A2E" : "#7A3048",
          margin: 0,
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      {sublabel && (
        <p style={{ fontSize: "11px", color: "#B0AFA9", margin: 0 }}>{sublabel}</p>
      )}
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "#F4F3F0",
        border: "none",
        borderRadius: "8px",
        padding: "10px 16px",
        fontSize: "13px",
        fontWeight: 500,
        color: "#2C2C2A",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "background 180ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#E5E4E0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#F4F3F0";
      }}
    >
      <span style={{ fontSize: "16px", lineHeight: 1 }}>{icon}</span>
      {label}
    </button>
  );
}
