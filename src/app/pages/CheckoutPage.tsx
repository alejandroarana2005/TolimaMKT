import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { municipios } from "../../data/municipios";
import { getMunicipio } from "../../data/municipios";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";

/* ── Types ─────────────────────────────────────────────────────────── */

type PaymentMethod = "pse" | "nequi" | "daviplata" | "";

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  municipio: string;
  direccion: string;
  barrio: string;
  indicaciones: string;
  metodoPago: PaymentMethod;
  banco: string;
  celular: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const BANCOS = [
  "Bancolombia",
  "Davivienda",
  "BBVA",
  "Banco de Bogotá",
  "Nequi banco",
];

const PAYMENT_OPTIONS: { id: PaymentMethod & string; label: string; sub: string; color: string }[] = [
  { id: "pse",       label: "PSE",       sub: "Débito bancario en línea", color: "#1C3E7B" },
  { id: "nequi",     label: "Nequi",     sub: "Paga desde tu app",        color: "#6E1FCC" },
  { id: "daviplata", label: "Daviplata", sub: "Billetera digital",         color: "#E40A0A" },
];

/* ── Main component ─────────────────────────────────────────────────── */

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const total = getTotal();
  useEffect(() => { document.title = "Checkout — TolimaMKT"; }, []);

  /* Redirect if cart is empty */
  useEffect(() => {
    if (items.length === 0) navigate("/carrito", { replace: true });
  }, [items.length, navigate]);

  const [form, setForm] = useState<FormData>({
    nombre: "", telefono: "", email: "",
    municipio: "", direccion: "", barrio: "", indicaciones: "",
    metodoPago: "", banco: "", celular: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  /* ── Validation ─────────────────────────────────────────────────── */
  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.nombre.trim())     e.nombre     = "El nombre es requerido";
    if (!form.telefono.trim())   e.telefono   = "El teléfono es requerido";
    if (!form.email.trim())      e.email      = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                 e.email      = "Ingresa un email válido";
    if (!form.municipio)         e.municipio  = "Selecciona un municipio";
    if (!form.direccion.trim())  e.direccion  = "La dirección es requerida";
    if (!form.barrio.trim())     e.barrio     = "El barrio o vereda es requerido";
    if (!form.metodoPago)        e.metodoPago = "Selecciona un método de pago";
    if (form.metodoPago === "pse" && !form.banco)
                                 e.banco      = "Selecciona tu banco";
    if ((form.metodoPago === "nequi" || form.metodoPago === "daviplata") && !form.celular.trim())
                                 e.celular    = "El número de celular es requerido";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    const orderId = `ORD-${Date.now()}`;
    clearCart();
    navigate(`/pedido/${orderId}`);
  };

  if (items.length === 0) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .chk-topbar { position: sticky; top: 0; z-index: 40; background: #FFFFFF; border-bottom: 1px solid #F0EFE9; }
        .chk-topbar-inner { max-width: 1200px; margin: 0 auto; padding: 14px 24px; font-size: 13px; display: flex; align-items: center; gap: 6px; }
        .chk-layout { max-width: 1200px; margin: 0 auto; padding: 36px 24px 72px; display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; }
        .chk-summary { position: sticky; top: 76px; background: #FFFFFF; border: 1px solid #F0EFE9; border-radius: 16px; padding: 24px; }
        .chk-summary-cta button { width: 100%; justify-content: center; }
        .payment-card { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 12px; border: 1.5px solid #E5E4E0; cursor: pointer; transition: border-color 150ms, background 150ms; background: #FFFFFF; }
        .payment-card.active { border-color: #7A3048; background: #FDF8FA; }
        .payment-card:hover:not(.active) { border-color: #C9849A; }
        @media (max-width: 900px) {
          .chk-layout { grid-template-columns: 1fr; gap: 32px; }
          .chk-summary { position: static; }
        }
        @media (max-width: 600px) {
          .chk-layout { padding: 20px 16px 56px; }
        }
      `}</style>

      {/* Top bar */}
      <div className="chk-topbar">
        <div className="chk-topbar-inner">
          <Link to="/" style={{ color: "#7A3048", textDecoration: "none", fontWeight: 500 }}>Inicio</Link>
          <span style={{ color: "#D5D4D0" }}>›</span>
          <Link to="/carrito" style={{ color: "#7A3048", textDecoration: "none", fontWeight: 500 }}>Carrito</Link>
          <span style={{ color: "#D5D4D0" }}>›</span>
          <span style={{ color: "#2C2C2A", fontWeight: 500 }}>Checkout</span>
        </div>
      </div>

      <div className="chk-layout">

        {/* ── LEFT: Form ────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* ── Section 1: Contacto */}
          <FormSection title="Información de contacto" n="01">
            <FormField id="field-nombre" label="Nombre completo" required error={errors.nombre}>
              <FieldInput
                placeholder="Ej. María Catalina Gómez"
                value={form.nombre}
                onChange={(v) => set("nombre", v)}
                hasError={!!errors.nombre}
              />
            </FormField>

            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "12px" }}>
              <FormField id="field-telefono-prefix" label="País">
                <FieldInput value="+57" disabled />
              </FormField>
              <FormField id="field-telefono" label="Teléfono" required error={errors.telefono}>
                <FieldInput
                  placeholder="300 123 4567"
                  value={form.telefono}
                  onChange={(v) => set("telefono", v)}
                  hasError={!!errors.telefono}
                  type="tel"
                />
              </FormField>
            </div>

            <FormField id="field-email" label="Email" required error={errors.email}>
              <FieldInput
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={(v) => set("email", v)}
                hasError={!!errors.email}
                type="email"
              />
            </FormField>
          </FormSection>

          {/* ── Section 2: Dirección */}
          <FormSection title="Dirección de entrega" n="02">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <FormField id="field-dpto" label="Departamento">
                <FieldInput value="Tolima" disabled />
              </FormField>
              <FormField id="field-municipio" label="Municipio" required error={errors.municipio}>
                <FieldSelect
                  value={form.municipio}
                  onChange={(v) => set("municipio", v)}
                  hasError={!!errors.municipio}
                >
                  <option value="">Seleccionar municipio</option>
                  {municipios
                    .slice()
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map((m) => (
                      <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                </FieldSelect>
              </FormField>
            </div>

            <FormField id="field-direccion" label="Dirección" required error={errors.direccion}>
              <FieldInput
                placeholder="Calle 12 # 4-56"
                value={form.direccion}
                onChange={(v) => set("direccion", v)}
                hasError={!!errors.direccion}
              />
            </FormField>

            <FormField id="field-barrio" label="Barrio / Vereda" required error={errors.barrio}>
              <FieldInput
                placeholder="Barrio El Jordán"
                value={form.barrio}
                onChange={(v) => set("barrio", v)}
                hasError={!!errors.barrio}
              />
            </FormField>

            <FormField id="field-indicaciones" label="Indicaciones adicionales">
              <FieldTextarea
                placeholder="Casa azul con portón negro, timbre dañado…"
                value={form.indicaciones}
                onChange={(v) => set("indicaciones", v)}
              />
            </FormField>
          </FormSection>

          {/* ── Section 3: Pago */}
          <FormSection title="Método de pago" n="03">
            <div id="field-metodoPago" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {PAYMENT_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  className={`payment-card${form.metodoPago === opt.id ? " active" : ""}`}
                  onClick={() => { set("metodoPago", opt.id); set("banco", ""); set("celular", ""); }}
                >
                  {/* Radio dot */}
                  <div style={{
                    width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                    border: form.metodoPago === opt.id ? "none" : "1.5px solid #C0BFB9",
                    background: form.metodoPago === opt.id ? "#7A3048" : "#FFFFFF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {form.metodoPago === opt.id && (
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FFFFFF" }} />
                    )}
                  </div>
                  {/* Logo badge */}
                  <div style={{
                    width: "44px", height: "28px", borderRadius: "6px",
                    background: opt.color, display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.03em" }}>
                      {opt.label}
                    </span>
                  </div>
                  {/* Labels */}
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#2C2C2A", margin: 0, lineHeight: 1.3 }}>
                      {opt.label}
                    </p>
                    <p style={{ fontSize: "12px", color: "#9D9C97", margin: 0 }}>{opt.sub}</p>
                  </div>
                </div>
              ))}
              {errors.metodoPago && <ErrorText>{errors.metodoPago}</ErrorText>}
            </div>

            {/* PSE: bank select */}
            {form.metodoPago === "pse" && (
              <FormField id="field-banco" label="Banco" required error={errors.banco}>
                <FieldSelect
                  value={form.banco}
                  onChange={(v) => set("banco", v)}
                  hasError={!!errors.banco}
                >
                  <option value="">Seleccionar banco</option>
                  {BANCOS.map((b) => <option key={b} value={b}>{b}</option>)}
                </FieldSelect>
              </FormField>
            )}

            {/* Nequi / Daviplata: phone */}
            {(form.metodoPago === "nequi" || form.metodoPago === "daviplata") && (
              <FormField id="field-celular" label="Número de celular registrado" required error={errors.celular}>
                <FieldInput
                  placeholder="300 000 0000"
                  value={form.celular}
                  onChange={(v) => set("celular", v)}
                  hasError={!!errors.celular}
                  type="tel"
                />
              </FormField>
            )}
          </FormSection>
        </div>

        {/* ── RIGHT: Order summary ────────────────────────────── */}
        <div className="chk-summary">
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#2C2C2A", margin: "0 0 20px" }}>
            Resumen del pedido
          </h2>

          {/* Item list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {items.map(({ producto, cantidad }) => (
              <div key={producto.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src={producto.imageUrl}
                  alt={producto.nombre}
                  style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, background: "#F4F3F0" }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "#2C2C2A", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {producto.nombre}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9D9C97", margin: 0 }}>
                    {getMunicipio(producto.municipio)?.nombre ?? producto.municipio} · ×{cantidad}
                  </p>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#7A3048", flexShrink: 0 }}>
                  ${(producto.precio * cantidad).toLocaleString("es-CO")}
                </span>
              </div>
            ))}
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #F0EFE9", margin: "0 0 16px" }} />

          {/* Totals */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            <SummaryRow label="Subtotal" value={`$${total.toLocaleString("es-CO")}`} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#6B6A65" }}>Envío</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#B08A2E" }}>
                Gratis en tu primer pedido
              </span>
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #F0EFE9", margin: "2px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#2C2C2A" }}>Total</span>
              <span style={{ fontSize: "22px", fontWeight: 700, color: "#7A3048" }}>
                ${total.toLocaleString("es-CO")}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="chk-summary-cta">
            <ButtonPrimary
              label={submitting ? "Procesando…" : "Confirmar pedido"}
              disabled={submitting}
              onClick={handleSubmit}
            />
          </div>

          <p style={{ fontSize: "11px", color: "#B0AFA9", textAlign: "center", margin: "14px 0 0", lineHeight: 1.5 }}>
            Al confirmar aceptas nuestros términos · Apoyas emprendedores del Tolima
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Shared field style tokens ───────────────────────────────────── */

const FIELD_BASE: React.CSSProperties = {
  width: "100%",
  height: "44px",
  border: "1.5px solid #E8C4D0",
  borderRadius: "8px",
  padding: "0 12px",
  fontSize: "15px",
  fontFamily: "'DM Sans', sans-serif",
  color: "#2C2C2A",
  background: "#FFFFFF",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 150ms, box-shadow 150ms",
};

/* ── Helper components ───────────────────────────────────────────── */

function FormSection({ title, n, children }: { title: string; n: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #F0EFE9", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <div style={{
          width: "24px", height: "24px", borderRadius: "50%",
          background: "#7A3048", color: "#FFFFFF",
          fontSize: "11px", fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {n}
        </div>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#2C2C2A", margin: 0 }}>
          {title}
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {children}
      </div>
    </div>
  );
}

function FormField({
  id, label, required = false, error, children,
}: {
  id?: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div id={id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: "#4A4A48" }}>
        {label}
        {required && <span style={{ color: "#7A3048", marginLeft: "3px" }}>*</span>}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function FieldInput({
  value, onChange, placeholder = "", disabled = false,
  hasError = false, type = "text",
}: {
  value: string; onChange?: (v: string) => void; placeholder?: string;
  disabled?: boolean; hasError?: boolean; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = hasError ? "#E53E3E" : focused ? "#7A3048" : "#E8C4D0";
  const boxShadow = hasError
    ? "0 0 0 3px rgba(229,62,62,0.10)"
    : focused ? "0 0 0 3px rgba(122,48,72,0.10)" : "none";

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...FIELD_BASE,
        borderColor,
        boxShadow,
        background: disabled ? "#F4F3F0" : "#FFFFFF",
        color: disabled ? "#9D9C97" : "#2C2C2A",
        cursor: disabled ? "not-allowed" : "text",
      }}
    />
  );
}

function FieldSelect({
  value, onChange, hasError = false, children,
}: {
  value: string; onChange: (v: string) => void; hasError?: boolean; children: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = hasError ? "#E53E3E" : focused ? "#7A3048" : "#E8C4D0";
  const boxShadow = hasError
    ? "0 0 0 3px rgba(229,62,62,0.10)"
    : focused ? "0 0 0 3px rgba(122,48,72,0.10)" : "none";

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...FIELD_BASE,
        borderColor,
        boxShadow,
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%236B6A65' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
        cursor: "pointer",
      }}
    >
      {children}
    </select>
  );
}

function FieldTextarea({
  value, onChange, placeholder = "",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={3}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...FIELD_BASE,
        height: "auto",
        padding: "12px",
        resize: "vertical",
        lineHeight: 1.6,
        borderColor: focused ? "#7A3048" : "#E8C4D0",
        boxShadow: focused ? "0 0 0 3px rgba(122,48,72,0.10)" : "none",
      }}
    />
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: "12px", color: "#E53E3E", fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </span>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: "14px", color: "#6B6A65" }}>{label}</span>
      <span style={{ fontSize: "14px", fontWeight: 500, color: "#2C2C2A" }}>{value}</span>
    </div>
  );
}
