export const MOCK_PROFILE = {
  fullName: "M. Hafiz Suryadinata",
  status: "Calon Mahasiswa Kehutanan UNILA & Developer Web/Android",
  bio: "Saya adalah M. Hafiz Suryadinata, berumur 19 tahun dan baru saja tamat dari kelas 3 SMA di Pondok Pesantren Dar El Ilmi Payakumbuh. Saya akan melanjutkan kuliah ke Universitas Lampung (UNILA) program studi S1 Kehutanan. Saya memiliki keahlian dalam pemrograman web dan pengembangan Android, serta bersemangat memadukan solusi teknologi dengan pelestarian lingkungan.",
  vision: "Mengintegrasikan keahlian pengembangan aplikasi web dan Android dengan ilmu kehutanan untuk menciptakan solusi teknologi inovatif yang mendukung konservasi lingkungan dan pengelolaan sumber daya hutan secara berkelanjutan.",
  careerGoals: "Membangun platform digital pemantauan lingkungan, berkontribusi aktif pada open-source, dan berkolaborasi dalam tim profesional untuk memecahkan masalah ekologis menggunakan keahlian pemrograman.",
  avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
  cvUrl: "#",
};

export const MOCK_CONTACT = {
  email: "mhafizsuryadinata@gmail.com",
  whatsapp: "https://wa.me/6281234567890",
  github: "https://github.com/mhafizsuryadinata",
  linkedin: "https://linkedin.com/in/mhafizsuryadinata",
  instagram: "https://instagram.com/mhafizsuryadinata",
};

export const MOCK_EDUCATION = [
  {
    id: "edu-1",
    schoolName: "Universitas Lampung (UNILA)",
    degree: "S1 Kehutanan",
    period: "2026 - Sekarang",
    description: "Mempelajari manajemen hutan, konservasi alam, dan berencana mengintegrasikan keahlian pemrograman web dan Android untuk merancang solusi teknologi kehutanan (forestry tech).",
    order: 1,
  },
  {
    id: "edu-2",
    schoolName: "Pondok Pesantren Dar El Ilmi Payakumbuh",
    degree: "Pendidikan Menengah Atas (SMA)",
    period: "2023 - 2026",
    description: "Menyelesaikan pendidikan menengah atas dengan mendalami studi keagamaan serta sains, aktif dalam kegiatan kepesantrenan, dan mulai mendalami pemrograman web & Android.",
    order: 2,
  },
];

export const MOCK_SKILLS = [
  { id: "sk-1", name: "Next.js & React", category: "Frontend", percentage: 90 },
  { id: "sk-2", name: "Tailwind CSS", category: "Frontend", percentage: 95 },
  { id: "sk-3", name: "TypeScript", category: "Frontend", percentage: 85 },
  { id: "sk-4", name: "Laravel", category: "Backend", percentage: 88 },
  { id: "sk-5", name: "Node.js (Express)", category: "Backend", percentage: 80 },
  { id: "sk-6", name: "PostgreSQL & MySQL", category: "Database", percentage: 85 },
  { id: "sk-7", name: "Git & GitHub", category: "Tools", percentage: 90 },
  { id: "sk-8", name: "Docker", category: "Tools", percentage: 70 },
  { id: "sk-9", name: "Framer Motion", category: "Frontend", percentage: 80 },
];

export const MOCK_PROJECTS = [
  {
    id: "pr-1",
    title: "AlumniDarli App",
    description: "Platform jejaring alumni pesantren terpadu dengan fitur portal lowongan kerja, donasi, update berita, maps lokasi alumni, dan sistem verifikasi admin.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    techStack: "Laravel, Livewire, Tailwind CSS, MySQL, Leaflet Maps",
    category: "Web",
    demoUrl: "https://alumni.darlis.net",
    githubUrl: "https://github.com/mhafizsuryadinata/AlumniDarli",
    order: 1,
  },
  {
    id: "pr-2",
    title: "E-Commerce Gadget Hub",
    description: "Situs web belanja online gadget premium dengan fitur cart real-time, integrasi gateway pembayaran Midtrans, dan dashboard analitik admin.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    techStack: "Next.js, Tailwind CSS, Prisma, Supabase, Midtrans",
    category: "Web",
    demoUrl: null,
    githubUrl: "https://github.com/mhafizsuryadinata/gadget-hub",
    order: 2,
  },
];

export const MOCK_CERTIFICATES = [
  {
    id: "ce-1",
    title: "Architecting on AWS (Membangun Arsitektur di AWS)",
    issuer: "Amazon Web Services (AWS) Training & Certification",
    issueDate: "November 2024",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=300",
    credentialUrl: "https://www.credly.com",
    order: 1,
  },
  {
    id: "ce-2",
    title: "Developer Associate Certification",
    issuer: "Google Cloud Platform (GCP)",
    issueDate: "Agustus 2024",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=300",
    credentialUrl: "https://google.com",
    order: 2,
  },
];

export const MOCK_EXPERIENCE = [
  {
    id: "ex-1",
    organization: "Himpunan Mahasiswa Teknologi Informasi",
    role: "Ketua Divisi Hubungan Masyarakat",
    period: "2023 - Sekarang",
    description: "Memimpin tim Humas dalam menyelenggarakan webinar teknologi nasional, mengelola sponsorship, dan menjembatani komunikasi alumni dengan mahasiswa aktif.",
    order: 1,
  },
  {
    id: "ex-2",
    organization: "Google Developer Student Clubs (GDSC)",
    role: "Core Team - Web Development Lead",
    period: "2023 - 2024",
    description: "Mengorganisir workshop mingguan pemrograman React dan Tailwind CSS untuk 50+ mahasiswa, mendampingi pembuatan proyek kelompok.",
    order: 2,
  },
];

export const MOCK_ACHIEVEMENTS = [
  {
    id: "ac-1",
    title: "Juara 1 Web Design Competition",
    awarder: "Festival Teknologi Universitas Andalas",
    date: "Oktober 2024",
    description: "Berhasil meraih peringkat pertama dalam merancang prototipe dan kode portal edukasi ramah disabilitas menggunakan Next.js.",
    icon: "Trophy",
  },
  {
    id: "ac-2",
    title: "Finalis Hackathon Nasional",
    awarder: "Kementerian Komunikasi dan Informatika",
    date: "Juli 2024",
    description: "Mengembangkan aplikasi tanggap bencana alam real-time berbasis IoT dan WebSocket dalam waktu 48 jam pengerjaan intensif.",
    icon: "Award",
  },
];

export const MOCK_GOALS = [
  {
    id: "go-1",
    title: "Sertifikasi AWS Certified Solutions Architect",
    description: "Mendapatkan sertifikasi AWS Associate untuk memvalidasi pengetahuan arsitektur komputasi awan berstandar industri.",
    targetYear: "2026",
  },
  {
    id: "go-2",
    title: "Lulus Kuliah Dengan Predikat Cumlaude",
    description: "Menyelesaikan tugas akhir bertema Kecerdasan Buatan dan lulus tepat waktu dengan IPK di atas 3.75.",
    targetYear: "2026",
  },
];
