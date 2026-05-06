import { useParams, useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";
import { ButtonSecondary } from "../components/atoms/ButtonSecondary";

const STEPS = [
  { label: "Confirmado", active: true },
  { label: "En preparación", active: false },
  { label: "En camino", active: false },
  { label: "Entregado", active: false },
];

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          textAlign: "center",
        }}
      >
        {/* Check icon */}
        <div
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            background: "#FBF7ED",
            border: "2px solid #F2E4B8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 22L18 31L35 13"
              stroke="#D4AA50"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#2C2C2A",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            ¡Pedido confirmado!
          </h1>

          {/* Order ID badge */}
          <span
            style={{
              display: "inline-block",
              background: "#F9F0F3",
              border: "1px solid #E8C4D0",
              color: "#7A3048",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.06em",
              padding: "5px 14px",
              borderRadius: "20px",
            }}
          >
            {orderId}
          </span>
        </div>

        {/* WhatsApp message */}
        <p
          style={{
            fontSize: "15px",
            color: "#6B6A65",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: "380px",
          }}
        >
          Te contactaremos por{" "}
          <span style={{ color: "#25D366", fontWeight: 600 }}>WhatsApp</span>{" "}
          para coordinar la entrega. Revisa tu número y mantén el chat abierto.
        </p>

        {/* Divider */}
        <hr
          style={{
            width: "100%",
            border: "none",
            borderTop: "1px solid #F0EFE9",
            margin: "0",
          }}
        />

        {/* Timeline */}
        <div style={{ width: "100%", padding: "0 8px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#9D9C97",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            Estado del pedido
          </p>

          <div style={{ position: "relative" }}>
            {/* Connector line */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                right: "12px",
                height: "2px",
                background: "#F0EFE9",
                zIndex: 0,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1,
              }}
            >
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: step.active ? "#7A3048" : "#F0EFE9",
                      border: `2px solid ${step.active ? "#7A3048" : "#E5E4E0"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {step.active && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="#FFFFFF"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: step.active ? 600 : 400,
                      color: step.active ? "#2C2C2A" : "#B0AFA9",
                      lineHeight: 1.3,
                      textAlign: "center",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr
          style={{
            width: "100%",
            border: "none",
            borderTop: "1px solid #F0EFE9",
            margin: "0",
          }}
        />

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <style>{`.confirm-cta button { width: 100%; justify-content: center; }`}</style>
          <div className="confirm-cta">
            <ButtonPrimary
              label="Ver más productos"
              showIcon
              onClick={() => navigate("/productos")}
            />
          </div>
          <div className="confirm-cta">
            <ButtonSecondary
              label="Volver al inicio"
              showIcon={false}
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
