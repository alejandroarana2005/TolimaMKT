import { useState } from "react";
import { Check, Copy, ArrowRight } from "lucide-react";
import { MoleculeProductCard } from "../molecules/MoleculeProductCard";
import { MoleculeDiscountPill } from "../molecules/MoleculeDiscountPill";
import type { Producto } from "../../../data/types";

// ─── Organism/ProductGrid Component ───────────────────────────────────────────

interface ProductItem {
  id: string;
  imageUrl?: string;
  categoria: string;
  municipio: string;
  productName: string;
  price: string;
  discount?: {
    text: string;
    variant: "descuento" | "nuevo" | "envio-gratis";
  };
}

function productoToItem(p: Producto): ProductItem {
  return {
    id: p.id,
    imageUrl: p.imageUrl,
    categoria: p.categoria,
    municipio: p.municipio,
    productName: p.nombre,
    price: `$${p.precio.toLocaleString("es-CO")}`,
    discount: p.esNuevo
      ? { text: "NUEVO", variant: "nuevo" as const }
      : p.descuento
      ? { text: `−${p.descuento}%`, variant: "descuento" as const }
      : undefined,
  };
}

interface OrganismProductGridProps {
  title?: string;
  productos?: Producto[];
  products?: ProductItem[];
  onViewAll?: () => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onFavorite?: (productId: string) => void;
}

