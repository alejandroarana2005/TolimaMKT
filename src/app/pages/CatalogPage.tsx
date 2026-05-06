import { useState } from "react";
import { Link } from "react-router-dom";
import { productos } from "../../data/productos";
import { municipios } from "../../data/municipios";

const CATEGORIAS = ["Todo", "Streetwear", "Accesorios", "Calzado", "Vintage", "Artesanal"];

export default function CatalogPage() {
  const [selectedCategoria, setSelectedCategoria] = useState("Todo");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");

  const filtered = productos.filter((p) => {
    const catMatch = selectedCategoria === "Todo" || p.categoria === selectedCategoria;
    const munMatch = !selectedMunicipio || p.municipio === selectedMunicipio;
    return catMatch && munMatch;
  });

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
        <span style={{ fontSize: "14px", color: "#6B6A65" }}>Catálogo</span>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#2C2C2A",
            marginBottom: "24px",
          }}
        >
          Catálogo
        </h1>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoria(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: selectedCategoria === cat ? "1px solid #7A3048" : "1px solid #E5E4E0",
                background: selectedCategoria === cat ? "#7A3048" : "#FFFFFF",
                color: selectedCategoria === cat ? "#FFFFFF" : "#6B6A65",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}

          <select
            value={selectedMunicipio}
            onChange={(e) => setSelectedMunicipio(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid #E5E4E0",
              background: "#FFFFFF",
              color: "#6B6A65",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <option value="">Todos los municipios</option>
            {municipios.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/producto/${p.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "#F4F3F0",
                  cursor: "pointer",
                  transition: "transform 0.15s",
                }}
              >
                <img
                  src={p.imageUrl}
                  alt={p.nombre}
                  style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
                />
                <div style={{ padding: "12px 14px" }}>
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
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#7A3048" }}>
                    ${p.precio.toLocaleString("es-CO")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "#9D9C97", marginTop: "48px" }}>
            No hay productos para esta selección.
          </p>
        )}
      </div>
    </div>
  );
}
