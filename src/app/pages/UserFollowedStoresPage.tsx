import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { vendedores } from "../../data/vendedores";
import { getMunicipio } from "../../data/municipios";
import { MoleculeRating } from "../components/molecules/MoleculeRating";
import { MoleculeMunicipioChip } from "../components/molecules/MoleculeMunicipioChip";
import { useFollowedStores } from "../../context/FollowedStoresContext";

const vendedorMap = new Map(vendedores.map((v) => [v.id, v]));

export default function UserFollowedStoresPage() {
  useEffect(() => { document.title = "Tiendas seguidas — TolimaMKT"; }, []);

  const navigate = useNavigate();
  const { followedStores, toggleFollow } = useFollowedStores();

  const seguidas = followedStores
    .map((id) => vendedorMap.get(id))
    .filter((v): v is NonNullable<typeof v> => v !== undefined);

  return (
    <div>
      <h2
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "#2C2C2A",
          margin: "0 0 4px",
        }}
      >
        Tiendas seguidas
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "#9D9C97",
          margin: "0 0 24px",
        }}
      >
        Sigues {seguidas.length} tienda{seguidas.length !== 1 ? "s" : ""}
      </p>

      {seguidas.length === 0 ? (
        <EmptyState onExplore={() => navigate("/tiendas")} />
      ) : (
        <>
          <div className="followed-grid">
            {seguidas.map((v) => (
              <StoreCard key={v.id} vendedor={v} onUnfollow={() => toggleFollow(v.id)} />
            ))}
          </div>
          <style>{`
            .followed-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
            }
            @media (max-width: 900px) {
              .followed-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 540px) {
              .followed-grid { grid-template-columns: 1fr; }
            }
          `}</style>
        </>
      )}
    </div>
  );
}

// ─── Store Card ───────────────────────────────────────────────────────────────

function StoreCard({
  vendedor,
  onUnfollow,
}: {
  vendedor: (typeof vendedores)[number];
  onUnfollow: () => void;
}) {
  const [confirmUnfollow, setConfirmUnfollow] = useState(false);
  const municipioNombre = getMunicipio(vendedor.municipio)?.nombre ?? vendedor.municipio;
  const año = new Date(vendedor.fechaRegistro).getFullYear();

  const handleUnfollowClick = () => {
    if (confirmUnfollow) {
      onUnfollow();
    } else {
      setConfirmUnfollow(true);
    }
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        boxShadow: "0 2px 12px rgba(44,44,42,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Cover gradient */}
      <div
        style={{
          height: "160px",
          background: "linear-gradient(135deg, #F9F0F3 0%, #F2E4B8 100%)",
          position: "relative",
        }}
      >
        {/* Year badge */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#9D9C97",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
            padding: "3px 10px",
            borderRadius: "20px",
          }}
        >
          Desde {año}
        </span>

        {/* Product count */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#7A3048",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
            padding: "3px 10px",
            borderRadius: "20px",
          }}
        >
          {vendedor.totalProductos} productos
        </span>

        {/* Avatar — overlaps bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "-28px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "56px",
            height: "56px",
          }}
        >
          <img
            src={vendedor.avatarUrl}
            alt={vendedor.nombreTienda}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "3px solid #FFFFFF",
              objectFit: "cover",
              background: "#E8C4D0",
              display: "block",
            }}
          />
          {vendedor.verificado && (
            <div
              style={{
                position: "absolute",
                bottom: "1px",
                right: "1px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#D4AA50",
                border: "2px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5L4 7.5L8 2.5"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "38px 18px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#2C2C2A",
            margin: 0,
            lineHeight: 1.25,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {vendedor.nombreTienda}
        </h3>

        <MoleculeMunicipioChip label={municipioNombre} />

        <MoleculeRating rating={vendedor.rating} reviewCount={vendedor.totalReseñas} starSize={13} />

        <p
          style={{
            fontSize: "12px",
            color: "#6B6A65",
            lineHeight: 1.55,
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {vendedor.descripcion}
        </p>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            marginTop: "4px",
          }}
        >
          {/* Unfollow with inline confirm */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            {confirmUnfollow && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#6B6A65",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                ¿Dejar de seguir?
              </span>
            )}
            <button
              type="button"
              onClick={handleUnfollowClick}
              style={{
                height: "34px",
                padding: "0 14px",
                background: confirmUnfollow ? "#FFF5F5" : "transparent",
                border: `1.5px solid ${confirmUnfollow ? "#FFCDD2" : "#E5E4E0"}`,
                borderRadius: "8px",
                color: confirmUnfollow ? "#C62828" : "#9D9C97",
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                if (!confirmUnfollow) {
                  e.currentTarget.style.borderColor = "#FFCDD2";
                  e.currentTarget.style.color = "#C62828";
                }
              }}
              onMouseLeave={(e) => {
                if (!confirmUnfollow) {
                  e.currentTarget.style.borderColor = "#E5E4E0";
                  e.currentTarget.style.color = "#9D9C97";
                }
              }}
            >
              {confirmUnfollow ? "Sí, dejar de seguir" : "Dejar de seguir"}
            </button>
            {confirmUnfollow && (
              <button
                type="button"
                onClick={() => setConfirmUnfollow(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "12px",
                  color: "#9D9C97",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Cancelar
              </button>
            )}
          </div>

          {/* Ver tienda */}
          <Link
            to={`/tienda/${vendedor.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "34px",
              borderRadius: "8px",
              background: "#F9F0F3",
              border: "1px solid #E8C4D0",
              color: "#7A3048",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              textDecoration: "none",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F0E0E8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F9F0F3")}
          >
            Ver tienda
          </Link>
        </div>
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
        padding: "72px 24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        maxWidth: "440px",
      }}
    >
      <span style={{ fontSize: "44px" }}>🏪</span>
      <p
        style={{
          margin: 0,
          fontSize: "16px",
          fontWeight: 600,
          color: "#2C2C2A",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Aún no sigues ninguna tienda
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "#9D9C97",
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "280px",
          lineHeight: 1.5,
        }}
      >
        Sigue tus tiendas favoritas para ver sus novedades primero.
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
        Explorar tiendas
      </button>
    </div>
  );
}
