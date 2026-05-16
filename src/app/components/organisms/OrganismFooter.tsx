import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, Instagram } from "lucide-react";

// ─── Social Media Icons ────────────────────────────────────────────────────────

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Organism/Footer Component ────────────────────────────────────────────────

interface FooterLink {
  label: string;
  to?: string;
  href?: string;
  onClick?: () => void;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface OrganismFooterProps {
  tagline?: string;
  columns?: FooterColumn[];
  copyrightText?: string;
  copyright?: string;
  onSocialClick?: (platform: "instagram" | "tiktok" | "whatsapp") => void;
  onLinkClick?: (label: string) => void;
}

export function OrganismFooter({
  tagline = "El mercado de moda del Tolima",
  columns = DEFAULT_COLUMNS,
  copyrightText = `© ${new Date().getFullYear()} TolimaMKT. Todos los derechos reservados.`,
  copyright,
  onSocialClick,
  onLinkClick,
}: OrganismFooterProps) {
  return (
    <footer
      style={{
        width: "100%",
        background: "#2C2C2A",
        padding: "48px 24px 24px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Main Footer Content - 4 Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
            marginBottom: "40px",
          }}
          className="footer-columns"
        >
          {/* Column 1: Logo + Tagline + Social */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "#7A3048",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "4px",
                    background: "#D4AA50",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                TolimaMKT
              </span>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "#9D9C97",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {tagline}
            </p>

            {/* Social Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              <button
                onClick={() => onSocialClick?.("instagram")}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(212, 170, 80, 0.1)",
                  border: "1px solid rgba(212, 170, 80, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 180ms ease",
                  color: "#D4AA50",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D4AA50";
                  e.currentTarget.style.color = "#2C2C2A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 170, 80, 0.1)";
                  e.currentTarget.style.color = "#D4AA50";
                }}
              >
                <Instagram size={18} strokeWidth={2} />
              </button>

              <button
                onClick={() => onSocialClick?.("tiktok")}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(212, 170, 80, 0.1)",
                  border: "1px solid rgba(212, 170, 80, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 180ms ease",
                  color: "#D4AA50",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D4AA50";
                  e.currentTarget.style.color = "#2C2C2A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 170, 80, 0.1)";
                  e.currentTarget.style.color = "#D4AA50";
                }}
              >
                <TikTokIcon size={18} />
              </button>

              <button
                onClick={() => onSocialClick?.("whatsapp")}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(212, 170, 80, 0.1)",
                  border: "1px solid rgba(212, 170, 80, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 180ms ease",
                  color: "#D4AA50",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D4AA50";
                  e.currentTarget.style.color = "#2C2C2A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212, 170, 80, 0.1)";
                  e.currentTarget.style.color = "#D4AA50";
                }}
              >
                <WhatsAppIcon size={18} />
              </button>
            </div>
          </div>

          {/* Columns 2-4: Navigation Links */}
          {columns.map((column, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Column Title */}
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {column.title}
              </h3>

              {/* Links List */}
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        onClick={() => onLinkClick?.(link.label)}
                        className="footer-link"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#E8C4D0",
                          textDecoration: "none",
                          transition: "color 180ms ease",
                          display: "inline-block",
                        }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          link.onClick?.();
                          onLinkClick?.(link.label);
                        }}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#9D9C97",
                          background: "transparent",
                          border: "none",
                          cursor: "default",
                          padding: 0,
                          textAlign: "left",
                        }}
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(232, 196, 208, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
          className="footer-bottom"
        >
          {/* Copyright Text */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              color: "#6B6A65",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {copyright ?? copyrightText}
          </p>

          {/* Payment Methods */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#9D9C97",
                marginRight: "4px",
              }}
            >
              Métodos de pago:
            </span>

            {/* PSE */}
            <div
              style={{
                height: "24px",
                padding: "0 8px",
                borderRadius: "4px",
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#2C2C2A",
                  letterSpacing: "0.03em",
                }}
              >
                PSE
              </span>
            </div>

            {/* Nequi */}
            <div
              style={{
                height: "24px",
                padding: "0 8px",
                borderRadius: "4px",
                background: "#FF0090",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.05em",
                }}
              >
                Nequi
              </span>
            </div>

            {/* Daviplata */}
            <div
              style={{
                height: "24px",
                padding: "0 8px",
                borderRadius: "4px",
                background: "#ED1C24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "8px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.03em",
                }}
              >
                DaviPlata
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .footer-link:hover { color: #FFFFFF !important; }
        @media (max-width: 968px) {
          .footer-columns {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px 24px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-columns {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </footer>
  );
}

// ─── Default Columns Data ──────────────────────────────────────────────────────

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Explorar",
    links: [
      { label: "Moda y Accesorios", to: "/moda" },
      { label: "Catálogo completo", to: "/productos" },
      { label: "Tiendas", to: "/tiendas" },
      { label: "Nuevos productos", to: "/productos?estado=nuevo" },
      { label: "En oferta", to: "/productos?estado=descuento" },
    ],
  },
  {
    title: "Vender en TolimaMKT",
    links: [
      { label: "Panel del vendedor", to: "/vendedor/dashboard" },
      { label: "Crear tienda" },
      { label: "Guía del vendedor" },
      { label: "Comisiones" },
      { label: "Ayuda para vendedores" },
    ],
  },
  {
    title: "Municipios",
    links: [
      { label: "Ibagué", to: "/productos?municipio=Ibagué" },
      { label: "Honda", to: "/productos?municipio=Honda" },
      { label: "El Espinal", to: "/productos?municipio=El Espinal" },
      { label: "Líbano", to: "/productos?municipio=Líbano" },
      { label: "Mariquita", to: "/productos?municipio=Mariquita" },
      { label: "Melgar", to: "/productos?municipio=Melgar" },
      { label: "Chaparral", to: "/productos?municipio=Chaparral" },
    ],
  },
];

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function OrganismFooterShowcase() {
  const [footerEvents, setFooterEvents] = useState<string[]>([]);

  const handleSocialClick = (platform: "instagram" | "tiktok" | "whatsapp") => {
    const labels = {
      instagram: "Instagram",
      tiktok: "TikTok",
      whatsapp: "WhatsApp",
    };
    addEvent(`Social: ${labels[platform]} clicked`);
  };

  const handleLinkClick = (label: string) => {
    addEvent(`Footer link: ${label}`);
  };

  const addEvent = (message: string) => {
    setFooterEvents((prev) => [message, ...prev].slice(0, 5));
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
              background: "#2C2C2A",
              borderColor: "#6B6A65",
              borderWidth: 1.5,
            }}
          >
            <div
              style={{
                width: "12px",
                height: "8px",
                borderTop: "2px solid #D4AA50",
                borderBottom: "2px solid #D4AA50",
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
              Organism/Footer
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              organism · Site footer · 4-column layout
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Navigation", "Social Links", "Payment Methods"].map((v) => (
            <span
              key={v}
              className="px-2.5 py-1 rounded-full"
              style={{
                fontSize: 11,
                fontWeight: 500,
                background: "#2C2C2A",
                color: "#D4AA50",
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
              Click social icons or footer links to see interactions
            </p>
          </div>

          {/* Live Footer Demo */}
          <div
            className="rounded-lg overflow-hidden border"
            style={{ borderColor: "#6B6A65" }}
          >
            <OrganismFooter
              onSocialClick={handleSocialClick}
              onLinkClick={handleLinkClick}
            />
          </div>

          {/* Event Activity */}
          {footerEvents.length > 0 && (
            <div
              className="mt-4 rounded-lg border p-4"
              style={{ borderColor: "#D4AA50", background: "#FBF7ED" }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#B08A2E",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Recent Footer Activity
              </p>
              <div className="space-y-2">
                {footerEvents.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded"
                    style={{ background: "#FFFFFF" }}
                  >
                    <Check size={14} strokeWidth={2.5} style={{ color: "#B08A2E" }} />
                    <span
                      style={{
                        fontSize: 12,
                        color: "#2C2C2A",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
            Footer Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div
              className="rounded-lg border p-6"
              style={{
                borderColor: "#6B6A65",
                background: "#2C2C2A",
                borderStyle: "dashed",
                borderWidth: "2px",
              }}
            >
              <div className="space-y-4">
                {/* Columns Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                  }}
                >
                  {/* Column 1 */}
                  <div
                    className="rounded p-3 space-y-2"
                    style={{
                      background: "rgba(212, 170, 80, 0.1)",
                      border: "1px solid rgba(212, 170, 80, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        height: "12px",
                        background: "#FFFFFF",
                        borderRadius: "2px",
                        width: "70%",
                      }}
                    />
                    <div
                      style={{
                        height: "8px",
                        background: "#9D9C97",
                        borderRadius: "1px",
                        width: "90%",
                      }}
                    />
                    <div className="flex gap-1 mt-2">
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#D4AA50",
                        }}
                      />
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#D4AA50",
                        }}
                      />
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#D4AA50",
                        }}
                      />
                    </div>
                  </div>

                  {/* Columns 2-4 */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded p-3 space-y-2"
                      style={{
                        background: "rgba(232, 196, 208, 0.08)",
                        border: "1px solid rgba(232, 196, 208, 0.2)",
                      }}
                    >
                      <div
                        style={{
                          height: "8px",
                          background: "#FFFFFF",
                          borderRadius: "2px",
                          width: "60%",
                          marginBottom: "4px",
                        }}
                      />
                      {[1, 2, 3, 4].map((j) => (
                        <div
                          key={j}
                          style={{
                            height: "6px",
                            background: "#E8C4D0",
                            borderRadius: "1px",
                            width: "80%",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Bottom Strip */}
                <div
                  className="rounded p-2 flex justify-between items-center"
                  style={{
                    background: "rgba(107, 106, 101, 0.15)",
                    borderTop: "1px solid rgba(232, 196, 208, 0.15)",
                    marginTop: "8px",
                    paddingTop: "12px",
                  }}
                >
                  <div
                    style={{
                      height: "6px",
                      background: "#6B6A65",
                      borderRadius: "1px",
                      width: "40%",
                    }}
                  />
                  <div className="flex gap-1">
                    <div
                      style={{
                        width: "24px",
                        height: "12px",
                        borderRadius: "2px",
                        background: "#FFFFFF",
                      }}
                    />
                    <div
                      style={{
                        width: "24px",
                        height: "12px",
                        borderRadius: "2px",
                        background: "#FF0090",
                      }}
                    />
                    <div
                      style={{
                        width: "24px",
                        height: "12px",
                        borderRadius: "2px",
                        background: "#ED1C24",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Brand Column",
                  detail: "Logo + Tagline\nSocial icons\nGolden accent (#D4AA50)",
                  token: "Brand identity",
                  color: "#D4AA50",
                },
                {
                  label: "Navigation Links",
                  detail: "3 column sections\n13px Regular\nRosa-suave (#E8C4D0)",
                  token: "Footer navigation",
                  color: "#E8C4D0",
                },
                {
                  label: "Bottom Strip",
                  detail: "Copyright text\nPayment badges\nCaption style",
                  token: "Legal + Payment",
                  color: "#6B6A65",
                },
                {
                  label: "Dark Theme",
                  detail: "Carbon background\nHigh contrast\nSophisticated",
                  token: "Footer styling",
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
                style={{ background: "#2C2C2A", color: "#D4AA50", fontWeight: 600 }}
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
                  &gt; 968px width
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  4-column grid layout. Brand column with social icons, followed by three navigation columns. Bottom strip horizontal.
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
                style={{ background: "#6B6A65", color: "#FFFFFF", fontWeight: 600 }}
              >
                Tablet
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
                  641px - 968px
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  2-column grid layout. Columns wrap into 2x2 grid maintaining organized navigation structure. Bottom strip remains horizontal.
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
                style={{ background: "#E8C4D0", color: "#7A3048", fontWeight: 600 }}
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
                  ≤ 640px width
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Single column layout. All sections stack vertically. Bottom strip becomes vertical with copyright and payment methods stacked.
                </p>
              </div>
            </div>
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
          <TokenRow token="Footer → Width" value="100%" type="dimension" />
          <TokenRow token="Footer → Max Width" value="1200px" type="dimension" />
          <TokenRow token="Footer → Padding" value="48px 24px 24px 24px" type="dimension" />
          <TokenRow
            token="Footer → Background"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow token="Grid → Display" value="grid" type="dimension" />
          <TokenRow token="Grid → Columns (Desktop)" value="repeat(4, 1fr)" type="dimension" />
          <TokenRow token="Grid → Columns (Tablet)" value="repeat(2, 1fr)" type="dimension" />
          <TokenRow token="Grid → Columns (Mobile)" value="1fr" type="dimension" />
          <TokenRow token="Grid → Gap (Desktop)" value="40px" type="dimension" />
          <TokenRow token="Grid → Gap (Tablet)" value="32px 24px" type="dimension" />
          <TokenRow token="Grid → Margin Bottom" value="40px" type="dimension" />
          <TokenRow token="Logo → Size" value="32x32px" type="dimension" />
          <TokenRow token="Logo → Border Radius" value="8px" type="dimension" />
          <TokenRow
            token="Logo → Background"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow token="Logo → Inner Square" value="14x14px" type="dimension" />
          <TokenRow
            token="Logo → Inner Color"
            value="#D4AA50"
            type="color"
            colorValue="#D4AA50"
            tokenName="Secondary/Dorado-mid"
          />
          <TokenRow token="Logo Text → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Logo Text → Font Size" value="18px" type="typography" />
          <TokenRow token="Logo Text → Font Weight" value="700 (Bold)" type="typography" />
          <TokenRow
            token="Logo Text → Color"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow token="Tagline → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Tagline → Font Size" value="13px" type="typography" />
          <TokenRow token="Tagline → Font Weight" value="400 (Regular)" type="typography" />
          <TokenRow
            token="Tagline → Color"
            value="#9D9C97"
            type="color"
            colorValue="#9D9C97"
            tokenName="Neutral (lighter)"
          />
          <TokenRow token="Social Icons → Size" value="36px circle" type="dimension" />
          <TokenRow token="Social Icons → Gap" value="12px" type="dimension" />
          <TokenRow
            token="Social Icons → Color"
            value="#D4AA50"
            type="color"
            colorValue="#D4AA50"
            tokenName="Secondary/Dorado-mid"
          />
          <TokenRow
            token="Social Icons → Background"
            value="rgba(212,170,80,0.1)"
            type="dimension"
          />
          <TokenRow
            token="Social Icons → Hover BG"
            value="#D4AA50"
            type="color"
            colorValue="#D4AA50"
            tokenName="Secondary/Dorado-mid"
          />
          <TokenRow token="Column Title → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Column Title → Font Size" value="13px" type="typography" />
          <TokenRow token="Column Title → Font Weight" value="600 (Semibold)" type="typography" />
          <TokenRow
            token="Column Title → Color"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow token="Column Title → Transform" value="uppercase" type="dimension" />
          <TokenRow token="Links → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Links → Font Size" value="13px" type="typography" />
          <TokenRow token="Links → Font Weight" value="400 (Regular)" type="typography" />
          <TokenRow
            token="Links → Color"
            value="#E8C4D0"
            type="color"
            colorValue="#E8C4D0"
            tokenName="Primary/Rosa-suave"
          />
          <TokenRow
            token="Links → Hover Color"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow token="Links → Gap" value="8px" type="dimension" />
          <TokenRow token="Bottom Strip → Padding Top" value="24px" type="dimension" />
          <TokenRow
            token="Bottom Strip → Border Top"
            value="1px solid rgba(232,196,208,0.15)"
            type="dimension"
          />
          <TokenRow token="Copyright → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Copyright → Font Size" value="11px" type="typography" />
          <TokenRow token="Copyright → Font Weight" value="400 (Regular)" type="typography" />
          <TokenRow
            token="Copyright → Color"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow token="Payment Label → Font Size" value="11px" type="typography" />
          <TokenRow token="Payment Label → Font Weight" value="500 (Medium)" type="typography" />
          <TokenRow
            token="Payment Label → Color"
            value="#9D9C97"
            type="color"
            colorValue="#9D9C97"
            tokenName="Neutral (lighter)"
          />
          <TokenRow token="Payment Badge → Height" value="24px" type="dimension" />
          <TokenRow token="Payment Badge → Padding" value="0 8px" type="dimension" />
          <TokenRow token="Payment Badge → Border Radius" value="4px" type="dimension" />
          <TokenRow token="Payment Badge → Gap" value="12px" type="dimension" />
          <TokenRow
            token="PSE → Background"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="White"
          />
          <TokenRow
            token="Nequi → Background"
            value="#FF0090"
            type="color"
            colorValue="#FF0090"
            tokenName="Nequi Pink"
          />
          <TokenRow
            token="Daviplata → Background"
            value="#ED1C24"
            type="color"
            colorValue="#ED1C24"
            tokenName="Daviplata Red"
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
              title: "Global Site Footer",
              description:
                "Primary footer for all TolimaMKT pages providing consistent navigation, social links, and legal information across the platform.",
              context: "All pages, consistent footer placement, site-wide navigation",
            },
            {
              title: "Category Navigation Hub",
              description:
                "Quick access to all product categories (Comprar section) from any page, helping users discover and navigate product types.",
              context: "Category discovery, product navigation, quick links",
            },
            {
              title: "Vendor Onboarding Portal",
              description:
                "Direct links to vendor resources and seller tools in 'Vender en TolimaMKT' section for entrepreneur recruitment and support.",
              context: "Vendor acquisition, seller resources, business tools",
            },
            {
              title: "Regional Discovery",
              description:
                "Municipios section providing quick navigation to city-specific pages highlighting local Tolima creators and products.",
              context: "Regional navigation, city pages, local discovery",
            },
            {
              title: "Social Community Building",
              description:
                "Social media links (Instagram, TikTok, WhatsApp) in brand colors encouraging community engagement and social following.",
              context: "Social growth, community engagement, brand presence",
            },
            {
              title: "Payment Trust Signals",
              description:
                "Display of accepted Colombian payment methods (PSE, Nequi, Daviplata) building trust and setting payment expectations.",
              context: "Trust building, payment transparency, local relevance",
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

  const code = `// Organism/Footer — TolimaMKT Design System

const footerColumns = [
  {
    title: "Comprar",
    links: [
      { label: "Streetwear" },
      { label: "Accesorios" },
      // ... more categories
    ]
  },
  {
    title: "Vender en TolimaMKT",
    links: [
      { label: "Crear tienda" },
      { label: "Guía del vendedor" },
      // ... more vendor links
    ]
  },
  {
    title: "Municipios",
    links: [
      { label: "Ibagué" },
      { label: "Honda" },
      // ... more cities
    ]
  }
];

<OrganismFooter
  tagline="El mercado de moda del Tolima"
  columns={footerColumns}
  copyrightText="© 2026 TolimaMKT. Todos los derechos reservados."
  onSocialClick={(platform) => handleSocial(platform)}
  onLinkClick={(label) => handleNavigation(label)}
/>

// Footer structure
width:              100%
max-width:          1200px
padding:            48px 24px 24px 24px
background:         #2C2C2A         // Neutral/Carbon

// Grid layout
display:            grid
grid-columns:       repeat(4, 1fr)  // Desktop
gap:                40px

// Column 1: Brand
Logo:
  size:             32x32px
  background:       #7A3048         // Primary/Vinotinto
  inner-square:     14px #D4AA50    // Secondary/Dorado-mid
  text:             DM Sans 18px Bold #FFFFFF

Tagline:
  font:             DM Sans 13px Regular
  color:            #9D9C97         // Neutral (lighter)

Social Icons:
  size:             36px circle
  color:            #D4AA50         // Secondary/Dorado-mid
  background:       rgba(212,170,80,0.1)
  hover:            #D4AA50 background
  gap:              12px
  icons:            Instagram, TikTok, WhatsApp

// Columns 2-4: Navigation
Title:
  font:             DM Sans 13px Semibold
  color:            #FFFFFF         // Neutral/Blanco
  transform:        uppercase

Links:
  font:             DM Sans 13px Regular
  color:            #E8C4D0         // Primary/Rosa-suave
  hover:            #FFFFFF
  gap:              8px

// Bottom strip
border-top:         1px solid rgba(232,196,208,0.15)
padding-top:        24px

Copyright:
  font:             DM Sans 11px Regular
  color:            #6B6A65         // Neutral/Gris-texto

Payment Badges:
  height:           24px
  padding:          0 8px
  border-radius:    4px
  gap:              12px

  PSE:              #FFFFFF background
  Nequi:            #FF0090 background
  Daviplata:        #ED1C24 background

// Responsive breakpoints
Desktop:            > 968px (4 columns)
Tablet:             641-968px (2x2 grid)
Mobile:             ≤ 640px (1 column stack)`;

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
