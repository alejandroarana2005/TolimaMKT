import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Check, Copy } from "lucide-react";
import { TagCategoria } from "../atoms/TagCategoria";

// ─── Molecule/ProductCard Component ───────────────────────────────────────────

interface MoleculeProductCardProps {
  id?: string;
  imageUrl?: string;
  categoria?: string;
  municipio?: string;
  productName?: string;
  price?: string;
  onAddToCart?: () => void;
  onFavorite?: () => void;
}

export function MoleculeProductCard({
  id,
  imageUrl,
  categoria = "Artesanías",
  municipio = "Ibagué",
  productName = "Sombrero Vueltiao Artesanal",
  price = "$120.000",
  onAddToCart,
  onFavorite,
}: MoleculeProductCardProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  const handleCardClick = () => {
    if (id) navigate(`/producto/${id}`);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{
        cursor: id ? "pointer" : "default",
        width: "100%",
        height: "300px",
        borderRadius: "14px",
        background: "#FFFFFF",
        boxShadow: isHovered
          ? "0 8px 20px rgba(122, 48, 72, 0.12)"
          : "0 2px 8px rgba(122, 48, 72, 0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 200ms ease, transform 200ms ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Image section - 55% */}
      <div
        style={{
          height: "55%",
          position: "relative",
          background: imageUrl ? `url(${imageUrl}) center/cover` : "#F4F3F0",
          borderRadius: "14px 14px 0 0",
        }}
      >
        {/* Tag/Categoria - top-left overlay */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          <TagCategoria label={categoria} variant="active" />
        </div>

        {/* Heart icon - top-right */}
        <button
          onClick={handleFavorite}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.92)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 180ms ease, background 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Heart
            size={16}
            strokeWidth={2}
            style={{
              color: isFavorite ? "#7A3048" : "#6B6A65",
              fill: isFavorite ? "#7A3048" : "none",
              transition: "color 180ms ease, fill 180ms ease",
            }}
          />
        </button>
      </div>

      {/* Content section - 45% */}
      <div
        style={{
          height: "45%",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {/* Badge/Municipio */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            alignSelf: "flex-start",
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
            {municipio.charAt(0).toUpperCase() + municipio.slice(1).replace(/-/g, " ")}
          </span>
        </div>

        {/* Product name - Heading-3 */}
        <h3
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#2C2C2A",
            lineHeight: 1.3,
            margin: 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            flex: 1,
          }}
        >
          {productName}
        </h3>

        {/* Price */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#7A3048",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {price}
        </p>

        {/* Button/Primary "Agregar" */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart?.(); }}
          style={{
            width: "100%",
            height: "36px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#FFFFFF",
            background: "#7A3048",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background 180ms ease",
            marginTop: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#9D3D5E";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#7A3048";
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function MoleculeProductCardShowcase() {
  const [cartItems, setCartItems] = useState<string[]>([]);

  const products = [
    {
      categoria: "Artesanías",
      municipio: "Ibagué",
      name: "Sombrero Vueltiao Artesanal",
      price: "$120.000",
    },
    {
      categoria: "Gastronomía",
      municipio: "Honda",
      name: "Café Premium Tolima 500g",
      price: "$45.000",
    },
    {
      categoria: "Naturaleza",
      municipio: "Mariquita",
      name: "Tour Cascadas del Río",
      price: "$380.000",
    },
  ];

  const handleAddToCart = (productName: string) => {
    setCartItems((prev) => [...prev, productName]);
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
              className="w-4 h-4 rounded"
              style={{ background: "#7A3048" }}
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
              Molecule/ProductCard
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              molecule · E-commerce card · 220x300px
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Tag/Categoria", "Badge/Municipio", "Button/Primary"].map((v) => (
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
            Click "Agregar" or the heart icon to interact
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {products.map((product) => (
            <MoleculeProductCard
              key={product.name}
              categoria={product.categoria}
              municipio={product.municipio}
              productName={product.name}
              price={product.price}
              onAddToCart={() => handleAddToCart(product.name)}
            />
          ))}
        </div>

        {/* Cart feedback */}
        {cartItems.length > 0 && (
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
              Items Added ({cartItems.length})
            </p>
            <div className="space-y-2">
              {cartItems.slice(-3).map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded"
                  style={{ background: "#FFFFFF" }}
                >
                  <Check size={12} color="#7A3048" strokeWidth={2.5} />
                  <span
                    style={{
                      fontSize: 12,
                      color: "#2C2C2A",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
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
            Card Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6 items-center">
            {/* Visual breakdown */}
            <div
              style={{
                width: "220px",
                height: "300px",
                borderRadius: "14px",
                border: "2px dashed #D4AA50",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image area - 55% */}
              <div
                style={{
                  height: "55%",
                  position: "relative",
                  background: "linear-gradient(135deg, rgba(122,48,72,0.05), rgba(212,170,80,0.05))",
                  borderBottom: "1px dashed #D4AA50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "#9D9C97",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Image (55%)
                </span>

                {/* Tag overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    background: "rgba(122, 48, 72, 0.9)",
                    fontSize: "9px",
                    color: "#FFFFFF",
                  }}
                >
                  Tag
                </div>

                {/* Heart */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Heart size={12} strokeWidth={2} color="#6B6A65" />
                </div>
              </div>

              {/* Content area - 45% */}
              <div
                style={{
                  height: "45%",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  background: "#FFFFFF",
                }}
              >
                {/* Municipio badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: "#FBF7ED",
                    border: "1px solid #F2E4B8",
                    fontSize: "9px",
                    color: "#B08A2E",
                  }}
                >
                  Badge
                </div>

                {/* Product name */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#2C2C2A",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Product Name (2 lines)
                </div>

                {/* Price */}
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#7A3048",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  $120.000
                </div>

                {/* Button */}
                <div
                  style={{
                    width: "100%",
                    height: "36px",
                    background: "#7A3048",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  Agregar
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
              {[
                {
                  label: "Image Section",
                  detail: "55% height\nbg: #F4F3F0\nborder-radius: 14px",
                  token: "Neutral/Fondo",
                  color: "#F4F3F0",
                },
                {
                  label: "Tag/Categoria",
                  detail: "Overlay top-left\nposition: absolute\ntop: 10px, left: 10px",
                  token: "Primary/Vinotinto",
                  color: "#7A3048",
                },
                {
                  label: "Heart Icon",
                  detail: "16px outline\ncolor: #6B6A65\nfill on favorite",
                  token: "Neutral/Gris-texto",
                  color: "#6B6A65",
                },
                {
                  label: "Product Name",
                  detail: "Heading-3 · 16px Semibold\nmax 2 lines\nellipsis overflow",
                  token: "Neutral/Carbon",
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
          <TokenRow token="Card → Width" value="220px" type="dimension" />
          <TokenRow token="Card → Height" value="300px" type="dimension" />
          <TokenRow token="Card → Border Radius" value="14px" type="dimension" />
          <TokenRow
            token="Card → Background"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow
            token="Card → Shadow (default)"
            value="0 2px 8px rgba(122,48,72,0.08)"
            type="dimension"
          />
          <TokenRow
            token="Card → Shadow (hover)"
            value="0 8px 20px rgba(122,48,72,0.12)"
            type="dimension"
          />
          <TokenRow token="Image → Height" value="55%" type="dimension" />
          <TokenRow
            token="Image → Background"
            value="#F4F3F0"
            type="color"
            colorValue="#F4F3F0"
            tokenName="Neutral/Fondo"
          />
          <TokenRow token="Tag → Position" value="top: 10px, left: 10px" type="dimension" />
          <TokenRow token="Heart → Size" value="16px" type="dimension" />
          <TokenRow token="Heart → Container" value="32px circle" type="dimension" />
          <TokenRow
            token="Heart → Color"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow
            token="Heart → Active Fill"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow token="Content → Padding" value="12px" type="dimension" />
          <TokenRow token="Content → Gap" value="6px" type="dimension" />
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
          <TokenRow token="Product Name → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Product Name → Font Size" value="16px" type="typography" />
          <TokenRow
            token="Product Name → Font Weight"
            value="600 (Semibold)"
            type="typography"
          />
          <TokenRow
            token="Product Name → Color"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow token="Product Name → Max Lines" value="2" type="dimension" />
          <TokenRow token="Price → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Price → Font Size" value="18px" type="typography" />
          <TokenRow token="Price → Font Weight" value="700 (Bold)" type="typography" />
          <TokenRow
            token="Price → Color"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow token="Button → Width" value="100%" type="dimension" />
          <TokenRow token="Button → Height" value="36px" type="dimension" />
          <TokenRow token="Button → Font Size" value="13px" type="typography" />
          <TokenRow token="Button → Border Radius" value="8px" type="dimension" />
          <TokenRow
            token="Button → Background"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow
            token="Button → Hover"
            value="#9D3D5E"
            type="color"
            colorValue="#9D3D5E"
            tokenName="Primary/Vinotinto-mid"
          />
        </div>
      </div>

      {/* ── Layout Variations ── */}
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
              title: "E-commerce Grid",
              description:
                "Display products in a responsive grid layout for marketplace or shop pages.",
              context: "Product listings, marketplace, category pages",
            },
            {
              title: "Featured Experiences",
              description:
                "Showcase tours, activities, or experiences with pricing and quick add functionality.",
              context: "Homepage features, recommended experiences",
            },
            {
              title: "Artisan Marketplace",
              description:
                "Present handcrafted goods from local vendors with location badges for authenticity.",
              context: "Artisan stores, craft marketplace, local products",
            },
            {
              title: "Wishlist/Favorites",
              description:
                "Allow users to save favorite products with the heart icon for later browsing.",
              context: "User profiles, saved items, collections",
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

  const code = `// Molecule/ProductCard — TolimaMKT Design System
<MoleculeProductCard
  imageUrl="/path/to/image.jpg"
  categoria="Artesanías"
  municipio="Ibagué"
  productName="Sombrero Vueltiao Artesanal"
  price="$120.000"
  onAddToCart={() => handleAddToCart()}
  onFavorite={() => handleFavorite()}
/>

// Card dimensions
width:          220px
height:         300px
border-radius:  14px
background:     #FFFFFF        // Neutral/Blanco
box-shadow:     0 2px 8px rgba(122,48,72,0.08)

// Image section (55% height)
background:     #F4F3F0        // Neutral/Fondo
border-radius:  14px 14px 0 0

// Overlays
Tag/Categoria:  position absolute, top: 10px, left: 10px
Heart icon:     position absolute, top: 10px, right: 10px
                size: 16px, container: 32px circle

// Content section (45% height)
padding:        12px
gap:            6px

// Elements
Badge/Municipio: #FBF7ED bg, #B08A2E text
Product name:    16px Semibold (Heading-3), 2 lines max
Price:           18px Bold, #7A3048  // Primary/Vinotinto
Button:          100% width, 36px height, 13px font

// Interactive states
Hover:          box-shadow: 0 8px 20px rgba(122,48,72,0.12)
                transform: translateY(-2px)
Button hover:   background: #9D3D5E  // Primary/Vinotinto-mid`;

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
