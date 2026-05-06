import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { ButtonShowcase } from "../atoms/ButtonPrimary";
import { ButtonSecondaryShowcase } from "../atoms/ButtonSecondary";
import { ButtonPrimary } from "../atoms/ButtonPrimary";
import { ButtonSecondary } from "../atoms/ButtonSecondary";
import { InputSearchShowcase } from "../atoms/InputSearch";
import { TagCategoriaShowcase } from "../atoms/TagCategoria";
import { AtomStarShowcase } from "../atoms/AtomStar";
import { MoleculeSearchBarShowcase } from "../molecules/MoleculeSearchBar";
import { MoleculeMiniVendorShowcase } from "../molecules/MoleculeMiniVendor";
import { MoleculeProductCardShowcase } from "../molecules/MoleculeProductCard";
import { MoleculeRatingShowcase } from "../molecules/MoleculeRating";
import { MoleculeDiscountPillShowcase } from "../molecules/MoleculeDiscountPill";
import { MoleculeMunicipioChipShowcase } from "../molecules/MoleculeMunicipioChip";
import { OrganismHeaderShowcase } from "../organisms/OrganismHeader";

// ─── Color tokens ─────────────────────────────────────────────────────────────

const colorGroups = [
  {
    group: "Primary",
    tokens: [
      { name: "Vinotinto",   token: "Primary/Vinotinto",     hex: "#7A3048", textColor: "#FFFFFF" },
      { name: "Vinotinto Mid", token: "Primary/Vinotinto-mid", hex: "#9D3D5E", textColor: "#FFFFFF" },
      { name: "Rosa Suave",  token: "Primary/Rosa-suave",    hex: "#E8C4D0", textColor: "#2C2C2A" },
      { name: "Rosa Pálido", token: "Primary/Rosa-palido",   hex: "#F9F0F3", textColor: "#2C2C2A" },
    ],
  },
  {
    group: "Secondary",
    tokens: [
      { name: "Dorado",       token: "Secondary/Dorado",       hex: "#B08A2E", textColor: "#FFFFFF" },
      { name: "Dorado Mid",   token: "Secondary/Dorado-mid",   hex: "#D4AA50", textColor: "#2C2C2A" },
      { name: "Crema",        token: "Secondary/Crema",        hex: "#F2E4B8", textColor: "#2C2C2A" },
      { name: "Crema Pálida", token: "Secondary/Crema-palida", hex: "#FBF7ED", textColor: "#2C2C2A" },
    ],
  },
  {
    group: "Neutral",
    tokens: [
      { name: "Carbon",     token: "Neutral/Carbon",     hex: "#2C2C2A", textColor: "#FFFFFF" },
      { name: "Gris Texto", token: "Neutral/Gris-texto", hex: "#6B6A65", textColor: "#FFFFFF" },
      { name: "Fondo",      token: "Neutral/Fondo",      hex: "#F4F3F0", textColor: "#2C2C2A" },
      { name: "Blanco",     token: "Neutral/Blanco",     hex: "#FFFFFF", textColor: "#2C2C2A" },
    ],
  },
];

// ─── Typography tokens ───────────────────────────���────────────────────────────

const typeTokens = [
  { name: "Heading-1", size: 28, weight: 600, weightLabel: "Semibold",  sample: "Heading One" },
  { name: "Heading-2", size: 20, weight: 600, weightLabel: "Semibold",  sample: "Heading Two" },
  { name: "Heading-3", size: 16, weight: 600, weightLabel: "Semibold",  sample: "Heading Three" },
  { name: "Body",      size: 15, weight: 400, weightLabel: "Regular",   sample: "Body text for reading" },
  { name: "Label",     size: 13, weight: 500, weightLabel: "Medium",    sample: "Label / UI Element" },
  { name: "Caption",   size: 11, weight: 400, weightLabel: "Regular",   sample: "Caption text, metadata" },
  { name: "Price",     size: 18, weight: 700, weightLabel: "Bold",      sample: "$1.290.000" },
];

// ─── Copy badge ───────────────────────────────────────────────────────────────

function CopyBadge({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono transition-all"
      style={{
        background: "rgba(0,0,0,0.06)",
        color: "#6B6A65",
      }}
    >
      {copied ? <Check size={10} strokeWidth={2.5} /> : <Copy size={10} strokeWidth={2} />}
      {value}
    </button>
  );
}

// ─── Color Swatch ─────────────────────────────────────────────────────────────

