import { useState, useEffect } from "react";
import { municipios } from "../../data/municipios";
import { MoleculeMunicipioChip } from "../components/molecules/MoleculeMunicipioChip";
import { useUser } from "../../context/UserContext";

export default function UserProfilePage() {
  useEffect(() => { document.title = "Mi perfil — TolimaMKT"; }, []);

  const { user, updateUser } = useUser();

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.nombre + user.apellidos)}`;

  const [form, setForm] = useState({
    nombre:          user.nombre,
    apellidos:       user.apellidos,
    email:           user.email,
    telefono:        user.telefono,
    fechaNacimiento: user.fechaNacimiento,
    genero:          user.genero,
    municipio:       user.municipio,
    bio:             user.bio,
  });
  const [barrio, setBarrio] = useState("La Pola");
  const [saved, setSaved] = useState(false);

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const bioRemaining = 120 - form.bio.length;

  return (
    <div style={{ maxWidth: "720px" }}>
      {/* Page header */}
      <h2
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "#2C2C2A",
          margin: "0 0 4px",
        }}
      >
        Mi perfil
      </h2>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "#9D9C97",
          margin: "0 0 28px",
        }}
      >
        Administra tu información personal
      </p>

      {/* ── Main card ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(44,44,42,0.07)",
          border: "1px solid #F0EFE9",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        {/* Identity row */}
        <div
          style={{
            padding: "28px 32px",
            borderBottom: "1px solid #F0EFE9",
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          {/* Avatar + edit button */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #E8C4D0",
              }}
            >
              <img
                src={avatarUrl}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <button
              type="button"
              style={{
                height: "32px",
                padding: "0 14px",
                background: "transparent",
                border: "1.5px solid #E5E4E0",
                borderRadius: "8px",
                color: "#6B6A65",
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "border-color 150ms, color 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7A3048";
                e.currentTarget.style.color = "#7A3048";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E4E0";
                e.currentTarget.style.color = "#6B6A65";
              }}
            >
              Editar foto
            </button>
          </div>

          {/* Name + email + chips */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#2C2C2A",
                margin: "0 0 4px",
              }}
            >
              {form.nombre} {form.apellidos}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "#9D9C97",
                margin: "0 0 12px",
              }}
            >
              {form.email}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <MoleculeMunicipioChip label={form.municipio} />
              {user.esCompradorLocal && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "#FBF7ED",
                    border: "1px solid #F2E4B8",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#B08A2E",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  ⭐ Comprador local del Tolima
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave}>
          <div style={{ padding: "28px 32px" }}>
            <div className="profile-form-grid">
              <Field
                label="Nombre"
                value={form.nombre}
                onChange={(v) => set("nombre", v)}
              />
              <Field
                label="Apellidos"
                value={form.apellidos}
                onChange={(v) => set("apellidos", v)}
              />
              <Field
                label="Teléfono"
                value={form.telefono}
                type="tel"
                prefix="+57"
                onChange={(v) => set("telefono", v)}
              />
              <Field
                label="Email"
                value={form.email}
                type="email"
                onChange={(v) => set("email", v)}
              />
              <Field
                label="Fecha de nacimiento"
                value={form.fechaNacimiento}
                type="date"
                onChange={(v) => set("fechaNacimiento", v)}
              />
              <SelectField
                label="Género"
                value={form.genero}
                onChange={(v) => set("genero", v)}
                options={["Prefiero no decir", "Masculino", "Femenino", "Otro"]}
              />
              <SelectField
                label="Municipio"
                value={form.municipio}
                onChange={(v) => set("municipio", v)}
                options={municipios.map((m) => m.nombre)}
              />
              <Field
                label="Barrio / Vereda"
                value={barrio}
                onChange={(v) => setBarrio(v)}
              />
            </div>

            {/* Bio */}
            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "6px",
                }}
              >
                <FieldLabel>Bio corta</FieldLabel>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: bioRemaining < 20 ? "#C62828" : "#9D9C97",
                    transition: "color 150ms",
                  }}
                >
                  {bioRemaining} restantes
                </span>
              </div>
              <textarea
                value={form.bio}
                maxLength={120}
                rows={3}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="Cuéntanos algo sobre ti…"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: "1.5px solid #E5E4E0",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#2C2C2A",
                  background: "#FAFAF8",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.6,
                  transition: "border-color 150ms",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7A3048")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E4E0")}
              />
            </div>
          </div>

          {/* Save footer */}
          <div
            style={{
              padding: "16px 32px",
              borderTop: "1px solid #F0EFE9",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "14px",
            }}
          >
            {saved && (
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "#2E7D32",
                  fontWeight: 500,
                }}
              >
                ✓ Perfil actualizado
              </span>
            )}
            <button
              type="submit"
              style={{
                height: "40px",
                padding: "0 24px",
                background: "#7A3048",
                border: "none",
                borderRadius: "10px",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#9D3D5E")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#7A3048")}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>

      {/* ── Security card ──────────────────────────────────────────────── */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(44,44,42,0.07)",
          border: "1px solid #F0EFE9",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 32px",
            borderBottom: "1px solid #F0EFE9",
            background: "#FAFAF8",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontWeight: 700,
              color: "#9D9C97",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Seguridad
          </p>
        </div>

        <SecurityRow
          label="Contraseña"
          value="••••••••"
          action={<SecondaryButton>Cambiar</SecondaryButton>}
        />
        <SecurityRow
          label="Teléfono verificado"
          value={`+57 ${form.telefono}`}
          action={<StatusBadge color="#2E7D32" bg="#E8F5E9">Verificado</StatusBadge>}
        />
        <SecurityRow
          label="Email verificado"
          value={form.email}
          action={<StatusBadge color="#B08A2E" bg="#FBF7ED">Pendiente</StatusBadge>}
        />
      </div>

      <style>{`
        .profile-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .profile-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Helper components ─────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        color: "#6B6A65",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  type = "text",
  prefix,
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  prefix?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <FieldLabel>{label}</FieldLabel>
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: "12px",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
              color: "#9D9C97",
              pointerEvents: "none",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          title={label}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            height: "42px",
            border: "1.5px solid #E5E4E0",
            borderRadius: "10px",
            paddingLeft: prefix ? "44px" : "14px",
            paddingRight: "14px",
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
            color: "#2C2C2A",
            background: "#FAFAF8",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 150ms",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#7A3048")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E4E0")}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        title={label}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: "42px",
          border: "1.5px solid #E5E4E0",
          borderRadius: "10px",
          padding: "0 14px",
          fontSize: "14px",
          fontFamily: "'DM Sans', sans-serif",
          color: "#2C2C2A",
          background: "#FAFAF8",
          outline: "none",
          boxSizing: "border-box",
          cursor: "pointer",
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239D9C97' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: "36px",
          transition: "border-color 150ms",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#7A3048")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E4E0")}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function SecurityRow({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: "1px solid #F0EFE9",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <p
          style={{
            margin: "0 0 2px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#2C2C2A",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#9D9C97",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {value}
        </p>
      </div>
      {action}
    </div>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{
        height: "34px",
        padding: "0 16px",
        background: "transparent",
        border: "1.5px solid #E5E4E0",
        borderRadius: "8px",
        color: "#6B6A65",
        fontSize: "13px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        flexShrink: 0,
        transition: "border-color 150ms, color 150ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#7A3048";
        e.currentTarget.style.color = "#7A3048";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E5E4E0";
        e.currentTarget.style.color = "#6B6A65";
      }}
    >
      {children}
    </button>
  );
}

function StatusBadge({
  children,
  color,
  bg,
}: {
  children: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        color,
        background: bg,
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}
