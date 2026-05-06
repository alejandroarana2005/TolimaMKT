import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { vendedores } from "../../data/vendedores";
import { getMunicipio } from "../../data/municipios";
import { MoleculeSearchBar } from "../components/molecules/MoleculeSearchBar";
import { MoleculeRating } from "../components/molecules/MoleculeRating";
import { MoleculeMunicipioChip } from "../components/molecules/MoleculeMunicipioChip";
import { TagCategoria } from "../components/atoms/TagCategoria";
import { ButtonSecondary } from "../components/atoms/ButtonSecondary";
import { OrganismHeader } from "../components/organisms/OrganismHeader";

const municipiosConVendedores = [...new Set(vendedores.map((v) => v.municipio))];

export default function VendorDirectoryPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [municipioFiltro, setMunicipioFiltro] = useState<string | null>(null);
  const [soloVerificados, setSoloVerificados] = useState(false);

  const filtered = useMemo(() => {
    return vendedores.filter((v) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const munNombre =
          getMunicipio(v.municipio)?.nombre?.toLowerCase() ?? v.municipio.toLowerCase();
        if (
          !v.nombreTienda.toLowerCase().includes(q) &&
          !v.nombre.toLowerCase().includes(q) &&
          !munNombre.includes(q)
        )
          return false;
      }
      if (municipioFiltro && v.municipio !== municipioFiltro) return false;
      if (soloVerificados && !v.verificado) return false;
      return true;
    });
  }, [searchQuery, municipioFiltro, soloVerificados]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        .vdp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }
        .vdp-card {
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(44,44,42,0.08);
          overflow: hidden;
          transition: box-shadow 220ms ease, transform 220ms ease;
          cursor: default;
        }
        .vdp-card:hover {
          box-shadow: 0 10px 32px rgba(44,44,42,0.14);
          transform: translateY(-2px);
        }
        .vdp-desc {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .vdp-cta-btn button {
          width: 100%;
          justify-content: center;
        }
        .vdp-filters-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .vdp-filters-bar::-webkit-scrollbar { display: none; }
        @media (max-width: 960px) {
          .vdp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .vdp-grid {
            grid-template-columns: 1fr;
            padding: 32px 16px;
          }
          .vdp-filters-bar { padding: 12px 16px; }
        }
      `}</style>

      <OrganismHeader />

      {/* Breadcrumb */}
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "18px 24px 0",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/" style={{ color: "#7A3048", textDecoration: "none", fontWeight: 500 }}>
          Inicio
        </Link>
        <span style={{ color: "#D5D4D0" }}>›</span>
        <span style={{ color: "#2C2C2A", fontWeight: 500 }}>Tiendas</span>
      </nav>

      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#F9F0F3",
          padding: "48px 24px",
          marginTop: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#2C2C2A",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Creadores del Tolima
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#6B6A65",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Conoce las historias detrás de cada prenda
            </p>
          </div>

          {/* Search bar */}
          <div style={{ maxWidth: "480px", width: "100%" }}>
            <MoleculeSearchBar
              placeholder="Buscar por tienda o municipio…"
              buttonLabel="Buscar"
              onSearch={(q) => setSearchQuery(q)}
            />
          </div>

          {/* Active stores counter */}
          <p
            style={{
              fontSize: "13px",
              color: "#9D9C97",
              margin: 0,
            }}
          >
            <span style={{ fontWeight: 700, color: "#7A3048" }}>
              {vendedores.length}
            </span>{" "}
            tiendas activas en el Tolima
          </p>
        </div>
      </div>

      {/* ── Filters bar ────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #F0EFE9",
          position: "sticky",
          top: "68px",
          zIndex: 30,
        }}
      >
        <div className="vdp-filters-bar">
          {/* Municipio chips */}
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#9D9C97",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Municipio
          </span>

          {municipiosConVendedores.map((mun) => {
            const nombre = getMunicipio(mun)?.nombre ?? mun;
            const isActive = municipioFiltro === mun;
            return (
              <MoleculeMunicipioChip
                key={mun}
                label={nombre}
                variant={isActive ? "active" : "default"}
                onClick={() => setMunicipioFiltro(isActive ? null : mun)}
              />
            );
          })}

          {/* Separator */}
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "#E5E4E0",
              flexShrink: 0,
              marginLeft: "4px",
              marginRight: "4px",
            }}
          />

          {/* Solo verificados toggle */}
          <button
            type="button"
            onClick={() => setSoloVerificados((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: soloVerificados ? "#FBF7ED" : "transparent",
              border: soloVerificados ? "1px solid #F2E4B8" : "1px solid #E5E4E0",
              borderRadius: "20px",
              padding: "6px 14px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 180ms ease",
            }}
          >
            {/* Custom checkbox */}
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "4px",
                background: soloVerificados ? "#D4AA50" : "#FFFFFF",
                border: soloVerificados ? "1.5px solid #D4AA50" : "1.5px solid #D5D4D0",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 180ms ease",
              }}
            >
              {soloVerificados && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5L4 7.5L8 2.5"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: soloVerificados ? 600 : 400,
                color: soloVerificados ? "#B08A2E" : "#6B6A65",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 180ms ease",
              }}
            >
              Solo verificados
            </span>
          </button>
        </div>
      </div>

      {/* ── Vendor Grid ─────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="vdp-grid">
          {filtered.map((v) => {
            const municipioNombre = getMunicipio(v.municipio)?.nombre ?? v.municipio;
            const año = new Date(v.fechaRegistro).getFullYear();
            const extraCats = v.categorias.length - 2;

            return (
              <div key={v.id} className="vdp-card">
                {/* Cover */}
                <div
                  style={{
                    height: "200px",
                    background: "linear-gradient(135deg, #F9F0F3 0%, #F2E4B8 100%)",
                    position: "relative",
                  }}
                >
                  {/* Year badge — top left */}
                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
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

                  {/* Products count — top right */}
                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#7A3048",
                      background: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(4px)",
                      padding: "3px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {v.totalProductos} productos
                  </span>

                  {/* Avatar — centered, overlapping bottom */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-32px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "64px",
                      height: "64px",
                    }}
                  >
                    <img
                      src={v.avatarUrl}
                      alt={v.nombreTienda}
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        border: "3px solid #FFFFFF",
                        objectFit: "cover",
                        background: "#E8C4D0",
                        display: "block",
                      }}
                    />
                    {/* Gold verified badge */}
                    {v.verificado && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "1px",
                          right: "1px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "#D4AA50",
                          border: "2px solid #FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
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

                {/* Card body */}
                <div
                  style={{
                    padding: "44px 20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    textAlign: "center",
                  }}
                >
                  {/* Store name */}
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#2C2C2A",
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {v.nombreTienda}
                  </h3>

                  {/* Municipio */}
                  <MoleculeMunicipioChip label={municipioNombre} />

                  {/* Rating */}
                  <MoleculeRating
                    rating={v.rating}
                    reviewCount={v.totalReseñas}
                    starSize={13}
                  />

                  {/* Description — 2-line clamp */}
                  <p
                    className="vdp-desc"
                    style={{
                      fontSize: "13px",
                      color: "#6B6A65",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {v.descripcion}
                  </p>

                  {/* Categories */}
                  {v.categorias.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      {v.categorias.slice(0, 2).map((cat) => (
                        <TagCategoria key={cat} label={cat} />
                      ))}
                      {extraCats > 0 && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#9D9C97",
                            alignSelf: "center",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          +{extraCats} más
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="vdp-cta-btn" style={{ width: "100%", marginTop: "4px" }}>
                    <ButtonSecondary
                      label="Ver tienda"
                      showIcon
                      onClick={() => navigate(`/tienda/${v.id}`)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "80px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "40px", lineHeight: 1, marginBottom: "4px" }}>🔍</div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#2C2C2A",
              margin: 0,
            }}
          >
            Ninguna tienda coincide
          </h2>
          <p style={{ fontSize: "14px", color: "#6B6A65", margin: 0, maxWidth: "320px" }}>
            Prueba con otro término de búsqueda o ajusta los filtros.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setMunicipioFiltro(null);
              setSoloVerificados(false);
            }}
            style={{
              marginTop: "8px",
              padding: "10px 24px",
              background: "#7A3048",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