function ColorSwatch({ token }: { token: typeof colorGroups[0]["tokens"][0] }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(token.hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col cursor-pointer group transition-transform hover:-translate-y-0.5"
      style={{ borderColor: token.hex === "#FFFFFF" ? "#E8E7E4" : "transparent", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
      onClick={handleCopy}
    >
      {/* Swatch block */}
      <div
        className="h-20 w-full flex items-end justify-end p-2"
        style={{ background: token.hex }}
      >
        <span
          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 rounded px-1.5 py-0.5 text-xs"
          style={{ background: "rgba(255,255,255,0.25)", color: token.textColor, backdropFilter: "blur(4px)" }}
        >
          {copied ? <Check size={10} strokeWidth={2.5} /> : <Copy size={10} strokeWidth={2} />}
          {copied ? "Copied!" : "Copy"}
        </span>
      </div>
      {/* Info */}
      <div className="px-3 py-2.5 bg-white flex flex-col gap-0.5">
        <span className="text-xs font-semibold" style={{ color: "#2C2C2A", fontFamily: "'DM Sans', sans-serif" }}>
          {token.name}
        </span>
        <span className="text-xs font-mono" style={{ color: "#6B6A65" }}>{token.hex}</span>
        <span className="text-xs font-mono" style={{ color: "#B0AFA9", fontSize: 10 }}>{token.token}</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TokenLibrary() {
  return (
    <div
      className="min-h-screen w-full py-12 px-6"
      style={{ background: "#F4F3F0", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Placeholder color injection */}
      <style>{`.tolima-search-input::placeholder { color: #6B6A65; opacity: 1; } .tolima-searchbar-input::placeholder { color: #6B6A65; opacity: 1; }`}</style>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-2">
          {/* Brand mark */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "#7A3048" }}
          >
            <div
              className="w-4 h-4 rounded-sm"
              style={{ background: "#D4AA50" }}
            />
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "#9D3D5E", letterSpacing: "0.12em" }}>
              TolimaMKT
            </p>
            <h1
              className="leading-tight"
              style={{ fontSize: 26, fontWeight: 700, color: "#2C2C2A" }}
            >
              Design Tokens
            </h1>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "#6B6A65", maxWidth: 480 }}>
          Biblioteca oficial de tokens de diseño para el sistema visual de TolimaMKT. Colores, tipografía y estilos base.
        </p>
        {/* Tag row */}
        <div className="flex flex-wrap gap-2 mt-4">
          {["v1.0.0", "DM Sans", "12 colores", "7 estilos tipográficos", "11 componentes"].map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs"
              style={{ background: "#E8C4D0", color: "#7A3048", fontWeight: 500 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── COLOR STYLES ── */}
      <div className="max-w-5xl mx-auto mb-14">
        <SectionLabel label="Color Styles" />

        {colorGroups.map((group) => (
          <div key={group.group} className="mb-8">
            <p
              className="mb-3 uppercase tracking-widest"
              style={{ fontSize: 11, fontWeight: 600, color: "#6B6A65", letterSpacing: "0.1em" }}
            >
              {group.group}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {group.tokens.map(token => (
                <ColorSwatch key={token.token} token={token} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── TEXT STYLES ── */}
      <div className="max-w-5xl mx-auto mb-14">
        <SectionLabel label="Text Styles" />

        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}>
          {/* Table header */}
          <div
            className="grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-wider border-b"
            style={{ color: "#9D9C97", borderColor: "#F0EFE9", background: "#FAFAF8", fontWeight: 600, letterSpacing: "0.09em" }}
          >
            <span className="col-span-2">Style</span>
            <span className="col-span-5">Sample</span>
            <span className="col-span-1 text-center">Size</span>
            <span className="col-span-2 text-center">Weight</span>
            <span className="col-span-2 text-center">Token</span>
          </div>

          {typeTokens.map((t, i) => (
            <div
              key={t.name}
              className="grid grid-cols-12 items-center px-5 py-4 border-b transition-colors hover:bg-[#FDFCFA]"
              style={{
                borderColor: i === typeTokens.length - 1 ? "transparent" : "#F0EFE9",
              }}
            >
              {/* Name */}
              <div className="col-span-2">
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono"
                  style={{ background: "#F2E4B8", color: "#7A5A00" }}
                >
                  {t.name}
                </span>
              </div>

              {/* Sample */}
              <div className="col-span-5 pr-4 truncate">
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: t.size,
                    fontWeight: t.weight,
                    color: "#2C2C2A",
                    lineHeight: 1.3,
                  }}
                >
                  {t.sample}
                </span>
              </div>

              {/* Size */}
              <div className="col-span-1 text-center">
                <CopyBadge value={`${t.size}px`} />
              </div>

              {/* Weight */}
              <div className="col-span-2 text-center">
                <span
                  className="text-xs"
                  style={{ color: "#6B6A65", fontWeight: t.weight, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t.weightLabel} · {t.weight}
                </span>
              </div>

              {/* Token */}
              <div className="col-span-2 text-center">
                <CopyBadge value={t.name} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ATOM COMPONENTS ── */}
      <div className="max-w-5xl mx-auto mb-14">
        <SectionLabel label="Atom Components" />
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Atom / Star
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <AtomStarShowcase />
        </div>
      </div>

      {/* ── TAG COMPONENTS ── */}
      <div className="max-w-5xl mx-auto mb-14">
        <SectionLabel label="Tag Components" />
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Tag / Categoría
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <TagCategoriaShowcase />
        </div>
      </div>

      {/* ── INPUT COMPONENTS ── */}
      <div className="max-w-5xl mx-auto mb-14">
        <SectionLabel label="Input Components" />
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Input / Search
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <InputSearchShowcase />
        </div>
      </div>

      {/* ── MOLECULE COMPONENTS ── */}
      <div className="max-w-5xl mx-auto mb-14">
        <SectionLabel label="Molecule Components" />
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Molecule / SearchBar
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <MoleculeSearchBarShowcase />
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Molecule / MiniVendor
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <MoleculeMiniVendorShowcase />
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Molecule / ProductCard
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <MoleculeProductCardShowcase />
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Molecule / Rating
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <MoleculeRatingShowcase />
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Molecule / DiscountPill
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <MoleculeDiscountPillShowcase />
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Molecule / MunicipioChip
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <MoleculeMunicipioChipShowcase />
        </div>
      </div>

      {/* ── ORGANISM COMPONENTS ── */}
      <div className="max-w-5xl mx-auto mb-14">
        <SectionLabel label="Organism Components" />
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Organism / Header
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <OrganismHeaderShowcase />
        </div>
      </div>

      {/* ── BUTTON COMPONENTS ── */}
      <div className="max-w-5xl mx-auto mb-14">
        <SectionLabel label="Button Components" />

        {/* Side-by-side pairing preview */}
        <div
          className="rounded-2xl border mb-8 px-8 py-8 flex flex-col items-center gap-5"
          style={{ borderColor: "#E5E4E0", background: "#FFFFFF" }}
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
            Button pairing — Primary &amp; Secondary
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <ButtonPrimary showIcon />
            <ButtonSecondary showIcon />
          </div>
          <p style={{ fontSize: 12, color: "#B0AFA9", fontFamily: "'DM Sans', sans-serif", textAlign: "center", maxWidth: 380 }}>
            Primary para acciones principales (CTA). Secondary para acciones alternativas o de navegación.
          </p>
        </div>

        {/* Button/Primary docs */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Button / Primary
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <ButtonShowcase />
        </div>

        {/* Button/Secondary docs */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Button / Secondary
            </span>
            <div className="h-px flex-1" style={{ background: "#EAE9E5" }} />
          </div>
          <ButtonSecondaryShowcase />
        </div>
      </div>

      {/* ── USAGE PREVIEW ── */}
      <div className="max-w-5xl mx-auto mb-6">
        <SectionLabel label="Preview Card" />
        <UsagePreview />
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t flex items-center justify-between flex-wrap gap-2" style={{ borderColor: "#E5E4E0" }}>
        <span style={{ fontSize: 12, color: "#9D9C97", fontFamily: "'DM Sans', sans-serif" }}>
          TolimaMKT / Tokens — Design System v1.0.0
        </span>
        <span style={{ fontSize: 12, color: "#B0AFA9", fontFamily: "'DM Sans', sans-serif" }}>
          Typeface: DM Sans · Google Fonts
        </span>
      </div>
    </div>
  );
}

// ─── Section label helper ─────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1" style={{ background: "#E5E4E0" }} />
      <span
        className="uppercase tracking-widest px-3 py-1 rounded-full text-xs font-semibold"
        style={{ color: "#7A3048", background: "#F9F0F3", letterSpacing: "0.12em" }}
      >
        {label}
      </span>
      <div className="h-px flex-1" style={{ background: "#E5E4E0" }} />
    </div>
  );
}

// ─── Usage preview card ───────────────────────────────────────────────────────

function UsagePreview() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm border"
      style={{ borderColor: "#E5E4E0", maxWidth: 340 }}
    >
      {/* Card header band */}
      <div className="h-2" style={{ background: "linear-gradient(90deg, #7A3048, #9D3D5E, #D4AA50)" }} />

      <div className="p-5" style={{ background: "#FFFFFF" }}>
        {/* Category */}
        <span
          className="text-xs uppercase tracking-wider"
          style={{ color: "#9D3D5E", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.1em" }}
        >
          Experiencias
        </span>

        {/* Heading */}
        <h2
          className="mt-1 mb-1"
          style={{ fontSize: 20, fontWeight: 600, color: "#2C2C2A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3 }}
        >
          Tour Cafetero del Tolima
        </h2>

        {/* Body */}
        <p
          style={{ fontSize: 15, fontWeight: 400, color: "#6B6A65", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}
          className="mb-4"
        >
          Descubre los paisajes cafeteros del corazón del Tolima en una experiencia única de 3 días.
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: 11, fontWeight: 400, color: "#9D9C97", fontFamily: "'DM Sans', sans-serif" }}>
              Desde
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#B08A2E", fontFamily: "'DM Sans', sans-serif" }}>
              $890.000
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-lg"
            style={{
              background: "#7A3048",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Reservar
          </button>
        </div>

        {/* Label tag */}
        <div className="mt-4 pt-4 border-t flex gap-2 flex-wrap" style={{ borderColor: "#F4F3F0" }}>
          {["3 días", "Guía incluido", "Transporte"].map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs"
              style={{ background: "#F9F0F3", color: "#7A3048", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}