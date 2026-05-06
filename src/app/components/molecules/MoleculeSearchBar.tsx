import { useState } from "react";
import { Search, Check, Copy } from "lucide-react";
import { ButtonPrimary } from "../atoms/ButtonPrimary";

// ─── Molecule/SearchBar Component ─────────────────────────────────────────────

interface MoleculeSearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  buttonLabel?: string;
}

export function MoleculeSearchBar({
  placeholder = "¿Qué deseas explorar en el Tolima?",
  onSearch,
  buttonLabel = "Buscar",
}: MoleculeSearchBarProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = () => {
    if (value.trim()) {
      onSearch?.(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const borderColor = focused ? "#7A3048" : "#E8C4D0";

  return (
    <div
      style={{
        width: "480px",
        height: "52px",
        display: "flex",
        alignItems: "center",
        background: "#FFFFFF",
        borderRadius: "12px",
        border: `1.5px solid ${borderColor}`,
        boxShadow: "0px 2px 8px rgba(122, 48, 72, 0.10)",
        overflow: "hidden",
        transition: "border-color 160ms ease",
      }}
    >
      {/* Search Icon */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
          color: focused ? "#7A3048" : "#9D3D5E",
          transition: "color 160ms ease",
        }}
      >
        <Search size={18} strokeWidth={2} />
      </span>

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="tolima-searchbar-input"
        style={{
          flex: 1,
          height: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          paddingLeft: "12px",
          paddingRight: "12px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          color: "#2C2C2A",
        }}
      />

      {/* Button/Primary */}
      <div style={{ paddingRight: "6px" }}>
        <button
          onClick={handleSearch}
          disabled={!value.trim()}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#FFFFFF",
            background: value.trim() ? "#7A3048" : "#9D9C97",
            borderRadius: 8,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            border: "none",
            cursor: value.trim() ? "pointer" : "not-allowed",
            transition: "background 180ms ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            if (value.trim()) {
              e.currentTarget.style.background = "#9D3D5E";
            }
          }}
          onMouseLeave={(e) => {
            if (value.trim()) {
              e.currentTarget.style.background = "#7A3048";
            }
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

// ─── Interactive Showcase ─────────────────────────────────────────────────────

export function MoleculeSearchBarShowcase() {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchResults((prev) => [value, ...prev].slice(0, 3));
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
            style={{ background: "#F9F0F3", borderColor: "#E8C4D0", borderWidth: 1.5 }}
          >
            <Search size={14} color="#9D3D5E" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#2C2C2A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 }}>
              Molecule/SearchBar
            </p>
            <p style={{ fontSize: 11, color: "#9D9C97", fontFamily: "monospace" }}>
              molecule · Input + Button · 480x52px
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Input/Search", "Button/Primary"].map((v) => (
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
            Type and press Enter or click "Buscar" to search
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <MoleculeSearchBar onSearch={handleSearch} />

          {/* Search results display */}
          {searchResults.length > 0 && (
            <div
              className="rounded-lg border p-4 w-full max-w-md"
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
                Recent Searches
              </p>
              <div className="space-y-2">
                {searchResults.map((result, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded"
                    style={{ background: "#FFFFFF" }}
                  >
                    <Search size={12} color="#9D3D5E" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 13,
                        color: "#2C2C2A",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {result}
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
            Molecule Anatomy
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center gap-6">
            {/* Visual breakdown */}
            <div
              style={{
                width: "480px",
                height: "52px",
                display: "flex",
                alignItems: "center",
                background: "#FFFFFF",
                borderRadius: "12px",
                border: "2px dashed #D4AA50",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Search Icon Area */}
              <div
                style={{
                  width: "46px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(157, 61, 94, 0.05)",
                  borderRight: "1px dashed #E8C4D0",
                }}
              >
                <Search size={18} color="#9D3D5E" strokeWidth={2} />
              </div>

              {/* Input Area */}
              <div
                style={{
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  background: "rgba(122, 48, 72, 0.02)",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#6B6A65",
                  }}
                >
                  Input/Search atom
                </span>
              </div>

              {/* Button Area */}
              <div
                style={{
                  paddingRight: "6px",
                  paddingLeft: "6px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(212, 170, 80, 0.08)",
                  borderLeft: "1px dashed #E8C4D0",
                }}
              >
                <div
                  style={{
                    background: "#7A3048",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    padding: "10px 20px",
                    borderRadius: "8px",
                  }}
                >
                  Buscar
                </div>
              </div>
            </div>

            {/* Annotation grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {[
                {
                  label: "Search Icon",
                  detail: "18px · Lucide Search\ncolor: #9D3D5E\npadding-left: 16px",
                  token: "Primary/Vinotinto-mid",
                  color: "#9D3D5E",
                },
                {
                  label: "Input Area",
                  detail: "DM Sans 15px · Regular\ncolor: #2C2C2A\nflex: 1",
                  token: "Neutral/Carbon",
                  color: "#2C2C2A",
                },
                {
                  label: "Button/Primary",
                  detail: "DM Sans 14px · Semibold\nbg: #7A3048\npadding: 10px 20px",
                  token: "Primary/Vinotinto",
                  color: "#7A3048",
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
          <TokenRow token="Width" value="480px" type="dimension" />
          <TokenRow token="Height" value="52px" type="dimension" />
          <TokenRow token="Border Radius" value="12px" type="dimension" />
          <TokenRow
            token="Box Shadow"
            value="0px 2px 8px rgba(122,48,72,0.10)"
            type="dimension"
          />
          <TokenRow
            token="Container → Background"
            value="#FFFFFF"
            type="color"
            colorValue="#FFFFFF"
            tokenName="Neutral/Blanco"
          />
          <TokenRow
            token="Container → Border"
            value="1.5px #E8C4D0"
            type="color"
            colorValue="#E8C4D0"
            tokenName="Primary/Rosa-suave"
          />
          <TokenRow
            token="Focus → Border"
            value="#7A3048"
            type="color"
            colorValue="#7A3048"
            tokenName="Primary/Vinotinto"
          />
          <TokenRow
            token="Icon → Color"
            value="#9D3D5E"
            type="color"
            colorValue="#9D3D5E"
            tokenName="Primary/Vinotinto-mid"
          />
          <TokenRow token="Icon → Size" value="18px" type="dimension" />
          <TokenRow token="Icon → Padding Left" value="16px" type="dimension" />
          <TokenRow token="Input → Font Family" value="DM Sans" type="typography" />
          <TokenRow token="Input → Font Size" value="15px" type="typography" />
          <TokenRow token="Input → Font Weight" value="400 (Regular)" type="typography" />
          <TokenRow
            token="Input → Text Color"
            value="#2C2C2A"
            type="color"
            colorValue="#2C2C2A"
            tokenName="Neutral/Carbon"
          />
          <TokenRow token="Button → Padding Right" value="6px" type="dimension" />
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
              title: "Hero Search",
              description: "Ideal for homepage hero sections where search is the primary action.",
              context: "Landing page, above the fold",
            },
            {
              title: "Filter Panels",
              description: "Perfect for filtering experiences, tours, or products with immediate results.",
              context: "Sidebar filters, catalog pages",
            },
            {
              title: "Navigation Headers",
              description: "Can be integrated into navigation bars for site-wide search functionality.",
              context: "Header navigation, mobile menus",
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

  const code = `// Molecule/SearchBar — TolimaMKT Design System
<MoleculeSearchBar
  placeholder="¿Qué deseas explorar en el Tolima?"
  onSearch={(value) => handleSearch(value)}
  buttonLabel="Buscar"
/>

// Container styles
width:          480px
height:         52px
border-radius:  12px
box-shadow:     0px 2px 8px rgba(122,48,72,0.10)
background:     #FFFFFF        // Neutral/Blanco
border:         1.5px #E8C4D0  // Primary/Rosa-suave

// Composed atoms
- Input/Search (flexible width)
- Button/Primary (fixed width, right-aligned)

// Focus state
border:         1.5px #7A3048  // Primary/Vinotinto
transition:     160ms ease`;

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
