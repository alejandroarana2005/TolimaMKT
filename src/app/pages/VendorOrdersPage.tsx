import { useState, useEffect } from "react";

type OrderStatus = "Nuevo" | "En preparación" | "Enviado" | "Entregado";

interface Pedido {
  id: string;
  fecha: string;
  productos: string[];
  imageUrls: string[];
  comprador: string;
  direccion: string;
  telefono: string;
  total: number;
  estado: OrderStatus;
}

const PEDIDOS: Pedido[] = [
  {
    id: "ORD-1746561600000",
    fecha: "06 may 2026",
    productos: ["Hoodie Pijao Roots (x1)"],
    imageUrls: ["https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&h=80&fit=crop"],
    comprador: "Luis Felipe Cárdenas",
    direccion: "Cra 5 #12-34, Ibagué",
    telefono: "+57 311 432 1987",
    total: 89900,
    estado: "Nuevo",
  },
  {
    id: "ORD-1746475200000",
    fecha: "05 may 2026",
    productos: ["Tote Bag Ibagué (x2)"],
    imageUrls: ["https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=80&h=80&fit=crop"],
    comprador: "Andrea Morales Peña",
    direccion: "Cl 10 #8-56, Espinal",
    telefono: "+57 315 876 5432",
    total: 76000,
    estado: "Nuevo",
  },
  {
    id: "ORD-1746388800000",
    fecha: "04 may 2026",
    productos: ["Mochila Cafetal Urban (x1)"],
    imageUrls: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&h=80&fit=crop"],
    comprador: "Juan Sebastián Torres",
    direccion: "Av. Ambala #22-11, Honda",
    telefono: "+57 301 234 5678",
    total: 85000,
    estado: "En preparación",
  },
  {
    id: "ORD-1746302400000",
    fecha: "03 may 2026",
    productos: ["Hoodie Pijao Roots (x1)", "Camiseta Tolima Tierra (x2)"],
    imageUrls: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
    ],
    comprador: "María del Pilar Ríos",
    direccion: "Cra 15 #33-07, Ibagué",
    telefono: "+57 318 765 4321",
    total: 193800,
    estado: "Enviado",
  },
  {
    id: "ORD-1746216000000",
    fecha: "02 may 2026",
    productos: ["Tote Bag Ibagué (x1)"],
    imageUrls: ["https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=80&h=80&fit=crop"],
    comprador: "Carlos Andrés Gutiérrez",
    direccion: "Cl 8 #5-90, Líbano",
    telefono: "+57 310 123 4567",
    total: 38000,
    estado: "Entregado",
  },
];

const STATUS_STYLE: Record<
  OrderStatus,
  { bg: string; color: string; border: string }
> = {
  Nuevo: { bg: "#F9F0F3", color: "#7A3048", border: "#E8C4D0" },
  "En preparación": { bg: "#FBF7ED", color: "#B08A2E", border: "#F2E4B8" },
  Enviado: { bg: "#F0FFF4", color: "#276749", border: "#9AE6B4" },
  Entregado: { bg: "#F4F3F0", color: "#6B6A65", border: "#E5E4E0" },
};

