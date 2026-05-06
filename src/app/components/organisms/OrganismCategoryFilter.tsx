import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { TagCategoria } from "../atoms/TagCategoria";
import { MoleculeMunicipioChip } from "../molecules/MoleculeMunicipioChip";

// ─── Organism/CategoryFilter Component ────────────────────────────────────────

interface OrganismCategoryFilterProps {
  categories?: string[];
  municipios?: string[];
  selectedCategories?: string[];
  selectedMunicipios?: string[];
  onCategoryChange?: (categories: string[]) => void;
  onMunicipioChange?: (municipios: string[]) => void;
}

export function OrganismCategoryFilter({
  categories = ["Todo", "Streetwear", "Accesorios", "Calzado", "Ropa formal", "Vintage", "Artesanal"],
  municipios = ["Ibagué", "Honda", "Espinal", "Líbano", "Melgar"],
  selectedCategories = ["Todo"],
  selectedMunicipios = [],
  onCategoryChange,
  onMunicipioChange,
}: OrganismCategoryFilterProps) {
  return (
    <section
      style={{
        width: "100%",
        height: "80px",
        background: "#FBF7ED",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 40px",
        borderBottom: "1px solid #F2E4B8",
      }}
      className="category-filter-section"
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
        className="category-filter-container"
      >
        {/* Label */}
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#6B6A65",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          className="category-filter-label"
        >
          Explorar por:
        </span>

        {/* Categories Row (Scrollable) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            flex: 1,
            minWidth: 0,
          }}
          className="category-scroll-container"
        >
          {categories.map((category) => (
            <TagCategoria
              key={category}
              label={category}
              variant={selectedCategories.includes(category) ? "active" : "default"}
              onClick={() => onCategoryChange?.([category])}
            />
          ))}
        </div>

        {/* Vertical Divider */}
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "#F2E4B8",
            flexShrink: 0,
          }}
          className="category-filter-divider"
        />

        {/* Municipio Row (Scrollable) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            flex: 1,
            minWidth: 0,
          }}
          className="municipio-scroll-container"
        >
          {municipios.map((municipio) => (
            <MoleculeMunicipioChip
              key={municipio}
              label={municipio}
              variant={selectedMunicipios.includes(municipio) ? "active" : "default"}
              onClick={() => onMunicipioChange?.([municipio])}
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbars */}
      <style>{`
        .category-scroll-container::-webkit-scrollbar,
        .municipio-scroll-container::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 968px) {
          .category-filter-section {
            height: auto !important;
            min-height: 80px;
            padding: 16px 24px !important;
          }
          .category-filter-container {
            flex-wrap: wrap;
            gap: 12px !important;
          }
          .category-filter-label {
            width: 100%;
            margin-bottom: 4px;
          }
          .category-filter-divider {
            display: none !important;
          }
          .category-scroll-container,
          .municipio-scroll-container {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function OrganismCategoryFilterShowcase() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Todo"]);
  const [selectedMunicipios, setSelectedMunicipios] = useState<string[]>([]);
  const [filterEvents, setFilterEvents] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (category === "Todo") {
        addEvent(`Categoría: ${category} (reset)`);
        return ["Todo"];
      }
      const newSelection = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev.filter((c) => c !== "Todo"), category];

      addEvent(`Categoría: ${category} (${prev.includes(category) ? "removed" : "added"})`);
      return newSelection.length === 0 ? ["Todo"] : newSelection;
    });
  };

  const handleMunicipioChange = (municipio: string) => {
    setSelectedMunicipios((prev) =>
      prev.includes(municipio)
        ? prev.filter((m) => m !== municipio)
        : [...prev, municipio]
    );
    addEvent(`Municipio: ${municipio}`);
  };

  const addEvent = (message: string) => {
    setFilterEvents((prev) => [message, ...prev].slice(0, 4));
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
              background: "#FBF7ED",
              borderColor: "#F2E4B8",
              borderWidth: 1.5,
            }}
          >
            <div className="flex gap-0.5">
              <div style={{ width: "3px", height: "12px", background: "#B08A2E", borderRadius: "1px" }} />
              <div style={{ width: "3px", height: "12px", background: "#7A3048", borderRadius: "1px" }} />
              <div style={{ width: "3px", height: "12px", background: "#B08A2E", borderRadius: "1px" }} />
            </div>
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
              Organism/CategoryFilter
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              organism · Filter bar · 80px height
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Tag/Categoria", "Molecule/MunicipioChip", "Scrollable"].map((v) => (
            <span
              key={v}
              className="px-2.5 py-1 rounded-full"
              style={{
                fontSize: 11,
                fontWeight: 500,
                background: "#FBF7ED",
                color: "#B08A2E",
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
              Click categories and municipios to filter — scroll horizontally to see all options
            </p>
          </div>

          {/* Live CategoryFilter Demo */}
          <div
            className="rounded-lg overflow-hidden border"
            style={{ borderColor: "#F2E4B8" }}
          >
            <OrganismCategoryFilter
              selectedCategories={selectedCategories}
              selectedMunicipios={selectedMunicipios}
              onCategoryChange={handleCategoryChange}
              onMunicipioChange={handleMunicipioChange}
            />
          </div>

          {/* Active Filters Summary */}
          <div
            className="mt-4 rounded-lg border p-4"
            style={{ borderColor: "#E8C4D0", background: "#F9F0F3" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Categories */}
              <div>
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
                  Categorías Activas ({selectedCategories.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2.5 py-1 rounded"
                      style={{
                        background: "#FFFFFF",
                        fontSize: 12,
                        color: "#2C2C2A",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Municipios */}
              <div>
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
                  Municipios Activos ({selectedMunicipios.length})
                </p>
                {selectedMunicipios.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedMunicipios.map((mun) => (
                      <span
                        key={mun}
                        className="px-2.5 py-1 rounded"
                        style={{
                          background: "#FFFFFF",
                          fontSize: 12,
                          color: "#2C2C2A",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {mun}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: 12,
                      color: "#9D9C97",
                      fontFamily: "'DM Sans', sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    Todos los municipios
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Filter Events */}
          {filterEvents.length > 0 && (
            <div
              className="mt-4 rounded-lg border p-4"
              style={{ borderColor: "#F2E4B8", background: "#FBF7ED" }}
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
                Recent Filter Activity
              </p>
              <div className="space-y-2">
                {filterEvents.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded"
                    style={{ background: "#FFFFFF" }}
                  >
                    <Check size={12} strokeWidth={2.5} style={{ color: "#B08A2E" }} />
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
            Filter Bar Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div
              className="rounded-lg border p-6"
              style={{
                borderColor: "#D4AA50",
                background: "#FBF7ED",
                borderStyle: "dashed",
                borderWidth: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* Label */}
                <div
                  className="px-3 py-2 rounded"
                  style={{
                    background: "rgba(107, 106, 101, 0.08)",
                    borderLeft: "3px solid #6B6A65",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#6B6A65",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Label
                  </span>
                </div>

                {/* Categories section */}
                <div
                  className="px-3 py-2 rounded flex-1"
                  style={{
                    background: "rgba(122, 48, 72, 0.06)",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "#7A3048",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Categories (Scrollable)
                  </span>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "2px",
                    height: "32px",
                    background: "#F2E4B8",
                  }}
                />

                {/* Municipios section */}
                <div
                  className="px-3 py-2 rounded flex-1"
                  style={{
                    background: "rgba(212, 170, 80, 0.08)",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "#B08A2E",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Municipios (Scrollable)
                  </span>
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Label",
                  detail: '"Explorar por:"\nDM Sans 13px Medium\nColor: #6B6A65',
                  token: "Neutral/Gris-texto",
                  color: "#6B6A65",
                },
                {
                  label: "Categories",
                  detail: "Tag/Categoria atoms\nHorizontal scroll\nGap: 8px",
                  token: "Primary filters",
                  color: "#7A3048",
                },
                {
                  label: "Divider",
                  detail: "1px × 40px\nColor: #F2E4B8\nVertical separator",
                  token: "Secondary/Crema",
                  color: "#F2E4B8",
                },
                {
                  label: "Municipios",
                  detail: "MunicipioChip molecules\nHorizontal scroll\nGap: 8px",
                  token: "Location filters",
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
                style={{ background: "#FBF7ED", color: "#B08A2E", fontWeight: 600 }}
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
                  Single horizontal row. Label, categories, divider, and municipios all inline. Scrollable sections allow viewing all options.
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
                  Wraps to vertical layout. Label takes full width. Categories and municipios stack vertically with full-width scrollable rows. Divider hidden.
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border p-4"
            style={{ borderColor: "#F2E4B8", background: "#FBF7ED" }}
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
              Scrollable Containers
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#6B6A65",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
              }}
            >
              Both category and municipio sections use horizontal overflow scroll with hidden scrollbars for clean appearance. Touch-friendly scrolling enabled with -webkit-overflow-scrolling.
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
          <TokenRow token="Filter Bar → Width" value="100%" type="dimension" />
          <TokenRow token="Filter Bar → Height" value="80px" type="dimension" />
          <TokenRow token="Filter Bar → Max Width" value="1200px (inner)" type="dimension" />
          <TokenRow
            token="Filter Bar → Background"
            value="#FBF7ED"
            type="color"
            colorValue="#FBF7ED"
            tokenName="Secondary/Crema-palida"
          />
          <TokenRow
            token="Filter Bar → Border Bottom"
            value="1px solid #F2E4B8"
            type="color"
            colorValue="#F2E4B8"
            tokenName="Secondary/Crema"
          />
          <TokenRow token="Container → Padding" value="0 40px" type="dimension" />
          <TokenRow token="Container → Gap" value="20px" type="dimension" />
          <TokenRow token="Label → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Label → Font Size" value="13px" type="typography" />
          <TokenRow token="Label → Font Weight" value="500 (Medium)" type="typography" />
          <TokenRow
            token="Label → Color"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow token="Label → White Space" value="nowrap" type="dimension" />
          <TokenRow token="Scroll Container → Overflow X" value="auto" type="dimension" />
          <TokenRow token="Scroll Container → Scrollbar" value="hidden" type="dimension" />
          <TokenRow token="Scroll Container → Gap" value="8px" type="dimension" />
          <TokenRow token="Scroll Container → Flex" value="1 (grow)" type="dimension" />
          <TokenRow token="Divider → Width" value="1px" type="dimension" />
          <TokenRow token="Divider → Height" value="40px" type="dimension" />
          <TokenRow
            token="Divider → Background"
            value="#F2E4B8"
            type="color"
            colorValue="#F2E4B8"
            tokenName="Secondary/Crema"
          />
          <TokenRow
            token="Categories → Component"
            value="Tag/Categoria"
            type="dimension"
          />
          <TokenRow
            token="Municipios → Component"
            value="Molecule/MunicipioChip"
            type="dimension"
          />
          <TokenRow token="Mobile → Breakpoint" value="968px" type="dimension" />
          <TokenRow token="Mobile → Height" value="auto (min 80px)" type="dimension" />
          <TokenRow token="Mobile → Padding" value="16px 24px" type="dimension" />
          <TokenRow token="Mobile → Flex Wrap" value="wrap" type="dimension" />
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
              title: "Product Catalog Filtering",
              description:
                "Primary filter bar for browsing streetwear products, allowing users to filter by category and municipality simultaneously.",
              context: "Product listing pages, catalog views, search results",
            },
            {
              title: "Vendor Directory Navigation",
              description:
                "Filter vendor listings by business category and location to help users discover local Tolima entrepreneurs.",
              context: "Vendor directory, marketplace browsing, entrepreneur discovery",
            },
            {
              title: "Experience Discovery",
              description:
                "Browse tours and experiences by type (category) and available municipalities for region-specific exploration.",
              context: "Experience catalog, tour listings, regional activities",
            },
            {
              title: "Multi-Criteria Search Results",
              description:
                "Refine search results using both product/service categories and geographic location filters in one unified bar.",
              context: "Search results pages, filtered views, discovery interfaces",
            },
            {
              title: "Homepage Quick Navigation",
              description:
                "Sticky filter bar below hero section enabling instant category and location filtering from homepage.",
              context: "Homepage below-fold, persistent navigation, quick access",
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

  const code = `// Organism/CategoryFilter — TolimaMKT Design System
import { TagCategoria } from "./TagCategoria";
import { MoleculeMunicipioChip } from "./MoleculeMunicipioChip";

<OrganismCategoryFilter
  categories={["Todo", "Streetwear", "Accesorios", "Calzado",
               "Ropa formal", "Vintage", "Artesanal"]}
  municipios={["Ibagué", "Honda", "Espinal", "Líbano", "Melgar"]}
  selectedCategories={["Streetwear", "Accesorios"]}
  selectedMunicipios={["Ibagué"]}
  onCategoryChange={(category) => handleCategoryFilter(category)}
  onMunicipioChange={(municipio) => handleMunicipioFilter(municipio)}
/>

// Filter bar structure
width:              100%
height:             80px
background:         #FBF7ED         // Secondary/Crema-palida
border-bottom:      1px solid #F2E4B8
max-width:          1200px (centered)
padding:            0 40px

// Layout
display:            flex
align-items:        center
gap:                20px

// Label
"Explorar por:"
font:               DM Sans 13px Medium
color:              #6B6A65         // Neutral/Gris-texto
white-space:        nowrap

// Categories section
component:          Tag/Categoria
overflow-x:         auto (scrollable)
gap:                8px
flex:               1 (grow)
scrollbar:          hidden

// Divider
width:              1px
height:             40px
background:         #F2E4B8         // Secondary/Crema

// Municipios section
component:          Molecule/MunicipioChip
overflow-x:         auto (scrollable)
gap:                8px
flex:               1 (grow)
scrollbar:          hidden

// Responsive
Desktop:            > 968px (horizontal row)
Mobile:             ≤ 968px (vertical stack, full-width sections)
                    - height: auto (min 80px)
                    - padding: 16px 24px
                    - divider: hidden
                    - label: full width`;

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
