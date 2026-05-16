import { Outlet, NavLink, Link } from "react-router-dom";
import { vendedores } from "../../data/vendedores";
import { getMunicipio } from "../../data/municipios";

const vendedor = vendedores[0];

const NAV_ITEMS = [
  { icon: "🏠", label: "Mi panel", to: "/vendedor/dashboard" },
  { icon: "👕", label: "Mis productos", to: "/vendedor/catalogo" },
  { icon: "📦", label: "Mis pedidos", to: "/vendedor/pedidos" },
];

const MOBILE_NAV_ITEMS = [
  ...NAV_ITEMS,
  { icon: "🛍️", label: "Inicio", to: "/" },
];

export default function VendorLayout() {
  const municipioNombre = getMunicipio(vendedor.municipio)?.nombre ?? vendedor.municipio;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        .vendor-sidebar {
          width: 240px;
          background: #2C2C2A;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .vendor-content {
          flex: 1;
          background: #F4F3F0;
          padding: 32px;
          overflow: auto;
          min-height: 100vh;
        }
        .vendor-bottom-nav {
          display: none;
        }
        .vendor-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #E8C4D0;
          transition: background 180ms ease, color 180ms ease;
        }
        .vendor-nav-link:hover {
          background: rgba(122,48,72,0.35);
        }
        .vendor-nav-link.active {
          background: #7A3048;
          color: #FFFFFF;
        }
        @media (max-width: 768px) {
          .vendor-sidebar { display: none !important; }
          .vendor-bottom-nav { display: flex !important; }
          .vendor-content { padding: 20px 16px 88px !important; min-height: calc(100vh - 64px); }
        }
      `}</style>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="vendor-sidebar">
        {/* Logo */}
        <div style={{ padding: "24px 20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              TolimaMKT
            </span>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#7A3048",
                flexShrink: 0,
              }}
            />
          </div>
          <p
            style={{
              fontSize: "10px",
              color: "#6B6A65",
              margin: "4px 0 0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Panel del vendedor
          </p>
        </div>

        <div
          style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "0 20px" }}
        />

        {/* Vendor info */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={vendedor.avatarUrl}
            alt={vendedor.nombreTienda}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid #7A3048",
              flexShrink: 0,
              objectFit: "cover",
              background: "#3C3C3A",
            }}
          />
          <div style={{ overflow: "hidden", minWidth: 0 }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#FFFFFF",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {vendedor.nombreTienda}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#6B6A65",
                margin: "2px 0 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              📍 {municipioNombre}
            </p>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            margin: "0 20px 12px",
          }}
        />

        {/* Nav links */}
        <nav
          style={{
            flex: 1,
            padding: "0 12px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {NAV_ITEMS.map(({ icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `vendor-nav-link${isActive ? " active" : ""}`
              }
            >
              <span style={{ fontSize: "22px", lineHeight: 1, flexShrink: 0 }}>
                {icon}
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom: back to marketplace */}
        <div style={{ padding: "16px 12px 24px" }}>
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.07)",
              marginBottom: "16px",
            }}
          />
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6B6A65",
              textDecoration: "none",
              fontSize: "13px",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "color 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#E8C4D0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B6A65";
            }}
          >
            ← Ver marketplace
          </Link>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="vendor-content">
        <Outlet />
      </main>

      {/* ── Mobile bottom nav ────────────────────────────────────────────── */}
      <nav
        className="vendor-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#2C2C2A",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          zIndex: 50,
          padding: "8px 0 12px",
          flexDirection: "row",
        }}
      >
        {MOBILE_NAV_ITEMS.map(({ icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              flex: 1,
              textDecoration: "none",
              color: isActive ? "#D4AA50" : "#6B6A65",
              fontSize: "10px",
              fontWeight: isActive ? 600 : 400,
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 180ms ease",
            })}
          >
            <span style={{ fontSize: "24px", lineHeight: 1 }}>{icon}</span>
            <span>{label.split(" ").slice(-1)[0]}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
