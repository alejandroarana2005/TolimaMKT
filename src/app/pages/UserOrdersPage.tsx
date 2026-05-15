import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productos } from "../../data/productos";
import { useCart } from "../../context/CartContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type Estado = "Nuevo" | "En preparación" | "En camino" | "Entregado";
type TabLabel = "Todos" | "Nuevos" | "En preparación" | "En camino" | "Entregados";

interface OrderItem { productoId: string; cantidad: number; }
interface Order {
  id: string;
  fecha: string;
  ts: number;
  estado: Estado;
  total: number;
  municipio: string;
  direccion: string;
  metodoPago: { tipo: string; icono: string };
  items: OrderItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ESTADO_STYLE: Record<Estado, { color: string; bg: string }> = {
  "Nuevo":          { color: "#7A3048", bg: "#F9F0F3" },
  "En preparación": { color: "#B08A2E", bg: "#FBF7ED" },
  "En camino":      { color: "#2C7A4B", bg: "#E8F5EE" },
  "Entregado":      { color: "#6B6A65", bg: "#F4F3F0" },
};

const ESTADO_STEP: Record<Estado, number> = {
  "Nuevo": 0, "En preparación": 1, "En camino": 2, "Entregado": 3,
};

const TIMELINE_LABELS = ["Confirmado", "En preparación", "En camino", "Entregado"];
const TABS: TabLabel[] = ["Todos", "Nuevos", "En preparación", "En camino", "Entregados"];

const TAB_ESTADO: Record<TabLabel, Estado | null> = {
  "Todos": null,
  "Nuevos": "Nuevo",
  "En preparación": "En preparación",
  "En camino": "En camino",
  "Entregados": "Entregado",
};

const productoMap = new Map(productos.map((p) => [p.id, p]));

const ORDERS: Order[] = [
  {
    id: "ORD-1748291847",
    fecha: "8 de mayo, 2026",
    ts: 1748291847,
    estado: "Entregado",
    total: 127900,
    municipio: "Ibagué",
    direccion: "Cra. 5 # 23-40, La Pola",
    metodoPago: { tipo: "Nequi", icono: "💜" },
    items: [
      { productoId: "p-001", cantidad: 1 },
      { productoId: "p-008", cantidad: 1 },
    ],
  },
  {
    id: "ORD-1747184729",
    fecha: "4 de mayo, 2026",
    ts: 1747184729,
    estado: "En camino",
    total: 175000,
    municipio: "Honda",
    direccion: "Cl. 12 # 8-55, Centro",
    metodoPago: { tipo: "PSE – Bancolombia", icono: "🏦" },
    items: [
      { productoId: "p-005", cantidad: 1 },
    ],
  },
  {
    id: "ORD-1746892034",
    fecha: "30 de abril, 2026",
    ts: 1746892034,
    estado: "En preparación",
    total: 97000,
    municipio: "El Espinal",
    direccion: "Av. 3 # 14-20, Barrio Nuevo",
    metodoPago: { tipo: "Nequi", icono: "💜" },
    items: [
      { productoId: "p-002", cantidad: 1 },
      { productoId: "p-007", cantidad: 1 },
    ],
  },
  {
    id: "ORD-1746500198",
    fecha: "26 de abril, 2026",
    ts: 1746500198,
    estado: "Nuevo",
    total: 153000,
    municipio: "Ibagué",
    direccion: "Cra. 5 # 23-40, La Pola",
    metodoPago: { tipo: "Contraentrega", icono: "💵" },
    items: [
      { productoId: "p-003", cantidad: 1 },
      { productoId: "p-006", cantidad: 1 },
    ],
  },
  {
    id: "ORD-1745289374",
    fecha: "17 de abril, 2026",
    ts: 1745289374,
    estado: "Entregado",
    total: 124000,
    municipio: "Ibagué",
    direccion: "Cra. 5 # 23-40, La Pola",
    metodoPago: { tipo: "PSE – Bancolombia", icono: "🏦" },
    items: [
      { productoId: "p-004", cantidad: 2 },
    ],
  },
  {
    id: "ORD-1744893823",
    fecha: "13 de abril, 2026",
    ts: 1744893823,
    estado: "Nuevo",
    total: 83000,
    municipio: "Melgar",
    direccion: "Calle 7 # 3-18, Centro",
    metodoPago: { tipo: "Nequi", icono: "💜" },
    items: [
      { productoId: "p-007", cantidad: 1 },
      { productoId: "p-008", cantidad: 1 },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserOrdersPage() {
  useEffect(() => { document.title = "Mis pedidos — TolimaMKT"; }, []);

  const { addItem } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabLabel>("Todos");
  const [sortOrder, setSortOrder] = useState<"reciente" | "antiguo">("reciente");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = ORDERS
    .filter((o) => {
      const needed = TAB_ESTADO[activeTab];
      return needed === null || o.estado === needed;
    })
    .sort((a, b) => sortOrder === "reciente" ? b.ts - a.ts : a.ts - b.ts);

  const handleToggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const handleReorder = (order: Order) => {
    order.items.forEach(({ productoId, cantidad }) => {
      const p = productoMap.get(productoId);
      if (p) addItem(p, cantidad);
    });
    navigate("/carrito");
  };

  return (
    <div style={{ maxWidth: "780px" }}>
      {/* Header */}
      <h2
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "#2C2C2A",
          margin: "0 0 4px",
        }}
      >
        Mis pedidos
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "#9D9C97",
          margin: "0 0 20px",
        }}
      >
        Seguimiento de todas tus compras
      </p>

      {/* Filter bar */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "12px",
          border: "1px solid #F0EFE9",
          padding: "10px 16px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  height: "32px",
                  padding: "0 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: isActive ? "#7A3048" : "transparent",
                  color: isActive ? "#FFFFFF" : "#6B6A65",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  transition: "background 150ms, color 150ms",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#F4F3F0";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <select
          value={sortOrder}
          title="Ordenar pedidos"
          onChange={(e) => setSortOrder(e.target.value as "reciente" | "antiguo")}
          style={{
            height: "32px",
            padding: "0 28px 0 10px",
            border: "1.5px solid #E5E4E0",
            borderRadius: "8px",
            fontSize: "13px",
            fontFamily: "'DM Sans', sans-serif",
            color: "#6B6A65",
            background: "#FAFAF8",
            outline: "none",
            cursor: "pointer",
            appearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239D9C97' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            flexShrink: 0,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#7A3048")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E4E0")}
        >
          <option value="reciente">Más reciente</option>
          <option value="antiguo">Más antiguo</option>
        </select>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <EmptyState onExplore={() => navigate("/productos")} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              expanded={expandedId === order.id}
              onToggle={() => handleToggle(order.id)}
              onReorder={() => handleReorder(order)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── OrderCard ────────────────────────────────────────────────────────────────

function OrderCard({
  order,
  expanded,
  onToggle,
  onReorder,
}: {
  order: Order;
  expanded: boolean;
  onToggle: () => void;
  onReorder: () => void;
}) {
  const { color, bg } = ESTADO_STYLE[order.estado];
  const activeStep = ESTADO_STEP[order.estado];

  const resolvedItems = order.items.flatMap(({ productoId, cantidad }) => {
    const p = productoMap.get(productoId);
    return p ? [{ producto: p, cantidad }] : [];
  });

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        border: "1px solid #F0EFE9",
        boxShadow: "0 1px 8px rgba(44,44,42,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Header row — clickable accordion trigger */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Left: ID + date */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#F9F0F3",
              border: "1px solid #E8C4D0",
              color: "#7A3048",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.04em",
              padding: "4px 12px",
              borderRadius: "20px",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {order.id}
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {order.fecha}
          </span>
        </div>

        {/* Right: estado badge + total + chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color,
              background: bg,
              padding: "4px 12px",
              borderRadius: "20px",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {order.estado}
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#7A3048",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            ${order.total.toLocaleString("es-CO")}
          </span>
          {/* Chevron */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              transition: "transform 200ms",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              color: "#9D9C97",
              flexShrink: 0,
            }}
          >
            <polyline
              points="6 9 12 15 18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Accordion body */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid #F0EFE9",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Products list */}
          <div>
            <SectionLabel>Productos</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
              {resolvedItems.map(({ producto, cantidad }) => (
                <div
                  key={producto.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <img
                    src={producto.imageUrl}
                    alt={producto.nombre}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      flexShrink: 0,
                      border: "1px solid #F0EFE9",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      to={`/producto/${producto.id}`}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#2C2C2A",
                        textDecoration: "none",
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#7A3048")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#2C2C2A")}
                    >
                      {producto.nombre}
                    </Link>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "#9D9C97",
                      }}
                    >
                      Cantidad: {cantidad}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#2C2C2A",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    ${(producto.precio * cantidad).toLocaleString("es-CO")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery info */}
          <div
            style={{
              background: "#FAFAF8",
              borderRadius: "10px",
              padding: "14px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <InfoPair icon="📍" label="Municipio" value={order.municipio} />
            <InfoPair icon="🏠" label="Dirección" value={order.direccion} />
            <InfoPair
              icon={order.metodoPago.icono}
              label="Método de pago"
              value={order.metodoPago.tipo}
            />
          </div>

          {/* Timeline */}
          <div>
            <SectionLabel>Estado del pedido</SectionLabel>
            <Timeline activeStep={activeStep} />
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              paddingTop: "4px",
            }}
          >
            <button
              type="button"
              onClick={onReorder}
              style={{
                height: "36px",
                padding: "0 18px",
                background: "transparent",
                border: "1.5px solid #E5E4E0",
                borderRadius: "9px",
                color: "#6B6A65",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                transition: "border-color 150ms, color 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7A3048";
                e.currentTarget.style.color = "#7A3048";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E4E0";
                e.currentTarget.style.color = "#6B6A65";
              }}
            >
              Volver a comprar
            </button>

            {order.estado === "Entregado" && (
              <Link
                to="/perfil/reseñas"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#7A3048",
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                Escribir reseña
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

function Timeline({ activeStep }: { activeStep: number }) {
  return (
    <div style={{ position: "relative", marginTop: "14px" }}>
      {/* Connector line */}
      <div
        style={{
          position: "absolute",
          top: "11px",
          left: "11px",
          right: "11px",
          height: "2px",
          background: "#F0EFE9",
          zIndex: 0,
        }}
      />
      {/* Progress fill */}
      <div
        style={{
          position: "absolute",
          top: "11px",
          left: "11px",
          width: `calc(${(activeStep / 3) * 100}% - 22px * ${activeStep / 3})`,
          height: "2px",
          background: "#7A3048",
          zIndex: 0,
          transition: "width 300ms ease",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        {TIMELINE_LABELS.map((label, i) => {
          const done = i <= activeStep;
          return (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                flex: 1,
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: done ? "#7A3048" : "#F0EFE9",
                  border: `2px solid ${done ? "#7A3048" : "#E5E4E0"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 200ms, border-color 200ms",
                }}
              >
                {done && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6L5 8.5L9.5 3.5"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: done ? 600 : 400,
                  color: done ? "#2C2C2A" : "#B0AFA9",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.3,
                  textAlign: "center",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onExplore }: { onExplore: () => void }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px dashed #E5E4E0",
        padding: "64px 24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "44px" }}>📦</span>
      <p
        style={{
          margin: 0,
          fontSize: "16px",
          fontWeight: 600,
          color: "#2C2C2A",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Aún no has hecho ningún pedido
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "#9D9C97",
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "300px",
          lineHeight: 1.5,
        }}
      >
        Cuando compres algo, tus pedidos aparecerán aquí con su seguimiento.
      </p>
      <button
        type="button"
        onClick={onExplore}
        style={{
          marginTop: "8px",
          height: "40px",
          padding: "0 24px",
          background: "#7A3048",
          border: "none",
          borderRadius: "10px",
          color: "#FFFFFF",
          fontSize: "14px",
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
          transition: "background 150ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#9D3D5E")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#7A3048")}
      >
        Explorar productos
      </button>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: "11px",
        fontWeight: 700,
        color: "#9D9C97",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {children}
    </p>
  );
}

function InfoPair({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ fontSize: "14px" }}>{icon}</span>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: "11px",
            color: "#9D9C97",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: 500,
            color: "#2C2C2A",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
