export default function Close({ onClick, style = {} }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "1.5rem",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        ...style
      }}
    >
      ×
    </button>
  );
}
