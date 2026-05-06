import { useRef, useState } from "react";
import { Search, X, Check, Copy } from "lucide-react";

// ─── Core input component ─────────────────────────────────────────────────────

type InputSearchState = "default" | "focus" | "filled";

interface InputSearchProps {
  forceState?: InputSearchState;
  forceValue?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
}

export function InputSearch({
  forceState,
  forceValue,
  placeholder = "Buscar en TolimaMKT…",
  onChange,
}: InputSearchProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(forceValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const state: InputSearchState =
    forceState ??
    (focused ? "focus" : value.length > 0 ? "filled" : "default");

  const borderColor =
    state === "focus"
      ? "#7A3048"
      : state === "filled"
      ? "#9D3D5E"
      : "#E8C4D0";

  const boxShadow =
    state === "focus"
      ? "0 0 0 3px rgba(122,48,72,0.10)"
      : "none";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onChange?.("");
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: 44,
        background: "#FFFFFF",
        borderRadius: 10,
        border: `1.5px solid ${borderColor}`,
        boxShadow,
        transition: "border-color 160ms ease, box-shadow 160ms ease",
      }}
    >
      {/* Search icon */}
      <span
        style={{
          position: "absolute",
          left: 14,
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
          color: state === "focus" ? "#7A3048" : "#9D3D5E",
          transition: "color 160ms ease",
        }}
      >
        <Search size={16} strokeWidth={2} />
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={forceState ? (forceValue ?? "") : value}
        readOnly={!!forceState}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="tolima-search-input"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          paddingLeft: 44,
          paddingRight: value || forceValue ? 36 : 14,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: "#2C2C2A",
          borderRadius: 10,
        }}
      />

      {/* Clear button */}
      {!forceState && value.length > 0 && (
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleClear();
          }}
          style={{
            position: "absolute",
            right: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#E8C4D0",
            border: "none",
            cursor: "pointer",
            color: "#7A3048",
            padding: 0,
          }}
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

// ─── Placeholder style injection ──────────────────────────────────────────────
// We inject a <style> tag once to color ::placeholder globally for this component.

const PLACEHOLDER_STYLE = `
.tolima-search-input::placeholder {
  color: #6B6A65;
  opacity: 1;
}
`;

function PlaceholderStyle() {
  return <style>{PLACEHOLDER_STYLE}</style>;
}

// ─── State configs ────────────────────────────────────────────────────────────

const stateConfigs = [
  {
    id: "default",
    state: "default" as InputSearchState,
    label: "Default",
    description:
      "Campo en reposo. Borde Rosa-suave, icono en Vinotinto-mid, placeholder en Gris-texto.",
    forceValue: "",
    accent: "#E8C4D0",
    badgeBg: "#F9F0F3",
    badgeColor: "#7A3048",
    tokens: [
      { prop: "Height",       value: "44px",             token: "—" },
      { prop: "Background",   value: "#FFFFFF",           token: "Neutral/Blanco" },
      { prop: "Border",       value: "1.5px #E8C4D0",    token: "Primary/Rosa-suave" },
      { prop: "Border radius",value: "10px",              token: "—" },
      { prop: "Icon color",   value: "#9D3D5E",           token: "Primary/Vinotinto-mid" },
      { prop: "Icon size",    value: "16px",              token: "—" },
      { prop: "Icon padding", value: "14px",              token: "—" },
      { prop: "Placeholder",  value: "#6B6A65",           token: "Neutral/Gris-texto" },
      { prop: "Font",         value: "DM Sans",           token: "—" },
      { prop: "Font size",    value: "14px",              token: "—" },
      { prop: "Font weight",  value: "400 · Regular",     token: "—" },
    ],
  },
  {
    id: "focus",
    state: "focus" as InputSearchState,
    label: "Focus",
    description:
      "Al hacer clic o tabular. El borde cambia a Vinotinto con un halo de 3px para accesibilidad.",
    forceValue: "",
    accent: "#7A3048",
    badgeBg: "#F9F0F3",
    badgeColor: "#7A3048",
    tokens: [
      { prop: "Border",       value: "1.5px #7A3048",            token: "Primary/Vinotinto" },
      { prop: "Box shadow",   value: "0 0 0 3px rgba(122,48,72,0.10)", token: "—" },
      { prop: "Icon color",   value: "#7A3048",                  token: "Primary/Vinotinto" },
      { prop: "Transition",   value: "160ms ease",               token: "—" },
    ],
  },
  {
    id: "filled",
    state: "filled" as InputSearchState,
    label: "Filled",
    description:
      "Con texto ingresado. Aparece un botón de limpieza (×) a la derecha.",
    forceValue: "Planes de turismo",
    accent: "#9D3D5E",
    badgeBg: "#E8C4D0",
    badgeColor: "#7A3048",
    tokens: [
      { prop: "Border",       value: "1.5px #9D3D5E",    token: "Primary/Vinotinto-mid" },
      { prop: "Text color",   value: "#2C2C2A",           token: "Neutral/Carbon" },
      { prop: "Clear icon",   value: "#7A3048 on #E8C4D0", token: "Primary/Rosa-suave" },
    ],
  },
];

