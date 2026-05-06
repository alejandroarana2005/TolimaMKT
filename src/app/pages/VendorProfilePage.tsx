import { useParams, Link } from "react-router-dom";
import { vendedores } from "../../data/vendedores";
import { getMunicipio } from "../../data/municipios";
import { productos } from "../../data/productos";

export default function VendorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const vendedor = vendedores.find((v) => v.id === id);
  const productosVendedor = productos.filter((p) => p.vendedorId === id);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          borderBottom: "1px solid #F0EFE9",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#7A3048",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          ← Volver
        </Link>
        <span style={{ color: "#E5E4E0" }}>|</span>
        <span style={{ fontSize: "14px", color: "#6B6A65" }}>Tienda</span>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "48px auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Vendor header */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {vendedor?.avatarUrl && (
            <img
              src={vendedor.avatarUrl}
              alt={vendedor.nombreTienda}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#F4F3F0",
              }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#2C2C2A",
                  margin: 0,
                }}
              >
                {vendedor?.nombreTienda ?? `Tienda ${id}`}
              </h1>
              {vendedor?.verificado && (
                <span
                  style={{
                    background: "#EDF7F0",
                    border: "1px solid #B3DFBE",
                    color: "#2E7D52",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "20px",
                  }}
                >
                  Verificado
                </span>
              )}
            </div>
            <span style={{ fontSize: "13px", color: "#6B6A65" }}>
              {getMunicipio(vendedor?.municipio ?? "")?.nombre ?? vendedor?.municipio}
            </span>
            <span style={{ fontSize: "13px", color: "#9D9C97" }}>
              ★ {vendedor?.rating} · {vendedor?.totalReseñas} reseñas
            </span>
          </div>
        </div>

        {/* Description */}
        {vendedor?.descripcion && (
          <p style={{ fontSize: "15px", color: "#6B6A65", lineHeight: 1.6, margin: 0 }}>
            {vendedor.descripcion}
          </p>
        )}

        {/* Products */}
        {productosVendedor.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#2C2C2A",
                marginBottom: "16px",
              }}
            >
              Productos ({productosVendedor.length})
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "16px",
              }}
            >
              {productosVendedor.map((p) => (
                <Link
                  key={p.id}
                  to={`/producto/${p.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#F4F3F0",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.nombre}
                      style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
                    />
                    <div style={{ padding: "10px 12px" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#2C2C2A",
                          margin: "0 0 4px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.nombre}
                      </p>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#7A3048" }}>
                        ${p.precio.toLocaleString("es-CO")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
