import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { productos } from "../../data/productos";
import { getMunicipio } from "../../data/municipios";
import { TagCategoria } from "../components/atoms/TagCategoria";
import { MoleculeMunicipioChip } from "../components/molecules/MoleculeMunicipioChip";
import { MoleculeProductCard } from "../components/molecules/MoleculeProductCard";
import { MoleculeDiscountPill } from "../components/molecules/MoleculeDiscountPill";

/* ── Types ─────────────────────────────────────────────────────────── */

type Orden = "relevancia" | "precio-asc" | "precio-desc" | "nuevo";

const CATEGORIAS = [
  "Streetwear",
  "Accesorios",
  "Calzado",
  "Vintage",
  "Artesanal",
  "Alimentacion",
  "Hogar",
  "Salud y Belleza",
  "Electronica",
  "Papeleria",
] as const;

const ORDENES: { value: Orden; label: string }[] = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Menor precio" },
  { value: "precio-desc", label: "Mayor precio" },
  { value: "nuevo", label: "Más nuevo" },
];

/* ── Municipios that actually have products ─────────────────────────── */
const municipiosConProductos = (() => {
  const ids = [...new Set(productos.map((p) => p.municipio))];
  return ids
    .map((id) => ({ id, nombre: getMunicipio(id)?.nombre ?? id }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
})();

/* ── Main component ─────────────────────────────────────────────────── */

export default function CatalogPage() {
  useEffect(() => { document.title = "Catálogo — TolimaMKT"; }, []);
  const [searchParams] = useSearchParams();

  /* Initialize from URL query params */
  const initialCat = searchParams.get("categoria");
  const initialMun = searchParams.get("municipio");
  const initialOrden = searchParams.get("orden");
  const initialEstado = searchParams.get("estado");

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [categorias, setCategorias] = useState<string[]>(
    initialCat ? [initialCat] : []
  );
  const [municipiosFiltro, setMunicipiosFiltro] = useState<string[]>(
    initialMun
      ? municipiosConProductos.some((m) => m.nombre === initialMun || m.id === initialMun)
        ? [municipiosConProductos.find((m) => m.nombre === initialMun || m.id === initialMun)!.id]
        : []
      : []
  );
  const [precioDesdeInput, setPrecioDesdeInput] = useState("");
  const [precioHastaInput, setPrecioHastaInput] = useState("");
  const [precioRange, setPrecioRange] = useState<{ desde: number; hasta: number } | null>(null);
  const [conDescuento, setConDescuento] = useState(initialEstado === "descuento");
  const [soloNuevos, setSoloNuevos] = useState(initialEstado === "nuevo");
  const [orden, setOrden] = useState<Orden>(
    initialOrden === "precio-asc" || initialOrden === "precio-desc" || initialOrden === "nuevo"
      ? initialOrden
      : "relevancia"
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Active filter count (for mobile badge) */
  const activeCount =
    categorias.length +
    municipiosFiltro.length +
    (precioRange ? 1 : 0) +
    (conDescuento ? 1 : 0) +
    (soloNuevos ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  /* ── Filtered + sorted products ─────────────────────────────────── */
  const productosFiltrados = useMemo(() => {
    let result = [...productos];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q)
      );
    }

    if (categorias.length > 0) {
      result = result.filter((p) => categorias.includes(p.categoria));
    }
    if (municipiosFiltro.length > 0) {
      result = result.filter((p) => municipiosFiltro.includes(p.municipio));
    }
    if (precioRange) {
      result = result.filter(
        (p) => p.precio >= precioRange.desde && p.precio <= precioRange.hasta
      );
    }
    if (conDescuento) {
      result = result.filter((p) => p.descuento !== undefined);
    }
    if (soloNuevos) {
      result = result.filter((p) => p.esNuevo);
    }

    switch (orden) {
      case "precio-asc":
        return result.slice().sort((a, b) => a.precio - b.precio);
      case "precio-desc":
        return result.slice().sort((a, b) => b.precio - a.precio);
      case "nuevo":
        return result.slice().sort((a, b) =>
          (b.esNuevo ? 1 : 0) - (a.esNuevo ? 1 : 0)
        );
      default:
        return result;
    }
  }, [searchQuery, categorias, municipiosFiltro, precioRange, conDescuento, soloNuevos, orden]);

  /* ── Filter actions ─────────────────────────────────────────────── */
  const toggleCategoria = (cat: string) => {
    setCategorias((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleMunicipio = (id: string) => {
    setMunicipiosFiltro((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const aplicarPrecio = () => {
    const desde = precioDesdeInput ? Number(precioDesdeInput.replace(/\D/g, "")) : 0;
    const hasta = precioHastaInput
      ? Number(precioHastaInput.replace(/\D/g, ""))
      : Infinity;
    if (desde > 0 || hasta < Infinity) {
      setPrecioRange({ desde, hasta });
    }
  };

  const limpiarTodo = () => {
    setCategorias([]);
    setMunicipiosFiltro([]);
    setPrecioDesdeInput("");
    setPrecioHastaInput("");
    setPrecioRange(null);
    setConDescuento(false);
    setSoloNuevos(false);
    setSearchQuery("");
  };

  /* ── Sidebar JSX (shared between desktop + mobile sheet) ───────── */
  const sidebarContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0 20px",
          borderBottom: "1px solid #F0EFE9",
          marginBottom: "24px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#2C2C2A" }}>
          Filtros
        </span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={limpiarTodo}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
              padding: 0,
            }}
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Categorías */}
      <FilterSection title="Categorías">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {CATEGORIAS.map((cat) => (
            <div
              key={cat}
              style={{ display: "inline-flex", alignSelf: "flex-start" }}
            >
              <TagCategoria
                label={cat}
                variant={categorias.includes(cat) ? "active" : "default"}
                onClick={() => toggleCategoria(cat)}
              />
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Municipios */}
      <FilterSection title="Municipio">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {municipiosConProductos.map((m) => (
            <div
              key={m.id}
              style={{ display: "inline-flex", alignSelf: "flex-start" }}
            >
              <MoleculeMunicipioChip
                label={m.nombre}
                variant={municipiosFiltro.includes(m.id) ? "active" : "default"}
                onClick={() => toggleMunicipio(m.id)}
              />
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Precio */}
      <FilterSection title="Precio (COP)">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Desde"
              value={precioDesdeInput}
              onChange={(e) => setPrecioDesdeInput(e.target.value)}
              style={{
                flex: 1,
                minWidth: 0,
                height: "36px",
                border: "1px solid #E5E4E0",
                borderRadius: "8px",
                padding: "0 10px",
                fontSize: "13px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#2C2C2A",
                outline: "none",
                background: "#FAFAF8",
                boxSizing: "border-box",
              }}
            />
            <span style={{ fontSize: "12px", color: "#C0BFB9", flexShrink: 0 }}>—</span>
            <input
              type="text"
              placeholder="Hasta"
              value={precioHastaInput}
              onChange={(e) => setPrecioHastaInput(e.target.value)}
              style={{
                flex: 1,
                minWidth: 0,
                height: "36px",
                border: "1px solid #E5E4E0",
                borderRadius: "8px",
                padding: "0 10px",
                fontSize: "13px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#2C2C2A",
                outline: "none",
                background: "#FAFAF8",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="button"
            onClick={aplicarPrecio}
            style={{
              height: "34px",
              background: "#F4F3F0",
              border: "1px solid #E5E4E0",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#2C2C2A",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#E5E4E0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F4F3F0")}
          >
            Aplicar
          </button>
          {precioRange && (
            <p style={{ fontSize: "11px", color: "#B08A2E", margin: 0 }}>
              ${precioRange.desde.toLocaleString("es-CO")} –{" "}
              {precioRange.hasta === Infinity
                ? "sin límite"
                : `$${precioRange.hasta.toLocaleString("es-CO")}`}
            </p>
          )}
        </div>
      </FilterSection>

      {/* Estado */}
      <FilterSection title="Estado" last>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <CheckboxRow
            label="Con descuento"
            checked={conDescuento}
            onChange={() => setConDescuento((v) => !v)}
          />
          <CheckboxRow
            label="Nuevos"
            checked={soloNuevos}
            onChange={() => setSoloNuevos((v) => !v)}
          />
        </div>
      </FilterSection>
    </div>
  );

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        /* Top bar */
        .cat-topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          background: #FFFFFF;
          border-bottom: 1px solid #F0EFE9;
        }
        .cat-topbar-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 14px 24px;
        }

        /* Page layout */
        .cat-layout {
          max-width: 1440px;
          margin: 0 auto;
          padding: 32px 24px 72px;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* Sidebar */
        .cat-sidebar {
          position: sticky;
          top: 70px;
          background: #FFFFFF;
          border: 1px solid #F0EFE9;
          border-radius: 16px;
          padding: 24px;
        }

        /* Product grid */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 24px;
        }

        /* Mobile filter button */
        .cat-mobile-btn { display: none; }

        /* Mobile bottom sheet */
        .cat-sheet-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(44,44,42,0.45);
          backdrop-filter: blur(4px);
          z-index: 100;
          animation: fadeIn 200ms ease;
        }
        .cat-sheet {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-radius: 20px 20px 0 0;
          padding: 24px 24px 48px;
          max-height: 85vh;
          overflow-y: auto;
          z-index: 101;
          animation: slideUp 250ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .cat-sheet-handle {
          width: 40px;
          height: 4px;
          background: #E5E4E0;
          border-radius: 2px;
          margin: 0 auto 20px;
        }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }

        /* Sort select */
        .cat-sort {
          height: 36px;
          border: 1px solid #E5E4E0;
          border-radius: 8px;
          padding: 0 32px 0 12px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #2C2C2A;
          background: #FFFFFF;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%236B6A65' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }

        @media (max-width: 1024px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .cat-layout {
            grid-template-columns: 1fr;
            padding: 16px 16px 56px;
            gap: 0;
          }
          .cat-sidebar { display: none; }
          .cat-mobile-btn { display: flex; }
          .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (max-width: 480px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
      `}</style>

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div className="cat-topbar">
        <div className="cat-topbar-inner">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
            }}
          >
            <Link
              to="/"
              style={{ color: "#7A3048", textDecoration: "none", fontWeight: 500 }}
            >
              Inicio
            </Link>
            <span style={{ color: "#D5D4D0" }}>›</span>
            <span style={{ color: "#2C2C2A", fontWeight: 500 }}>Catálogo</span>
          </nav>
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────────── */}
      <div className="cat-layout">

        {/* Desktop sidebar */}
        <aside className="cat-sidebar">{sidebarContent}</aside>

        {/* Right area */}
        <div>
          {/* Search bar */}
          <div
            style={{
              position: "relative",
              marginBottom: "20px",
            }}
          >
            <Search
              size={16}
              strokeWidth={2}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9D9C97",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos por nombre, categoría..."
              style={{
                width: "100%",
                height: "44px",
                border: "1.5px solid #E5E4E0",
                borderRadius: "12px",
                padding: "0 40px 0 40px",
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#2C2C2A",
                background: "#FFFFFF",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 150ms",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#7A3048")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E4E0")}
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Limpiar búsqueda"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  color: "#9D9C97",
                }}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {/* Left: count + mobile filter button */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Mobile filter trigger */}
              <button
                type="button"
                className="cat-mobile-btn"
                onClick={() => setMobileOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  height: "36px",
                  padding: "0 14px",
                  border: "1px solid #E5E4E0",
                  borderRadius: "8px",
                  background: activeCount > 0 ? "#7A3048" : "#FFFFFF",
                  color: activeCount > 0 ? "#FFFFFF" : "#2C2C2A",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                <SlidersHorizontal size={14} strokeWidth={2} />
                Filtros
                {activeCount > 0 && (
                  <span
                    style={{
                      background: "#FFFFFF",
                      color: "#7A3048",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      fontSize: "11px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {activeCount}
                  </span>
                )}
              </button>

              <p
                style={{
                  fontSize: "14px",
                  color: "#6B6A65",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                <strong style={{ color: "#2C2C2A" }}>
                  {productosFiltrados.length}
                </strong>{" "}
                producto{productosFiltrados.length !== 1 ? "s" : ""} encontrado
                {productosFiltrados.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Sort */}
            <div style={{ position: "relative" }}>
              <select
                className="cat-sort"
                value={orden}
                onChange={(e) => setOrden(e.target.value as Orden)}
              >
                {ORDENES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {activeCount > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "12px",
              }}
            >
              {categorias.map((cat) => (
                <ActiveChip
                  key={cat}
                  label={cat}
                  onRemove={() => toggleCategoria(cat)}
                />
              ))}
              {municipiosFiltro.map((id) => (
                <ActiveChip
                  key={id}
                  label={
                    municipiosConProductos.find((m) => m.id === id)?.nombre ?? id
                  }
                  onRemove={() => toggleMunicipio(id)}
                />
              ))}
              {precioRange && (
                <ActiveChip
                  label={`$${precioRange.desde.toLocaleString("es-CO")} – ${
                    precioRange.hasta === Infinity
                      ? "sin límite"
                      : `$${precioRange.hasta.toLocaleString("es-CO")}`
                  }`}
                  onRemove={() => {
                    setPrecioRange(null);
                    setPrecioDesdeInput("");
                    setPrecioHastaInput("");
                  }}
                />
              )}
              {conDescuento && (
                <ActiveChip
                  label="Con descuento"
                  onRemove={() => setConDescuento(false)}
                />
              )}
              {soloNuevos && (
                <ActiveChip
                  label="Nuevos"
                  onRemove={() => setSoloNuevos(false)}
                />
              )}
            </div>
          )}

          {/* Product grid */}
          {productosFiltrados.length === 0 ? (
            <EmptyState onClear={limpiarTodo} />
          ) : (
            <div className="cat-grid">
              {productosFiltrados.map((p) => (
                <div key={p.id} style={{ position: "relative" }}>
                  <MoleculeProductCard
                    id={p.id}
                    producto={p}
                    imageUrl={p.imageUrl}
                    categoria={p.categoria}
                    municipio={getMunicipio(p.municipio)?.nombre ?? p.municipio}
                    productName={p.nombre}
                    price={`$${p.precio.toLocaleString("es-CO")}`}
                  />
                  {(p.descuento || p.esNuevo) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        pointerEvents: "none",
                      }}
                    >
                      <MoleculeDiscountPill
                        text={p.esNuevo ? "NUEVO" : `−${p.descuento}%`}
                        variant={p.esNuevo ? "nuevo" : "descuento"}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile bottom sheet ─────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div
            className="cat-sheet-backdrop"
            onClick={() => setMobileOpen(false)}
          />
          <div className="cat-sheet">
            <div className="cat-sheet-handle" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#2C2C2A" }}>
                Filtros {activeCount > 0 && `(${activeCount})`}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  color: "#6B6A65",
                }}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            {sidebarContent}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: "24px",
                width: "100%",
                height: "44px",
                background: "#7A3048",
                border: "none",
                borderRadius: "12px",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
              }}
            >
              Ver {productosFiltrados.length} resultado
              {productosFiltrados.length !== 1 ? "s" : ""}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Helper components ────────────────────────────────────────────── */

function FilterSection({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        paddingBottom: last ? 0 : "24px",
        marginBottom: last ? 0 : "24px",
        borderBottom: last ? "none" : "1px solid #F0EFE9",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#9D9C97",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          margin: "0 0 14px",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div
        onClick={onChange}
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "5px",
          border: checked ? "none" : "1.5px solid #C0BFB9",
          background: checked ? "#7A3048" : "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 150ms, border 150ms",
          cursor: "pointer",
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span
        onClick={onChange}
        style={{
          fontSize: "14px",
          color: checked ? "#2C2C2A" : "#6B6A65",
          fontWeight: checked ? 500 : 400,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </span>
    </label>
  );
}

function ActiveChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: "#F9F0F3",
        border: "1px solid #E8C4D0",
        borderRadius: "20px",
        padding: "4px 10px 4px 12px",
        fontSize: "12px",
        fontWeight: 500,
        color: "#7A3048",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0",
          display: "flex",
          alignItems: "center",
          color: "#9D3D5E",
          marginLeft: "2px",
        }}
      >
        <X size={12} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div
      style={{
        marginTop: "48px",
        padding: "64px 24px",
        background: "#FAFAF8",
        borderRadius: "16px",
        border: "1px dashed #E5E4E0",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "40px", lineHeight: 1 }}>🔍</span>
      <p style={{ fontSize: "16px", fontWeight: 600, color: "#2C2C2A", margin: 0 }}>
        Sin resultados
      </p>
      <p style={{ fontSize: "14px", color: "#9D9C97", margin: 0, maxWidth: "300px" }}>
        Ningún producto coincide con los filtros activos. Prueba ampliando la búsqueda.
      </p>
      <button
        type="button"
        onClick={onClear}
        style={{
          marginTop: "8px",
          height: "38px",
          padding: "0 20px",
          background: "#7A3048",
          border: "none",
          borderRadius: "8px",
          color: "#FFFFFF",
          fontSize: "13px",
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
        }}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
