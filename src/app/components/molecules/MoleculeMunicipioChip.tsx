import { useState } from "react";
import { MapPin, Check, Copy } from "lucide-react";

// ─── Molecule/MunicipioChip Component ─────────────────────────────────────────

interface MoleculeMunicipioChipProps {
  label?: string;
  variant?: "default" | "active";
  onClick?: () => void;
}

export function MoleculeMunicipioChip({
  label = "Ibagué",
  variant = "default",
  onClick,
}: MoleculeMunicipioChipProps) {
  const styles = {
    default: {
      background: "#F4F3F0", // Neutral/Fondo
      color: "#6B6A65",       // Neutral/Gris-texto
      iconColor: "#9D9C97",
    },
    active: {
      background: "#7A3048", // Primary/Vinotinto
      color: "#FFFFFF",      // Neutral/Blanco
      iconColor: "#FFFFFF",
    },
  };

  const currentStyle = styles[variant];

  return (
    <button
      onClick={onClick}
      className="transition-all hover:scale-105"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        background: currentStyle.background,
        color: currentStyle.color,
        borderRadius: "20px",
        padding: "6px 14px 6px 10px",
        fontSize: "12px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        border: "none",
        cursor: onClick ? "pointer" : "default",
        boxShadow: variant === "active" ? "0 2px 6px rgba(122, 48, 72, 0.15)" : "none",
      }}
    >
      <MapPin
        size={12}
        strokeWidth={2.5}
        style={{
          color: currentStyle.iconColor,
          flexShrink: 0,
        }}
      />
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
    </button>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function MoleculeMunicipioChipShowcase() {
  const [selectedMunicipios, setSelectedMunicipios] = useState<string[]>(["Ibagué"]);

  const tolimaMusnicipios = [
    "Ibagué",
    "Honda",
    "El Espinal",
    "Líbano",
    "Mariquita",
    "Melgar",
    "Chaparral",
    "Purificación",
    "Flandes",
    "Rovira",
    "Fresno",
    "Armero-Guayabal",
  ];

  const toggleMunicipio = (municipio: string) => {
    setSelectedMunicipios((prev) =>
      prev.includes(municipio)
        ? prev.filter((m) => m !== municipio)
        : [...prev, municipio]
    );
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
            <MapPin
              size={14}
              strokeWidth={2.5}
              style={{ color: "#7A3048" }}
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
              Molecule/MunicipioChip
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              molecule · Location filter · Pin icon + label
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Tag/Categoria", "Icon/MapPin", "Typography/Label"].map((v) => (
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
            Click chips to toggle — use for filtering by municipality
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
          {tolimaMusnicipios.map((municipio) => (
            <MoleculeMunicipioChip
              key={municipio}
              label={municipio}
              variant={selectedMunicipios.includes(municipio) ? "active" : "default"}
              onClick={() => toggleMunicipio(municipio)}
            />
          ))}
        </div>

        {/* Selection feedback */}
        {selectedMunicipios.length > 0 && (
          <div
            className="mt-6 rounded-lg border p-4 text-center max-w-md mx-auto"
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
              Municipios Seleccionados ({selectedMunicipios.length})
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedMunicipios.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 rounded"
                  style={{
                    background: "#FFFFFF",
                    fontSize: 12,
                    color: "#2C2C2A",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Variant Comparison ── */}
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
            Variant Comparison
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default variant */}
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "#E5E4E0", background: "#F4F3F0" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Default
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ background: "#F4F3F0", border: "1px solid #E5E4E0" }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      color: "#9D9C97",
                      fontFamily: "monospace",
                    }}
                  >
                    #F4F3F0
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <MoleculeMunicipioChip label="Ibagué" variant="default" />
                <MoleculeMunicipioChip label="Honda" variant="default" />
                <MoleculeMunicipioChip label="El Espinal" variant="default" />
              </div>

              <div
                className="mt-4 pt-4 border-t"
                style={{ borderColor: "#E5E4E0" }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  Unselected state for filtering options
                </p>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9D9C97",
                        fontFamily: "monospace",
                      }}
                    >
                      Background
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#6B6A65",
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      #F4F3F0
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9D9C97",
                        fontFamily: "monospace",
                      }}
                    >
                      Text
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#6B6A65",
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      #6B6A65
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9D9C97",
                        fontFamily: "monospace",
                      }}
                    >
                      Icon
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#6B6A65",
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      #9D9C97
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active variant */}
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "#E8C4D0", background: "#F9F0F3" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#7A3048",
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Active
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ background: "#7A3048" }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      color: "#9D9C97",
                      fontFamily: "monospace",
                    }}
                  >
                    #7A3048
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <MoleculeMunicipioChip label="Ibagué" variant="active" />
                <MoleculeMunicipioChip label="Honda" variant="active" />
                <MoleculeMunicipioChip label="El Espinal" variant="active" />
              </div>

              <div
                className="mt-4 pt-4 border-t"
                style={{ borderColor: "#E8C4D0" }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "#7A3048",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  Selected state showing active filters
                </p>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9D9C97",
                        fontFamily: "monospace",
                      }}
                    >
                      Background
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#7A3048",
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      #7A3048
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9D9C97",
                        fontFamily: "monospace",
                      }}
                    >
                      Text
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#7A3048",
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      #FFFFFF
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9D9C97",
                        fontFamily: "monospace",
                      }}
                    >
                      Icon
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#7A3048",
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      #FFFFFF
                    </span>
                  </div>
                </div>
              </div>
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
            Chip Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div className="flex justify-center">
              <div
                className="rounded-3xl border p-6 inline-flex items-center gap-4"
                style={{
                  borderColor: "#D4AA50",
                  background: "#FDFCFA",
                  borderStyle: "dashed",
                  borderWidth: "2px",
                }}
              >
                {/* Icon section */}
                <div
                  className="rounded-lg p-2"
                  style={{
                    background: "rgba(122, 48, 72, 0.08)",
                  }}
                >
                  <MapPin
                    size={12}
                    strokeWidth={2.5}
                    style={{ color: "#7A3048" }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-px"
                    style={{ background: "#E5E4E0" }}
                  />
                  <div
                    className="px-3 py-1 rounded"
                    style={{
                      background: "rgba(44, 44, 42, 0.04)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#2C2C2A",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Ibagué
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "MapPin Icon",
                  detail: "Lucide MapPin\nsize: 12px\nstrokeWidth: 2.5",
                  token: "Icon Component",
                  color: "#7A3048",
                },
                {
                  label: "Label Text",
                  detail: "DM Sans 12px Medium\ngap: 5px\nwhitespace: nowrap",
                  token: "Typography/Label",
                  color: "#2C2C2A",
                },
                {
                  label: "Container",
                  detail: "border-radius: 20px\npadding: 6px 14px 6px 10px\nhover: scale(1.05)",
                  token: "Interactive Chip",
                  color: "#F4F3F0",
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
          <TokenRow token="Chip → Display" value="inline-flex" type="dimension" />
          <TokenRow token="Chip → Align Items" value="center" type="dimension" />
          <TokenRow token="Chip → Gap" value="5px" type="dimension" />
          <TokenRow token="Chip → Border Radius" value="20px" type="dimension" />
          <TokenRow token="Chip → Padding" value="6px 14px 6px 10px" type="dimension" />
          <TokenRow
            token="Default → Background"
            value="#F4F3F0"
            type="color"
            colorValue="#F4F3F0"
            tokenName="Neutral/Fondo"
          />
          <TokenRow
            token="Default → Text Color"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow
            token="Default → Icon Color"
            value="#9D9C97"
            type="color"
            colorValue="#9D9C97"
            tokenName="Neutral/Gris (lighter)"
          />
          <TokenRow
            token="Active → Background"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow
            token="Active → Text Color"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow
            token="Active → Icon Color"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow
            token="Active → Shadow"
            value="0 2px 6px rgba(122,48,72,0.15)"
            type="dimension"
          />
          <TokenRow token="Icon → Component" value="lucide-react MapPin" type="dimension" />
          <TokenRow token="Icon → Size" value="12px" type="dimension" />
          <TokenRow token="Icon → Stroke Width" value="2.5" type="dimension" />
          <TokenRow token="Text → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Text → Font Size" value="12px" type="typography" />
          <TokenRow token="Text → Font Weight" value="500 (Medium)" type="typography" />
          <TokenRow token="Text → White Space" value="nowrap" type="dimension" />
          <TokenRow token="Hover → Transform" value="scale(1.05)" type="dimension" />
          <TokenRow token="Transition" value="all 200ms ease" type="dimension" />
        </div>
      </div>

      {/* ── Filter Integration Example ── */}
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
            Filter Bar Integration
          </p>
        </div>

        <div className="p-6">
          <div
            className="rounded-xl border p-5"
            style={{ borderColor: "#F0EFE9", background: "#FAFAF8" }}
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#2C2C2A",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Filtrar por municipio
              </p>
              <button
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#7A3048",
                  fontFamily: "'DM Sans', sans-serif",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Limpiar filtros
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Ibagué", "Honda", "El Espinal", "Líbano", "Mariquita", "Melgar"].map(
                (municipio, i) => (
                  <MoleculeMunicipioChip
                    key={municipio}
                    label={municipio}
                    variant={i < 2 ? "active" : "default"}
                  />
                )
              )}
            </div>

            <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E5E4E0" }}>
              <p
                style={{
                  fontSize: 12,
                  color: "#6B6A65",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{ fontWeight: 600, color: "#2C2C2A" }}>124 resultados</span> en Ibagué
                y Honda
              </p>
            </div>
          </div>
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
              title: "Search Filters",
              description:
                "Primary use for filtering search results by Tolima municipality in product/experience listings.",
              context: "Search pages, category filters, location filtering",
            },
            {
              title: "Vendor Discovery",
              description:
                "Filter vendor directories to show only vendors operating in specific municipalities.",
              context: "Vendor directory, marketplace browsing, local discovery",
            },
            {
              title: "Experience Browsing",
              description:
                "Help users discover tours and experiences available in their preferred Tolima locations.",
              context: "Tour listings, experience search, regional exploration",
            },
            {
              title: "Homepage Shortcuts",
              description:
                "Quick access chips on homepage to navigate directly to popular municipality pages.",
              context: "Homepage quick links, regional navigation, featured locations",
            },
            {
              title: "Multi-select Filters",
              description:
                "Allow users to select multiple municipalities simultaneously for broader search results.",
              context: "Advanced filters, multi-location search, regional groups",
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

  const code = `// Molecule/MunicipioChip — TolimaMKT Design System
import { MapPin } from "lucide-react";

// Basic usage
<MoleculeMunicipioChip label="Ibagué" variant="default" />
<MoleculeMunicipioChip label="Honda" variant="active" />

// Interactive filter
const [selected, setSelected] = useState(["Ibagué"]);

<MoleculeMunicipioChip
  label="El Espinal"
  variant={selected.includes("El Espinal") ? "active" : "default"}
  onClick={() => toggleSelection("El Espinal")}
/>

// Container
display:        inline-flex
align-items:    center
gap:            5px
border-radius:  20px
padding:        6px 14px 6px 10px
transition:     all 200ms ease

// MapPin icon
size:           12px
strokeWidth:    2.5
flex-shrink:    0

// Variants
Default:
  background:   #F4F3F0    // Neutral/Fondo
  text:         #6B6A65    // Neutral/Gris-texto
  icon:         #9D9C97

Active:
  background:   #7A3048    // Primary/Vinotinto
  text:         #FFFFFF    // Neutral/Blanco
  icon:         #FFFFFF
  box-shadow:   0 2px 6px rgba(122,48,72,0.15)

// Text
font:           DM Sans 12px Medium
white-space:    nowrap

// Hover state
transform:      scale(1.05)

// Tolima municipalities
const municipios = [
  "Ibagué", "Honda", "El Espinal", "Líbano",
  "Mariquita", "Melgar", "Chaparral", "Purificación"
];`;

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