// ─── Prop row ─────────────────────────────────────────────────────────────────

function PropRow({ prop, value, token }: { prop: string; value: string; token: string }) {
  const [copied, setCopied] = useState(false);
  const isHex = /^#[0-9A-Fa-f]{3,6}$/.test(value.split(" ")[value.split(" ").length - 1]) || /^#/.test(value);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  // Extract last hex for swatch
  const hexMatch = value.match(/#[0-9A-Fa-f]{3,6}/);

  return (
    <div
      className="flex items-center justify-between py-1.5 border-b last:border-0"
      style={{ borderColor: "#F0EFE9" }}
    >
      <span style={{ fontSize: 11, color: "#9D9C97", fontFamily: "'DM Sans', sans-serif", minWidth: 92 }}>
        {prop}
      </span>
      <div className="flex items-center gap-1.5 flex-wrap justify-end">
        {hexMatch && (
          <span
            className="inline-block w-3 h-3 rounded-sm border flex-shrink-0"
            style={{ background: hexMatch[0], borderColor: "rgba(0,0,0,0.1)" }}
          />
        )}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded transition-all"
          style={{ background: "rgba(0,0,0,0.04)", color: "#6B6A65", fontSize: 11, fontFamily: "monospace" }}
        >
          {copied ? <Check size={9} strokeWidth={2.5} /> : <Copy size={9} strokeWidth={2} />}
          <span style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
        </button>
        {token !== "—" && (
          <span style={{ fontSize: 10, color: "#B0AFA9", fontFamily: "monospace" }}>{token}</span>
        )}
      </div>
    </div>
  );
}

// ─── State card ───────────────────────────────────────────────────────────────

function StateCard({ config }: { config: typeof stateConfigs[0] }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border flex flex-col"
      style={{ borderColor: "#E5E4E0", background: "#FFFFFF", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
    >
      {/* Top stripe */}
      <div className="h-1 w-full" style={{ background: config.accent }} />

      {/* Preview */}
      <div
        className="flex flex-col items-center justify-center gap-4 py-10 px-8"
        style={{ background: "#F4F3F0" }}
      >
        {/* Simulate focus ring glow for focus card */}
        <div
          style={{
            width: "100%",
            maxWidth: 300,
            borderRadius: 10,
            outline: config.state === "focus" ? "3px solid rgba(122,48,72,0.10)" : "none",
          }}
        >
          <InputSearch
            forceState={config.state}
            forceValue={config.forceValue}
          />
        </div>

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

      {/* Description */}
      <div className="px-5 pt-4 pb-2">
        <p style={{ fontSize: 12, color: "#6B6A65", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}>
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

const SUGGESTIONS = [
  "Planes de turismo Tolima",
  "Tour cafetero Honda",
  "Finca agro turismo",
  "Ruta del café",
  "Cascadas del Tolima",
];

function InteractivePlayground() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = value.length > 0
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    : [];

  return (
    <div
      className="rounded-2xl border p-8 flex flex-col items-center gap-6"
      style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: "#9D9C97",
          letterSpacing: "0.14em",
          fontFamily: "'DM Sans', sans-serif",
          textTransform: "uppercase",
        }}
      >
        Interactive playground — escribe para buscar
      </p>

      <div style={{ width: "100%", maxWidth: 380, position: "relative" }}>
        <div onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)}>
          <InputSearch
            placeholder="Buscar en TolimaMKT…"
            onChange={setValue}
          />
        </div>

        {/* Suggestions dropdown */}
        {focused && filtered.length > 0 && (
          <div
            className="absolute w-full mt-1.5 rounded-xl border overflow-hidden z-10"
            style={{
              borderColor: "#E8C4D0",
              background: "#FFFFFF",
              boxShadow: "0 8px 24px rgba(122,48,72,0.10)",
              top: "100%",
            }}
          >
            {filtered.map((s, i) => (
              <button
                key={i}
                onMouseDown={() => setValue(s)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#F9F0F3]"
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F9F0F3" : "none" }}
              >
                <Search size={13} color="#9D3D5E" strokeWidth={2} />
                <span style={{ fontSize: 13, color: "#2C2C2A", fontFamily: "'DM Sans', sans-serif" }}>
                  {s}
                </span>
              </button>
            ))}
          </div>
        )}

        {focused && value.length > 0 && filtered.length === 0 && (
          <div
            className="absolute w-full mt-1.5 rounded-xl border px-4 py-3"
            style={{ borderColor: "#E8C4D0", background: "#FFFFFF", top: "100%" }}
          >
            <span style={{ fontSize: 13, color: "#9D9C97", fontFamily: "'DM Sans', sans-serif" }}>
              Sin resultados para "{value}"
            </span>
          </div>
        )}
      </div>

      {/* Hint chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {["Tour cafetero", "Cascadas", "Finca"].map((hint) => (
          <button
            key={hint}
            onClick={() => setValue(hint)}
            className="px-3 py-1 rounded-full transition-colors"
            style={{
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              background: "#F9F0F3",
              color: "#7A3048",
              border: "1px solid #E8C4D0",
            }}
          >
            {hint}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Anatomy diagram ──────────────────────────────────────────────────────────

function AnatomyDiagram() {
  const annotations = [
    { x: "14px", label: "search icon · 16px · #9D3D5E", top: "50%", left: "6%" },
    { x: "44px", label: "text area · DM Sans 14px Regular", top: "20%", left: "36%" },
    { x: "90%", label: "clear (×) on filled", top: "50%", left: "78%" },
  ];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 border-b flex items-center gap-2"
        style={{ borderColor: "#F0EFE9", background: "#FAFAF8" }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#9D9C97",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Anatomy
        </span>
      </div>

      <div className="px-8 py-8">
        {/* The input with annotation arrows */}
        <div style={{ position: "relative" }}>
          {/* Input mock */}
          <div
            style={{
              height: 44,
              borderRadius: 10,
              border: "1.5px solid #E8C4D0",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              paddingLeft: 14,
              paddingRight: 14,
              gap: 10,
              position: "relative",
            }}
          >
            <Search size={16} color="#9D3D5E" strokeWidth={2} style={{ flexShrink: 0 }} />
            <span
              style={{
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                color: "#6B6A65",
                flex: 1,
              }}
            >
              Buscar en TolimaMKT…
            </span>

            {/* Right clear button mock */}
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#E8C4D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.45,
              }}
            >
              <X size={10} color="#7A3048" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Annotation grid below */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Search Icon",
              detail: "16px · Lucide Search\ncolor: #9D3D5E\npadding-left: 14px",
              token: "Primary/Vinotinto-mid",
              color: "#9D3D5E",
            },
            {
              label: "Placeholder / Text",
              detail: "DM Sans 14px · Regular 400\ncolor: #6B6A65\npadding-left: 44px",
              token: "Neutral/Gris-texto",
              color: "#6B6A65",
            },
            {
              label: "Clear Button",
              detail: "18px circle · bg: #E8C4D0\nicon: × 10px · #7A3048\nvisible on filled state",
              token: "Primary/Rosa-suave",
              color: "#E8C4D0",
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
                  style={{ background: item.color, border: "1px solid rgba(0,0,0,0.1)" }}
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

        {/* Dimension callouts */}
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            ["Height", "44px"],
            ["Border radius", "10px"],
            ["Border width", "1.5px"],
            ["Icon left pad", "14px"],
            ["Text left pad", "44px"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{ background: "#F4F3F0", border: "1px solid #EAE9E5" }}
            >
              <span style={{ fontSize: 10, color: "#9D9C97", fontFamily: "'DM Sans', sans-serif" }}>{k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#7A3048", fontFamily: "monospace" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Code snippet ─────────────────────────────────────────────────────────────

const SNIPPET = `// Input/Search — TolimaMKT Design System
<InputSearch
  placeholder="Buscar en TolimaMKT…"
  onChange={(value) => console.log(value)}
/>

// Styles — Default
height:         44px
background:     #FFFFFF        // Neutral/Blanco
border:         1.5px solid #E8C4D0  // Primary/Rosa-suave
border-radius:  10px

// Icon
size:           16px
color:          #9D3D5E        // Primary/Vinotinto-mid
padding-left:   14px

// Placeholder
font-family:    'DM Sans', sans-serif
font-size:      14px
font-weight:    400  // Regular
color:          #6B6A65        // Neutral/Gris-texto

// Focus state
border:         1.5px solid #7A3048  // Primary/Vinotinto
box-shadow:     0 0 0 3px rgba(122,48,72,0.10)
transition:     160ms ease`;

function CodeSnippet() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPET).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E5E4E0" }}>
      {/* Bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ background: "#2C2C2A", borderColor: "#3E3E3B" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F56" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#27C93F" }} />
          <span style={{ fontSize: 11, color: "#6B6A65", fontFamily: "monospace", marginLeft: 8 }}>
            InputSearch.tsx
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

      {/* Body */}
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

// ─── Full showcase ────────────────────────────────────────────────────────────

export function InputSearchShowcase() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header strip */}
      <div
        className="rounded-xl border px-5 py-4 flex flex-wrap items-center gap-4"
        style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{ background: "#F9F0F3", borderColor: "#E8C4D0", borderWidth: 1.5 }}
          >
            <Search size={14} color="#9D3D5E" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#2C2C2A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 }}>
              Input/Search
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              component · 3 states · DM Sans 14px / 400 · h-44px
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Default", "Focus", "Filled"].map((v) => (
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
        {stateConfigs.map((config) => (
          <StateCard key={config.id} config={config} />
        ))}
      </div>

      {/* Anatomy */}
      <AnatomyDiagram />

      {/* Interactive playground */}
      <InteractivePlayground />

      {/* Code snippet */}
      <CodeSnippet />
    </div>
  );
}