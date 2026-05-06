import { useState } from "react";
import { ShoppingBag, Check, Copy } from "lucide-react";

// ─── Core button component ────────────────────────────────────────────────────

type ButtonPrimaryState = "default" | "hover" | "disabled";

interface ButtonPrimaryProps {
  label?: string;
  disabled?: boolean;
  forceState?: ButtonPrimaryState; // used for static showcase only
  onClick?: () => void;
  showIcon?: boolean;
}

export function ButtonPrimary({
  label = "Comprar ahora",
  disabled = false,
  forceState,
  onClick,
  showIcon = false,
}: ButtonPrimaryProps) {
  const [isHovered, setIsHovered] = useState(false);

  const state: ButtonPrimaryState = disabled
    ? "disabled"
    : forceState ?? (isHovered ? "hover" : "default");

  const bg = state === "hover" ? "#9D3D5E" : "#7A3048";
  const opacity = state === "disabled" ? 0.4 : 1;

  return (
    <button
      disabled={disabled || forceState === "disabled"}
      onMouseEnter={() => !forceState && setIsHovered(true)}
      onMouseLeave={() => !forceState && setIsHovered(false)}
      onClick={onClick}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        color: "#FFFFFF",
        background: bg,
        borderRadius: 8,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 24,
        paddingRight: 24,
        opacity,
        border: "none",
        cursor: state === "disabled" ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "background 180ms ease, opacity 180ms ease",
        letterSpacing: "0.01em",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}
    >
      {showIcon && <ShoppingBag size={15} strokeWidth={2.2} />}
      {label}
    </button>
  );
}

// ─── State card (single state in the showcase) ────────────────────────────────

const stateConfigs = [
  {
    state: "default" as ButtonPrimaryState,
    label: "Default",
    description: "Estado de reposo. El botón está disponible para interacción.",
    tokens: [
      { prop: "Background",     value: "#7A3048",         token: "Primary/Vinotinto" },
      { prop: "Color",          value: "#FFFFFF",          token: "Neutral/Blanco" },
      { prop: "Font",           value: "DM Sans",          token: "—" },
      { prop: "Font size",      value: "14px",             token: "—" },
      { prop: "Font weight",    value: "600 · Semibold",   token: "—" },
      { prop: "Border radius",  value: "8px",              token: "—" },
      { prop: "Padding",        value: "12px / 24px",      token: "—" },
      { prop: "Opacity",        value: "100%",             token: "—" },
    ],
    accent: "#7A3048",
    badgeBg: "#F9F0F3",
    badgeColor: "#7A3048",
  },
  {
    state: "hover" as ButtonPrimaryState,
    label: "Hover",
    description: "Al pasar el cursor. El fondo cambia a Vinotinto-mid.",
    tokens: [
      { prop: "Background",     value: "#9D3D5E",         token: "Primary/Vinotinto-mid" },
      { prop: "Color",          value: "#FFFFFF",          token: "Neutral/Blanco" },
      { prop: "Transition",     value: "180ms ease",       token: "—" },
      { prop: "Opacity",        value: "100%",             token: "—" },
    ],
    accent: "#9D3D5E",
    badgeBg: "#E8C4D0",
    badgeColor: "#7A3048",
  },
  {
    state: "disabled" as ButtonPrimaryState,
    label: "Disabled",
    description: "Estado inactivo. Mismos estilos con opacidad al 40%.",
    tokens: [
      { prop: "Background",     value: "#7A3048",         token: "Primary/Vinotinto" },
      { prop: "Color",          value: "#FFFFFF",          token: "Neutral/Blanco" },
      { prop: "Opacity",        value: "40%",              token: "—" },
      { prop: "Cursor",         value: "not-allowed",      token: "—" },
    ],
    accent: "#2C2C2A",
    badgeBg: "#ECECEC",
    badgeColor: "#6B6A65",
  },
];

function PropRow({ prop, value, token }: { prop: string; value: string; token: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: "#F0EFE9" }}>
      <span style={{ fontSize: 11, color: "#9D9C97", fontFamily: "'DM Sans', sans-serif", minWidth: 90 }}>
        {prop}
      </span>
      <div className="flex items-center gap-1.5">
        {value.startsWith("#") && (
          <span
            className="inline-block w-3 h-3 rounded-sm border"
            style={{ background: value, borderColor: "rgba(0,0,0,0.1)" }}
          />
        )}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded transition-all"
          style={{ background: "rgba(0,0,0,0.04)", color: "#6B6A65", fontSize: 11, fontFamily: "monospace" }}
        >
          {copied ? <Check size={9} strokeWidth={2.5} /> : <Copy size={9} strokeWidth={2} />}
          {value}
        </button>
        {token !== "—" && (
          <span style={{ fontSize: 10, color: "#B0AFA9", fontFamily: "monospace" }}>{token}</span>
        )}
      </div>
    </div>
  );
}

