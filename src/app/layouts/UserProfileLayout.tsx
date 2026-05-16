import { Outlet, NavLink } from "react-router-dom";
import { OrganismHeader } from "../components/organisms/OrganismHeader";
import { MoleculeMunicipioChip } from "../components/molecules/MoleculeMunicipioChip";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { icon: "👤", label: "Mi perfil",        to: "/perfil",               end: true  },
  { icon: "📦", label: "Mis pedidos",      to: "/perfil/pedidos",       end: false },
  { icon: "❤️", label: "Favoritos",        to: "/perfil/favoritos",     end: false },
  { icon: "🏪", label: "Tiendas seguidas", to: "/perfil/tiendas-seguidas", end: false },
  { icon: "⭐", label: "Mis reseñas",      to: "/perfil/reseñas",       end: false },
  { icon: "💳", label: "Métodos de pago",  to: "/perfil/pagos",         end: false },
];

export default function UserProfileLayout() {
  const { user } = useUser();
  const { logout } = useAuth();
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.nombre + user.apellidos)}`;

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <OrganismHeader />

      <div style={{ display: "flex", minHeight: "calc(100vh - 68px)" }}>

        {/* ── Sidebar ───────────────────────────────────────────────── */}
        <aside className="profile-sidebar">

          {/* Avatar + name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "28px 20px 20px",
              borderBottom: "1px solid #F0EFE9",
              gap: "10px",
            }}
          >
            {/* Avatar with optional badge */}
            <div style={{ position: "relative" }}>
              <img
                src={avatarUrl}
                alt="Avatar de usuario"
                width={72}
                height={72}
                style={{
                  borderRadius: "50%",
                  border: "2px solid #E8C4D0",
                  background: "#F9F0F3",
                  display: "block",
                }}
              />
              {user.esCompradorLocal && (
                <div
                  title="Comprador local verificado"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#D4AA50",
                    border: "2.5px solid #FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    lineHeight: 1,
                  }}
                >
                  ⭐
                </div>
              )}
            </div>

            {/* Name */}
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                color: "#2C2C2A",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {user.nombre} {user.apellidos}
            </h3>

            {/* Municipio chip */}
            <MoleculeMunicipioChip label={user.municipio} variant="default" />
          </div>

          {/* Nav links */}
          <nav
            style={{
              flex: 1,
              padding: "14px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {NAV_ITEMS.map(({ icon, label, to, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `profile-nav-link${isActive ? " active" : ""}`
                }
              >
                <span style={{ fontSize: "17px", lineHeight: 1, flexShrink: 0 }}>
                  {icon}
                </span>
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sign out */}
          <div
            style={{
              padding: "14px 12px 24px",
              borderTop: "1px solid #F0EFE9",
            }}
          >
            <button type="button" className="profile-logout-btn" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* ── Content ───────────────────────────────────────────────── */}
        <main className="profile-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        .profile-sidebar {
          width: 260px;
          background: #FFFFFF;
          border-right: 1px solid #E8C4D0;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          position: sticky;
          top: 68px;
          height: calc(100vh - 68px);
          overflow-y: auto;
        }
        .profile-content {
          flex: 1;
          background: #F4F3F0;
          padding: 32px;
          min-height: calc(100vh - 68px);
        }
        .profile-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          font-family: 'DM Sans', sans-serif;
          color: #6B6A65;
          transition: background 150ms ease, color 150ms ease;
        }
        .profile-nav-link:hover {
          background: #F9F0F3;
          color: #7A3048;
        }
        .profile-nav-link.active {
          background: #F9F0F3;
          color: #7A3048;
          font-weight: 600;
        }
        .profile-logout-btn {
          width: 100%;
          padding: 10px 14px;
          background: transparent;
          border: 1px solid #FFCDD2;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #C62828;
          cursor: pointer;
          text-align: left;
          transition: background 150ms ease;
        }
        .profile-logout-btn:hover {
          background: #FFF5F5;
        }
        @media (max-width: 768px) {
          .profile-sidebar { display: none !important; }
          .profile-content { padding: 20px 16px 56px !important; }
        }
      `}</style>
    </div>
  );
}
