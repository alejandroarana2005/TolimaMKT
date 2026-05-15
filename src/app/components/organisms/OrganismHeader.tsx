import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X, Check, Copy } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useUser } from "../../../context/UserContext";

// ─── Organism/Header Component ────────────────────────────────────────────────

interface OrganismHeaderProps {
  activeLink?: string;
  cartCount?: number;
  wishlistCount?: number;
  onNavigate?: (link: string) => void;
  onNavClick?: (item: string) => void;
  onLogoClick?: () => void;
  onWishlistClick?: () => void;
  onCartClick?: () => void;
  onAvatarClick?: () => void;
  avatarUrl?: string;
  userName?: string;
}

export function OrganismHeader({
  activeLink = "Inicio",
  cartCount = 0,
  wishlistCount = 0,
  onNavigate,
  onNavClick,
  onLogoClick,
  onWishlistClick,
  onCartClick,
  onAvatarClick,
  avatarUrl,
  userName = "Usuario",
}: OrganismHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user } = useUser();
  const cartBadge = getTotalItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarWrapperRef = useRef<HTMLDivElement>(null);
  const ctxAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.nombre + user.apellidos)}`;

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (avatarWrapperRef.current && !avatarWrapperRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  const navLinks = [
    { label: "Inicio", to: "/" },
    { label: "Tiendas", to: "/tiendas" },
    { label: "Catálogo", to: "/productos" },
    { label: "Municipios", to: "/municipios" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      {/* Desktop/Mobile Header */}
      <header
        style={{
          width: "100%",
          height: "68px",
          background: "#FFFFFF",
          borderBottom: "1px solid #E8C4D0",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            height: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#2C2C2A",
                lineHeight: 1,
              }}
            >
              TolimaMKT
            </span>
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#7A3048",
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              flex: 1,
            }}
            className="header-nav-desktop"
          >
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: isActive(to) ? "#7A3048" : "#6B6A65",
                  textDecoration: "none",
                  padding: "4px 0",
                  borderBottom: isActive(to) ? "2px solid #7A3048" : "2px solid transparent",
                  transition: "color 180ms ease, border-color 180ms ease",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Wishlist Icon - Desktop */}
            <button
              onClick={onWishlistClick}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 180ms ease",
              }}
              className="header-icon-desktop"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F9F0F3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Heart size={20} strokeWidth={2} style={{ color: "#6B6A65" }} />
            </button>

            {/* Cart Icon with Badge - Desktop */}
            <button
              onClick={() => { onCartClick?.(); navigate("/carrito"); }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                transition: "background 180ms ease",
              }}
              className="header-icon-desktop"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F9F0F3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <ShoppingCart size={20} strokeWidth={2} style={{ color: "#6B6A65" }} />
              {cartBadge > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    minWidth: "18px",
                    height: "18px",
                    borderRadius: "9px",
                    background: "#7A3048",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                  }}
                >
                  {cartBadge > 99 ? "99+" : cartBadge}
                </div>
              )}
            </button>

            {/* Avatar + Dropdown - Desktop */}
            <div
              ref={avatarWrapperRef}
              style={{ position: "relative" }}
              className="header-icon-desktop"
            >
              <button
                type="button"
                onClick={() => { onAvatarClick?.(); setDropdownOpen((v) => !v); }}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: `url(${ctxAvatarUrl}) center/cover`,
                  border: dropdownOpen ? "2px solid #E8C4D0" : "2px solid #F9F0F3",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  transition: "border-color 180ms ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8C4D0"; }}
                onMouseLeave={(e) => { if (!dropdownOpen) e.currentTarget.style.borderColor = "#F9F0F3"; }}
              />

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "#FFFFFF",
                    borderRadius: "12px",
                    boxShadow: "0 4px 24px rgba(44,44,42,0.12)",
                    border: "1px solid #F0EFE9",
                    minWidth: "220px",
                    zIndex: 100,
                    overflow: "hidden",
                  }}
                >
                  {/* User info */}
                  <div
                    style={{
                      padding: "14px 16px 12px",
                      borderBottom: "1px solid #F0EFE9",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 2px",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#2C2C2A",
                        fontFamily: "'DM Sans', sans-serif",
                        lineHeight: 1.3,
                      }}
                    >
                      {user.nombre} {user.apellidos}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#9D9C97",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {user.email}
                    </p>
                  </div>

                  {[
                    { label: "Mi perfil", to: "/perfil" },
                    { label: "Mis pedidos", to: "/perfil/pedidos" },
                    { label: "Panel de vendedor", to: "/vendedor/dashboard" },
                  ].map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#2C2C2A",
                        fontFamily: "'DM Sans', sans-serif",
                        textDecoration: "none",
                        transition: "background 150ms",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#F4F3F0"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      {label}
                    </Link>
                  ))}
                  <div style={{ height: "1px", background: "#F0EFE9", margin: "4px 0" }} />
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#C62828",
                      fontFamily: "'DM Sans', sans-serif",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 150ms",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF5F5"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "transparent",
                border: "none",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 180ms ease",
              }}
              className="header-menu-mobile"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F9F0F3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={2} style={{ color: "#2C2C2A" }} />
              ) : (
                <Menu size={24} strokeWidth={2} style={{ color: "#2C2C2A" }} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "68px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(44, 44, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderBottom: "1px solid #E8C4D0",
              padding: "16px 24px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {navLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: isActive(to) ? 600 : 400,
                    color: isActive(to) ? "#7A3048" : "#2C2C2A",
                    background: isActive(to) ? "#F9F0F3" : "transparent",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    display: "block",
                    transition: "background 180ms ease",
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .header-nav-desktop {
            display: none !important;
          }
          .header-menu-mobile {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .header-icon-desktop {
            display: flex !important;
          }
          .header-menu-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function OrganismHeaderShowcase() {
  const [activeLink, setActiveLink] = useState("Inicio");
  const [cartCount, setCartCount] = useState(3);
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleNavigate = (link: string) => {
    setActiveLink(link);
    addNotification(`Navegando a: ${link}`);
  };

  const handleWishlist = () => {
    addNotification("Abriendo lista de deseos");
  };

  const handleCart = () => {
    addNotification("Abriendo carrito de compras");
  };

  const handleAvatar = () => {
    addNotification("Abriendo perfil de usuario");
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* ── Header Strip ── */}
      <div
        className="rounded-xl border px-5 py-4 flex flex-wrap items-center gap-4"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{
              background: "#F9F0F3",
              borderColor: "#E8C4D0",
              borderWidth: 1.5,
            }}
          >
            <div
              style={{
                width: "20px",
                height: "2px",
                background: "#7A3048",
              }}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#2C2C2A",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.2,
              }}
            >
              Organism/Header
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              organism · Full navigation · 68px height
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Logo", "Navigation", "Icons", "Avatar", "Responsive"].map((v) => (
            <span
              key={v}
              className="px-2.5 py-1 rounded-full"
              style={{
                fontSize: 11,
                fontWeight: 500,
                background: "#F9F0F3",
                color: "#7A3048",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* ── Interactive Playground ── */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div
          className="px-5 py-3 border-b"
          style={{
            background: "#FAFAF8",
            borderColor: "#F0EFE9",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Interactive Playground
          </p>
        </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <p
              style={{
                fontSize: 13,
                color: "#6B6A65",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Click navigation links, icons, or resize window to test responsive behavior
            </p>
          </div>

          {/* Live Header Demo */}
          <div
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: "#E8C4D0", background: "#F4F3F0" }}
          >
            <OrganismHeader
              activeLink={activeLink}
              cartCount={cartCount}
              onNavigate={handleNavigate}
              onWishlistClick={handleWishlist}
              onCartClick={handleCart}
              onAvatarClick={handleAvatar}
              userName="María"
            />
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="mt-4 space-y-2">
              {notifications.map((notif, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-3 flex items-center gap-2"
                  style={{
                    borderColor: "#E8C4D0",
                    background: "#F9F0F3",
                    animation: "slideIn 200ms ease",
                  }}
                >
                  <Check size={14} strokeWidth={2.5} style={{ color: "#7A3048" }} />
                  <span
                    style={{
                      fontSize: 12,
                      color: "#2C2C2A",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {notif}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="mt-6 pt-4 border-t" style={{ borderColor: "#E5E4E0" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#9D3D5E",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Playground Controls
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCartCount((c) => c + 1)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #E8C4D0",
                  background: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#7A3048",
                  cursor: "pointer",
                }}
              >
                + Agregar al carrito ({cartCount})
              </button>
              <button
                onClick={() => setCartCount(Math.max(0, cartCount - 1))}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #E8C4D0",
                  background: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#7A3048",
                  cursor: "pointer",
                }}
              >
                − Quitar del carrito
              </button>
              <button
                onClick={() => setCartCount(0)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #E5E4E0",
                  background: "#F4F3F0",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6B6A65",
                  cursor: "pointer",
                }}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Anatomy Breakdown ── */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div
          className="px-5 py-3 border-b"
          style={{
            background: "#FAFAF8",
            borderColor: "#F0EFE9",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Header Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div
              className="rounded-lg border p-6"
              style={{
                borderColor: "#D4AA50",
                background: "#FDFCFA",
                borderStyle: "dashed",
                borderWidth: "2px",
              }}
            >
              <div
                style={{
                  height: "68px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "24px",
                }}
              >
                {/* Logo section */}
                <div
                  className="px-3 py-2 rounded"
                  style={{
                    background: "rgba(122, 48, 72, 0.08)",
                    borderLeft: "3px solid #7A3048",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#7A3048",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Logo + Accent
                  </span>
                </div>

                {/* Nav section */}
                <div
                  className="px-3 py-2 rounded flex-1"
                  style={{
                    background: "rgba(107, 106, 101, 0.06)",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#6B6A65",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Navigation Links (Desktop)
                  </span>
                </div>

                {/* Icons section */}
                <div
                  className="px-3 py-2 rounded flex gap-2"
                  style={{
                    background: "rgba(212, 170, 80, 0.08)",
                  }}
                >
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#E8C4D0" }} />
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#E8C4D0" }} />
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#7A3048" }} />
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Logo Section",
                  detail: "TolimaMKT · 20px Bold\nVinotinto accent dot\nClickable to home",
                  token: "Primary/Vinotinto",
                  color: "#7A3048",
                },
                {
                  label: "Navigation",
                  detail: "4 main links\nActive: #7A3048 + underline\nDefault: #6B6A65",
                  token: "Neutral/Gris-texto",
                  color: "#6B6A65",
                },
                {
                  label: "Action Icons",
                  detail: "Heart (wishlist)\nCart with badge\n32px avatar",
                  token: "Icons + Avatar",
                  color: "#2C2C2A",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 border"
                  style={{ borderColor: "#F0EFE9", background: "#FAFAF8" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        background: item.color,
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#2C2C2A",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <pre
                    style={{
                      fontSize: 10.5,
                      color: "#6B6A65",
                      fontFamily: "monospace",
                      lineHeight: 1.7,
                      margin: 0,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {item.detail}
                  </pre>
                  <span
                    style={{
                      fontSize: 9.5,
                      color: "#B0AFA9",
                      fontFamily: "monospace",
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {item.token}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive Behavior ── */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div
          className="px-5 py-3 border-b"
          style={{
            background: "#FAFAF8",
            borderColor: "#F0EFE9",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Responsive Behavior
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div
            className="rounded-lg border p-4"
            style={{ borderColor: "#F0EFE9", background: "#FDFCFA" }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div
                className="px-2 py-1 rounded text-xs font-mono"
                style={{ background: "#F9F0F3", color: "#7A3048", fontWeight: 600 }}
              >
                Desktop
              </div>
              <div className="flex-1">
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#2C2C2A",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 4,
                  }}
                >
                  &gt; 768px width
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Full navigation visible. Logo, all nav links, wishlist icon, cart with badge, and avatar displayed inline.
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border p-4"
            style={{ borderColor: "#F0EFE9", background: "#FDFCFA" }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div
                className="px-2 py-1 rounded text-xs font-mono"
                style={{ background: "#FBF7ED", color: "#B08A2E", fontWeight: 600 }}
              >
                Mobile
              </div>
              <div className="flex-1">
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#2C2C2A",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 4,
                  }}
                >
                  ≤ 768px width
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Navigation links hidden. Hamburger menu icon replaces nav. Tapping menu icon reveals overlay with vertical navigation.
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border p-4"
            style={{ borderColor: "#E8C4D0", background: "#F9F0F3" }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#7A3048",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Sticky Positioning
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#6B6A65",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
              }}
            >
              Header remains fixed at top of viewport while scrolling (position: sticky, top: 0) with z-index: 50 for proper layering.
            </p>
          </div>
        </div>
      </div>

      {/* ── Token Breakdown ── */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div
          className="px-5 py-3 border-b"
          style={{
            background: "#FAFAF8",
            borderColor: "#F0EFE9",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Token Breakdown
          </p>
        </div>

        <div className="divide-y" style={{ borderColor: "#F0EFE9" }}>
          <TokenRow token="Header → Width" value="100%" type="dimension" />
          <TokenRow token="Header → Max Width" value="1200px" type="dimension" />
          <TokenRow token="Header → Height" value="68px" type="dimension" />
          <TokenRow
            token="Header → Background"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow
            token="Header → Border Bottom"
            value="1px solid #E8C4D0"
            type="color"
            colorValue="#E8C4D0"
            tokenName="Primary/Rosa-suave"
          />
          <TokenRow token="Header → Position" value="sticky" type="dimension" />
          <TokenRow token="Header → Z-Index" value="50" type="dimension" />
          <TokenRow token="Container → Padding" value="0 24px" type="dimension" />
          <TokenRow token="Container → Gap" value="32px" type="dimension" />
          <TokenRow token="Logo → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Logo → Font Size" value="20px" type="typography" />
          <TokenRow token="Logo → Font Weight" value="700 (Bold)" type="typography" />
          <TokenRow
            token="Logo → Color"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow
            token="Logo → Accent"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow token="Logo → Accent Size" value="4px circle" type="dimension" />
          <TokenRow token="Nav Links → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Nav Links → Font Size" value="14px" type="typography" />
          <TokenRow token="Nav Links → Font Weight" value="400 (Regular)" type="typography" />
          <TokenRow
            token="Nav Links → Color (Default)"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow
            token="Nav Links → Color (Active)"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow
            token="Nav Links → Active Underline"
            value="2px solid #7A3048"
            type="dimension"
          />
          <TokenRow token="Nav Links → Gap" value="32px" type="dimension" />
          <TokenRow token="Icons → Size" value="20px" type="dimension" />
          <TokenRow token="Icons → Container" value="40px circle" type="dimension" />
          <TokenRow
            token="Icons → Color"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow
            token="Icons → Hover Background"
            value="#F9F0F3"
            type="color"
            colorValue="#F9F0F3"
            tokenName="Primary/Rosa-palido"
          />
          <TokenRow token="Cart Badge → Min Width" value="18px" type="dimension" />
          <TokenRow token="Cart Badge → Height" value="18px" type="dimension" />
          <TokenRow
            token="Cart Badge → Background"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow token="Cart Badge → Font Size" value="10px" type="typography" />
          <TokenRow token="Cart Badge → Font Weight" value="700 (Bold)" type="typography" />
          <TokenRow token="Avatar → Size" value="32px circle" type="dimension" />
          <TokenRow
            token="Avatar → Border"
            value="2px solid #F9F0F3"
            type="color"
            colorValue="#F9F0F3"
            tokenName="Primary/Rosa-palido"
          />
          <TokenRow
            token="Avatar → Background (Fallback)"
            value="#E8C4D0"
            type="color"
            colorValue="#E8C4D0"
            tokenName="Primary/Rosa-suave"
          />
          <TokenRow token="Mobile → Breakpoint" value="768px" type="dimension" />
          <TokenRow token="Mobile Menu → Icon Size" value="24px" type="dimension" />
          <TokenRow
            token="Mobile Menu → Overlay Background"
            value="rgba(44,44,42,0.4)"
            type="dimension"
          />
        </div>
      </div>

      {/* ── Use Cases ── */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div
          className="px-5 py-3 border-b"
          style={{
            background: "#FAFAF8",
            borderColor: "#F0EFE9",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Use Cases & Context
          </p>
        </div>

        <div className="p-6 space-y-4">
          {[
            {
              title: "Global Navigation",
              description:
                "Primary header for all TolimaMKT pages providing consistent navigation across the entire platform.",
              context: "Homepage, product pages, vendor pages, all main views",
            },
            {
              title: "E-commerce Header",
              description:
                "Shopping-focused header with cart counter and wishlist access for seamless purchasing experience.",
              context: "Product browsing, checkout flow, shopping cart",
            },
            {
              title: "User Account Access",
              description:
                "Quick access to user profile and settings through avatar button in persistent header.",
              context: "Account management, profile settings, user dashboard",
            },
            {
              title: "Mobile-First Navigation",
              description:
                "Responsive design with hamburger menu for mobile devices maintaining full functionality on small screens.",
              context: "Mobile browsing, tablet views, responsive layouts",
            },
          ].map((useCase) => (
            <div
              key={useCase.title}
              className="rounded-lg border p-4"
              style={{ borderColor: "#F0EFE9", background: "#FDFCFA" }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#2C2C2A",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 4,
                }}
              >
                {useCase.title}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#6B6A65",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 4,
                  lineHeight: 1.6,
                }}
              >
                {useCase.description}
              </p>
              <span
                style={{
                  fontSize: 11,
                  color: "#9D9C97",
                  fontFamily: "'DM Sans', sans-serif",
                  fontStyle: "italic",
                }}
              >
                {useCase.context}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Code Snippet ── */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div
          className="px-5 py-3 border-b"
          style={{
            background: "#FAFAF8",
            borderColor: "#F0EFE9",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Code Snippet
          </p>
        </div>

        <CodeBlock />
      </div>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────

function TokenRow({
  token,
  value,
  type,
  colorValue,
  tokenName,
}: {
  token: string;
  value: string;
  type: "color" | "typography" | "dimension";
  colorValue?: string;
  tokenName?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="grid grid-cols-12 items-center px-5 py-3 hover:bg-[#FDFCFA] transition-colors">
      <div className="col-span-5">
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#2C2C2A",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {token}
        </p>
      </div>

      <div className="col-span-4 flex items-center gap-2">
        {type === "color" && colorValue && (
          <div
            className="w-5 h-5 rounded border"
            style={{
              background: colorValue,
              borderColor: colorValue === "#FFFFFF" ? "#E5E4E0" : "transparent",
            }}
          />
        )}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono transition-all hover:bg-black/5"
          style={{
            background: "rgba(0,0,0,0.04)",
            color: "#6B6A65",
          }}
        >
          {copied ? (
            <Check size={10} strokeWidth={2.5} />
          ) : (
            <Copy size={10} strokeWidth={2} />
          )}
          {value}
        </button>
      </div>

      <div className="col-span-3 text-right">
        {tokenName && (
          <span className="text-xs font-mono" style={{ color: "#B0AFA9" }}>
            {tokenName}
          </span>
        )}
      </div>
    </div>
  );
}

function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const code = `// Organism/Header — TolimaMKT Design System
import { Heart, ShoppingCart } from "lucide-react";