function StateCard({ config }: { config: typeof stateConfigs[0] }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border flex flex-col"
      style={{ borderColor: "#E5E4E0", background: "#FFFFFF", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
    >
      {/* Top stripe */}
      <div className="h-1 w-full" style={{ background: config.accent }} />

      {/* Preview area */}
      <div
        className="flex flex-col items-center justify-center gap-3 py-10 px-6"
        style={{ background: "#F4F3F0" }}
      >
        {/* Checkerboard hint for disabled */}
        {config.state === "disabled" && (
          <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "'DM Sans', sans-serif", marginBottom: -4 }}>
            cursor: not-allowed
          </p>
        )}
        <ButtonPrimary forceState={config.state} showIcon={config.state === "default"} />

        {/* State badge */}
        <span
          className="px-2.5 py-0.5 rounded-full"
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.08em",
            background: config.badgeBg,
            color: config.badgeColor,
          }}
        >
          {config.label.toUpperCase()}
        </span>
      </div>

      {/* Info */}
      <div className="px-5 pt-4 pb-2">
        <p style={{ fontSize: 12, color: "#6B6A65", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
          {config.description}
        </p>
      </div>

      {/* Token table */}
      <div className="px-5 pb-5 mt-2">
        {config.tokens.map((t) => (
          <PropRow key={t.prop} {...t} />
        ))}
      </div>
    </div>
  );
}

// ─── Interactive playground ───────────────────────────────────────────────────

function InteractivePlayground() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <div
      className="rounded-2xl border p-8 flex flex-col items-center gap-6"
      style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
    >
      <p
        className="uppercase tracking-widest"
        style={{ fontSize: 10, fontWeight: 600, color: "#9D9C97", letterSpacing: "0.14em", fontFamily: "'DM Sans', sans-serif" }}
      >
        Interactive playground — hover &amp; click me
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <ButtonPrimary
          label={clicked ? "¡Añadido al carrito!" : "Comprar ahora"}
          showIcon={true}
          onClick={handleClick}
        />
        <ButtonPrimary label="Comprar ahora" disabled />
      </div>

      {clicked && (
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{ background: "#F2E4B8", border: "1px solid #D4AA50" }}
        >
          <Check size={14} strokeWidth={2.5} color="#B08A2E" />
          <span style={{ fontSize: 13, color: "#7A5A00", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            Producto añadido al carrito
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Full button showcase ─────────────────────────────────────────────────────

export function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-8">
      {/* Token name + spec strip */}
      <div
        className="rounded-xl border px-5 py-4 flex flex-wrap items-center gap-4"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#7A3048" }}
          >
            <ShoppingBag size={14} color="#FFFFFF" strokeWidth={2.2} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#2C2C2A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 }}>
              Button/Primary
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              component · 3 variants · DM Sans 14px / 600
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Default", "Hover", "Disabled"].map(v => (
            <span
              key={v}
              className="px-2.5 py-1 rounded-full"
              style={{ fontSize: 11, fontWeight: 500, background: "#F9F0F3", color: "#7A3048", fontFamily: "'DM Sans', sans-serif" }}
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Three state cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stateConfigs.map(config => (
          <StateCard key={config.state} config={config} />
        ))}
      </div>

      {/* Interactive playground */}
      <InteractivePlayground />

      {/* Code snippet */}
      <CodeSnippet />
    </div>
  );
}

// ─── Code snippet block ───────────────────────────────────────────────────────

const SNIPPET = `// Button/Primary — TolimaMKT Design System
<ButtonPrimary
  label="Comprar ahora"
  disabled={false}
  onClick={() => {}}
/>

// Styles
background:     #7A3048  // Primary/Vinotinto
hover:          #9D3D5E  // Primary/Vinotinto-mid
disabled:       opacity 40%
color:          #FFFFFF
font-family:    'DM Sans', sans-serif
font-size:      14px
font-weight:    600  // Semibold
border-radius:  8px
padding:        12px 24px`;

function CodeSnippet() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPET).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "#E5E4E0" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ background: "#2C2C2A", borderColor: "#3E3E3B" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F56" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#27C93F" }} />
          <span style={{ fontSize: 11, color: "#6B6A65", fontFamily: "monospace", marginLeft: 8 }}>
            ButtonPrimary.tsx
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md transition-all"
          style={{
            background: copied ? "#7A3048" : "rgba(255,255,255,0.07)",
            color: copied ? "#FFFFFF" : "#9D9C97",
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {copied ? <Check size={11} strokeWidth={2.5} /> : <Copy size={11} strokeWidth={2} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body */}
      <div className="px-5 py-5 overflow-x-auto" style={{ background: "#1E1E1C" }}>
        <pre style={{ fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.75, margin: 0 }}>
          {SNIPPET.split("\n").map((line, i) => {
            const isComment = line.trim().startsWith("//");
            const isKey = /^[a-z-]+:/.test(line.trim());
            return (
              <div key={i}>
                {isComment ? (
                  <span style={{ color: "#6B8E6B" }}>{line}</span>
                ) : isKey ? (
                  <span>
                    <span style={{ color: "#D4AA50" }}>{line.split(":")[0]}</span>
                    <span style={{ color: "#9D9C97" }}>:</span>
                    <span style={{ color: "#E8C4D0" }}>{line.slice(line.indexOf(":") + 1)}</span>
                  </span>
                ) : (
                  <span style={{ color: "#F4F3F0" }}>{line}</span>
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
