import { useState, useRef } from "react";
import { motion } from "motion/react";
import unsapLogo from "../../imports/image_2.png";

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="3.5" width="14" height="13" rx="2" stroke="#94a3b8" strokeWidth="1.4" fill="none" />
      <path d="M2 7.5h14" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 2v3M12 2v3" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="5" y="10" width="2" height="2" rx="0.4" fill="#94a3b8" />
      <rect x="8.5" y="10" width="2" height="2" rx="0.4" fill="#94a3b8" />
      <rect x="12" y="10" width="2" height="2" rx="0.4" fill="#94a3b8" />
      <rect x="5" y="13" width="2" height="2" rx="0.4" fill="#94a3b8" />
      <rect x="8.5" y="13" width="2" height="2" rx="0.4" fill="#94a3b8" />
    </svg>
  );
}

export function LoginScreen({ onNext }: { onNext: () => void }) {
  const [nim, setNim] = useState("");
  const [dob, setDob] = useState("");
  const [nimFocused, setNimFocused] = useState(false);
  const [dobFocused, setDobFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nimError, setNimError] = useState("");
  const [dobError, setDobError] = useState("");
  const dobRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    let valid = true;
    if (!nim.trim()) { setNimError("NIM tidak boleh kosong"); valid = false; }
    else setNimError("");
    if (!dob.trim()) { setDobError("Tanggal lahir tidak boleh kosong"); valid = false; }
    else setDobError("");
    if (!valid) return;

    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 1500);
  };

  const formatDob = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  return (
    <div className="size-full flex flex-col" style={{ background: "#0B1E3D" }}>
      {/* ── TOP HEADER ── */}
      <div
        className="flex flex-col items-center justify-center gap-5 px-6"
        style={{ paddingTop: 28, paddingBottom: 36, minHeight: 230 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          {/* Logo image */}
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 100,
              height: 100,
              background: "#fff",
              boxShadow: "0 0 0 3px rgba(245,197,24,0.5), 0 0 24px rgba(245,197,24,0.2)",
              padding: 6,
            }}
          >
            <img
              src={unsapLogo}
              alt="Logo UNSAP"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          {/* Title block */}
          <div className="flex flex-col items-center gap-0.5">
            <p
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Ujian Akhir Semester
            </p>
            {/* Thin divider */}
            <div
              style={{
                width: 40,
                height: 1.5,
                borderRadius: 2,
                background: "linear-gradient(90deg, transparent, #F5C518, transparent)",
                margin: "4px 0",
              }}
            />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              Masuk dengan akun mahasiswa
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── WHITE FORM PANEL ── */}
      <motion.div
        className="flex-1 flex flex-col px-6 pt-7 pb-6"
        style={{
          background: "#ffffff",
          borderRadius: "28px 28px 0 0",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.25)",
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      >
        {/* Section header */}
        <p
          style={{
            color: "#0B1E3D",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Masuk
        </p>

        {/* ── NIM FIELD ── */}
        <div className="flex flex-col gap-1 mb-4">
          <label style={{ color: "#374151", fontSize: 13, fontWeight: 600 }}>
            NIM{" "}
            <span style={{ color: "#9ca3af", fontWeight: 400 }}>
              (Nomor Induk Mahasiswa)
            </span>
          </label>
          <motion.div
            animate={{
              boxShadow: nimFocused
                ? "0 0 0 2.5px rgba(11,30,61,0.35)"
                : "0 0 0 1.5px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.15 }}
            className="flex items-center rounded-xl overflow-hidden"
            style={{ background: nimFocused ? "#f8faff" : "#f9fafb" }}
          >
            <input
              type="text"
              inputMode="numeric"
              placeholder="Contoh: 2024010001"
              value={nim}
              onChange={(e) => {
                setNim(e.target.value.replace(/\D/g, "").slice(0, 12));
                setNimError("");
              }}
              onFocus={() => setNimFocused(true)}
              onBlur={() => setNimFocused(false)}
              style={{
                flex: 1,
                padding: "14px 16px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#111827",
                fontSize: 15,
                letterSpacing: 0.5,
              }}
            />
            {nim.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center mr-3 rounded-full"
                style={{
                  width: 18,
                  height: 18,
                  background: "#22c55e",
                  flexShrink: 0,
                }}
              >
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.2 5.5L8 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </motion.div>
          {nimError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#ef4444", fontSize: 11, paddingLeft: 4 }}
            >
              {nimError}
            </motion.p>
          )}
        </div>

        {/* ── DATE OF BIRTH FIELD ── */}
        <div className="flex flex-col gap-1 mb-6">
          <label style={{ color: "#374151", fontSize: 13, fontWeight: 600 }}>
            Tanggal Lahir{" "}
            <span style={{ color: "#9ca3af", fontWeight: 400 }}>(Password)</span>
          </label>
          <motion.div
            animate={{
              boxShadow: dobFocused
                ? "0 0 0 2.5px rgba(11,30,61,0.35)"
                : "0 0 0 1.5px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.15 }}
            className="flex items-center rounded-xl overflow-hidden cursor-text"
            style={{ background: dobFocused ? "#f8faff" : "#f9fafb" }}
            onClick={() => dobRef.current?.focus()}
          >
            <input
              ref={dobRef}
              type="text"
              inputMode="numeric"
              placeholder="DD / MM / YYYY"
              value={dob}
              onChange={(e) => {
                setDob(formatDob(e.target.value));
                setDobError("");
              }}
              onFocus={() => setDobFocused(true)}
              onBlur={() => setDobFocused(false)}
              style={{
                flex: 1,
                padding: "14px 16px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#111827",
                fontSize: 15,
                letterSpacing: 1,
              }}
            />
            <div className="flex items-center mr-4" style={{ flexShrink: 0 }}>
              <CalendarIcon />
            </div>
          </motion.div>
          {dobError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#ef4444", fontSize: 11, paddingLeft: 4 }}
            >
              {dobError}
            </motion.p>
          )}
        </div>

        {/* ── MASUK BUTTON ── */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          className="w-full relative overflow-hidden rounded-xl flex items-center justify-center"
          style={{
            height: 52,
            background: loading
              ? "#1e3a6e"
              : "linear-gradient(135deg, #0B1E3D 0%, #162d52 100%)",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading
              ? "none"
              : "0 4px 16px rgba(11,30,61,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          {/* Shimmer effect */}
          {!loading && (
            <motion.div
              className="absolute inset-y-0"
              style={{
                width: 60,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
              }}
              animate={{ x: [-60, 420] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
            />
          )}

          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: "2.5px solid rgba(245,197,24,0.3)",
                borderTop: "2.5px solid #F5C518",
              }}
            />
          ) : (
            <span
              style={{
                color: "#F5C518",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              MASUK
            </span>
          )}
        </motion.button>

        {/* ── FORGOT ACCOUNT ── */}
        <div className="flex justify-center mt-4">
          <button
            style={{
              background: "none",
              border: "none",
              color: "#6b7280",
              fontSize: 13,
              cursor: "pointer",
              textDecoration: "underline",
              textDecorationColor: "rgba(107,114,128,0.4)",
              textUnderlineOffset: 3,
            }}
          >
            Lupa akun? Hubungi Admin
          </button>
        </div>

        {/* ── SPACER ── */}
        <div className="flex-1" />

        {/* ── SECURITY BADGES ── */}
        <motion.div
          className="flex gap-2 justify-center flex-wrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {/* Badge: Koneksi terenkripsi */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path
                d="M6 1L1.5 3V7C1.5 9.8 3.5 12.4 6 13C8.5 12.4 10.5 9.8 10.5 7V3L6 1Z"
                fill="rgba(34,197,94,0.2)"
                stroke="#22c55e"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d="M4 7L5.3 8.3L8 5.5"
                stroke="#22c55e"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ color: "#16a34a", fontSize: 11, fontWeight: 500 }}>
              Koneksi terenkripsi
            </span>
          </div>

          {/* Badge: Perangkat terverifikasi */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: 10, height: 10, background: "#22c55e" }}
            >
              <svg width="6" height="5" viewBox="0 0 6 5" fill="none">
                <path d="M1 2.5L2.4 3.8L5 1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ color: "#16a34a", fontSize: 11, fontWeight: 500 }}>
              Perangkat terverifikasi
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
