export default function Container({ children }) {
  return (
    <div
      style={{ backgroundColor: "#b1ede8" }}
      className="container mx-auto px-5"
    >
      {children}
    </div>
  );
}
