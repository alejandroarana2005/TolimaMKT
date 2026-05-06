export function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        border: `3px solid #F0EFE9`,
        borderTopColor: "#7A3048",
        animation: "tolima-spin 700ms linear infinite",
        flexShrink: 0,
      }}
    >
      <style>{`
        @keyframes tolima-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
