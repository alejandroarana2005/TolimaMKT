import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { MoleculeSearchBar } from "../molecules/MoleculeSearchBar";
import nevadoTolima from "@/assets/images/nevado-tolima.jpg";

// ─── Organism/Hero Component ──────────────────────────────────────────────────

interface OrganismHeroProps {
  headline?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

export function OrganismHero({
  headline = "El streetwear del Tolima, en un solo lugar",
  subtitle = "Descubre emprendedores de Ibagué, Honda, Espinal y más.",
  searchPlaceholder = "¿Qué deseas explorar en el Tolima?",
  onSearch,
}: OrganismHeroProps) {
  return (
    <section
      style={{
        width: "100%",
        height: "480px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${nevadoTolima})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          zIndex: 0,
        }}
      />
      {/* Directional overlay: dark left → transparent right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(20,12,18,0.85) 0%, rgba(20,12,18,0.60) 55%, rgba(20,12,18,0.20) 100%)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "640px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
          {/* Headline */}
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "28px",
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {headline}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.80)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {subtitle}
          </p>

          {/* SearchBar */}
          <div className="hero-searchbar">
            <MoleculeSearchBar
              placeholder={searchPlaceholder}
              onSearch={onSearch}
            />
          </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .hero-searchbar > div {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function OrganismHeroShowcase() {
  const [searchQueries, setSearchQueries] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchQueries((prev) => [value, ...prev].slice(0, 3));
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
              background: "linear-gradient(135deg, #F9F0F3, #FBF7ED)",
              borderColor: "#E8C4D0",
              borderWidth: 1.5,
            }}
          >
            <div
              style={{
                width: "16px",
                height: "12px",
                borderRadius: "2px",
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
              Organism/Hero
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              organism · Landing hero · 480px height
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Headline", "SearchBar", "Floating Badges", "Gradient BG"].map((v) => (
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
              Type in the search bar to see live interaction
            </p>
          </div>

          {/* Live Hero Demo */}
          <div
            className="rounded-lg overflow-hidden border"
            style={{ borderColor: "#E8C4D0" }}
          >
            <OrganismHero onSearch={handleSearch} />
          </div>

          {/* Search Results Display */}
          {searchQueries.length > 0 && (
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
                Recent Hero Searches
              </p>
              <div className="space-y-2">
                {searchQueries.map((query, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded"
                    style={{ background: "#FFFFFF" }}
                  >
                    <Check size={14} strokeWidth={2.5} style={{ color: "#7A3048" }} />
                    <span
                      style={{
                        fontSize: 13,
                        color: "#2C2C2A",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {query}
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
            Hero Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div
              className="rounded-lg border p-6"
              style={{
                borderColor: "#D4AA50",
                background: "linear-gradient(90deg, #F9F0F3 0%, #FBF7ED 100%)",
                borderStyle: "dashed",
                borderWidth: "2px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "40px",
                  alignItems: "center",
                }}
              >
                {/* Left: Content section */}
                <div
                  className="px-4 py-6 rounded"
                  style={{
                    background: "rgba(122, 48, 72, 0.08)",
                    borderLeft: "3px solid #7A3048",
                  }}
                >
                  <div className="space-y-3">
                    <div
                      className="px-2 py-1 rounded inline-block"
                      style={{ background: "rgba(44, 44, 42, 0.1)" }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#2C2C2A",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        H1 Headline
                      </span>
                    </div>
                    <div
                      className="px-2 py-1 rounded inline-block"
                      style={{ background: "rgba(107, 106, 101, 0.08)" }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#6B6A65",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Subtitle (Body)
                      </span>
                    </div>
                    <div
                      className="px-2 py-1 rounded inline-block"
                      style={{ background: "rgba(157, 61, 94, 0.1)" }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#9D3D5E",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Molecule/SearchBar
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Image + Badges section */}
                <div
                  className="px-4 py-6 rounded flex flex-col items-center gap-3"
                  style={{
                    background: "rgba(212, 170, 80, 0.08)",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "12px",
                      background: "#F2E4B8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#B08A2E",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Image
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#7A3048",
                      }}
                    />
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#7A3048",
                      }}
                    />
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#7A3048",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#9D3D5E",
                      fontFamily: "monospace",
                    }}
                  >
                    Floating Badges
                  </span>
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Content Area",
                  detail: "50% width grid column\nH1 + Subtitle + SearchBar\nFlex column, gap 24px",
                  token: "Left Side",
                  color: "#7A3048",
                },
                {
                  label: "Image Area",
                  detail: "400x340px rounded 20px\nBackground: #F2E4B8\nBox shadow for depth",
                  token: "Right Side",
                  color: "#F2E4B8",
                },
                {
                  label: "Floating Badges",
                  detail: "3 MunicipioChip (active)\nAbsolute positioning\nFloating animations",
                  token: "Interactive Elements",
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
                  Two-column grid layout. Left column displays headline, subtitle, and search bar. Right column shows decorative image with floating municipality badges.
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
                  ≤ 968px width
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Single column layout. Image area hidden. Content centered with full-width search bar for better mobile experience.
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
                  ≤ 600px width
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Search bar adapts to 100% width. Reduced padding for optimal mobile viewport usage. Maintains readable headline and subtitle sizing.
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
          <TokenRow token="Hero → Width" value="100%" type="dimension" />
          <TokenRow token="Hero → Height" value="480px" type="dimension" />
          <TokenRow token="Hero → Max Width" value="1200px (inner)" type="dimension" />
          <TokenRow
            token="Hero → Background Gradient"
            value="linear-gradient(90deg, #F9F0F3, #FBF7ED)"
            type="dimension"
          />
          <TokenRow
            token="Gradient → Start Color"
            value="#F9F0F3"
            type="color"
            colorValue="#F9F0F3"
            tokenName="Primary/Rosa-palido"
          />
          <TokenRow
            token="Gradient → End Color"
            value="#FBF7ED"
            type="color"
            colorValue="#FBF7ED"
            tokenName="Secondary/Crema-palida"
          />
          <TokenRow token="Grid → Columns" value="1fr 1fr (50% each)" type="dimension" />
          <TokenRow token="Grid → Gap" value="80px" type="dimension" />
          <TokenRow token="Content → Gap" value="24px (flex column)" type="dimension" />
          <TokenRow token="Headline → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Headline → Font Size" value="28px" type="typography" />
          <TokenRow token="Headline → Font Weight" value="600 (Semibold)" type="typography" />
          <TokenRow
            token="Headline → Color"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow token="Headline → Line Height" value="1.3" type="typography" />
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
          <TokenRow token="Subtitle → Line Height" value="1.6" type="typography" />
          <TokenRow token="Image → Width" value="400px" type="dimension" />
          <TokenRow token="Image → Height" value="340px" type="dimension" />
          <TokenRow token="Image → Border Radius" value="20px" type="dimension" />
          <TokenRow
            token="Image → Background"
            value="#F2E4B8"
            type="color"
            colorValue="#F2E4B8"
            tokenName="Secondary/Crema"
          />
          <TokenRow
            token="Image → Box Shadow"
            value="0 8px 24px rgba(122,48,72,0.12)"
            type="dimension"
          />
          <TokenRow token="Badge 1 → Position" value="top: 20px, left: -30px" type="dimension" />
          <TokenRow token="Badge 2 → Position" value="top: 50%, right: -40px" type="dimension" />
          <TokenRow token="Badge 3 → Position" value="bottom: 30px, left: -20px" type="dimension" />
          <TokenRow
            token="Badges → Variant"
            value="active (MunicipioChip)"
            type="dimension"
          />
          <TokenRow
            token="Badge Animation 1"
            value="floatBadge1 (3s infinite)"
            type="dimension"
          />
          <TokenRow
            token="Badge Animation 2"
            value="floatBadge2 (3.5s infinite)"
            type="dimension"
          />
          <TokenRow
            token="Badge Animation 3"
            value="floatBadge3 (4s infinite)"
            type="dimension"
          />
          <TokenRow token="Mobile Breakpoint" value="968px" type="dimension" />
          <TokenRow token="Small Mobile Breakpoint" value="600px" type="dimension" />
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
              title: "Homepage Hero",
              description:
                "Primary landing section for TolimaMKT homepage, immediately establishing brand value proposition and enabling user search.",
              context: "Homepage, landing page, main entry point",
            },
            {
              title: "Campaign Landing Pages",
              description:
                "Flexible hero for regional campaigns highlighting specific Tolima municipalities and their local streetwear vendors.",
              context: "Marketing campaigns, seasonal promotions, regional focus pages",
            },
            {
              title: "Category Entry Points",
              description:
                "Hero section for category pages introducing users to specific product types or experience categories with contextual search.",
              context: "Category pages, collection pages, curated sections",
            },
            {
              title: "Search-First Experiences",
              description:
                "Search-centric hero design driving users to discover products, vendors, and experiences through keyword search.",
              context: "Search portals, discovery pages, exploration hubs",
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

  const code = `// Organism/Hero — TolimaMKT Design System
import { MoleculeSearchBar } from "./MoleculeSearchBar";
import { MoleculeMunicipioChip } from "./MoleculeMunicipioChip";

<OrganismHero
  headline="El streetwear del Tolima, en un solo lugar"
  subtitle="Descubre emprendedores de Ibagué, Honda, Espinal y más."
  searchPlaceholder="¿Qué deseas explorar en el Tolima?"
  onSearch={(value) => handleSearch(value)}
  imageUrl="/path/to/hero-image.jpg"
  municipios={["Ibagué", "Honda", "El Espinal"]}
/>

// Hero structure
width:              100%
height:             480px
background:         linear-gradient(90deg, #F9F0F3, #FBF7ED)
max-width:          1200px (centered)
padding:            0 40px

// Grid layout
grid-columns:       1fr 1fr (50% each)
gap:                80px
align-items:        center

// Left side — Content
display:            flex column
gap:                24px

H1 Headline:
  font:             DM Sans 28px Semibold
  color:            #2C2C2A         // Neutral/Carbon
  line-height:      1.3

Subtitle:
  font:             DM Sans 15px Regular
  color:            #6B6A65         // Neutral/Gris-texto
  line-height:      1.6

SearchBar:
  component:        Molecule/SearchBar
  width:            480px

// Right side — Image + Badges
position:           relative

Image:
  width:            400px
  height:           340px
  border-radius:    20px
  background:       #F2E4B8         // Secondary/Crema
  box-shadow:       0 8px 24px rgba(122,48,72,0.12)

Floating Badges:
  component:        Molecule/MunicipioChip
  variant:          active
  position:         absolute
  animations:       floatBadge1, floatBadge2, floatBadge3

  Badge 1:          top: 20px, left: -30px
  Badge 2:          top: 50%, right: -40px
  Badge 3:          bottom: 30px, left: -20px

// Responsive
Desktop:            > 968px (two columns)
Tablet:             ≤ 968px (single column, image hidden)
Mobile:             ≤ 600px (full-width search)`;

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
