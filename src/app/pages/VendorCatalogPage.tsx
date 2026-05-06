import { useState } from "react";
import { productos as todosProductos } from "../../data/productos";
import { vendedores } from "../../data/vendedores";
import { municipios, getMunicipio } from "../../data/municipios";
import type { Producto, Categoria } from "../../data/types";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";

const vendedor = vendedores[0];
const CATEGORIAS: Categoria[] = ["Streetwear", "Accesorios", "Calzado", "Vintage", "Artesanal"];

interface ProductoLocal extends Producto {
  activo: boolean;
}

interface FormData {
  nombre: string;
  descripcion: string;
  precio: string;
  precioOriginal: string;
  categoria: Categoria;
  municipio: string;
  stock: string;
  esNuevo: boolean;
  tieneDescuento: boolean;
  descuento: string;
}

const FORM_VACIO: FormData = {
  nombre: "",
  descripcion: "",
  precio: "",
  precioOriginal: "",
  categoria: "Streetwear",
  municipio: vendedor.municipio,
  stock: "",
  esNuevo: false,
  tieneDescuento: false,
  descuento: "",
};

export default function VendorCatalogPage() {
  const [lista, setLista] = useState<ProductoLocal[]>(() =>
    todosProductos
      .filter((p) => p.vendedorId === vendedor.id)
      .map((p) => ({ ...p, activo: true }))
  );
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(FORM_VACIO);
  const [errores, setErrores] = useState<Partial<Record<keyof FormData, string>>>({});

  const abrirNuevo = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
    setErrores({});
    setModalAbierto(true);
  };

  const abrirEditar = (p: ProductoLocal) => {
    setEditandoId(p.id);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: String(p.precio),
      precioOriginal: p.precioOriginal ? String(p.precioOriginal) : "",
      categoria: p.categoria,
      municipio: p.municipio,
      stock: String(p.stock),
      esNuevo: p.esNuevo,
      tieneDescuento: !!p.descuento,
      descuento: p.descuento ? String(p.descuento) : "",
    });
    setErrores({});
    setModalAbierto(true);
  };

  const eliminar = (id: string) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      setLista((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const toggleActivo = (id: string) => {
    setLista((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p))
    );
  };

  const validar = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0)
      e.precio = "Ingresa un precio válido";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      e.stock = "Ingresa un stock válido";
    if (form.tieneDescuento && (!form.descuento || Number(form.descuento) <= 0 || Number(form.descuento) >= 100))
      e.descuento = "Ingresa un descuento entre 1 y 99";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const guardar = () => {
    if (!validar()) return;
    const precio = Number(form.precio);
    const stock = Number(form.stock);
    const descuento = form.tieneDescuento ? Number(form.descuento) : undefined;

    if (editandoId) {
      setLista((prev) =>
        prev.map((p) =>
          p.id === editandoId
            ? {
                ...p,
                nombre: form.nombre.trim(),
                descripcion: form.descripcion.trim(),
                precio,
                precioOriginal: form.precioOriginal ? Number(form.precioOriginal) : undefined,
                categoria: form.categoria,
                municipio: form.municipio,
                stock,
                esNuevo: form.esNuevo,
                descuento,
              }
            : p
        )
      );
    } else {
      const nuevo: ProductoLocal = {
        id: `p-local-${Date.now()}`,
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio,
        precioOriginal: form.precioOriginal ? Number(form.precioOriginal) : undefined,
        categoria: form.categoria,
        vendedorId: vendedor.id,
        municipio: form.municipio,
        imageUrl: `https://picsum.photos/seed/prod-${Date.now()}/400/400`,
        rating: 0,
        totalReseñas: 0,
        stock,
        esNuevo: form.esNuevo,
        descuento,
        tags: [],
        activo: true,
      };
      setLista((prev) => [nuevo, ...prev]);
    }
    setModalAbierto(false);
  };

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errores[key]) setErrores((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#2C2C2A", margin: "0 0 2px" }}>
            Mis productos
          </h2>
          <p style={{ fontSize: "13px", color: "#9D9C97", margin: 0 }}>
            {lista.length} producto{lista.length !== 1 ? "s" : ""} en tu catálogo
          </p>
        </div>
        <ButtonPrimary
          label="+ Nuevo producto"
          showIcon={false}
          onClick={abrirNuevo}
        />
      </div>

      {/* Product list */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(44,44,42,0.06)",
        }}
      >
        {lista.length === 0 ? (
          <div
            style={{
              padding: "64px 24px",
              textAlign: "center",
              color: "#9D9C97",
              fontSize: "15px",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📦</div>
            <p style={{ margin: "0 0 16px" }}>
              Aún no tienes productos. ¡Agrega el primero!
            </p>
            <ButtonPrimary
              label="+ Agregar producto"
              showIcon={false}
              onClick={abrirNuevo}
            />
          </div>
        ) : (
          lista.map((p, i) => (
            <ProductRow
              key={p.id}
              producto={p}
              isLast={i === lista.length - 1}
              onEditar={() => abrirEditar(p)}
              onEliminar={() => eliminar(p.id)}
              onToggleActivo={() => toggleActivo(p.id)}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {modalAbierto && (
        <ProductModal
          form={form}
          errores={errores}
          editando={!!editandoId}
          onSetField={setField}
          onGuardar={guardar}
          onCancelar={() => setModalAbierto(false)}
        />
      )}
    </div>
  );
}

/* ── Product Row ────────────────────────────────────────────────────────────── */
function ProductRow({
  producto,
  isLast,
  onEditar,
  onEliminar,
  onToggleActivo,
}: {
  producto: ProductoLocal;
  isLast: boolean;
  onEditar: () => void;
  onEliminar: () => void;
  onToggleActivo: () => void;
}) {
  const stockColor =
    producto.stock === 0 ? "#E53E3E" : producto.stock <= 5 ? "#D4AA50" : "#38A169";
  const stockBg =
    producto.stock === 0 ? "#FFF5F5" : producto.stock <= 5 ? "#FBF7ED" : "#F0FFF4";
  const municipioNombre =
    getMunicipio(producto.municipio)?.nombre ?? producto.municipio;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px 20px",
        borderBottom: isLast ? "none" : "1px solid #F0EFE9",
        transition: "background 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#FDFCFA";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {/* Image */}
      <img
        src={producto.imageUrl}
        alt={producto.nombre}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "10px",
          objectFit: "cover",
          flexShrink: 0,
          background: "#F4F3F0",
        }}
      />

      {/* Name + category + municipio */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#2C2C2A",
            margin: "0 0 2px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {producto.nombre}
        </p>
        <p style={{ fontSize: "12px", color: "#9D9C97", margin: 0 }}>
          {producto.categoria} · {municipioNombre}
        </p>
      </div>

      {/* Price */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#7A3048", margin: 0 }}>
          ${producto.precio.toLocaleString("es-CO")}
        </p>
        {producto.descuento && (
          <p style={{ fontSize: "11px", color: "#B0AFA9", margin: "2px 0 0" }}>
            -{producto.descuento}%
          </p>
        )}
      </div>

      {/* Stock badge */}
      <div
        style={{
          padding: "4px 10px",
          borderRadius: "20px",
          background: stockBg,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 600, color: stockColor }}>
          {producto.stock === 0 ? "Sin stock" : `${producto.stock} uds`}
        </span>
      </div>

      {/* Status toggle */}
      <button
        type="button"
        onClick={onToggleActivo}
        style={{
          padding: "4px 12px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          background: producto.activo ? "#F0FFF4" : "#F4F3F0",
          color: producto.activo ? "#38A169" : "#9D9C97",
          flexShrink: 0,
          transition: "all 180ms ease",
        }}
      >
        {producto.activo ? "Activo" : "Inactivo"}
      </button>

      {/* Actions */}
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <ActionBtn label="Editar" color="#7A3048" hoverBg="#F9F0F3" onClick={onEditar} />
        <ActionBtn label="Eliminar" color="#E53E3E" hoverBg="#FFF5F5" onClick={onEliminar} />
      </div>
    </div>
  );
}

function ActionBtn({
  label,
  color,
  hoverBg,
  onClick,
}: {
  label: string;
  color: string;
  hoverBg: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        background: "transparent",
        fontSize: "12px",
        fontWeight: 600,
        color,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "background 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {label}
    </button>
  );
}

/* ── Product Modal ──────────────────────────────────────────────────────────── */
function ProductModal({
  form,
  errores,
  editando,
  onSetField,
  onGuardar,
  onCancelar,
}: {
  form: FormData;
  errores: Partial<Record<keyof FormData, string>>;
  editando: boolean;
  onSetField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onGuardar: () => void;
  onCancelar: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(44,44,42,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancelar();
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px rgba(44,44,42,0.25)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid #F0EFE9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#2C2C2A",
              margin: 0,
            }}
          >
            {editando ? "Editar producto" : "Nuevo producto"}
          </h3>
          <button
            type="button"
            onClick={onCancelar}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              background: "#F4F3F0",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6B6A65",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {/* Nombre */}
          <ModalField label="Nombre del producto" required error={errores.nombre}>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => onSetField("nombre", e.target.value)}
              placeholder="ej. Hoodie Pijao Roots"
              style={fieldStyle(!!errores.nombre)}
            />
          </ModalField>

          {/* Descripción */}
          <ModalField label="Descripción">
            <textarea
              value={form.descripcion}
              onChange={(e) => onSetField("descripcion", e.target.value)}
              placeholder="Describe tu producto con detalle..."
              rows={3}
              style={{
                ...fieldStyle(false),
                resize: "vertical",
                height: "auto",
              }}
            />
          </ModalField>

          {/* Precio + Precio original */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <ModalField label="Precio (COP)" required error={errores.precio}>
              <input
                type="number"
                value={form.precio}
                onChange={(e) => onSetField("precio", e.target.value)}
                placeholder="89900"
                min="0"
                style={fieldStyle(!!errores.precio)}
              />
            </ModalField>
            <ModalField label="Precio original (opcional)">
              <input
                type="number"
                value={form.precioOriginal}
                onChange={(e) => onSetField("precioOriginal", e.target.value)}
                placeholder="105900"
                min="0"
                style={fieldStyle(false)}
              />
            </ModalField>
          </div>

          {/* Categoría + Municipio */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <ModalField label="Categoría">
              <select
                value={form.categoria}
                onChange={(e) => onSetField("categoria", e.target.value as Categoria)}
                style={fieldStyle(false)}
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </ModalField>
            <ModalField label="Municipio">
              <select
                value={form.municipio}
                onChange={(e) => onSetField("municipio", e.target.value)}
                style={fieldStyle(false)}
              >
                {municipios.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>
            </ModalField>
          </div>

          {/* Stock */}
          <ModalField label="Cantidad disponible (stock)" required error={errores.stock}>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => onSetField("stock", e.target.value)}
              placeholder="0"
              min="0"
              style={fieldStyle(!!errores.stock)}
            />
          </ModalField>

          {/* Checkboxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <CheckboxField
              label="Marcar como producto nuevo 🆕"
              checked={form.esNuevo}
              onChange={(v) => onSetField("esNuevo", v)}
            />
            <CheckboxField
              label="Tiene descuento 🏷️"
              checked={form.tieneDescuento}
              onChange={(v) => onSetField("tieneDescuento", v)}
            />
            {form.tieneDescuento && (
              <ModalField
                label="Porcentaje de descuento (%)"
                required
                error={errores.descuento}
              >
                <input
                  type="number"
                  value={form.descuento}
                  onChange={(e) => onSetField("descuento", e.target.value)}
                  placeholder="15"
                  min="1"
                  max="99"
                  style={fieldStyle(!!errores.descuento)}
                />
              </ModalField>
            )}
          </div>
        </div>

        {/* Modal footer */}
        <div
          style={{
            padding: "16px 28px 24px",
            borderTop: "1px solid #F0EFE9",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={onCancelar}
            style={{
              padding: "11px 22px",
              borderRadius: "8px",
              border: "1.5px solid #E8C4D0",
              background: "transparent",
              fontSize: "14px",
              fontWeight: 600,
              color: "#7A3048",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <ButtonPrimary label="Guardar producto" showIcon={false} onClick={onGuardar} />
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────────────────── */
function fieldStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: `1.5px solid ${hasError ? "#E53E3E" : "#E8C4D0"}`,
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#2C2C2A",
    background: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
  };
}

function ModalField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#6B6A65",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#E53E3E", marginLeft: "4px" }}>*</span>
        )}
      </label>
      {children}
      {error && (
        <p
          style={{
            fontSize: "12px",
            color: "#E53E3E",
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "5px",
          border: `2px solid ${checked ? "#7A3048" : "#D5D4D0"}`,
          background: checked ? "#7A3048" : "#FFFFFF",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 180ms ease",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        style={{
          fontSize: "14px",
          fontWeight: checked ? 600 : 400,
          color: "#2C2C2A",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </span>
    </button>
  );
}
