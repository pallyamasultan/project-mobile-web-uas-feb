import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy validation
    if (email === "admin@unsap.ac.id" && password === "admin123") {
      navigate("/");
    } else {
      setError("Email atau Password salah!");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f7fa",
      fontFamily: "Inter, system-ui, sans-serif"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0 auto 16px"
          }}>A</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1a2035", margin: "0 0 8px" }}>Admin Panel</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>Sistem Ujian FEB UNSAP</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "14px",
            marginBottom: "24px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Email Institusi
            </label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@unsap.ac.id"
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 40px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box"
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 40px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box"
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#3b82f6",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
              marginTop: "8px"
            }}
          >
            Masuk ke Dashboard
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#6b7280" }}>
          Hint: admin@unsap.ac.id / admin123
        </div>
      </div>
    </div>
  );
}
