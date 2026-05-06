import { useState } from "react";
import { Check, Copy, MapPin } from "lucide-react";
import { MoleculeRating } from "../molecules/MoleculeRating";
import { ButtonSecondary } from "../atoms/ButtonSecondary";
import { MoleculeMiniVendor } from "../molecules/MoleculeMiniVendor";
import type { Vendedor } from "../../../data/types";
import { getMunicipio } from "../../../data/municipios";

// ─── Organism/VendorSection Component ─────────────────────────────────────────

interface VendorCard {
  id: string;
  avatarUrl?: string;
  name: string;
  city: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  initials?: string;
}

interface OrganismVendorSectionProps {
  title?: string;
  subtitle?: string;
  vendors?: VendorCard[];
  vendedores?: Vendedor[];
  onViewStore?: (vendorId: string) => void;
  onVendorClick?: (vendorId: string) => void;
}

export function OrganismVendorSection({
  title = "Conoce a los creadores del Tolima",
  subtitle = "Historias reales detrás de cada prenda",
  vendors = DEFAULT_VENDORS,
  vendedores,
  onViewStore,
  onVendorClick,
}: OrganismVendorSectionProps) {
  return (
    <section
      style={{
        width: "100%",
        background: "#F9F0F3",
        display: "flex",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          {/* H2 Title */}
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "#2C2C2A",
              margin: 0,
              marginBottom: "8px",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#6B6A65",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Vendor Cards Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: vendedores ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "20px",
          }}
          className="vendor-cards-container"
        >
          {vendedores
            ? vendedores.map((v) => (
                <MoleculeMiniVendor
                  key={v.id}
                  id={v.id}
                  avatarUrl={v.avatarUrl}
                  vendorName={v.nombreTienda}
                  municipio={getMunicipio(v.municipio)?.nombre ?? v.municipio}
                  isVerified={v.verificado}
                  rating={v.rating}
                  onClick={() => onVendorClick?.(v.id)}
                />
              ))
            : vendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onViewStore={() => onViewStore?.(vendor.id)}
                />
              ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .vendor-cards-container {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .vendor-cards-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .vendor-cards-container {
            grid-template-columns: 1fr !important;
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Individual Vendor Card Component ─────────────────────────────────────────

interface VendorCardProps {
  vendor: VendorCard;
  onViewStore?: () => void;
}

function VendorCard({ vendor, onViewStore }: VendorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate initials from name if no initials provided
  const getInitials = () => {
    if (vendor.initials) return vendor.initials;
    return vendor.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "240px",
        minHeight: "280px",
        background: "#FFFFFF",
        borderRadius: "14px",
        boxShadow: isHovered
          ? "0 8px 24px rgba(122, 48, 72, 0.12)"
          : "0 4px 12px rgba(122, 48, 72, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px 16px 16px",
        gap: "12px",
        transition: "box-shadow 200ms ease, transform 200ms ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative",
      }}
    >
      {/* Circular Avatar */}
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: vendor.avatarUrl
            ? `url(${vendor.avatarUrl}) center/cover`
            : "linear-gradient(135deg, #E8C4D0 0%, #F2E4B8 100%)",
          border: "3px solid #FFFFFF",
          boxShadow: "0 2px 8px rgba(122, 48, 72, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {!vendor.avatarUrl && (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#7A3048",
            }}
          >
            {getInitials()}
          </span>
        )}
      </div>

      {/* Vendor Name - H3 */}
      <h3
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "16px",
          fontWeight: 600,
          color: "#2C2C2A",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {vendor.name}
      </h3>

      {/* City Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 10px",
          borderRadius: "12px",
          background: "#FBF7ED",
          border: "1px solid #F2E4B8",
        }}
      >
        <MapPin
          size={10}
          strokeWidth={2.5}
          style={{ color: "#B08A2E", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            color: "#B08A2E",
            lineHeight: 1,
          }}
        >
          {vendor.city}
        </span>
      </div>

      {/* Rating */}
      <MoleculeRating
        rating={vendor.rating}
        reviewCount={vendor.reviewCount}
        starSize={12}
        showReviewCount={true}
      />

      {/* Tagline - Caption */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 400,
          color: "#6B6A65",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.5,
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        {vendor.tagline}
      </p>

      {/* Button Secondary - Full Width */}
      <div style={{ width: "100%", marginTop: "auto" }}>
        <button
          onClick={onViewStore}
          style={{
            width: "100%",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#7A3048",
            background: "transparent",
            borderRadius: "8px",
            padding: "10px 16px",
            border: "1.5px solid #7A3048",
            cursor: "pointer",
            transition: "background 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F9F0F3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Ver tienda
        </button>
      </div>
    </div>
  );
}

// ─── Default Vendors Data ──────────────────────────────────────────────────────

const DEFAULT_VENDORS: VendorCard[] = [
  {
    id: "1",
    name: "María Rodríguez",
    city: "Ibagué",
    rating: 4.9,
    reviewCount: 87,
    tagline: "Diseños únicos con alma tolimense",
    initials: "MR",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    city: "Honda",
    rating: 4.8,
    reviewCount: 62,
    tagline: "Streetwear con identidad local",
    initials: "CM",
  },
  {
    id: "3",
    name: "Ana Sofía Torres",
    city: "Espinal",
    rating: 5.0,
    reviewCount: 104,
    tagline: "Accesorios artesanales hechos a mano",
    initials: "AT",
  },
  {
    id: "4",
    name: "Diego Vargas",
    city: "Líbano",
    rating: 4.7,
    reviewCount: 53,
    tagline: "Vintage con historia del Tolima",
    initials: "DV",
  },
];

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function OrganismVendorSectionShowcase() {
  const [vendorEvents, setVendorEvents] = useState<string[]>([]);

  const handleViewStore = (vendorId: string) => {
    const vendor = DEFAULT_VENDORS.find((v) => v.id === vendorId);
    if (vendor) {
      addEvent(`Viewing store: ${vendor.name} from ${vendor.city}`);
    }
  };

  const addEvent = (message: string) => {
    setVendorEvents((prev) => [message, ...prev].slice(0, 5));
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
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #E8C4D0, #F2E4B8)",
                border: "1.5px solid #7A3048",
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
              Organism/VendorSection
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              organism · Vendor showcase · Personal cards
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Molecule/Rating", "Button/Secondary", "Personal Touch"].map((v) => (
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
              Click "Ver tienda" on any vendor card to see interactions
            </p>
          </div>

          {/* Live VendorSection Demo */}
          <div
            className="rounded-lg overflow-hidden border"
            style={{ borderColor: "#E8C4D0", background: "#F4F3F0" }}
          >
            <OrganismVendorSection onViewStore={handleViewStore} />
          </div>

          {/* Event Activity */}
          {vendorEvents.length > 0 && (
            <div
              className="mt-4 rounded-lg border p-4"
              style={{ borderColor: "#E8C4D0", background: "#F9F0F3" }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#9D3D5E",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Recent Vendor Activity
              </p>
              <div className="space-y-2">
                {vendorEvents.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded"
                    style={{ background: "#FFFFFF" }}
                  >
                    <Check size={14} strokeWidth={2.5} style={{ color: "#7A3048" }} />
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
            Vendor Section Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div
              className="rounded-lg border p-6"
              style={{
                borderColor: "#D4AA50",
                background: "#F9F0F3",
                borderStyle: "dashed",
                borderWidth: "2px",
              }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div
                  className="rounded p-3 text-center"
                  style={{
                    background: "rgba(44, 44, 42, 0.04)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#2C2C2A",
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: 4,
                    }}
                  >
                    H2 Title + Subtitle
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "#6B6A65",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Centered header section
                  </p>
                </div>

                {/* Cards Grid */}
                <div
                  className="rounded p-4"
                  style={{
                    background: "rgba(122, 48, 72, 0.04)",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "12px",
                  }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg p-3 space-y-2"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E8C4D0",
                      }}
                    >
                      <div
                        className="mx-auto"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #E8C4D0, #F2E4B8)",
                          border: "2px solid #FFFFFF",
                        }}
                      />
                      <div
                        style={{
                          height: "3px",
                          background: "#2C2C2A",
                          borderRadius: "2px",
                          width: "70%",
                          margin: "0 auto",
                        }}
                      />
                      <div
                        style={{
                          height: "2px",
                          background: "#B08A2E",
                          borderRadius: "1px",
                          width: "50%",
                          margin: "0 auto",
                        }}
                      />
                      <div
                        style={{
                          height: "2px",
                          background: "#D4AA50",
                          borderRadius: "1px",
                          width: "60%",
                          margin: "0 auto",
                        }}
                      />
                      <div
                        style={{
                          height: "12px",
                          background: "rgba(122, 48, 72, 0.1)",
                          borderRadius: "4px",
                          border: "1px solid #7A3048",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Avatar",
                  detail: "64px circle\nGradient background\n3px white border",
                  token: "Personal identity",
                  color: "#E8C4D0",
                },
                {
                  label: "Vendor Info",
                  detail: "H3 name\nCity badge\nMolecule/Rating",
                  token: "Identity section",
                  color: "#2C2C2A",
                },
                {
                  label: "Tagline",
                  detail: "Caption style (11px)\nPersonal message\nWarm, human tone",
                  token: "Personal touch",
                  color: "#6B6A65",
                },
                {
                  label: "CTA Button",
                  detail: 'Button/Secondary\n"Ver tienda"\nFull width',
                  token: "Store navigation",
                  color: "#7A3048",
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
                  &gt; 1024px width
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  4-column grid layout. All vendor cards displayed in horizontal row with optimal spacing for browsing creators.
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
                  769px - 1024px
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  3-column grid layout. Balanced presentation for medium screens maintaining card proportions and readability.
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
                  481px - 768px
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  2-column grid layout. Reduced gap (16px) for better mobile utilization while keeping vendor cards prominent and personal.
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
                style={{ background: "#2C2C2A", color: "#FFFFFF", fontWeight: 600 }}
              >
                Small
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
                  ≤ 480px
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Single column, centered layout (max 320px width). Full focus on one vendor at a time with maximum card visibility.
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
          <TokenRow token="Section → Width" value="100%" type="dimension" />
          <TokenRow token="Section → Max Width" value="1200px" type="dimension" />
          <TokenRow token="Section → Padding" value="48px 24px" type="dimension" />
          <TokenRow
            token="Section → Background"
            value="#F9F0F3"
            type="color"
            colorValue="#F9F0F3"
            tokenName="Primary/Rosa-palido"
          />
          <TokenRow token="Header → Text Align" value="center" type="dimension" />
          <TokenRow token="Header → Margin Bottom" value="40px" type="dimension" />
          <TokenRow token="Title → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Title → Font Size" value="20px" type="typography" />
          <TokenRow token="Title → Font Weight" value="600 (Semibold)" type="typography" />
          <TokenRow
            token="Title → Color"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow token="Title → Margin Bottom" value="8px" type="dimension" />
          <TokenRow token="Subtitle → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Subtitle → Font Size" value="15px" type="typography" />
          <TokenRow token="Subtitle → Font Weight" value="400 (Regular)" type="typography" />
          <TokenRow
            token="Subtitle → Color"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow token="Grid → Display" value="grid" type="dimension" />
          <TokenRow token="Grid → Columns (Desktop)" value="repeat(4, 1fr)" type="dimension" />
          <TokenRow token="Grid → Columns (Tablet)" value="repeat(3, 1fr)" type="dimension" />
          <TokenRow token="Grid → Columns (Mobile)" value="repeat(2, 1fr)" type="dimension" />
          <TokenRow token="Grid → Columns (Small)" value="1fr" type="dimension" />
          <TokenRow token="Grid → Gap (Desktop/Tablet)" value="20px" type="dimension" />
          <TokenRow token="Grid → Gap (Mobile)" value="16px" type="dimension" />
          <TokenRow token="Card → Width" value="240px" type="dimension" />
          <TokenRow token="Card → Min Height" value="280px" type="dimension" />
          <TokenRow
            token="Card → Background"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow token="Card → Border Radius" value="14px" type="dimension" />
          <TokenRow
            token="Card → Shadow (Default)"
            value="0 4px 12px rgba(122,48,72,0.08)"
            type="dimension"
          />
          <TokenRow
            token="Card → Shadow (Hover)"
            value="0 8px 24px rgba(122,48,72,0.12)"
            type="dimension"
          />
          <TokenRow token="Card → Padding" value="24px 16px 16px 16px" type="dimension" />
          <TokenRow token="Card → Gap" value="12px" type="dimension" />
          <TokenRow token="Card → Transform (Hover)" value="translateY(-4px)" type="dimension" />
          <TokenRow token="Avatar → Width" value="64px" type="dimension" />
          <TokenRow token="Avatar → Height" value="64px" type="dimension" />
          <TokenRow token="Avatar → Border Radius" value="50%" type="dimension" />
          <TokenRow
            token="Avatar → Gradient (Fallback)"
            value="linear-gradient(135deg, #E8C4D0, #F2E4B8)"
            type="dimension"
          />
          <TokenRow token="Avatar → Border" value="3px solid #FFFFFF" type="dimension" />
          <TokenRow
            token="Avatar → Shadow"
            value="0 2px 8px rgba(122,48,72,0.15)"
            type="dimension"
          />
          <TokenRow token="Name → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Name → Font Size" value="16px" type="typography" />
          <TokenRow token="Name → Font Weight" value="600 (Semibold)" type="typography" />
          <TokenRow
            token="Name → Color"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow token="City Badge → Padding" value="4px 10px" type="dimension" />
          <TokenRow token="City Badge → Border Radius" value="12px" type="dimension" />
          <TokenRow
            token="City Badge → Background"
            value="#FBF7ED"
            type="color"
            colorValue="#FBF7ED"
            tokenName="Secondary/Crema-palida"
          />
          <TokenRow
            token="City Badge → Border"
            value="1px solid #F2E4B8"
            type="color"
            colorValue="#F2E4B8"
            tokenName="Secondary/Crema"
          />
          <TokenRow token="City Badge → Icon" value="MapPin 10px" type="dimension" />
          <TokenRow token="City Badge → Font Size" value="11px" type="typography" />
          <TokenRow token="City Badge → Font Weight" value="500 (Medium)" type="typography" />
          <TokenRow
            token="City Badge → Color"
            value="#B08A2E"
            type="color"
            colorValue="#B08A2E"
            tokenName="Secondary/Dorado"
          />
          <TokenRow
            token="Rating → Component"
            value="Molecule/Rating (12px stars)"
            type="dimension"
          />
          <TokenRow token="Tagline → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Tagline → Font Size" value="11px" type="typography" />
          <TokenRow token="Tagline → Font Weight" value="400 (Regular)" type="typography" />
          <TokenRow
            token="Tagline → Color"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow
            token="Button → Component"
            value="Button/Secondary (full width)"
            type="dimension"
          />
          <TokenRow token="Button → Font Size" value="13px" type="typography" />
          <TokenRow token="Button → Padding" value="10px 16px" type="dimension" />
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
              title: "Homepage Creator Spotlight",
              description:
                "Featured section on homepage showcasing local Tolima creators, entrepreneurs, and vendors with warm, personal presentation.",
              context: "Homepage mid-section, creator highlights, vendor spotlights",
            },
            {
              title: "Vendor Directory Landing",
              description:
                "Entry point to vendor directory showing curated selection of top-rated or featured creators from across Tolima municipalities.",
              context: "Vendor directory, creator catalog, entrepreneur showcase",
            },
            {
              title: "Category-Specific Creators",
              description:
                "Display vendors specializing in specific categories (Streetwear, Artesanal, etc.) with personalized profiles.",
              context: "Category pages, specialized vendor sections, niche showcases",
            },
            {
              title: "Regional Creator Discovery",
              description:
                "Highlight vendors from specific Tolima cities, helping users discover local entrepreneurs in their area or nearby municipalities.",
              context: "Regional pages, city-specific showcases, local discovery",
            },
            {
              title: "Featured Partners Section",
              description:
                "Showcase TolimaMKT partner vendors or highlighted creators as part of promotional campaigns or special features.",
              context: "Partnership pages, promotional sections, featured vendors",
            },
            {
              title: "Community Storytelling",
              description:
                "Human-centered section emphasizing the stories and faces behind products, building trust and emotional connection with users.",
              context: "About pages, community sections, brand storytelling",
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

  const code = `// Organism/VendorSection — TolimaMKT Design System
import { MoleculeRating } from "./MoleculeRating";
import { ButtonSecondary } from "./ButtonSecondary";

const vendors = [
  {
    id: "1",
    name: "María Rodríguez",
    city: "Ibagué",
    rating: 4.9,
    reviewCount: 87,
    tagline: "Diseños únicos con alma tolimense",
    initials: "MR",
    avatarUrl: "/avatars/maria.jpg" // optional
  },
  // ... more vendors
];

<OrganismVendorSection
  title="Conoce a los creadores del Tolima"
  subtitle="Historias reales detrás de cada prenda"
  vendors={vendors}
  onViewStore={(vendorId) => navigateToVendor(vendorId)}
/>

// Section structure
width:              100%
max-width:          1200px
padding:            48px 24px
background:         #F9F0F3         // Primary/Rosa-palido

// Header (centered)
H2 Title:
  font:             DM Sans 20px Semibold
  color:            #2C2C2A         // Neutral/Carbon
  margin-bottom:    8px

Subtitle:
  font:             DM Sans 15px Regular
  color:            #6B6A65         // Neutral/Gris-texto

// Vendor Cards Grid
display:            grid
grid-columns:       repeat(4, 1fr)  // Desktop
gap:                20px

// Individual Card (240x280px)
background:         #FFFFFF         // Neutral/Blanco
border-radius:      14px
box-shadow:         0 4px 12px rgba(122,48,72,0.08)
hover-shadow:       0 8px 24px rgba(122,48,72,0.12)
padding:            24px 16px 16px 16px
transform-hover:    translateY(-4px)

Circular Avatar:
  size:             64px circle
  gradient:         linear-gradient(135deg, #E8C4D0, #F2E4B8)
  border:           3px solid #FFFFFF
  initials:         20px Bold #7A3048

Vendor Name (H3):
  font:             DM Sans 16px Semibold
  color:            #2C2C2A         // Neutral/Carbon

City Badge:
  background:       #FBF7ED         // Secondary/Crema-palida
  border:           1px solid #F2E4B8
  icon:             MapPin 10px
  font:             DM Sans 11px Medium
  color:            #B08A2E         // Secondary/Dorado

Rating:
  component:        Molecule/Rating
  star-size:        12px

Tagline (Caption):
  font:             DM Sans 11px Regular
  color:            #6B6A65         // Neutral/Gris-texto

Button:
  component:        Button/Secondary
  width:            100%
  font-size:        13px
  padding:          10px 16px

// Responsive breakpoints
Desktop:            > 1024px (4 columns)
Tablet:             769-1024px (3 columns)
Mobile:             481-768px (2 columns, 16px gap)
Small:              ≤ 480px (1 column, centered 320px max)`;

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
