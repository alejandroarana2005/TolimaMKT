import { useState } from "react";
import { Check, Copy, Maximize2 } from "lucide-react";

// ─── Template/HomePage Component ──────────────────────────────────────────────

interface PageZone {
  id: string;
  name: string;
  organism: string;
  height: number;
  background: string;
  description: string;
}

const PAGE_ZONES: PageZone[] = [
  {
    id: "header",
    name: "Header",
    organism: "Organism/Header",
    height: 68,
    background: "#FFFFFF",
    description: "Navigation, logo, cart, wishlist",
  },
  {
    id: "hero",
    name: "Hero Section",
    organism: "Organism/Hero",
    height: 480,
    background: "linear-gradient(90deg, #F9F0F3, #FBF7ED)",
    description: "Headline, search",
  },
  {
    id: "filter",
    name: "Category Filter",
    organism: "Organism/CategoryFilter",
    height: 80,
    background: "#FBF7ED",
    description: "Category tags + municipio chips",
  },
  {
    id: "products-1",
    name: "Featured Products",
    organism: "Organism/ProductGrid",
    height: 520,
    background: "#FFFFFF",
    description: "4-column grid of product cards",
  },
  {
    id: "vendors",
    name: "Vendor Section",
    organism: "Organism/VendorSection",
    height: 400,
    background: "#F9F0F3",
    description: "Creator showcase with vendor cards",
  },
  {
    id: "products-2",
    name: "More Products",
    organism: "Organism/ProductGrid",
    height: 480,
    background: "#FFFFFF",
    description: "Additional product recommendations",
  },
  {
    id: "footer",
    name: "Footer",
    organism: "Organism/Footer",
    height: 320,
    background: "#2C2C2A",
    description: "Navigation, social, payment methods",
  },
];

