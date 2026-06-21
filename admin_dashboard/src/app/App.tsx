import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Monitoring } from "./pages/Monitoring";
import { BuatUjian } from "./pages/BuatUjian";
import { BankSoal } from "./pages/BankSoal";
import { Mahasiswa } from "./pages/Mahasiswa";
import { MenuKuliah } from "./pages/MenuKuliah";
import { Laporan } from "./pages/Laporan";
import { Penilaian } from "./pages/Penilaian";
import { Pengaturan } from "./pages/Pengaturan";
import { JadwalUjian } from "./pages/JadwalUjian";
import { RekapNilai } from "./pages/RekapNilai";

// Mock authentication logic for now
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="kuliah" element={<MenuKuliah />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="bank-soal" element={<BankSoal />} />
          <Route path="jadwal-ujian" element={<JadwalUjian />} />
          <Route path="ujian/buat" element={<BuatUjian />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="penilaian" element={<Penilaian />} />
          <Route path="rekap-nilai" element={<RekapNilai />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="pengaturan" element={<Pengaturan />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
