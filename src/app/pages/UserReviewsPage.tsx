import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoleculeMunicipioChip } from "../components/molecules/MoleculeMunicipioChip";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Review {
  id: string;
  productoId: string;
  productoNombre: string;
  productoImg: string;
  vendedorNombre: string;
  municipio: string;
  fecha: string;
  rating: number;
  texto: string;
}

// ─── Demo data ────────────────────────────────────────────────────────────────

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productoId: "p-001",
    productoNombre: "Hoodie Pijao Roots",
    productoImg:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&w=400&h=400&fit=crop",
    vendedorNombre: "Raíces Store",
    municipio: "Ibagué",
    fecha: "2 may 2026",
    rating: 5,
    texto:
      "Calidad increíble, el bordado es muy detallado y los materiales se sienten premium. " +
      "La talla única amplia es perfecta. Lo recomiendo al 100% si quieres llevar el Tolima contigo.",
  },
  {
    id: "rev-2",
    productoId: "p-005",
    productoNombre: "Chaqueta Río Magdalena",
    productoImg:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&w=400&h=400&fit=crop",
    vendedorNombre: "Honda Heritage",
    municipio: "Honda",
    fecha: "10 abr 2026",
    rating: 4,
    texto:
      "Muy cómoda y bien terminada. El material impermeable funciona excelente para el frío ribereño. " +
      "Le quito una estrella porque el envío tardó más de lo esperado.",
  },
  {
    id: "rev-3",
    productoId: "p-008",
    productoNombre: "Tote Bag Ibagué",
    productoImg:
      "https://images.unsplash.com/photo-1544816565-aa8c1166648f?auto=format&w=400&h=400&fit=crop",
    vendedorNombre: "Raíces Store",
    municipio: "Ibagué",
    fecha: "22 mar 2026",
    rating: 5,
    texto:
      "La serigrafía del skyline de Ibagué con el Nevado al fondo es espectacular. " +
      "Las asas son resistentes y la capacidad es perfecta para el día a día.",
  },
  {
    id: "rev-4",
    productoId: "p-003",
    productoNombre: "Sudadera Cordillera Central",
    productoImg:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&w=400&h=400&fit=crop",
    vendedorNombre: "Pijao Threads",
    municipio: "El Espinal",
    fecha: "5 mar 2026",
    rating: 3,
    texto:
      "El diseño es bonito pero el color en persona es un poco más apagado que en las fotos. " +
      "La tela reciclada se siente diferente a lo que esperaba. Aceptable por el precio.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserReviewsPage() {
  useEffect(() => { document.title = "Mis reseñas — TolimaMKT"; }, []);

  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleSaveEdit = (id: string, newTexto: string, newRating: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, texto: newTexto, rating: newRating } : r))
    );
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setConfirmDeleteId(null);
  };

  return (
    <>
      <div style={{ maxWidth: "720px" }}>
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#2C2C2A",
            margin: "0 0 4px",
          }}
        >
          Mis reseñas
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "#9D9C97",
            margin: "0 0 24px",
          }}
        >
          Opiniones que has compartido
        </p>

        {reviews.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {reviews.map((r) => (
              <ReviewCard
                key={r.id}
                review={r}
                confirmingDelete={confirmDeleteId === r.id}
                onEdit={() => setEditingId(r.id)}
                onDeleteRequest={() =>
                  setConfirmDeleteId((prev) => (prev === r.id ? null : r.id))
                }
                onDeleteConfirm={() => handleDelete(r.id)}
                onDeleteCancel={() => setConfirmDeleteId(null)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editingId && (
        <EditModal
          review={reviews.find((r) => r.id === editingId)!}
          onClose={() => setEditingId(null)}
          onSave={(texto, rating) => handleSaveEdit(editingId, texto, rating)}
        />
      )}
    </>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────

function ReviewCard({
  review,
  confirmingDelete,
  onEdit,
  onDeleteRequest,
  onDeleteConfirm,
  onDeleteCancel,
}: {
  review: Review;
  confirmingDelete: boolean;
  onEdit: () => void;
  onDeleteRequest: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        border: "1px solid #F0EFE9",
        padding: "20px 24px",
        boxShadow: "0 1px 6px rgba(44,44,42,0.05)",
      }}
    >
      {/* Top row: product image + info + date */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <img
          src={review.productoImg}
          alt={review.productoNombre}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "10px",
            objectFit: "cover",
            flexShrink: 0,
            border: "1px solid #F0EFE9",
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link
            to={`/producto/${review.productoId}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#2C2C2A",
              textDecoration: "none",
              display: "block",
              marginBottom: "2px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7A3048")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#2C2C2A")}
          >
            {review.productoNombre}
          </Link>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "#9D9C97",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {review.vendedorNombre}
          </p>
        </div>
        <span
          style={{
            fontSize: "12px",
            color: "#B0AFA9",
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {review.fecha}
        </span>
      </div>

      {/* Stars */}
      <div style={{ marginBottom: "10px" }}>
        <StarDisplay rating={review.rating} />
      </div>

      {/* Review text */}
      <p
        style={{
          margin: "0 0 14px",
          fontSize: "14px",
          color: "#6B6A65",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.65,
        }}
      >
        <span style={{ color: "#D4AA50", fontWeight: 700, fontSize: "18px", lineHeight: 0.8 }}>"</span>
        {review.texto}
        <span style={{ color: "#D4AA50", fontWeight: 700, fontSize: "18px", lineHeight: 0.8 }}>"</span>
      </p>

      {/* Bottom row: municipio chip + actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <MoleculeMunicipioChip label={review.municipio} />

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Delete with inline confirm */}
          {confirmingDelete ? (
            <>
              <span
                style={{
                  fontSize: "12px",
                  color: "#6B6A65",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                ¿Eliminar?
              </span>
              <button
                type="button"
                onClick={onDeleteConfirm}
                style={actionBtnStyle("#C62828")}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={onDeleteCancel}
                style={actionBtnStyle("#9D9C97")}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onDeleteRequest}
              style={actionBtnStyle("#9D9C97")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C62828")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9D9C97")}
            >
              Eliminar
            </button>
          )}

          <button
            type="button"
            onClick={onEdit}
            style={{
              height: "32px",
              padding: "0 14px",
              background: "#F9F0F3",
              border: "1px solid #E8C4D0",
              borderRadius: "8px",
              color: "#7A3048",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F0E0E8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F9F0F3")}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditModal({
  review,
  onClose,
  onSave,
}: {
  review: Review;
  onClose: () => void;
  onSave: (texto: string, rating: number) => void;
}) {
  const [texto, setTexto] = useState(review.texto);
  const [rating, setRating] = useState(review.rating);
  const [hoverStar, setHoverStar] = useState(0);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(44,44,42,0.45)",
        backdropFilter: "blur(3px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "28px",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 8px 40px rgba(44,44,42,0.18)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "17px",
              fontWeight: 700,
              color: "#2C2C2A",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Editar reseña
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              color: "#9D9C97",
              lineHeight: 1,
              padding: "2px",
            }}
          >
            ×
          </button>
        </div>

        {/* Product reference */}
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#9D9C97",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {review.productoNombre}
        </p>

        {/* Star selector */}
        <div>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#6B6A65",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Calificación
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverStar(star)}
                onMouseLeave={() => setHoverStar(0)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "26px",
                  color:
                    star <= (hoverStar || rating) ? "#D4AA50" : "#E5E4E0",
                  transition: "color 100ms, transform 100ms",
                  transform:
                    star <= (hoverStar || rating) ? "scale(1.1)" : "scale(1)",
                  padding: "0 2px",
                  lineHeight: 1,
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#6B6A65",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Tu opinión
          </p>
          <textarea
            value={texto}
            rows={4}
            onChange={(e) => setTexto(e.target.value)}
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
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#7A3048")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E4E0")}
          />
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={() => onSave(texto, rating)}
          disabled={texto.trim().length === 0}
          style={{
            height: "42px",
            background: texto.trim().length === 0 ? "#E5E4E0" : "#7A3048",
            border: "none",
            borderRadius: "10px",
            color: texto.trim().length === 0 ? "#9D9C97" : "#FFFFFF",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            cursor: texto.trim().length === 0 ? "not-allowed" : "pointer",
            transition: "background 150ms",
          }}
          onMouseEnter={(e) => {
            if (texto.trim().length > 0)
              e.currentTarget.style.background = "#9D3D5E";
          }}
          onMouseLeave={(e) => {
            if (texto.trim().length > 0)
              e.currentTarget.style.background = "#7A3048";
          }}
        >
          Guardar reseña
        </button>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            fontSize: "16px",
            color: i <= rating ? "#D4AA50" : "#E5E4E0",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function actionBtnStyle(color: string): React.CSSProperties {
  return {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 500,
    color,
    fontFamily: "'DM Sans', sans-serif",
    padding: "4px 2px",
    transition: "color 150ms",
  };
}

function EmptyState() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px dashed #E5E4E0",
        padding: "64px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "40px", margin: "0 0 12px" }}>✍️</p>
      <p
        style={{
          margin: "0 0 8px",
          fontSize: "16px",
          fontWeight: 600,
          color: "#2C2C2A",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Aún no has escrito reseñas
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "#9D9C97",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.55,
          maxWidth: "320px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        ¡Comparte tu experiencia con la comunidad tolimense!
      </p>
    </div>
  );
}
