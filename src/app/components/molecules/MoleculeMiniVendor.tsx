import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Check, Copy, BadgeCheck } from "lucide-react";

// ─── Molecule/MiniVendor Component ────────────────────────────────────────────

interface MoleculeMiniVendorProps {
  id?: string;
  avatarUrl?: string;
  vendorName?: string;
  municipio?: string;
  isVerified?: boolean;
  rating?: number;
  onClick?: () => void;
}

export function MoleculeMiniVendor({
  id,
  avatarUrl,
  vendorName = "Café del Río",
  municipio = "Honda",
  isVerified = true,
  rating,
  onClick,
}: MoleculeMiniVendorProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (id) navigate(`/tienda/${id}`);
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        height: "56px",
        paddingLeft: "12px",
        paddingRight: "12px",
        gap: "12px",
        cursor: onClick ? "pointer" : "default",
        background: isHovered ? "#FDFCFA" : "#FFFFFF",
        borderRadius: "12px",
        border: `1px solid ${isHovered ? "#E8C4D0" : "#F0EFE9"}`,
        transition: "background 160ms ease, border-color 160ms ease",
      }}
    >
      {/* Avatar with verified badge */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: avatarUrl
              ? `url(${avatarUrl}) center/cover`
              : "linear-gradient(135deg, #9D3D5E, #D4AA50)",
            border: "2px solid #F9F0F3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {!avatarUrl && vendorName.charAt(0).toUpperCase()}
        </div>

        {/* Verified badge */}
        {isVerified && (
          <div
            style={{
              position: "absolute",
              bottom: "-2px",
              right: "-2px",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#D4AA50",
              border: "2px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BadgeCheck
              size={8}
              strokeWidth={3}
              style={{ color: "#FFFFFF" }}
            />
          </div>
        )}
      </div>

      {/* Vendor info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Vendor name */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "#2C2C2A",
            lineHeight: 1.3,
            marginBottom: "2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {vendorName}
        </p>

        {/* Location badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            paddingLeft: "6px",
            paddingRight: "6px",
            paddingTop: "2px",
            paddingBottom: "2px",
            borderRadius: "4px",
            background: "#FBF7ED",
            border: "1px solid #F2E4B8",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "#B08A2E",
            }}
          >
            {municipio}
          </span>
        </div>
      </div>

      {/* Arrow icon */}
      <ChevronRight
        size={12}
        strokeWidth={2.5}
        style={{
          color: "#9D3D5E",
          flexShrink: 0,
          transition: "transform 160ms ease",
          transform: isHovered ? "translateX(2px)" : "translateX(0)",
        }}
      />
    </div>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function MoleculeMiniVendorShowcase() {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const vendors = [
    { name: "Café del Río", municipio: "Honda", verified: true },
    { name: "Artesanías Tolima", municipio: "Ibagué", verified: true },
    { name: "Finca La Esperanza", municipio: "Mariquita", verified: false },
    { name: "Tours Valle del Magdalena", municipio: "Armero-Guayabal", verified: true },
  ];

  return (
    <div className="space-y-8">
      {/* ── Header Strip ── */}
      <div
        className="rounded-xl border px-5 py-4 flex flex-wrap items-center gap-4"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center border"
            style={{
              background: "linear-gradient(135deg, #9D3D5E, #D4AA50)",
              borderColor: "#E8C4D0",
              borderWidth: 1.5,
              color: "#FFFFFF",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            V
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
              Molecule/MiniVendor
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              molecule · Avatar + Badge + Arrow · h-56px
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Atom/Star", "Badge/Municipio"].map((v) => (
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
        className="rounded-2xl border p-8"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div className="text-center mb-6">
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Interactive Playground
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#6B6A65",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Click vendors to select — verified badges show trust
          </p>
        </div>

        <div className="flex flex-col gap-3 max-w-md mx-auto">
          {vendors.map((vendor) => (
            <MoleculeMiniVendor
              key={vendor.name}
              vendorName={vendor.name}
              municipio={vendor.municipio}
              isVerified={vendor.verified}
              onClick={() => setSelectedVendor(vendor.name)}
            />
          ))}
        </div>

        {selectedVendor && (
          <div
            className="mt-6 rounded-lg border p-4 max-w-md mx-auto text-center"
            style={{ borderColor: "#E8C4D0", background: "#F9F0F3" }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#7A3048",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Selected: <strong>{selectedVendor}</strong>
            </p>
          </div>
        )}
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
            Molecule Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "56px",
                paddingLeft: "12px",
                paddingRight: "12px",
                gap: "12px",
                background: "#FFFFFF",
                borderRadius: "12px",
                border: "2px dashed #D4AA50",
              }}
            >
              {/* Avatar area */}
              <div
                style={{
                  position: "relative",
                  flexShrink: 0,
                  padding: "4px",
                  background: "rgba(157, 61, 94, 0.05)",
                  borderRadius: "50%",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #9D3D5E, #D4AA50)",
                    border: "2px solid #F9F0F3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  C
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#D4AA50",
                    border: "2px solid #FFFFFF",
                  }}
                />
              </div>

              {/* Vendor info area */}
              <div
                style={{
                  flex: 1,
                  padding: "6px",
                  background: "rgba(122, 48, 72, 0.02)",
                  borderRadius: "6px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#2C2C2A",
                    marginBottom: "2px",
                  }}
                >
                  Vendor name
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    paddingLeft: "6px",
                    paddingRight: "6px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    borderRadius: "4px",
                    background: "#FBF7ED",
                    border: "1px solid #F2E4B8",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "#B08A2E",
                    }}
                  >
                    Badge
                  </span>
                </div>
              </div>

              {/* Arrow area */}
              <div
                style={{
                  padding: "8px",
                  background: "rgba(212, 170, 80, 0.08)",
                  borderRadius: "6px",
                }}
              >
                <ChevronRight size={12} strokeWidth={2.5} style={{ color: "#9D3D5E" }} />
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Avatar",
                  detail: "40px circle\nborder: 2px #F9F0F3\ngradient fallback",
                  token: "Primary/Rosa-palido",
                  color: "#9D3D5E",
                },
                {
                  label: "Verified Badge",
                  detail: "12px circle\nbg: #D4AA50\nicon: BadgeCheck 8px",
                  token: "Secondary/Dorado-mid",
                  color: "#D4AA50",
                },
                {
                  label: "Vendor Name",
                  detail: "DM Sans 14px Semibold\ncolor: #2C2C2A\ntruncate overflow",
                  token: "Neutral/Carbon",
                  color: "#2C2C2A",
                },
                {
                  label: "Municipio Badge",
                  detail: "11px Medium\nbg: #FBF7ED\ncolor: #B08A2E",
                  token: "Secondary/Dorado",
                  color: "#B08A2E",
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

      {/* ── State Variants ── */}
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
            State Variants
          </p>
        </div>

        <div className="p-6 space-y-6">
          <StateRow label="Verified Vendor" description="Shows gold verification badge">
            <div style={{ maxWidth: "300px" }}>
              <MoleculeMiniVendor
                vendorName="Café del Río"
                municipio="Honda"
                isVerified={true}
              />
            </div>
          </StateRow>

          <StateRow
            label="Unverified Vendor"
            description="No verification badge displayed"
          >
            <div style={{ maxWidth: "300px" }}>
              <MoleculeMiniVendor
                vendorName="Nuevo Emprendimiento"
                municipio="Ibagué"
                isVerified={false}
              />
            </div>
          </StateRow>

          <StateRow
            label="With Avatar Image"
            description="Custom avatar image replaces gradient"
          >
            <div style={{ maxWidth: "300px" }}>
              <MoleculeMiniVendor
                vendorName="Tours del Tolima"
                municipio="Melgar"
                isVerified={true}
              />
            </div>
          </StateRow>
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
          <TokenRow token="Height" value="56px" type="dimension" />
          <TokenRow token="Border Radius" value="12px" type="dimension" />
          <TokenRow token="Padding (horizontal)" value="12px" type="dimension" />
          <TokenRow token="Gap" value="12px" type="dimension" />
          <TokenRow
            token="Container → Background"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow
            token="Container → Border"
            value="1px #F0EFE9"
            type="color"
            colorValue="#F0EFE9"
            tokenName="Neutral/Fondo (light)"
          />
          <TokenRow
            token="Hover → Border"
            value="#E8C4D0"
            type="color"
            colorValue="#E8C4D0"
            tokenName="Primary/Rosa-suave"
          />
          <TokenRow token="Avatar → Size" value="40px" type="dimension" />
          <TokenRow token="Avatar → Border Width" value="2px" type="dimension" />
          <TokenRow
            token="Avatar → Border Color"
            value="#F9F0F3"
            type="color"
            colorValue="#F9F0F3"
            tokenName="Primary/Rosa-palido"
          />
          <TokenRow token="Verified Badge → Size" value="12px" type="dimension" />
          <TokenRow
            token="Verified Badge → Color"
            value="#D4AA50"
            type="color"
            colorValue="#D4AA50"
            tokenName="Secondary/Dorado-mid"
          />
          <TokenRow token="Verified Badge → Icon" value="8px" type="dimension" />
          <TokenRow token="Vendor Name → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Vendor Name → Font Size" value="14px" type="typography" />
          <TokenRow
            token="Vendor Name → Font Weight"
            value="600 (Semibold)"
            type="typography"
          />
          <TokenRow
            token="Vendor Name → Color"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow
            token="Municipio Badge → Background"
            value="#FBF7ED"
            type="color"
            colorValue="#FBF7ED"
            tokenName="Secondary/Crema-palida"
          />
          <TokenRow
            token="Municipio Badge → Border"
            value="#F2E4B8"
            type="color"
            colorValue="#F2E4B8"
            tokenName="Secondary/Crema"
          />
          <TokenRow
            token="Municipio Badge → Text"
            value="#B08A2E"
            type="color"
            colorValue="#B08A2E"
            tokenName="Secondary/Dorado"
          />
          <TokenRow token="Municipio Badge → Font Size" value="11px" type="typography" />
          <TokenRow token="Arrow → Size" value="12px" type="dimension" />
          <TokenRow
            token="Arrow → Color"
            value="#9D3D5E"
            type="color"
            colorValue="#9D3D5E"
            tokenName="Primary/Vinotinto-mid"
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
              title: "Vendor Directory",
              description:
                "Display a list of local vendors, artisans, or tour operators with verification status.",
              context: "Directory pages, vendor listings",
            },
            {
              title: "Experience Details",
              description:
                "Show the vendor/host information on experience or tour detail pages.",
              context: "Product pages, booking flows",
            },
            {
              title: "Search Results",
              description:
                "Compact vendor preview in search results with quick navigation.",
              context: "Search pages, filters, recommendations",
            },
            {
              title: "Review Sections",
              description:
                "Identify verified vendors in review and rating sections for credibility.",
              context: "Reviews, testimonials, ratings",
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

function StateRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#2C2C2A",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 2,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#9D9C97",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {description}
        </p>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

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

  const code = `// Molecule/MiniVendor — TolimaMKT Design System
<MoleculeMiniVendor
  vendorName="Café del Río"
  municipio="Honda"
  isVerified={true}
  avatarUrl="/path/to/avatar.jpg"
  onClick={() => navigateToVendor()}
/>

// Container styles
height:         56px
border-radius:  12px
padding:        12px
gap:            12px
background:     #FFFFFF        // Neutral/Blanco
border:         1px #F0EFE9

// Avatar
size:           40px (circular)
border:         2px #F9F0F3    // Primary/Rosa-palido
gradient:       135deg #9D3D5E → #D4AA50

// Verified badge
size:           12px (circular)
background:     #D4AA50        // Secondary/Dorado-mid
icon:           BadgeCheck 8px
position:       bottom-right (-2px, -2px)

// Vendor name
font:           DM Sans 14px Semibold
color:          #2C2C2A        // Neutral/Carbon
overflow:       truncate

// Municipio badge
background:     #FBF7ED        // Secondary/Crema-palida
border:         1px #F2E4B8    // Secondary/Crema
color:          #B08A2E        // Secondary/Dorado
font:           DM Sans 11px Medium

// Arrow icon
size:           12px
color:          #9D3D5E        // Primary/Vinotinto-mid
hover:          translateX(2px)`;

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
