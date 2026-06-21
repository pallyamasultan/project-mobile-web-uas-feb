const fs = require('fs');
const file = 'c:/PROJECT/PROJECT MOBILE APP UAS FEB/admin_dashboard/src/app/pages/Dashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/import \{ MenuKuliah \} from "\.\/components\/MenuKuliah";\n/g, '');
code = code.replace(/import \{ Mahasiswa \} from "\.\/components\/Mahasiswa";\n/g, '');
code = code.replace(/import \{ BankSoal \} from "\.\/components\/BankSoal";\n/g, '');
code = code.replace(/import \{ Ujian \} from "\.\/components\/Ujian";\n/g, '');
code = code.replace(/import \{ Monitoring \} from "\.\/components\/Monitoring";\n/g, '');
code = code.replace(/import \{ Penilaian \} from "\.\/components\/Penilaian";\n/g, '');
code = code.replace(/import \{ Laporan \} from "\.\/components\/Laporan";\n/g, '');
code = code.replace(/import \{ Pengaturan \} from "\.\/components\/Pengaturan";\n/g, '');

const dashboardContent = `
export function Dashboard() {
  return (
    <>
      <WelcomeBanner />

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <StatCard title="Ujian Hari Ini" value="12" subtitle="Dari 60 Ujian" iconColor="#f97316" icon={ClipboardList} />
        <StatCard title="Total Mahasiswa" value="185" subtitle="Terdaftar Aktif" iconColor="#3b82f6" icon={Users} />
        <StatCard title="Ujian Aktif" value="24" subtitle="46 Aktif Sekarang" iconColor="#f97316" icon={TrendingUp} />
        <StatCard title="Tingkat Kelulusan" value="76%" subtitle="Dari total peserta" iconColor="#22c55e" ring={76} ringColor="#22c55e" />
        <StatCard title="Skor Sistem" value="87%" subtitle="Performa sistem" iconColor="#3b82f6" ring={87} ringColor="#3b82f6" />
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <ExamActivityChart />
        <ActiveExamsCard />
        <RecentActivityCard />
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
        <StudentStatusCard />
        <UserTypeCard />
        <PlatformCard />
      </div>

      <Footer />
    </>
  );
}
`;

code = code.replace(/export default function App\(\) \{[\s\S]*\}\n*$/, dashboardContent);
fs.writeFileSync(file, code);
