import { useState, useEffect } from "react";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";
import { ButtonSecondary } from "../components/atoms/ButtonSecondary";

const FF = "'DM Sans', sans-serif";

// ─── Types ─────────────────────────────────────────────────────────────────────

type TipoPago = "PSE" | "Nequi" | "Daviplata";

interface MetodoPago {
  id: string;
  tipo: TipoPago;
  banco?: string;
  detalle: string;
  esPrincipal: boolean;
}

interface Transaccion {
  id: string;
  fecha: string;
  descripcion: string;
  metodo: TipoPago;
  monto: number;
}

// ─── Demo data ─────────────────────────────────────────────────────────────────

const METODOS_INIT: MetodoPago[] = [
  {
    id: "m-1",
    tipo: "PSE",
    banco: "Bancolombia",
    detalle: "••••• cuenta de ahorros",
    esPrincipal: true,
  },
  {
    id: "m-2",
    tipo: "Nequi",
    detalle: "320 ••• ••• 47",
    esPrincipal: false,
  },
  {
    id: "m-3",
    tipo: "Daviplata",
    detalle: "310 ••• ••• 82",
    esPrincipal: false,
  },
];

const TRANSACCIONES: Transaccion[] = [
  { id: "t-1", fecha: "2025-05-06", descripcion: "Hoodie Pijao Roots × 1",        metodo: "Nequi",     monto: 89000  },
  { id: "t-2", fecha: "2025-04-28", descripcion: "Mochila Artesanal Ibagué × 2",  metodo: "PSE",       monto: 156000 },
  { id: "t-3", fecha: "2025-04-15", descripcion: "Gorra Tolimense × 1",           metodo: "Daviplata", monto: 42000  },
  { id: "t-4", fecha: "2025-04-03", descripcion: "Camiseta Nevado Print × 3",     metodo: "PSE",       monto: 135000 },
  { id: "t-5", fecha: "2025-03-22", descripcion: "Set Accesorios Honda × 1",      metodo: "Nequi",     monto: 67500  },
];

const BANCOS_PSE = [
  "Bancolombia",
  "Banco de Bogotá",
  "Davivienda",
  "BBVA Colombia",
  "Banco Popular",
  "Banco Agrario",
  "Banco Caja Social",
];

const ES_COMPRADOR_LOCAL = false;
const PEDIDOS_LOCALES = 3;
const PEDIDOS_META = 5;
const PAGE_SIZE = 3;

// ─── Icon ──────────────────────────────────────────────────────────────────────

function IconoPago({ tipo, size = 20 }: { tipo: TipoPago; size?: number }) {
  if (tipo === "PSE") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#003DA5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    );
  }
  const fillColor = tipo === "Nequi" ? "#FF0090" : "#E53E3E";
  const letra    = tipo === "Nequi" ? "N"        : "D";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill={fillColor} />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {letra}
      </text>
    </svg>
  );
}

function bgIcono(tipo: TipoPago) {
  if (tipo === "PSE")      return "#EBF0FF";
  if (tipo === "Nequi")    return "#FFE0F5";
  return "#FFEBEB";
}

// ─── Payment Card ──────────────────────────────────────────────────────────────

