import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { SecurityScreen } from "./components/SecurityScreen";
import { LoginScreen } from "./components/LoginScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { ExamScreen } from "./components/ExamScreen";
import { LateEntryScreen } from "./components/LateEntryScreen";

type Screen = "splash" | "security" | "login" | "dashboard" | "lateentry" | "exam";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = (next: Screen) => {
    setDirection(1);
    setScreen(next);
  };

  const variants = {
    enter: (d: number) => ({ x: d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -40, opacity: 0 }),
  };

  return (
    <div
      className="size-full flex items-center justify-center"
      style={{ background: "#07101f" }}
    >
      {/* Phone frame */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          width: 390,
          height: 844,
          maxWidth: "100vw",
          maxHeight: "100dvh",
          borderRadius: 44,
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.09)",
          background: "#060F1E",
        }}
      >
        {/* Status bar */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8"
          style={{ height: 48, paddingTop: 14 }}
        >
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600 }}>9:41</span>
          <div className="flex items-center gap-2">
            <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
              <rect x="0" y="7" width="3" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill="rgba(255,255,255,0.6)" />
              <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="rgba(255,255,255,0.6)" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <circle cx="8" cy="10.5" r="1.5" fill="rgba(255,255,255,0.65)" />
              <path d="M4.5 7.2C5.5 6.2 6.7 5.6 8 5.6s2.5.6 3.5 1.6" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path d="M2 4.5C3.7 2.8 5.7 1.8 8 1.8s4.3 1 6 2.7" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            </svg>
            <div className="flex items-center">
              <div style={{ width: 23, height: 11, border: "1px solid rgba(255,255,255,0.5)", borderRadius: 3, padding: 2 }}>
                <div style={{ width: "78%", height: "100%", background: "rgba(255,255,255,0.7)", borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2, height: 5, background: "rgba(255,255,255,0.5)", borderRadius: "0 1px 1px 0", marginLeft: 0.5 }} />
            </div>
          </div>
        </div>

        {/* Dynamic Island */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-20 rounded-full"
          style={{ width: 120, height: 34, background: "#000" }}
        />

        {/* Screen content */}
        <div className="absolute inset-0 pt-12 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={screen}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
              className="size-full"
            >
              {screen === "splash"    && <SplashScreen    onNext={() => goTo("security")}   />}
              {screen === "security"  && <SecurityScreen  onNext={() => goTo("login")}       />}
              {screen === "login"     && <LoginScreen     onNext={() => goTo("dashboard")}   />}
              {screen === "dashboard" && <DashboardScreen onStartExam={() => goTo("exam")} onLateEntry={() => goTo("lateentry")} onLogout={() => goTo("splash")} />}
              {screen === "lateentry" && <LateEntryScreen onEnter={() => goTo("exam")} onBack={() => goTo("dashboard")} />}
              {screen === "exam"      && <ExamScreen      onBack={() => goTo("dashboard")}   />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
