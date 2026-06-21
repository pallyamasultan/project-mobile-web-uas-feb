import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Users, BookOpen } from "lucide-react";

const daysInMonth = [
  null, null, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, null, null, null
];

const scheduledExams = {
  15: [
    { id: "UAS-01", name: "UAS Akuntansi Manajemen (AKT301)", time: "08:00 WIB", status: "Berlangsung", statusColor: "#22c55e", students: 120 }
  ],
  18: [
    { id: "UAS-02", name: "UAS Auditing Lanjutan (AKT305)", time: "10:00 WIB", status: "Terjadwal", statusColor: "#f59e0b", students: 95 }
  ],
  22: [
    { id: "UAS-03", name: "UAS Ekonomi Mikro (EKM201)", time: "13:00 WIB", status: "Terjadwal", statusColor: "#f59e0b", students: 150 }
  ]
};

export function JadwalUjian() {
  const [selectedDay, setSelectedDay] = useState<number | null>(15);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
      {/* HEADER */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: "16px 20px",
        borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
      }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: "6px", backgroundColor: "#0f172a", color: "#fff", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Bulanan</button>
          <button style={{ padding: "8px 16px", borderRadius: "6px", backgroundColor: "#f8fafc", color: "#475569", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Mingguan</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}><ChevronLeft size={20} color="#475569" /></button>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", minWidth: "100px", textAlign: "center" }}>Juni 2026</span>
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}><ChevronRight size={20} color="#475569" /></button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", flex: 1 }}>
        {/* CALENDAR GRID */}
        <div style={{ flex: "2", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", padding: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "12px" }}>
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(day => (
              <div key={day} style={{ textAlign: "center", fontSize: "13px", fontWeight: 600, color: "#64748b", padding: "8px 0" }}>{day}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
            {daysInMonth.map((day, idx) => {
              const hasExam = day && scheduledExams[day as keyof typeof scheduledExams];
              const isSelected = selectedDay === day;
              
              return (
                <div 
                  key={idx} 
                  onClick={() => day && setSelectedDay(day)}
                  style={{ 
                    height: "80px", 
                    borderRadius: "8px", 
                    border: day ? (isSelected ? "2px solid #0f172a" : "1px solid #e2e8f0") : "none",
                    backgroundColor: day ? (isSelected ? "#f8fafc" : "#fff") : "transparent",
                    padding: "8px",
                    cursor: day ? "pointer" : "default",
                    position: "relative",
                    transition: "all 0.2s"
                  }}
                >
                  {day && (
                    <>
                      <span style={{ fontSize: "14px", fontWeight: isSelected ? 700 : 500, color: isSelected ? "#0f172a" : "#334155" }}>{day}</span>
                      {hasExam && (
                        <div style={{ marginTop: "4px", display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ fontSize: "10px", backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "2px 4px", borderRadius: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            • Ujian
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAIL PANEL */}
        <div style={{ flex: "1", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "10px" }}>
            <CalendarIcon size={20} color="#0f172a" />
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
              Detail {selectedDay ? `${selectedDay} Juni 2026` : "Hari"}
            </h2>
          </div>
          
          <div style={{ padding: "20px", flex: 1, backgroundColor: "#f8fafc" }}>
            {selectedDay && scheduledExams[selectedDay as keyof typeof scheduledExams] ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {scheduledExams[selectedDay as keyof typeof scheduledExams].map((exam, i) => (
                  <div key={i} style={{ backgroundColor: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#0f172a", lineHeight: 1.4 }}>{exam.name}</h3>
                      <span style={{ backgroundColor: `${exam.statusColor}15`, color: exam.statusColor, padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 600 }}>
                        {exam.status}
                      </span>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "13px" }}>
                        <Clock size={14} /> <span>{exam.time}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "13px" }}>
                        <Users size={14} /> <span>{exam.students} Peserta</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "13px" }}>
                        <BookOpen size={14} /> <span>Sifat: Tertutup (Kiosk Mode)</span>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed #e2e8f0" }}>
                      <button style={{ width: "100%", padding: "8px", borderRadius: "6px", backgroundColor: "#0f172a", color: "#fff", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                        Lihat Detail Ujian
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.5 }}>
                <CalendarIcon size={48} color="#94a3b8" style={{ marginBottom: "16px" }} />
                <p style={{ margin: 0, fontSize: "14px", color: "#475569", fontWeight: 500 }}>Tidak ada jadwal ujian pada hari ini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
