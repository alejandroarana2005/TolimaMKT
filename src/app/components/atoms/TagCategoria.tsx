import { useState } from "react";
import { Check, Copy } from "lucide-react";

// ─── Tag/Categoria Component ──────────────────────────────────────────────────

interface TagCategoriaProps {
  label?: string;
  variant?: "default" | "active";
  onClick?: () => void;
}

export function TagCategoria({ 
  label = "Categoría", 
  variant = "default",
  onClick 
}: TagCategoriaProps) {
  const styles = {
    default: {
      background: "#F4F3F0",
      color: "#6B6A65",
    },
    active: {
      background: "#7A3048",
      color: "#FFFFFF",
    },
  };

  return (
    <button
      onClick={onClick}
      className="transition-all hover:scale-105"
      style={{
        ...styles[variant],
        borderRadius: "20px",
        padding: "6px 14px",
        fontSize: "12px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        border: "none",
        cursor: onClick ? "pointer" : "default",
        boxShadow: variant === "active" ? "0 2px 6px rgba(122, 48, 72, 0.15)" : "none",
      }}
    >
      {label}
    </button>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function TagCategoriaShowcase() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Cultura"]);

  const sampleTags = [
    "Cultura",
    "Gastronomía",
    "Naturaleza",
    "Aventura",
    "Historia",
    "Artesanías",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

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
            Click tags to toggle between default and active states
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {sampleTags.map(tag => (
            <TagCategoria
              key={tag}
              label={tag}
              variant={selectedTags.includes(tag) ? "active" : "default"}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </div>

      {/* ── State Variants Grid ── */}
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
          {/* Default state */}
          <StateRow
            label="Default"
            description="Unselected state with neutral colors"
          >
            <TagCategoria label="Categoría" variant="default" />
          </StateRow>

          {/* Active state */}
          <StateRow
            label="Active"
            description="Selected state with primary brand color"
          >
            <TagCategoria label="Categoría" variant="active" />
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
          <TokenRow token="Border Radius" value="20px" type="dimension" />
          <TokenRow token="Padding" value="6px 14px" type="dimension" />
          <TokenRow token="Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Font Size" value="12px" type="typography" />
          <TokenRow token="Font Weight" value="500 (Medium)" type="typography" />
          <TokenRow
            token="Default → Background"
            value="#F4F3F0"
            type="color"
            colorValue="#F4F3F0"
            tokenName="Neutral/Fondo"
          />
          <TokenRow
            token="Default → Text"
            value="#6B6A65"
            type="color"
            colorValue="#6B6A65"
            tokenName="Neutral/Gris-texto"
          />
          <TokenRow
            token="Active → Background"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow
            token="Active → Text"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
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
    <div
      className="grid grid-cols-12 items-center px-5 py-3 hover:bg-[#FDFCFA] transition-colors"
    >
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
          <span
            className="text-xs font-mono"
            style={{ color: "#B0AFA9" }}
          >
            {tokenName}
          </span>
        )}
      </div>
    </div>
  );
}

function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const code = `// Default state
<TagCategoria 
  label="Categoría" 
  variant="default" 
/>

// Active state
<TagCategoria 
  label="Categoría" 
  variant="active" 
/>

// With click handler
<TagCategoria 
  label="Gastronomía"
  variant={isActive ? "active" : "default"}
  onClick={() => handleToggle()}
/>`;

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
