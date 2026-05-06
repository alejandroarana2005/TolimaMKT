import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ButtonPrimary } from "../components/atoms/ButtonPrimary";
import { ButtonSecondary } from "../components/atoms/ButtonSecondary";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Página no encontrada — TolimaMKT";
  }, []);

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
        textAlign: "center",
      }}
    >
      <style>{`
        .nfp-cta button { justify-content: center; }
      `}</style>

      {/* Large 404 */}
      <div
        style={{
          fontSize: "150px",
          fontWeight: 700,
          color: "#E8C4D0",
          lineHeight: 1,
          marginBottom: "8px",
          letterSpacing: "-0.04em",
          fontFamily: "'DM Sans', sans-serif",
          userSelect: "none",
        }}
      >
        404
      </div>

      {/* Titles */}
      <h1
        style={{
          fontSize: "26px",
          fontWeight: 700,
          color: "#2C2C2A",
          margin: "0 0 12px",
          lineHeight: 1.25,
        }}
      >
        Esta página no existe
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "#6B6A65",
          margin: "0 0 40px",
          lineHeight: 1.65,
          maxWidth: "360px",
        }}
      >
        Pero sí existen más de 100 productos del Tolima esperándote
      </p>

      {/* CTAs */}
      <div
        className="nfp-cta"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "260px",
        }}
      >
        <ButtonPrimary
          label="Ir al inicio"
          showIcon={false}
          onClick={() => navigate("/")}
        />
        <ButtonSecondary
          label="Ver productos"
          showIcon
          onClick={() => navigate("/productos")}
        />
      </div>
    </div>
  );
}
