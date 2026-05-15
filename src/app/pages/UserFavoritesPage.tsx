import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import { productos } from "../../data/productos";
import { MoleculeProductCard } from "../components/molecules/MoleculeProductCard";
import { useCart } from "../../context/CartContext";

type SortKey = "reciente" | "menor-precio" | "mayor-precio";

const SORT_LABELS: Record<SortKey, string> = {
  "reciente": "Agregado recientemente",
  "menor-precio": "Menor precio",
  "mayor-precio": "Mayor precio",
};

const productoMap = new Map(productos.map((p) => [p.id, p]));

export default function UserFavoritesPage() {
  useEffect(() => { document.title = "Mis favoritos — TolimaMKT"; }, []);

  const navigate = useNavigate();
  const { favorites, clearFavorites } = useFavorites();
  const { addItem } = useCart();

  const [sortKey, setSortKey] = useState<SortKey>("reciente");
  const [confirmClear, setConfirmClear] = useState(false);

  const favProducts = useMemo(() => {
    const resolved = favorites
      .map((id) => productoMap.get(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);

    switch (sortKey) {
      case "menor-precio":
        return [...resolved].sort((a, b) => a.precio - b.precio);
      case "mayor-precio":
        return [...resolved].sort((a, b) => b.precio - a.precio);
      default:
        return [...resolved].reverse();
    }
  }, [favorites, sortKey]);

  const handleClear = () => {
    if (confirmClear) {
      clearFavorites();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  };

  return (
    <div>
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
        Mis favoritos
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "#9D9C97",
          margin: "0 0 20px",
        }}
      >
        {favProducts.length} producto{favProducts.length !== 1 ? "s" : ""} guardado
        {favProducts.length !== 1 ? "s" : ""}
      </p>

      {/* Toolbar — only shown when there are favorites */}
      {favProducts.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Sort selector */}
          <select
            value={sortKey}
            title="Ordenar favoritos"
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            style={{
              height: "36px",
              padding: "0 32px 0 12px",
              border: "1.5px solid #E5E4E0",
              borderRadius: "10px",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
              color: "#6B6A65",
              background: "#FFFFFF",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239D9C97' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#7A3048")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E4E0")}
          >
            {(Object.entries(SORT_LABELS) as [SortKey, string][]).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Clear button with inline confirmation */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {confirmClear && (
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "#6B6A65",
                }}
              >
                ¿Limpiar todos?
              </span>
            )}
            <button
              type="button"
              onClick={handleClear}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                color: confirmClear ? "#C62828" : "#9D9C97",
                padding: "4px 0",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C62828")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = confirmClear ? "#C62828" : "#9D9C97")
              }
            >
              {confirmClear ? "Sí, limpiar" : "Limpiar todos"}
            </button>
            {confirmClear && (
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#9D9C97",
                  padding: "4px 0",
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      {favProducts.length === 0 ? (
        <EmptyState onExplore={() => navigate("/productos")} />
      ) : (
        <>
          <div className="fav-grid">
            {favProducts.map((p) => (
              <MoleculeProductCard
                key={p.id}
                id={p.id}
                imageUrl={p.imageUrl}
                categoria={p.categoria}
                municipio={p.municipio}
                productName={p.nombre}
                price={`$${p.precio.toLocaleString("es-CO")}`}
                onAddToCart={() => addItem(p, 1)}
              />
            ))}
          </div>

          <style>{`
            .fav-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
            }
            @media (max-width: 1024px) {
              .fav-grid { grid-template-columns: repeat(3, 1fr); }
            }
            @media (max-width: 640px) {
              .fav-grid { grid-template-columns: repeat(2, 1fr); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onExplore }: { onExplore: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "72px 24px",
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px dashed #E8C4D0",
        textAlign: "center",
        maxWidth: "440px",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "#F9F0F3",
          border: "2px solid #E8C4D0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Heart size={32} strokeWidth={1.5} style={{ color: "#E8C4D0" }} />
      </div>
      <div>
        <p
          style={{
            margin: "0 0 6px",
            fontSize: "17px",
            fontWeight: 700,
            color: "#2C2C2A",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Aún no tienes favoritos
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#9D9C97",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.55,
            maxWidth: "280px",
          }}
        >
          Toca el corazón en cualquier producto para guardarlo aquí
        </p>
      </div>
      <button
        type="button"
        onClick={onExplore}
        style={{
          marginTop: "4px",
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
