import { useState } from "react";
import { Check, Copy } from "lucide-react";

// ─── Atom/Star Component ──────────────────────────────────────────────────────

interface AtomStarProps {
  variant?: "filled" | "empty";
  onClick?: () => void;
}

export function AtomStar({ variant = "filled", onClick }: AtomStarProps) {
  const colors = {
    filled: "#D4AA50", // Secondary/Dorado-mid
    empty: "#E8C4D0",  // Primary/Rosa-suave
  };

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
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

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function AtomStarShowcase() {
  const [rating, setRating] = useState(3);
  const [hoverRating, setHoverRating] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-8">
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
            Click stars to rate — hover to preview
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1">
            {stars.map((star) => (
              <div
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <AtomStar
                  variant={
                    star <= (hoverRating || rating) ? "filled" : "empty"
                  }
                  onClick={() => {}}
                />
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: 12,
              color: "#B0AFA9",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {rating} of 5 stars selected
          </p>
        </div>
      </div>

      {/* ── Variant Showcase ── */}
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
            Icon Variants
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Filled state */}
          <StateRow
            label="Filled"
            description="Active/selected state with golden fill"
          >
            <div className="flex gap-2 items-center">
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
            </div>
          </StateRow>

          {/* Empty state */}
          <StateRow
            label="Empty"
            description="Inactive/unselected state with soft outline"
          >
            <div className="flex gap-2 items-center">
              <AtomStar variant="empty" />
              <AtomStar variant="empty" />
              <AtomStar variant="empty" />
              <AtomStar variant="empty" />
              <AtomStar variant="empty" />
            </div>
          </StateRow>

          {/* Mixed state */}
          <StateRow
            label="Mixed (3/5)"
            description="Combined usage for rating displays"
          >
            <div className="flex gap-2 items-center">
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
              <AtomStar variant="empty" />
              <AtomStar variant="empty" />
            </div>
          </StateRow>
        </div>
      </div>

      {/* ── Size & Scale Demonstrations ── */}
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
            Size & Context Examples
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Default size */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#2C2C2A",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 2,
                }}
              >
                Default (16x16px)
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#9D9C97",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Standard size for ratings and UI elements
              </p>
            </div>
            <div className="flex gap-1">
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
              <AtomStar variant="filled" />
              <AtomStar variant="empty" />
            </div>
          </div>

          {/* Inline with text */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#2C2C2A",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 2,
                }}
              >
                Inline with Text
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#9D9C97",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Pairs well with Label and Caption styles
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <AtomStar variant="filled" />
                <AtomStar variant="filled" />
                <AtomStar variant="filled" />
                <AtomStar variant="filled" />
                <AtomStar variant="filled" />
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#6B6A65",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                5.0
              </span>
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
          <TokenRow token="Size" value="16x16px" type="dimension" />
          <TokenRow token="ViewBox" value="0 0 16 16" type="dimension" />
          <TokenRow
            token="Filled → Color"
            value="#D4AA50"
            type="color"
            colorValue="#D4AA50"
            tokenName="Secondary/Dorado-mid"
          />
          <TokenRow
            token="Filled → Stroke Width"
            value="1px"
            type="dimension"
          />
          <TokenRow
            token="Empty → Color"
            value="#E8C4D0"
            type="color"
            colorValue="#E8C4D0"
            tokenName="Primary/Rosa-suave"
          />
          <TokenRow
            token="Empty → Stroke Width"
            value="1.5px"
            type="dimension"
          />
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
    <div className="flex items-center justify-between gap-6">
      <div className="flex-1">
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
      <div>{children}</div>
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
          {copied ? <Check size={10} strokeWidth={2.5} /> : <Copy size={10} strokeWidth={2} />}
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

  const code = `// Filled variant
<AtomStar variant="filled" />

// Empty variant
<AtomStar variant="empty" />

// Rating display (3/5 stars)
<div className="flex gap-1">
  <AtomStar variant="filled" />
  <AtomStar variant="filled" />
  <AtomStar variant="filled" />
  <AtomStar variant="empty" />
  <AtomStar variant="empty" />
</div>

// Interactive rating
{[1, 2, 3, 4, 5].map((star) => (
  <AtomStar
    key={star}
    variant={star <= rating ? "filled" : "empty"}
    onClick={() => setRating(star)}
  />
))}`;

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
        {copied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} strokeWidth={2} />}
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
