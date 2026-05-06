import { useState } from "react";
import { Check, Copy } from "lucide-react";

// ─── Star SVG Component (customizable size) ───────────────────────────────────

interface StarIconProps {
  variant?: "filled" | "empty";
  size?: number;
  onClick?: () => void;
}

function StarIcon({ variant = "filled", size = 14, onClick }: StarIconProps) {
  const colors = {
    filled: "#D4AA50", // Secondary/Dorado-mid
    empty: "#E8C4D0",  // Primary/Rosa-suave
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default", flexShrink: 0 }}
      className="transition-transform hover:scale-110"
    >
      {variant === "filled" ? (
        <path
          d="M8 1.5L9.708 5.624L14.326 6.266L11.163 9.341L11.944 13.935L8 11.824L4.056 13.935L4.837 9.341L1.674 6.266L6.292 5.624L8 1.5Z"
          fill={colors.filled}
          stroke={colors.filled}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M8 1.5L9.708 5.624L14.326 6.266L11.163 9.341L11.944 13.935L8 11.824L4.056 13.935L4.837 9.341L1.674 6.266L6.292 5.624L8 1.5Z"
          fill="none"
          stroke={colors.empty}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

// ─── Molecule/Rating Component ────────────────────────────────────────────────

interface MoleculeRatingProps {
  rating?: number; // 0-5, supports decimals
  reviewCount?: number;
  starSize?: number;
  showReviewCount?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function MoleculeRating({
  rating = 4.8,
  reviewCount = 124,
  starSize = 14,
  showReviewCount = true,
  interactive = false,
  onRatingChange,
}: MoleculeRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;
  const filledStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 >= 0.3 && displayRating % 1 < 0.8;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {/* Stars row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
        }}
        onMouseLeave={() => interactive && setHoverRating(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= filledStars || (hasHalfStar && star === filledStars + 1);
          return (
            <div
              key={star}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onClick={() => {
                if (interactive) {
                  onRatingChange?.(star);
                }
              }}
            >
              <StarIcon
                variant={isFilled ? "filled" : "empty"}
                size={starSize}
                onClick={interactive ? undefined : undefined}
              />
            </div>
          );
        })}
      </div>

      {/* Score */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: "#2C2C2A",
          lineHeight: 1,
        }}
      >
        {displayRating.toFixed(1)}
      </span>

      {/* Review count */}
      {showReviewCount && (
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: "#6B6A65",
            lineHeight: 1,
          }}
        >
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function MoleculeRatingShowcase() {
  const [userRating, setUserRating] = useState(4.8);

  const sampleRatings = [
    { name: "Café Premium Tolima", rating: 4.9, reviews: 342 },
    { name: "Tour Cascadas del Río", rating: 4.7, reviews: 89 },
    { name: "Sombrero Artesanal", rating: 4.8, reviews: 124 },
    { name: "Finca La Esperanza", rating: 4.6, reviews: 67 },
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
              borderColor: "#F2E4B8",
              borderWidth: 1.5,
            }}
          >
            <StarIcon variant="filled" size={14} />
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
              Molecule/Rating
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              molecule · 5 stars + score + count
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Atom/Star", "Typography/Label"].map((v) => (
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
            Hover and click stars to change rating
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Interactive rating */}
          <div
            className="rounded-lg border p-6"
            style={{
              borderColor: "#F2E4B8",
              background: "#FBF7ED",
              maxWidth: "320px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#B08A2E",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textAlign: "center",
              }}
            >
              Interactive Rating
            </p>
            <div className="flex justify-center">
              <MoleculeRating
                rating={userRating}
                reviewCount={124}
                interactive={true}
                onRatingChange={setUserRating}
              />
            </div>
          </div>

          {/* Sample products with ratings */}
          <div className="w-full max-w-md space-y-3">
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
              Sample Ratings
            </p>
            {sampleRatings.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border p-4 flex items-center justify-between"
                style={{ borderColor: "#F0EFE9", background: "#FFFFFF" }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#2C2C2A",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {item.name}
                </span>
                <MoleculeRating
                  rating={item.rating}
                  reviewCount={item.reviews}
                />
              </div>
            ))}
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
            Molecule Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* Visual breakdown */}
            <div
              className="rounded-lg border p-6 flex justify-center"
              style={{
                borderColor: "#D4AA50",
                background: "#FDFCFA",
                borderStyle: "dashed",
                borderWidth: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {/* Stars section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    padding: "4px 6px",
                    background: "rgba(212, 170, 80, 0.08)",
                    borderRadius: "6px",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} variant={i <= 4 ? "filled" : "empty"} size={14} />
                  ))}
                </div>

                {/* Score section */}
                <div
                  style={{
                    padding: "4px 6px",
                    background: "rgba(44, 44, 42, 0.04)",
                    borderRadius: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#2C2C2A",
                    }}
                  >
                    4.8
                  </span>
                </div>

                {/* Review count section */}
                <div
                  style={{
                    padding: "4px 6px",
                    background: "rgba(107, 106, 101, 0.06)",
                    borderRadius: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#6B6A65",
                    }}
                  >
                    (124)
                  </span>
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Star Icons",
                  detail: "5× Atom/Star\nsize: 14px\ngap: 2px between",
                  token: "Secondary/Dorado-mid",
                  color: "#D4AA50",
                },
                {
                  label: "Score Text",
                  detail: "DM Sans 13px Semibold\ncolor: #2C2C2A\n1 decimal format",
                  token: "Neutral/Carbon",
                  color: "#2C2C2A",
                },
                {
                  label: "Review Count",
                  detail: "DM Sans 12px Regular\ncolor: #6B6A65\n(parentheses)",
                  token: "Neutral/Gris-texto",
                  color: "#6B6A65",
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

      {/* ── Size Variations ── */}
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
            Size Variations
          </p>
        </div>

        <div className="p-6 space-y-6">
          <VariationRow label="Small (12px stars)" description="Compact, for dense layouts">
            <MoleculeRating rating={4.5} reviewCount={89} starSize={12} />
          </VariationRow>

          <VariationRow
            label="Default (14px stars)"
            description="Standard size for most use cases"
          >
            <MoleculeRating rating={4.8} reviewCount={124} starSize={14} />
          </VariationRow>

          <VariationRow label="Large (16px stars)" description="Prominent, for hero sections">
            <MoleculeRating rating={4.9} reviewCount={342} starSize={16} />
          </VariationRow>

          <VariationRow
            label="Without Count"
            description="Score only, no review count"
          >
            <MoleculeRating rating={4.7} reviewCount={89} showReviewCount={false} />
          </VariationRow>
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
          <TokenRow token="Container → Display" value="flex" type="dimension" />
          <TokenRow token="Container → Gap" value="6px" type="dimension" />
          <TokenRow token="Stars → Count" value="5" type="dimension" />
          <TokenRow token="Stars → Size" value="14px" type="dimension" />
          <TokenRow token="Stars → Gap" value="2px" type="dimension" />
          <TokenRow
            token="Star Filled → Color"
            value="#D4AA50"
            type="color"
            colorValue="#D4AA50"
            tokenName="Secondary/Dorado-mid"
          />
          <TokenRow
            token="Star Empty → Color"
            value="#E8C4D0"
            type="color"
            colorValue="#E8C4D0"
            tokenName="Primary/Rosa-suave"
          />
          <TokenRow token="Score → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Score → Font Size" value="13px" type="typography" />
          <TokenRow token="Score → Font Weight" value="600 (Semibold)" type="typography" />
          <TokenRow
            token="Score → Color"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow token="Score → Format" value="0.0 (1 decimal)" type="dimension" />
          <TokenRow token="Review Count → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Review Count → Font Size" value="12px" type="typography" />
          <TokenRow
            token="Review Count → Font Weight"
            value="400 (Regular)"
            type="typography"
          />
          <TokenRow
            token="Review Count → Color"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow
            token="Review Count → Format"
            value="(number)"
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
                "Display product ratings directly on cards in grid layouts for quick quality assessment.",
              context: "E-commerce grids, product listings, marketplace",
            },
            {
              title: "Vendor Profiles",
              description:
                "Show overall vendor rating and review count for trust and credibility.",
              context: "Vendor pages, directory listings, search results",
            },
            {
              title: "Experience Details",
              description:
                "Highlight tour or experience ratings with customer review counts for social proof.",
              context: "Tour pages, activity listings, booking flows",
            },
            {
              title: "Review Sections",
              description:
                "Summarize aggregate ratings at the top of review sections with total count.",
              context: "Review pages, testimonials, feedback sections",
            },
            {
              title: "Interactive Rating Input",
              description:
                "Allow users to submit their own ratings with hover and click interactions.",
              context: "Review forms, feedback modals, user submissions",
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

function VariationRow({
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

  const code = `// Molecule/Rating — TolimaMKT Design System
<MoleculeRating
  rating={4.8}
  reviewCount={124}
  starSize={14}
  showReviewCount={true}
/>

// Interactive mode
<MoleculeRating
  rating={userRating}
  reviewCount={124}
  interactive={true}
  onRatingChange={(newRating) => setUserRating(newRating)}
/>

// Container
display:        flex
align-items:    center
gap:            6px

// Stars (5× Atom/Star)
size:           14px (customizable)
gap:            2px
filled:         #D4AA50    // Secondary/Dorado-mid
empty:          #E8C4D0    // Primary/Rosa-suave

// Score text
font:           DM Sans 13px Semibold
color:          #2C2C2A    // Neutral/Carbon
format:         0.0 (1 decimal)

// Review count
font:           DM Sans 12px Regular
color:          #6B6A65    // Neutral/Gris-texto
format:         (number)

// Size variations
small:          12px stars
default:        14px stars
large:          16px stars`;

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