export default function VendorOrdersPage() {
  useEffect(() => { document.title = "Panel — TolimaMKT"; }, []);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>(PEDIDOS);

  const nuevos = pedidos.filter((p) => p.estado === "Nuevo").length;

  const avanzarEstado = (id: string) => {
    const orden: OrderStatus[] = [
      "Nuevo",
      "En preparación",
      "Enviado",
      "Entregado",
    ];
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const idx = orden.indexOf(p.estado);
        if (idx < orden.length - 1) return { ...p, estado: orden[idx + 1] };
        return p;
      })
    );
  };

  return (
    <div style={{ maxWidth: "860px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h2
          style={{ fontSize: "24px", fontWeight: 700, color: "#2C2C2A", margin: "0 0 2px" }}
        >
          Mis pedidos
        </h2>
        <p style={{ fontSize: "13px", color: "#9D9C97", margin: 0 }}>
          {pedidos.length} pedidos recibidos
        </p>
      </div>

      {/* Banner: new orders */}
      {nuevos > 0 && (
        <div
          style={{
            background: "#FBF7ED",
            border: "1.5px solid #F2E4B8",
            borderRadius: "12px",
            padding: "14px 20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "20px", lineHeight: 1 }}>🔔</span>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#B08A2E",
              margin: 0,
            }}
          >
            Tienes{" "}
            <span style={{ color: "#7A3048" }}>
              {nuevos} pedido{nuevos !== 1 ? "s" : ""} nuevo
              {nuevos !== 1 ? "s" : ""}
            </span>{" "}
            — atiéndelos pronto para mantener tu calificación alta
          </p>
        </div>
      )}

      {/* Orders list */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(44,44,42,0.06)",
        }}
      >
        {pedidos.map((pedido, i) => {
          const isExpanded = expandedId === pedido.id;
          const isLast = i === pedidos.length - 1;
          const st = STATUS_STYLE[pedido.estado];

          return (
            <div key={pedido.id}>
              {/* Row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : pedido.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 20px",
                  borderBottom:
                    isLast && !isExpanded ? "none" : "1px solid #F0EFE9",
                  cursor: "pointer",
                  transition: "background 150ms ease",
                  background: isExpanded ? "#FDFCFA" : "transparent",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded)
                    e.currentTarget.style.background = "#FDFCFA";
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Product thumbnails */}
                <div style={{ position: "relative", width: pedido.imageUrls.length > 1 ? "60px" : "44px", height: "44px", flexShrink: 0 }}>
                  {pedido.imageUrls.slice(0, 2).map((url, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={url}
                      alt=""
                      style={{
                        position: "absolute",
                        top: 0,
                        left: imgIdx * 16,
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        border: "2px solid #FFFFFF",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
                      }}
                    />
                  ))}
                </div>

                {/* Order ID */}
                <div style={{ minWidth: "150px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#7A3048",
                      margin: "0 0 2px",
                      fontFamily: "monospace",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {pedido.id.substring(0, 16)}…
                  </p>
                  <p style={{ fontSize: "11px", color: "#B0AFA9", margin: 0 }}>
                    {pedido.fecha}
                  </p>
                </div>

                {/* Products */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#2C2C2A",
                      margin: "0 0 2px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {pedido.productos.join(" · ")}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9D9C97", margin: 0 }}>
                    {pedido.comprador}
                  </p>
                </div>

                {/* Total */}
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#2C2C2A",
                    margin: 0,
                    flexShrink: 0,
                  }}
                >
                  ${pedido.total.toLocaleString("es-CO")}
                </p>

                {/* Status badge */}
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    background: st.bg,
                    border: `1px solid ${st.border}`,
                    color: st.color,
                    fontSize: "12px",
                    fontWeight: 600,
                    flexShrink: 0,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {pedido.estado}
                </span>

                {/* Expand arrow */}
                <span
                  style={{
                    fontSize: "14px",
                    color: "#9D9C97",
                    transform: isExpanded ? "rotate(180deg)" : "none",
                    transition: "transform 200ms ease",
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  ▾
                </span>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div
                  style={{
                    borderBottom: isLast ? "none" : "1px solid #F0EFE9",
                    background: "#FAFAF8",
                    padding: "20px 24px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <DetailSection label="Comprador">
                      <p style={detailValueStyle}>{pedido.comprador}</p>
                      <p style={detailSubStyle}>📞 {pedido.telefono}</p>
                    </DetailSection>
                    <DetailSection label="Dirección de entrega">
                      <p style={detailValueStyle}>📍 {pedido.direccion}</p>
                    </DetailSection>
                    <DetailSection label="Productos">
                      {pedido.productos.map((prod, pi) => (
                        <p key={pi} style={detailValueStyle}>
                          • {prod}
                        </p>
                      ))}
                    </DetailSection>
                    <DetailSection label="Total">
                      <p
                        style={{
                          ...detailValueStyle,
                          color: "#7A3048",
                          fontWeight: 700,
                          fontSize: "18px",
                        }}
                      >
                        ${pedido.total.toLocaleString("es-CO")} COP
                      </p>
                    </DetailSection>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {pedido.estado !== "Entregado" && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          avanzarEstado(pedido.id);
                        }}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "8px",
                          border: "none",
                          background: "#7A3048",
                          color: "#FFFFFF",
                          fontSize: "13px",
                          fontWeight: 600,
                          fontFamily: "'DM Sans', sans-serif",
                          cursor: "pointer",
                        }}
                      >
                        {pedido.estado === "Nuevo"
                          ? "✅ Aceptar pedido"
                          : pedido.estado === "En preparación"
                          ? "🚚 Marcar como enviado"
                          : "📬 Marcar como entregado"}
                      </button>
                    )}
                    <a
                      href={`https://wa.me/${pedido.telefono.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hola ${pedido.comprador.split(" ")[0]}, soy ${
                          "Raíces Store"
                        } en TolimaMKT. Tu pedido ${pedido.id} está ${pedido.estado.toLowerCase()}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "1.5px solid #25D366",
                        background: "transparent",
                        color: "#1A9E4A",
                        fontSize: "13px",
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        textDecoration: "none",
                        transition: "background 180ms ease",
                      }}
                    >
                      💬 Contactar por WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {(Object.entries(STATUS_STYLE) as [OrderStatus, (typeof STATUS_STYLE)[OrderStatus]][]).map(
          ([status, style]) => (
            <div key={status} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: style.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "12px", color: "#9D9C97", fontFamily: "'DM Sans', sans-serif" }}>
                {status}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────────────────── */
function DetailSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#9D9C97",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: "0 0 6px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

const detailValueStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#2C2C2A",
  margin: "0 0 2px",
  fontFamily: "'DM Sans', sans-serif",
  lineHeight: 1.5,
};

const detailSubStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#9D9C97",
  margin: 0,
  fontFamily: "'DM Sans', sans-serif",
};