export function TemplateHomePage() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "#F4F3F0",
        padding: "40px 20px",
      }}
    >
      {/* Artboard Container - 1440px */}
      <div
        style={{
          width: "1440px",
          background: "#FFFFFF",
          boxShadow: "0 8px 32px rgba(44, 44, 42, 0.15)",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Layout Guides - 1200px centered */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1200px",
            height: "100%",
            borderLeft: "1px dashed #D4AA50",
            borderRight: "1px dashed #D4AA50",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          {/* Guide Labels */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "-80px",
              fontSize: "10px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              color: "#D4AA50",
              background: "#FFFFFF",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #D4AA50",
              whiteSpace: "nowrap",
            }}
          >
            1200px Content
          </div>
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "-80px",
              fontSize: "10px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              color: "#D4AA50",
              background: "#FFFFFF",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #D4AA50",
              whiteSpace: "nowrap",
            }}
          >
            1200px Content
          </div>
        </div>

        {/* Page Zones */}
        {PAGE_ZONES.map((zone, index) => (
          <div
            key={zone.id}
            style={{
              width: "100%",
              height: `${zone.height}px`,
              background: zone.background,
              border: "2px dashed #9D3D5E",
              borderTop: index === 0 ? "2px dashed #9D3D5E" : "none",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Zone Label Card */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                border: "2px solid #7A3048",
                borderRadius: "12px",
                padding: "16px 24px",
                boxShadow: "0 4px 16px rgba(122, 48, 72, 0.15)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  color: "#9D3D5E",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                }}
              >
                Zone {index + 1}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  color: "#2C2C2A",
                  marginBottom: "4px",
                }}
              >
                {zone.name}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  color: "#7A3048",
                  marginBottom: "8px",
                }}
              >
                {zone.organism}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  color: "#6B6A65",
                  marginBottom: "8px",
                }}
              >
                {zone.description}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "#FBF7ED",
                  border: "1px solid #D4AA50",
                  borderRadius: "6px",
                  padding: "4px 10px",
                }}
              >
                <Maximize2 size={10} strokeWidth={2.5} style={{ color: "#B08A2E" }} />
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    color: "#B08A2E",
                  }}
                >
                  {zone.height}px height
                </span>
              </div>
            </div>

            {/* Height Indicator - Left Side */}
            <div
              style={{
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "9px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#9D3D5E",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid #E8C4D0",
              }}
            >
              {zone.height}px
            </div>
          </div>
        ))}

        {/* Artboard Label - Top Right */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "2px solid #2C2C2A",
            borderRadius: "8px",
            padding: "8px 12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 101,
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              color: "#9D9C97",
              marginBottom: "2px",
            }}
          >
            Artboard
          </div>
          <div
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#2C2C2A",
            }}
          >
            1440px
          </div>
        </div>

        {/* Total Height Label - Bottom Left */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "2px solid #7A3048",
            borderRadius: "8px",
            padding: "8px 12px",
            boxShadow: "0 2px 8px rgba(122, 48, 72, 0.15)",
            zIndex: 101,
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              color: "#9D3D5E",
              marginBottom: "2px",
            }}
          >
            Total Height
          </div>
          <div
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#7A3048",
            }}
          >
            {PAGE_ZONES.reduce((sum, zone) => sum + zone.height, 0)}px
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function TemplateHomePageShowcase() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const totalHeight = PAGE_ZONES.reduce((sum, zone) => sum + zone.height, 0);

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
              background: "#FFFFFF",
              borderColor: "#7A3048",
              borderWidth: 1.5,
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                border: "2px dashed #7A3048",
                borderRadius: "2px",
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
              Template/HomePage
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              template · Page layout · 1440px artboard
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["7 Zones", "1200px Content", "Wireframe"].map((v) => (
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

      {/* ── Wireframe Visualization ── */}
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
            HomePage Wireframe Layout
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
              Complete homepage structure showing all organism components stacked vertically
            </p>
          </div>

          {/* Wireframe Display */}
          <div
            className="rounded-lg overflow-auto"
            style={{
              border: "2px solid #E8C4D0",
              background: "#F4F3F0",
              maxHeight: "800px",
            }}
          >
            <TemplateHomePage />
          </div>
        </div>
      </div>

      {/* ── Zone Breakdown Table ── */}
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
            Page Zone Breakdown
          </p>
        </div>

        <div className="divide-y" style={{ borderColor: "#F0EFE9" }}>
          {/* Table Header */}
          <div
            className="grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-wider border-b"
            style={{
              color: "#9D9C97",
              borderColor: "#F0EFE9",
              background: "#FAFAF8",
              fontWeight: 600,
              letterSpacing: "0.09em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span className="col-span-1">Zone</span>
            <span className="col-span-2">Name</span>
            <span className="col-span-3">Organism</span>
            <span className="col-span-4">Description</span>
            <span className="col-span-1 text-center">Height</span>
            <span className="col-span-1 text-center">%</span>
          </div>

          {/* Table Rows */}
          {PAGE_ZONES.map((zone, index) => (
            <div
              key={zone.id}
              className="grid grid-cols-12 items-center px-5 py-3 hover:bg-[#FDFCFA] transition-colors cursor-pointer"
              onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
              style={{
                background: selectedZone === zone.id ? "#F9F0F3" : "transparent",
              }}
            >
              <div className="col-span-1">
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                  style={{
                    background: "#E8C4D0",
                    color: "#7A3048",
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {index + 1}
                </span>
              </div>

              <div className="col-span-2">
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#2C2C2A",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {zone.name}
                </p>
              </div>

              <div className="col-span-3">
                <span
                  className="inline-flex px-2 py-1 rounded text-xs font-mono"
                  style={{
                    background: "#FBF7ED",
                    color: "#7A3048",
                    fontWeight: 600,
                  }}
                >
                  {zone.organism}
                </span>
              </div>

              <div className="col-span-4">
                <p
                  style={{
                    fontSize: 11,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {zone.description}
                </p>
              </div>

              <div className="col-span-1 text-center">
                <span
                  className="inline-flex px-2 py-0.5 rounded text-xs font-mono"
                  style={{
                    background: "rgba(0,0,0,0.04)",
                    color: "#6B6A65",
                    fontWeight: 600,
                  }}
                >
                  {zone.height}px
                </span>
              </div>

              <div className="col-span-1 text-center">
                <span
                  style={{
                    fontSize: 11,
                    color: "#9D9C97",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {((zone.height / totalHeight) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}

          {/* Total Row */}
          <div
            className="grid grid-cols-12 items-center px-5 py-4 border-t-2"
            style={{
              borderColor: "#7A3048",
              background: "#F9F0F3",
            }}
          >
            <div className="col-span-6">
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#7A3048",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Total Page Height
              </p>
            </div>

            <div className="col-span-4" />

            <div className="col-span-1 text-center">
              <span
                className="inline-flex px-2 py-1 rounded text-xs font-mono"
                style={{
                  background: "#7A3048",
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
              >
                {totalHeight}px
              </span>
            </div>

            <div className="col-span-1 text-center">
              <span
                style={{
                  fontSize: 11,
                  color: "#7A3048",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                }}
              >
                100%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Layout Specifications ── */}
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
            Layout Specifications
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "Artboard Width",
                value: "1440px",
                description: "Full viewport width for desktop design",
                color: "#2C2C2A",
              },
              {
                label: "Content Width",
                value: "1200px",
                description: "Centered max-width for all sections",
                color: "#D4AA50",
              },
              {
                label: "Total Height",
                value: `${totalHeight}px`,
                description: "Combined height of all 7 zones",
                color: "#7A3048",
              },
            ].map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl p-5 border"
                style={{
                  borderColor: "#F0EFE9",
                  background: "#FAFAF8",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9D9C97",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {spec.label}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: spec.color,
                    fontFamily: "monospace",
                    marginBottom: 8,
                  }}
                >
                  {spec.value}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  {spec.description}
                </p>
              </div>
            ))}
          </div>

          {/* Layout Notes */}
          <div
            className="mt-6 rounded-lg border p-4"
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
              Layout Notes
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                listStyle: "disc",
              }}
            >
              {[
                "All organisms stack vertically with no gaps between zones",
                "1200px content guides shown with dashed Dorado lines",
                "Each zone maintains its organism's specified height",
                "Background colors alternate for visual rhythm and hierarchy",
                "Responsive breakpoints handled within each organism component",
              ].map((note, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 12,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                    marginBottom: 4,
                  }}
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
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
            Implementation Guide
          </p>
        </div>

        <CodeBlock />
      </div>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────

function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const code = `// Template/HomePage — TolimaMKT Design System
// Complete homepage layout using all organism components

import { OrganismHeader } from "./OrganismHeader";
import { OrganismHero } from "./OrganismHero";
import { OrganismCategoryFilter } from "./OrganismCategoryFilter";
import { OrganismProductGrid } from "./OrganismProductGrid";
import { OrganismVendorSection } from "./OrganismVendorSection";
import { OrganismFooter } from "./OrganismFooter";

export function HomePage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>

      {/* Zone 1: Header - 68px */}
      <OrganismHeader
        activeLink="Inicio"
        cartCount={3}
        onNavigate={handleNavigation}
      />

      {/* Zone 2: Hero - 480px */}
      <OrganismHero
        headline="El streetwear del Tolima, en un solo lugar"
        subtitle="Descubre emprendedores de Ibagué, Honda, Espinal y más."
        onSearch={handleSearch}
      />

      {/* Zone 3: Category Filter - 80px */}
      <OrganismCategoryFilter
        categories={["Todo", "Streetwear", "Accesorios", "Calzado",
                    "Ropa formal", "Vintage", "Artesanal"]}
        municipios={["Ibagué", "Honda", "Espinal", "Líbano", "Melgar"]}
        selectedCategories={selectedCategories}
        selectedMunicipios={selectedMunicipios}
        onCategoryChange={handleCategoryFilter}
        onMunicipioChange={handleMunicipioFilter}
      />

      {/* Zone 4: Featured Products - ~520px */}
      <OrganismProductGrid
        title="Productos destacados"
        products={featuredProducts}
        onViewAll={() => navigate("/productos")}
        onProductClick={handleProductClick}
      />

      {/* Zone 5: Vendor Section - 400px */}
      <OrganismVendorSection
        title="Conoce a los creadores del Tolima"
        subtitle="Historias reales detrás de cada prenda"
        vendors={featuredVendors}
        onViewStore={handleViewVendor}
      />

      {/* Zone 6: More Products - ~480px */}
      <OrganismProductGrid
        title="Nuevos productos"
        products={newProducts}
        onViewAll={() => navigate("/productos/nuevos")}
        onProductClick={handleProductClick}
      />

      {/* Zone 7: Footer - 320px */}
      <OrganismFooter
        tagline="El mercado de moda del Tolima"
        columns={footerColumns}
        onSocialClick={handleSocial}
        onLinkClick={handleFooterLink}
      />

    </div>
  );
}

// Layout Structure
// ────────────────────────────────────────────────────────
// Artboard:        1440px width
// Content:         1200px max-width (centered)
// Total Height:    2348px (sum of all zones)
//
// Zone Heights:
// 1. Header:       68px   (2.9%)
// 2. Hero:         480px  (20.4%)
// 3. Filter:       80px   (3.4%)
// 4. Products-1:   520px  (22.1%)
// 5. Vendors:      400px  (17.0%)
// 6. Products-2:   480px  (20.4%)
// 7. Footer:       320px  (13.6%)
// ────────────────────────────────────────────────────────
// TOTAL:           2348px (100%)`;

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