function PaymentCard({
  metodo,
  confirming,
  onDeleteClick,
  onConfirmDelete,
  onCancelDelete,
}: {
  metodo: MetodoPago;
  confirming: boolean;
  onDeleteClick: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        padding: "20px",
        border: `1.5px solid ${confirming ? "#FFCDD2" : "#E8C4D0"}`,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        transition: "border-color 150ms",
      }}
    >
      {/* Icon bubble */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          background: bgIcono(metodo.tipo),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <IconoPago tipo={metodo.tipo} size={22} />
      </div>

      {/* Text info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
          <span style={{ fontFamily: FF, fontSize: "14px", fontWeight: 600, color: "#2C2C2A" }}>
            {metodo.banco ?? metodo.tipo}
          </span>
          {metodo.esPrincipal && (
            <span
              style={{
                fontFamily: FF,
                fontSize: "10px",
                fontWeight: 700,
                color: "#B08A2E",
                background: "#FBF7ED",
                border: "1px solid #D4AA50",
                borderRadius: "20px",
                padding: "1px 8px",
                letterSpacing: "0.04em",
                flexShrink: 0,
              }}
            >
              Principal
            </span>
          )}
        </div>
        <span style={{ fontFamily: FF, fontSize: "12px", color: "#9D9C97" }}>
          {metodo.detalle}
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {confirming ? (
          <>
            <span style={{ fontFamily: FF, fontSize: "12px", color: "#6B6A65" }}>
              ¿Eliminar?
            </span>
            <button
              type="button"
              onClick={onConfirmDelete}
              style={{
                fontFamily: FF,
                fontSize: "12px",
                fontWeight: 600,
                color: "#C62828",
                background: "#FFF5F5",
                border: "1px solid #FFCDD2",
                borderRadius: "6px",
                padding: "4px 10px",
                cursor: "pointer",
              }}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={onCancelDelete}
              style={{
                fontFamily: FF,
                fontSize: "12px",
                color: "#9D9C97",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
              }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onDeleteClick}
            style={{
              fontFamily: FF,
              fontSize: "12px",
              fontWeight: 500,
              color: "#9D9C97",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "6px",
              transition: "color 150ms, background 150ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C62828";
              e.currentTarget.style.background = "#FFF5F5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#9D9C97";
              e.currentTarget.style.background = "none";
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Add Payment Modal ─────────────────────────────────────────────────────────

interface ModalForm {
  tipo: TipoPago;
  banco: string;
  cuenta: string;
  telefono: string;
  esPrincipal: boolean;
}

const FORM_VACIO: ModalForm = {
  tipo: "PSE",
  banco: "",
  cuenta: "",
  telefono: "",
  esPrincipal: false,
};

function AddPaymentModal({
  onGuardar,
  onCancelar,
}: {
  onGuardar: (m: Omit<MetodoPago, "id">) => void;
  onCancelar: () => void;
}) {
  const [form, setForm] = useState<ModalForm>(FORM_VACIO);
  const [errors, setErrors] = useState<Partial<Record<keyof ModalForm, string>>>({});

  const TIPOS: TipoPago[] = ["PSE", "Nequi", "Daviplata"];

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ModalForm, string>> = {};
    if (form.tipo === "PSE") {
      if (!form.banco)          errs.banco  = "Selecciona un banco";
      if (!form.cuenta.trim())  errs.cuenta = "Ingresa el número de cuenta";
    } else {
      if (!form.telefono.trim()) errs.telefono = "Ingresa el número de celular";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGuardar = () => {
    if (!validate()) return;
    let detalle: string;
    if (form.tipo === "PSE") {
      detalle = `${form.cuenta.slice(0, 2)}••• cuenta de ahorros`;
    } else {
      const t = form.telefono.replace(/\D/g, "");
      detalle = `${t.slice(0, 3)} ••• ••• ${t.slice(-2)}`;
    }
    onGuardar({
      tipo: form.tipo,
      banco: form.tipo === "PSE" ? form.banco : undefined,
      detalle,
      esPrincipal: form.esPrincipal,
    });
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    height: "44px",
    borderRadius: "10px",
    border: `1.5px solid ${hasError ? "#E53E3E" : "#E5E4E0"}`,
    padding: "0 12px",
    fontFamily: FF,
    fontSize: "14px",
    color: "#2C2C2A",
    background: "#FAFAF8",
    outline: "none",
    boxSizing: "border-box",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(44,44,42,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
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
          maxWidth: "520px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px rgba(44,44,42,0.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid #F0EFE9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ fontFamily: FF, fontSize: "18px", fontWeight: 700, color: "#2C2C2A", margin: 0 }}>
            Agregar método de pago
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

        {/* Body */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Type selector */}
          <div>
            <label
              style={{ fontFamily: FF, fontSize: "13px", fontWeight: 600, color: "#2C2C2A", display: "block", marginBottom: "10px" }}
            >
              Tipo de método
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {TIPOS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setForm({ ...FORM_VACIO, tipo: t });
                    setErrors({});
                  }}
                  style={{
                    padding: "14px 8px",
                    borderRadius: "12px",
                    border: `2px solid ${form.tipo === t ? "#7A3048" : "#E5E4E0"}`,
                    background: form.tipo === t ? "#F9F0F3" : "#FAFAF8",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    transition: "border-color 150ms, background 150ms",
                  }}
                >
                  <IconoPago tipo={t} size={26} />
                  <span
                    style={{
                      fontFamily: FF,
                      fontSize: "12px",
                      fontWeight: 600,
                      color: form.tipo === t ? "#7A3048" : "#6B6A65",
                    }}
                  >
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* PSE fields */}
          {form.tipo === "PSE" && (
            <>
              <div>
                <label style={{ fontFamily: FF, fontSize: "13px", fontWeight: 600, color: "#2C2C2A", display: "block", marginBottom: "6px" }}>
                  Banco <span style={{ color: "#E53E3E" }}>*</span>
                </label>
                <select
                  title="Banco"
                  value={form.banco}
                  onChange={(e) => setForm((p) => ({ ...p, banco: e.target.value }))}
                  style={{
                    width: "100%",
                    height: "44px",
                    borderRadius: "10px",
                    border: `1.5px solid ${errors.banco ? "#E53E3E" : "#E5E4E0"}`,
                    padding: "0 12px",
                    fontFamily: FF,
                    fontSize: "14px",
                    color: form.banco ? "#2C2C2A" : "#9D9C97",
                    background: "#FAFAF8",
                    outline: "none",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Selecciona tu banco</option>
                  {BANCOS_PSE.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.banco && (
                  <p style={{ fontFamily: FF, fontSize: "11px", color: "#E53E3E", margin: "4px 0 0" }}>{errors.banco}</p>
                )}
              </div>

              <div>
                <label style={{ fontFamily: FF, fontSize: "13px", fontWeight: 600, color: "#2C2C2A", display: "block", marginBottom: "6px" }}>
                  Número de cuenta <span style={{ color: "#E53E3E" }}>*</span>
                </label>
                <input
                  type="text"
                  title="Número de cuenta"
                  value={form.cuenta}
                  onChange={(e) => setForm((p) => ({ ...p, cuenta: e.target.value }))}
                  placeholder="ej. 12345678901"
                  style={inputStyle(!!errors.cuenta)}
                />
                {errors.cuenta && (
                  <p style={{ fontFamily: FF, fontSize: "11px", color: "#E53E3E", margin: "4px 0 0" }}>{errors.cuenta}</p>
                )}
              </div>
            </>
          )}

          {/* Nequi / Daviplata */}
          {(form.tipo === "Nequi" || form.tipo === "Daviplata") && (
            <div>
              <label style={{ fontFamily: FF, fontSize: "13px", fontWeight: 600, color: "#2C2C2A", display: "block", marginBottom: "6px" }}>
                Número de celular <span style={{ color: "#E53E3E" }}>*</span>
              </label>
              <input
                type="tel"
                title="Número de celular"
                value={form.telefono}
                onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))}
                placeholder="ej. 3201234567"
                maxLength={10}
                style={inputStyle(!!errors.telefono)}
              />
              {errors.telefono && (
                <p style={{ fontFamily: FF, fontSize: "11px", color: "#E53E3E", margin: "4px 0 0" }}>{errors.telefono}</p>
              )}
            </div>
          )}

          {/* Principal checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              cursor: "pointer",
              padding: "14px",
              borderRadius: "10px",
              background: form.esPrincipal ? "#FBF7ED" : "#F4F3F0",
              border: `1px solid ${form.esPrincipal ? "#D4AA50" : "transparent"}`,
              transition: "background 150ms, border-color 150ms",
            }}
          >
            <input
              type="checkbox"
              checked={form.esPrincipal}
              onChange={(e) => setForm((p) => ({ ...p, esPrincipal: e.target.checked }))}
              style={{ width: "16px", height: "16px", marginTop: "1px", accentColor: "#D4AA50", cursor: "pointer", flexShrink: 0 }}
            />
            <div>
              <p style={{ fontFamily: FF, fontSize: "13px", fontWeight: 600, color: "#2C2C2A", margin: 0 }}>
                Establecer como principal
              </p>
              <p style={{ fontFamily: FF, fontSize: "11px", color: "#9D9C97", margin: "2px 0 0" }}>
                Se usará automáticamente en tus próximas compras
              </p>
            </div>
          </label>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 28px 24px",
            borderTop: "1px solid #F0EFE9",
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          }}
        >
          <ButtonSecondary label="Cancelar" onClick={onCancelar} />
          <ButtonPrimary label="Guardar" onClick={handleGuardar} />
        </div>
      </div>
    </div>
  );
}

// ─── Local Buyer Badge ─────────────────────────────────────────────────────────

function LocalBuyerBadge() {
  const pct = Math.round((PEDIDOS_LOCALES / PEDIDOS_META) * 100);

  return (
    <section style={{ marginTop: "32px" }}>
      <div
        style={{
          background: "#FBF7ED",
          border: "1.5px solid #D4AA50",
          borderRadius: "16px",
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
        }}
      >
        {/* Star */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(212,170,80,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: ES_COMPRADOR_LOCAL ? "pulse-dorado 2s ease-in-out infinite" : "none",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="#D4AA50"
            stroke="#B08A2E"
            strokeWidth="0.8"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: FF,
            fontSize: "18px",
            fontWeight: 700,
            color: "#B08A2E",
            margin: 0,
          }}
        >
          Comprador local del Tolima
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: FF,
            fontSize: "13px",
            color: "#7A6530",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: "460px",
          }}
        >
          Esta insignia se otorga automáticamente cuando todos tus pedidos son de vendedores del Tolima. Apoya lo local, lleva tu insignia con orgullo.
        </p>

        {/* Progress or active badge */}
        {ES_COMPRADOR_LOCAL ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#D4AA50",
              color: "#FFFFFF",
              fontFamily: FF,
              fontSize: "13px",
              fontWeight: 700,
              padding: "8px 22px",
              borderRadius: "24px",
              letterSpacing: "0.02em",
              animation: "pulse-dorado 2s ease-in-out infinite",
            }}
          >
            ⭐ ¡Insignia activa!
          </span>
        ) : (
          <div style={{ width: "100%", maxWidth: "420px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontFamily: FF, fontSize: "12px", color: "#9D7A20" }}>
                {PEDIDOS_LOCALES} de {PEDIDOS_META} pedidos locales completados
              </span>
              <span style={{ fontFamily: FF, fontSize: "12px", fontWeight: 700, color: "#B08A2E" }}>
                {pct}%
              </span>
            </div>

            {/* Bar */}
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#F2E4B8",
                borderRadius: "99px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #D4AA50, #E2C06A)",
                  borderRadius: "99px",
                }}
              />
            </div>

            <p style={{ fontFamily: FF, fontSize: "11px", color: "#9D7A20", margin: "8px 0 0", textAlign: "center" }}>
              Te faltan {PEDIDOS_META - PEDIDOS_LOCALES} pedidos locales para obtener la insignia
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function UserPaymentsPage() {
  useEffect(() => { document.title = "Métodos de pago — TolimaMKT"; }, []);

  const [metodos, setMetodos]         = useState<MetodoPago[]>(METODOS_INIT);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen]     = useState(false);
  const [page, setPage]               = useState(0);

  const totalPages = Math.ceil(TRANSACCIONES.length / PAGE_SIZE);
  const txSlice    = TRANSACCIONES.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const eliminar = (id: string) => {
    setMetodos((prev) => prev.filter((m) => m.id !== id));
    setConfirmDeleteId(null);
  };

  const guardarMetodo = (m: Omit<MetodoPago, "id">) => {
    const nuevo: MetodoPago = { ...m, id: `m-${Date.now()}` };
    setMetodos((prev) =>
      m.esPrincipal
        ? [...prev.map((x) => ({ ...x, esPrincipal: false })), nuevo]
        : [...prev, nuevo]
    );
    setModalOpen(false);
  };

  return (
    <div style={{ maxWidth: "680px" }}>

      {/* ── Title ─────────────────────────────────────────────────────── */}
      <h2 style={{ fontFamily: FF, fontSize: "22px", fontWeight: 700, color: "#2C2C2A", margin: "0 0 4px" }}>
        Métodos de pago
      </h2>
      <p style={{ fontFamily: FF, fontSize: "14px", color: "#9D9C97", margin: "0 0 28px" }}>
        Administra tus formas de pago guardadas
      </p>

      {/* ── Saved methods ─────────────────────────────────────────────── */}
      <section>
        <p style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, color: "#9D9C97", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px" }}>
          Métodos guardados
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {metodos.map((m) => (
            <PaymentCard
              key={m.id}
              metodo={m}
              confirming={confirmDeleteId === m.id}
              onDeleteClick={() => setConfirmDeleteId(m.id)}
              onConfirmDelete={() => eliminar(m.id)}
              onCancelDelete={() => setConfirmDeleteId(null)}
            />
          ))}

          {/* Add card */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            style={{
              width: "100%",
              padding: "20px",
              background: "transparent",
              border: "1.5px dashed #C0BFB9",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#6B6A65",
              fontFamily: FF,
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "border-color 150ms, color 150ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#7A3048";
              e.currentTarget.style.color = "#7A3048";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#C0BFB9";
              e.currentTarget.style.color = "#6B6A65";
            }}
          >
            <span style={{ fontSize: "20px", lineHeight: 1, fontWeight: 300 }}>+</span>
            Agregar método de pago
          </button>
        </div>
      </section>

      {/* ── Transaction history ────────────────────────────────────────── */}
      <section style={{ marginTop: "36px" }}>
        <p style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, color: "#9D9C97", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px" }}>
          Historial de transacciones
        </p>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #F0EFE9",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 120px 100px",
              padding: "12px 20px",
              background: "#FAFAF8",
              borderBottom: "1px solid #F0EFE9",
            }}
          >
            {["Fecha", "Descripción", "Método", "Monto"].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: FF,
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#9D9C97",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {txSlice.map((tx, i) => (
            <div
              key={tx.id}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 120px 100px",
                padding: "15px 20px",
                borderBottom: i < txSlice.length - 1 ? "1px solid #F0EFE9" : "none",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: FF, fontSize: "12px", color: "#9D9C97" }}>
                {new Date(tx.fecha + "T00:00:00").toLocaleDateString("es-CO", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </span>
              <span style={{ fontFamily: FF, fontSize: "13px", color: "#2C2C2A", paddingRight: "12px" }}>
                {tx.descripcion}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <IconoPago tipo={tx.metodo} size={14} />
                <span style={{ fontFamily: FF, fontSize: "12px", color: "#6B6A65" }}>{tx.metodo}</span>
              </span>
              <span style={{ fontFamily: FF, fontSize: "13px", fontWeight: 700, color: "#7A3048" }}>
                ${tx.monto.toLocaleString("es-CO")}
              </span>
            </div>
          ))}

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              borderTop: "1px solid #F0EFE9",
              background: "#FAFAF8",
            }}
          >
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                fontFamily: FF,
                fontSize: "13px",
                fontWeight: 500,
                color: page === 0 ? "#C0BFB9" : "#6B6A65",
                background: "none",
                border: "none",
                cursor: page === 0 ? "default" : "pointer",
                padding: "4px 0",
                transition: "color 150ms",
              }}
            >
              ← Anterior
            </button>
            <span style={{ fontFamily: FF, fontSize: "12px", color: "#9D9C97" }}>
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              style={{
                fontFamily: FF,
                fontSize: "13px",
                fontWeight: 500,
                color: page >= totalPages - 1 ? "#C0BFB9" : "#6B6A65",
                background: "none",
                border: "none",
                cursor: page >= totalPages - 1 ? "default" : "pointer",
                padding: "4px 0",
                transition: "color 150ms",
              }}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </section>

      {/* ── Local buyer badge ──────────────────────────────────────────── */}
      <LocalBuyerBadge />

      {/* ── Modal ─────────────────────────────────────────────────────── */}
      {modalOpen && (
        <AddPaymentModal
          onGuardar={guardarMetodo}
          onCancelar={() => setModalOpen(false)}
        />
      )}

      <style>{`
        @keyframes pulse-dorado {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,170,80,0.45); }
          50%       { box-shadow: 0 0 0 10px rgba(212,170,80,0); }
        }
      `}</style>
    </div>
  );
}