<OrganismHeader
  activeLink="Inicio"
  cartCount={3}
  onNavigate={(link) => handleNavigation(link)}
  onWishlistClick={() => openWishlist()}
  onCartClick={() => openCart()}
  onAvatarClick={() => openProfile()}
  avatarUrl="/path/to/avatar.jpg"
  userName="María"
/>

// Header structure
width:          100%
max-width:      1200px (centered)
height:         68px
background:     #FFFFFF         // Neutral/Blanco
border-bottom:  1px solid #E8C4D0  // Primary/Rosa-suave
position:       sticky
top:            0
z-index:        50

// Logo
font:           DM Sans 20px Bold
color:          #2C2C2A         // Neutral/Carbon
accent:         #7A3048 dot (4px)  // Primary/Vinotinto

// Navigation links
font:           DM Sans 14px Regular
default:        #6B6A65         // Neutral/Gris-texto
active:         #7A3048         // Primary/Vinotinto
active-border:  2px solid #7A3048
gap:            32px

// Icons (Heart, Cart)
size:           20px
container:      40px circle
color:          #6B6A65
hover-bg:       #F9F0F3         // Primary/Rosa-palido

// Cart badge
min-width:      18px
height:         18px
background:     #7A3048         // Primary/Vinotinto
color:          #FFFFFF
font:           10px Bold

// Avatar
size:           32px circle
border:         2px solid #F9F0F3  // Primary/Rosa-palido
fallback-bg:    #E8C4D0         // Primary/Rosa-suave

// Responsive
mobile:         ≤ 768px
              - Hide nav links
              - Show hamburger menu
              - Overlay navigation panel`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all"
        style={{
          background: copied ? "#7A3048" : "rgba(0,0,0,0.06)",
          color: copied ? "#FFFFFF" : "#6B6A65",
          fontSize: 11,
          fontWeight: 500,
        }}
      >
        {copied ? (
          <Check size={12} strokeWidth={2.5} />
        ) : (
          <Copy size={12} strokeWidth={2} />
        )}
        {copied ? "Copied!" : "Copy"}
      </button>

      <pre
        className="p-5 overflow-x-auto"
        style={{
          fontSize: 12,
          fontFamily: "'Courier New', monospace",
          color: "#2C2C2A",
          lineHeight: 1.6,
        }}
      >
        {code}
      </pre>
    </div>
  );
}