export function OrganismProductGrid({
  title = "Productos destacados",
  productos,
  products = DEFAULT_PRODUCTS,
  onViewAll,
  onProductClick,
  onAddToCart,
  onFavorite,
}: OrganismProductGridProps) {
  const gridItems = productos ? productos.map(productoToItem) : products;
  return (
    <section
      style={{
        width: "100%",
        background: "#FFFFFF",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
          className="product-grid-header"
        >
          {/* H2 Title */}
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "#2C2C2A",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>

          {/* Ver todos link */}
          <button
            onClick={onViewAll}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#7A3048",
              transition: "gap 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = "8px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = "6px";
            }}
          >
            Ver todos
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
          className="product-grid-container"
        >
          {gridItems.map((product) => (
            <div
              key={product.id}
              style={{
                position: "relative",
                cursor: onProductClick ? "pointer" : "default",
              }}
              onClick={() => onProductClick?.(product.id)}
            >
              {/* Product Card */}
              <MoleculeProductCard
                id={product.id}
                imageUrl={product.imageUrl}
                categoria={product.categoria}
                municipio={product.municipio}
                productName={product.productName}
                price={product.price}
                onAddToCart={() => onAddToCart?.(product.id)}
                onFavorite={() => onFavorite?.(product.id)}
              />

              {/* Discount Pill Overlay (if present) */}
              {product.discount && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "50px",
                    zIndex: 10,
                    pointerEvents: "none",
                  }}
                >
                  <MoleculeDiscountPill
                    text={product.discount.text}
                    variant={product.discount.variant}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .product-grid-container {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .product-grid-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .product-grid-header {
            margin-bottom: 24px !important;
          }
        }

        @media (max-width: 480px) {
          .product-grid-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Default Products Data ────────────────────────────────────────────────────

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    categoria: "Streetwear",
    municipio: "Ibagué",
    productName: "Camiseta Retro Tolima",
    price: "$85.000",
    discount: {
      text: "−20%",
      variant: "descuento",
    },
  },
  {
    id: "2",
    categoria: "Accesorios",
    municipio: "Honda",
    productName: "Gorra Bordada Local",
    price: "$45.000",
    discount: {
      text: "Nuevo",
      variant: "nuevo",
    },
  },
  {
    id: "3",
    categoria: "Calzado",
    municipio: "Espinal",
    productName: "Sneakers Edición Limitada",
    price: "$320.000",
  },
  {
    id: "4",
    categoria: "Vintage",
    municipio: "Líbano",
    productName: "Chaqueta Denim Vintage",
    price: "$195.000",
    discount: {
      text: "Envío gratis",
      variant: "envio-gratis",
    },
  },
  {
    id: "5",
    categoria: "Artesanal",
    municipio: "Mariquita",
    productName: "Mochila Artesanal",
    price: "$120.000",
  },
  {
    id: "6",
    categoria: "Streetwear",
    municipio: "Ibagué",
    productName: "Hoodie Premium",
    price: "$145.000",
    discount: {
      text: "−15%",
      variant: "descuento",
    },
  },
  {
    id: "7",
    categoria: "Accesorios",
    municipio: "Honda",
    productName: "Reloj Análogo Clásico",
    price: "$280.000",
  },
  {
    id: "8",
    categoria: "Ropa formal",
    municipio: "Espinal",
    productName: "Camisa Lino Blanca",
    price: "$98.000",
    discount: {
      text: "Nuevo",
      variant: "nuevo",
    },
  },
];

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function OrganismProductGridShowcase() {
  const [gridEvents, setGridEvents] = useState<string[]>([]);

  const handleViewAll = () => {
    addEvent("Clicked 'Ver todos' — navigate to full catalog");
  };

  const handleProductClick = (productId: string) => {
    const product = DEFAULT_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addEvent(`Product clicked: ${product.productName}`);
    }
  };

  const handleAddToCart = (productId: string) => {
    const product = DEFAULT_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addEvent(`Added to cart: ${product.productName}`);
    }
  };

  const handleFavorite = (productId: string) => {
    const product = DEFAULT_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addEvent(`Favorited: ${product.productName}`);
    }
  };

  const addEvent = (message: string) => {
    setGridEvents((prev) => [message, ...prev].slice(0, 5));
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
              background: "#FFFFFF",
              borderColor: "#E8C4D0",
              borderWidth: 1.5,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "4px 4px",
                gridTemplateRows: "4px 4px",
                gap: "2px",
              }}
            >
              <div style={{ background: "#7A3048", borderRadius: "1px" }} />
              <div style={{ background: "#D4AA50", borderRadius: "1px" }} />
              <div style={{ background: "#D4AA50", borderRadius: "1px" }} />
              <div style={{ background: "#7A3048", borderRadius: "1px" }} />
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
              Organism/ProductGrid
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              organism · Product showcase · 4-column grid
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Molecule/ProductCard", "Molecule/DiscountPill", "Responsive Grid"].map((v) => (
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
              Click products, hearts, or "Ver todos" to see interactions
            </p>
          </div>

          {/* Live ProductGrid Demo */}
          <div
            className="rounded-lg overflow-hidden border"
            style={{ borderColor: "#E8C4D0", background: "#F4F3F0" }}
          >
            <OrganismProductGrid
              onViewAll={handleViewAll}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
              onFavorite={handleFavorite}
            />
          </div>

          {/* Event Activity */}
          {gridEvents.length > 0 && (
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
                Recent Grid Activity
              </p>
              <div className="space-y-2">
                {gridEvents.map((event, i) => (
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
            Product Grid Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div
              className="rounded-lg border p-6"
              style={{
                borderColor: "#D4AA50",
                background: "#FFFFFF",
                borderStyle: "dashed",
                borderWidth: "2px",
              }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div
                  className="rounded p-3 flex items-center justify-between"
                  style={{
                    background: "rgba(44, 44, 42, 0.04)",
                    borderLeft: "3px solid #2C2C2A",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#2C2C2A",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    H2 Title
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#7A3048",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Ver todos →
                  </span>
                </div>

                {/* Grid */}
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
                      className="rounded"
                      style={{
                        background: "#F9F0F3",
                        height: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #E8C4D0",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#7A3048",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Card {i}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Section Header",
                  detail: 'H2 "Productos destacados"\n"Ver todos →" link\nFlex space-between',
                  token: "Heading-2 + Link",
                  color: "#2C2C2A",
                },
                {
                  label: "Product Grid",
                  detail: "4 columns (responsive)\n20px gap\nMolecule/ProductCard",
                  token: "Grid Container",
                  color: "#7A3048",
                },
                {
                  label: "Discount Pills",
                  detail: "Absolute position overlay\nTop-right of image\nz-index: 10",
                  token: "Molecule/DiscountPill",
                  color: "#D4AA50",
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
                  4-column grid layout. Full product cards with optimal spacing for desktop browsing experience.
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
                  3-column grid layout. Balanced layout for medium-sized screens maintaining card readability.
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
                  2-column grid layout. Reduced gap (16px) for better mobile utilization while maintaining card prominence.
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
                  Single column layout. Full-width product cards optimized for small mobile screens with maximum visibility.
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
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow token="Header → Display" value="flex" type="dimension" />
          <TokenRow token="Header → Justify" value="space-between" type="dimension" />
          <TokenRow token="Header → Margin Bottom" value="32px" type="dimension" />
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
          <TokenRow token="Link → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Link → Font Size" value="14px" type="typography" />
          <TokenRow token="Link → Font Weight" value="500 (Medium)" type="typography" />
          <TokenRow
            token="Link → Color"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow token="Link → Icon" value="ArrowRight 16px" type="dimension" />
          <TokenRow token="Link → Gap" value="6px (hover: 8px)" type="dimension" />
          <TokenRow token="Grid → Display" value="grid" type="dimension" />
          <TokenRow token="Grid → Columns (Desktop)" value="repeat(4, 1fr)" type="dimension" />
          <TokenRow token="Grid → Columns (Tablet)" value="repeat(3, 1fr)" type="dimension" />
          <TokenRow token="Grid → Columns (Mobile)" value="repeat(2, 1fr)" type="dimension" />
          <TokenRow token="Grid → Columns (Small)" value="1fr" type="dimension" />
          <TokenRow token="Grid → Gap (Desktop/Tablet)" value="20px" type="dimension" />
          <TokenRow token="Grid → Gap (Mobile)" value="16px" type="dimension" />
          <TokenRow
            token="Product Card → Component"
            value="Molecule/ProductCard"
            type="dimension"
          />
          <TokenRow
            token="Discount Pill → Component"
            value="Molecule/DiscountPill"
            type="dimension"
          />
          <TokenRow token="Discount Pill → Position" value="absolute" type="dimension" />
          <TokenRow token="Discount Pill → Top" value="10px" type="dimension" />
          <TokenRow token="Discount Pill → Right" value="50px" type="dimension" />
          <TokenRow token="Discount Pill → Z-index" value="10" type="dimension" />
          <TokenRow token="Desktop Breakpoint" value="1024px" type="dimension" />
          <TokenRow token="Tablet Breakpoint" value="768px" type="dimension" />
          <TokenRow token="Mobile Breakpoint" value="480px" type="dimension" />
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
              title: "Homepage Featured Products",
              description:
                "Primary product showcase section on homepage displaying curated featured or trending products from Tolima vendors.",
              context: "Homepage below hero, featured collections, highlighted products",
            },
            {
              title: "Category Landing Pages",
              description:
                "Display products within specific categories (Streetwear, Accesorios, etc.) with category-specific filtering and sorting.",
              context: "Category pages, collection pages, themed product groups",
            },
            {
              title: "Search Results Display",
              description:
                "Grid layout for search results showing products matching user search queries with relevant discount indicators.",
              context: "Search results, filtered views, query-based product display",
            },
            {
              title: "Vendor Product Showcase",
              description:
                "Display all products from a specific vendor or entrepreneur on their dedicated vendor profile page.",
              context: "Vendor pages, entrepreneur profiles, shop pages",
            },
            {
              title: "Promotional Campaign Sections",
              description:
                "Showcase sale items, new arrivals, or special promotions with discount pills highlighting deals and offers.",
              context: "Sales pages, promotional banners, seasonal campaigns",
            },
            {
              title: "Related Products Recommendations",
              description:
                "Show related or recommended products on product detail pages to encourage discovery and cross-selling.",
              context: "Product detail pages, recommendation sections, upsell areas",
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

  const code = `// Organism/ProductGrid — TolimaMKT Design System
import { MoleculeProductCard } from "./MoleculeProductCard";
import { MoleculeDiscountPill } from "./MoleculeDiscountPill";

const products = [
  {
    id: "1",
    categoria: "Streetwear",
    municipio: "Ibagué",
    productName: "Camiseta Retro Tolima",
    price: "$85.000",
    discount: { text: "−20%", variant: "descuento" }
  },
  // ... more products
];

<OrganismProductGrid
  title="Productos destacados"
  products={products}
  onViewAll={() => navigateToCatalog()}
  onProductClick={(id) => navigateToProduct(id)}
  onAddToCart={(id) => addProductToCart(id)}
  onFavorite={(id) => toggleFavorite(id)}
/>

// Section structure
width:              100%
max-width:          1200px
padding:            48px 24px
background:         #FFFFFF         // Neutral/Blanco

// Header
display:            flex
justify-content:    space-between
margin-bottom:      32px

H2 Title:
  font:             DM Sans 20px Semibold
  color:            #2C2C2A         // Neutral/Carbon

Ver todos link:
  font:             DM Sans 14px Medium
  color:            #7A3048         // Primary/Vinotinto
  icon:             ArrowRight 16px
  gap:              6px (hover: 8px)

// Grid
display:            grid
grid-columns:       repeat(4, 1fr)  // Desktop
gap:                20px

Product Cards:
  component:        Molecule/ProductCard
  width:            220px
  height:           300px

Discount Pills:
  component:        Molecule/DiscountPill
  position:         absolute
  top:              10px
  right:            50px
  z-index:          10

// Responsive breakpoints
Desktop:            > 1024px (4 columns)
Tablet:             769-1024px (3 columns)
Mobile:             481-768px (2 columns, 16px gap)
Small:              ≤ 480px (1 column)`;

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
