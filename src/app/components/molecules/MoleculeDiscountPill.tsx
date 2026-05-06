import { useState } from "react";
import { Check, Copy } from "lucide-react";

// ─── Molecule/DiscountPill Component ──────────────────────────────────────────

interface MoleculeDiscountPillProps {
  text?: string;
  variant?: "descuento" | "nuevo" | "envio-gratis";
}

export function MoleculeDiscountPill({
  text = "−20%",
  variant = "descuento",
}: MoleculeDiscountPillProps) {
  const variantStyles = {
    descuento: {
      background: "#D4AA50", // Secondary/Dorado-mid
      color: "#FFFFFF",
      label: "Descuento",
    },
    nuevo: {
      background: "#7A3048", // Primary/Vinotinto
      color: "#FFFFFF",
      label: "Nuevo",
    },
    "envio-gratis": {
      background: "#2C2C2A", // Neutral/Carbon
      color: "#FFFFFF",
      label: "Envío gratis",
    },
  };

  const style = variantStyles[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 8px",
        borderRadius: "6px",
        background: style.background,
        color: style.color,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function MoleculeDiscountPillShowcase() {
  const [selectedVariant, setSelectedVariant] = useState<"descuento" | "nuevo" | "envio-gratis">("descuento");

  const samplePills = [
    { variant: "descuento" as const, examples: ["−20%", "−15%", "−50%", "2x1"] },
    { variant: "nuevo" as const, examples: ["Nuevo", "Novedad", "Nueva temporada"] },
    { variant: "envio-gratis" as const, examples: ["Envío gratis", "Gratis", "Sin costo"] },
  ];

  const productExamples = [
    {
      name: "Café Premium Tolima 500g",
      price: "$45.000",
      originalPrice: "$56.250",
      pill: { variant: "descuento" as const, text: "−20%" },
    },
    {
      name: "Artesanía Cerámica",
      price: "$85.000",
      pill: { variant: "nuevo" as const, text: "Nuevo" },
    },
    {
      name: "Miel de Abejas Orgánica",
      price: "$28.000",
      pill: { variant: "envio-gratis" as const, text: "Envío gratis" },
    },
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
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{
              background: "#FBF7ED",
              borderColor: "#D4AA50",
              borderWidth: 1.5,
            }}
          >
            <div
              className="px-2 py-0.5 rounded"
              style={{
                background: "#D4AA50",
                fontSize: "7px",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              %
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
              Molecule/DiscountPill
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              molecule · Promo badge · 3 variants
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Typography/Label", "Utility Badge"].map((v) => (
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
            Explore all variants and examples
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Variant selector */}
          <div className="flex justify-center gap-3 flex-wrap">
            {(["descuento", "nuevo", "envio-gratis"] as const).map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "2px solid",
                  borderColor: selectedVariant === variant ? "#7A3048" : "#E5E4E0",
                  background: selectedVariant === variant ? "#F9F0F3" : "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: selectedVariant === variant ? "#7A3048" : "#6B6A65",
                  cursor: "pointer",
                  transition: "all 180ms ease",
                }}
              >
                {variant === "descuento" && "Descuento"}
                {variant === "nuevo" && "Nuevo"}
                {variant === "envio-gratis" && "Envío gratis"}
              </button>
            ))}
          </div>

          {/* Examples for selected variant */}
          <div
            className="rounded-lg border p-6"
            style={{ borderColor: "#F0EFE9", background: "#FAFAF8" }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#9D3D5E",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textAlign: "center",
              }}
            >
              {selectedVariant === "descuento" && "Ejemplos de Descuento"}
              {selectedVariant === "nuevo" && "Ejemplos de Nuevo"}
              {selectedVariant === "envio-gratis" && "Ejemplos de Envío"}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {samplePills
                .find((p) => p.variant === selectedVariant)
                ?.examples.map((example) => (
                  <MoleculeDiscountPill
                    key={example}
                    text={example}
                    variant={selectedVariant}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── All Variants Overview ── */}
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
            Variant Overview
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Descuento */}
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "#F2E4B8", background: "#FBF7ED" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#B08A2E",
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Descuento
                </span>
                <div
                  className="w-6 h-6 rounded"
                  style={{ background: "#D4AA50" }}
                />
              </div>
              <div className="space-y-2">
                {["−20%", "−15%", "−50%"].map((text) => (
                  <div key={text} className="flex items-center justify-between">
                    <MoleculeDiscountPill text={text} variant="descuento" />
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9D9C97",
                        fontFamily: "monospace",
                      }}
                    >
                      #D4AA50
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "#6B6A65",
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: 12,
                  lineHeight: 1.5,
                }}
              >
                Promociones y descuentos en productos
              </p>
            </div>

            {/* Nuevo */}
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "#E8C4D0", background: "#F9F0F3" }}
            >
              <div className="flex items-center justify-between mb-3">
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
                  Nuevo
                </span>
                <div
                  className="w-6 h-6 rounded"
                  style={{ background: "#7A3048" }}
                />
              </div>
              <div className="space-y-2">
                {["Nuevo", "Novedad", "Nueva temporada"].map((text) => (
                  <div key={text} className="flex items-center justify-between">
                    <MoleculeDiscountPill text={text} variant="nuevo" />
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
                ))}
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "#6B6A65",
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: 12,
                  lineHeight: 1.5,
                }}
              >
                Productos nuevos o recién llegados
              </p>
            </div>

            {/* Envío gratis */}
            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "#E5E4E0", background: "#F4F3F0" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#2C2C2A",
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Envío gratis
                </span>
                <div
                  className="w-6 h-6 rounded"
                  style={{ background: "#2C2C2A" }}
                />
              </div>
              <div className="space-y-2">
                {["Envío gratis", "Gratis", "Sin costo"].map((text) => (
                  <div key={text} className="flex items-center justify-between">
                    <MoleculeDiscountPill text={text} variant="envio-gratis" />
                    <span
                      style={{
                        fontSize: 10,
                        color: "#9D9C97",
                        fontFamily: "monospace",
                      }}
                    >
                      #2C2C2A
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "#6B6A65",
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: 12,
                  lineHeight: 1.5,
                }}
              >
                Beneficios de envío sin costo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Card Integration ── */}
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
            Product Integration Examples
          </p>
        </div>

        <div className="p-6 space-y-4">
          {productExamples.map((product) => (
            <div
              key={product.name}
              className="rounded-lg border p-4 flex items-center justify-between gap-4"
              style={{ borderColor: "#F0EFE9", background: "#FFFFFF" }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MoleculeDiscountPill
                    text={product.pill.text}
                    variant={product.pill.variant}
                  />
                </div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#2C2C2A",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 4,
                  }}
                >
                  {product.name}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#7A3048",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        color: "#9D9C97",
                        fontFamily: "'DM Sans', sans-serif",
                        textDecoration: "line-through",
                      }}
                    >
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
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
          <TokenRow token="Pill → Display" value="inline-flex" type="dimension" />
          <TokenRow token="Pill → Padding" value="4px 8px" type="dimension" />
          <TokenRow token="Pill → Border Radius" value="6px" type="dimension" />
          <TokenRow token="Pill → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Pill → Font Size" value="11px" type="typography" />
          <TokenRow token="Pill → Font Weight" value="700 (Bold)" type="typography" />
          <TokenRow token="Pill → Text Color" value="#FFFFFF" type="color" colorValue="#FFFFFF" tokenName="Neutral/Blanco" />
          <TokenRow token="Pill → Line Height" value="1" type="dimension" />
          <TokenRow token="Pill → White Space" value="nowrap" type="dimension" />
          <TokenRow
            token="Descuento → Background"
            value="#D4AA50"
            type="color"
            colorValue="#D4AA50"
            tokenName="Secondary/Dorado-mid"
          />
          <TokenRow
            token="Descuento → Use Case"
            value="Promociones, descuentos, ofertas"
            type="dimension"
          />
          <TokenRow
            token="Nuevo → Background"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow
            token="Nuevo → Use Case"
            value="Productos nuevos, novedades"
            type="dimension"
          />
          <TokenRow
            token="Envío gratis → Background"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow
            token="Envío gratis → Use Case"
            value="Beneficios de envío, gratis"
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
              title: "Product Cards",
              description:
                "Overlay pills on product images or position near product titles to highlight promotions.",
              context: "E-commerce grids, product listings, featured items",
            },
            {
              title: "Search Results",
              description:
                "Display promotional badges inline with search results for quick scanning of deals.",
              context: "Search pages, filter results, category browsing",
            },
            {
              title: "Hero Banners",
              description:
                "Combine with large product images in hero sections to emphasize limited-time offers.",
              context: "Homepage banners, promotional campaigns, seasonal sales",
            },
            {
              title: "Cart & Checkout",
              description:
                "Show discount pills next to line items to remind customers of savings during checkout.",
              context: "Shopping cart, checkout flow, order summary",
            },
            {
              title: "Vendor Profiles",
              description:
                "Highlight vendor-specific promotions like free shipping on vendor product pages.",
              context: "Vendor pages, seller profiles, marketplace listings",
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

      {/* ── Design Guidelines ── */}
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
            Design Guidelines
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Use sparingly",
                description: "Limit to 1 pill per product to maintain visual hierarchy and avoid clutter.",
              },
              {
                title: "Priority order",
                description: "Descuento > Nuevo > Envío gratis. Show the most impactful benefit first.",
              },
              {
                title: "Keep text short",
                description: "Use concise labels (2-3 words max) for better scannability and mobile display.",
              },
              {
                title: "Consistent placement",
                description: "Position pills consistently (e.g., always top-left on images) for predictable UX.",
              },
            ].map((guideline) => (
              <div
                key={guideline.title}
                className="rounded-lg border p-4"
                style={{ borderColor: "#F0EFE9", background: "#FAFAF8" }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: "#D4AA50" }}
                  />
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#2C2C2A",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {guideline.title}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: "#6B6A65",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.6,
                    marginLeft: 14,
                  }}
                >
                  {guideline.description}
                </p>
              </div>
            ))}
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

  const code = `// Molecule/DiscountPill — TolimaMKT Design System

// Basic usage
<MoleculeDiscountPill text="−20%" variant="descuento" />
<MoleculeDiscountPill text="Nuevo" variant="nuevo" />
<MoleculeDiscountPill text="Envío gratis" variant="envio-gratis" />

// Variants
descuento:     #D4AA50    // Secondary/Dorado-mid
nuevo:         #7A3048    // Primary/Vinotinto
envio-gratis:  #2C2C2A    // Neutral/Carbon

// Pill styles
display:        inline-flex
padding:        4px 8px
border-radius:  6px
font:           DM Sans 11px Bold
color:          #FFFFFF    // Neutral/Blanco
line-height:    1
white-space:    nowrap

// Usage on product cards
<div className="product-card">
  <div className="image-container">
    <img src="..." />
    <div className="pill-overlay">
      <MoleculeDiscountPill text="−20%" variant="descuento" />
    </div>
  </div>
  <h3>Product Name</h3>
  <p className="price">$45.000</p>
</div>

// Common text examples
Descuento:     "−20%", "−15%", "−50%", "2x1"
Nuevo:         "Nuevo", "Novedad", "Nueva temporada"
Envío gratis:  "Envío gratis", "Gratis", "Sin costo"`;

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
