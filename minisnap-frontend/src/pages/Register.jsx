import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      await registerUser({ username, email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  }

  return (
    <div className="page">
      <h2>Create Account 📸</h2>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <div className="small-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}