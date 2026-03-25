import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav style={{
      backgroundColor: "#1a1a2e",
      borderBottom: "1px solid #2a52be",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span style={{ fontWeight: "bold", color: "#2a52be", fontSize: "20px" }}>
        📸 MiniSnap
      </span>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/stories" style={{ color: "white", textDecoration: "none" }}>Stories</Link>
        <Link to="/chat" style={{ color: "white", textDecoration: "none" }}>Chat</Link>
        <button onClick={logout} style={{
          width: "auto",
          padding: "4px 12px",
          fontSize: "14px"
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
}