import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Admin
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });
  console.log("Admin seeded:", admin.username);

  // 2. Seed Profile
  const profile = await prisma.profile.upsert({
    where: { id: "profile" },
    update: {
      fullName: "M. Hafiz Suryadinata",
      status: "Calon Mahasiswa Kehutanan UNILA & Developer Web/Android",
      bio: "Saya adalah M. Hafiz Suryadinata, berumur 19 tahun dan baru saja tamat dari kelas 3 SMA di Pondok Pesantren Dar El Ilmi Payakumbuh. Saya akan melanjutkan kuliah ke Universitas Lampung (UNILA) program studi S1 Kehutanan. Saya memiliki keahlian dalam pemrograman web dan pengembangan Android, serta bersemangat memadukan solusi teknologi dengan pelestarian lingkungan.",
      vision: "Mengintegrasikan keahlian pengembangan aplikasi web and Android dengan ilmu kehutanan untuk menciptakan solusi teknologi inovatif yang mendukung konservasi lingkungan dan pengelolaan sumber daya hutan secara berkelanjutan.",
      careerGoals: "Membangun platform digital pemantauan lingkungan, berkontribusi aktif pada open-source, dan berkolaborasi dalam tim profesional untuk memecahkan masalah ekologis menggunakan keahlian pemrograman.",
    },
    create: {
      id: "profile",
      fullName: "M. Hafiz Suryadinata",
      status: "Calon Mahasiswa Kehutanan UNILA & Developer Web/Android",
      bio: "Saya adalah M. Hafiz Suryadinata, berumur 19 tahun dan baru saja tamat dari kelas 3 SMA di Pondok Pesantren Dar El Ilmi Payakumbuh. Saya akan melanjutkan kuliah ke Universitas Lampung (UNILA) program studi S1 Kehutanan. Saya memiliki keahlian dalam pemrograman web dan pengembangan Android, serta bersemangat memadukan solusi teknologi dengan pelestarian lingkungan.",
      vision: "Mengintegrasikan keahlian pengembangan aplikasi web and Android dengan ilmu kehutanan untuk menciptakan solusi teknologi inovatif yang mendukung konservasi lingkungan dan pengelolaan sumber daya hutan secara berkelanjutan.",
      careerGoals: "Membangun platform digital pemantauan lingkungan, berkontribusi aktif pada open-source, dan berkolaborasi dalam tim profesional untuk memecahkan masalah ekologis menggunakan keahlian pemrograman.",
      avatarUrl: "/avatar.jpg",
      cvUrl: "/cv.pdf",
    },
  });
  console.log("Profile seeded");

  // 3. Seed Contact
  const contact = await prisma.contact.upsert({
    where: { id: "contact" },
    update: {},
    create: {
      id: "contact",
      email: "mhafizsuryadinata@gmail.com",
      whatsapp: "https://wa.me/6281234567890",
      github: "https://github.com/mhafizsuryadinata",
      linkedin: "https://linkedin.com/in/mhafizsuryadinata",
      instagram: "https://instagram.com/mhafizsuryadinata",
    },
  });
  console.log("Contact seeded");

  // 4. Seed Education
  const educationsCount = await prisma.education.count();
  if (educationsCount === 0) {
    await prisma.education.createMany({
      data: [
        {
          schoolName: "SD Negeri Contoh",
          degree: "Pendidikan Dasar",
          period: "2010 - 2016",
          description: "Lulus dengan nilai yang memuaskan dan aktif dalam kegiatan kepramukaan serta matematika.",
          order: 1,
        },
        {
          schoolName: "SMP Negeri Contoh",
          degree: "Pendidikan Menengah Pertama",
          period: "2016 - 2019",
          description: "Mengikuti berbagai olimpiade sains tingkat kabupaten dan aktif dalam organisasi siswa (OSIS).",
          order: 2,
        },
        {
          schoolName: "Pondok Pesantren Dar El Ilmi Payakumbuh",
          degree: "Pendidikan Menengah Atas (SMA)",
          period: "2023 - 2026",
          description: "Menyelesaikan pendidikan menengah atas dengan mendalami studi keagamaan serta sains, aktif dalam kegiatan kepesantrenan, dan mulai mendalami pemrograman web & Android.",
          order: 3,
        },
        {
          schoolName: "Universitas Lampung (UNILA)",
          degree: "S1 Kehutanan",
          period: "2026 - Sekarang",
          description: "Mempelajari manajemen hutan, konservasi alam, dan berencana mengintegrasikan keahlian pemrograman web dan Android untuk merancang solusi teknologi kehutanan (forestry tech).",
          order: 4,
        },
      ],
    });
    console.log("Education timeline seeded");
  }

  // 5. Seed Skills
  const skillsCount = await prisma.skill.count();
  if (skillsCount === 0) {
    await prisma.skill.createMany({
      data: [
        { name: "HTML", category: "Frontend", percentage: 95 },
        { name: "CSS", category: "Frontend", percentage: 90 },
        { name: "JavaScript", category: "Frontend", percentage: 88 },
        { name: "Next.js", category: "Frontend", percentage: 80 },
        { name: "PHP", category: "Backend", percentage: 85 },
        { name: "Laravel", category: "Backend", percentage: 85 },
        { name: "Kotlin", category: "Mobile Development", percentage: 75 },
        { name: "MySQL", category: "Database", percentage: 80 },
        { name: "Git", category: "Tools", percentage: 85 },
        { name: "GitHub", category: "Tools", percentage: 85 },
        { name: "Linux", category: "Tools", percentage: 78 },
      ],
    });
    console.log("Skills seeded");
  }

  // 6. Seed Projects
  const projectsCount = await prisma.project.count();
  if (projectsCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "DARLI (Aplikasi Alumni Pesantren)",
          description: "Aplikasi portal alumni pesantren terpadu yang memetakan persebaran alumni, portal karir, verifikasi OTP, integrasi peta interaktif Leaflet, dan dashboard admin moderasi komentar.",
          imageUrl: "/projects/darli.png",
          techStack: "Laravel, MySQL, Leaflet.js, Bootstrap",
          category: "Web",
          demoUrl: "https://darli-demo.example.com",
          githubUrl: "https://github.com/mhafizsuryadinata/AlumniDarli",
          order: 1,
        },
        {
          title: "Sistem Login Multi Role Laravel",
          description: "Implementasi sistem autentikasi dan otorisasi multi-role (Admin, Mudir, Alumni) menggunakan guard bawaan Laravel, dilengkapi sistem session security dan kelola hak akses.",
          imageUrl: "/projects/multirole.png",
          techStack: "Laravel, Blade, MySQL, Tailwind CSS",
          category: "Web",
          demoUrl: null,
          githubUrl: "https://github.com/mhafizsuryadinata/laravel-multirole",
          order: 2,
        },
        {
          title: "Website Portofolio Pribadi",
          description: "Website portofolio interaktif premium dengan mode gelap/terang, scroll progress bar, back-to-top button, animasi Framer Motion, dan dashboard manajemen admin dinamis.",
          imageUrl: "/projects/portfolio.png",
          techStack: "Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL",
          category: "Web",
          demoUrl: "https://mhafizsuryadinata.vercel.app",
          githubUrl: "https://github.com/mhafizsuryadinata/portfolio-mhafizsuryadinata",
          order: 3,
        },
        {
          title: "Aplikasi Android Alumni",
          description: "Klien seluler Android asli untuk aplikasi DARLI yang dibangun dengan Kotlin, menampilkan integrasi WebView, autentikasi sesi, verifikasi keamanan, dan integrasi peta.",
          imageUrl: "/projects/kotlin.png",
          techStack: "Kotlin, Android SDK, Retrofit, WebView",
          category: "Mobile",
          demoUrl: null,
          githubUrl: "https://github.com/mhafizsuryadinata/darli-android",
          order: 4,
        },
      ],
    });
    console.log("Projects seeded");
  }

  // 7. Seed Certificates
  const certificatesCount = await prisma.certificate.count();
  if (certificatesCount === 0) {
    await prisma.certificate.createMany({
      data: [
        {
          title: "Belajar Dasar Pemrograman Web",
          issuer: "Dicoding Indonesia",
          issueDate: "Februari 2023",
          imageUrl: "/certs/dicoding-web.png",
          credentialUrl: "https://www.dicoding.com/certificates/example1",
          order: 1,
        },
        {
          title: "Belajar Membuat Aplikasi Android untuk Pemula",
          issuer: "Dicoding Indonesia",
          issueDate: "Mei 2023",
          imageUrl: "/certs/dicoding-android.png",
          credentialUrl: "https://www.dicoding.com/certificates/example2",
          order: 2,
        },
        {
          title: "Database Design with MySQL",
          issuer: "Oracle Academy",
          issueDate: "Oktober 2023",
          imageUrl: "/certs/oracle-db.png",
          credentialUrl: null,
          order: 3,
        },
      ],
    });
    console.log("Certificates seeded");
  }

  // 8. Seed Experiences
  const experiencesCount = await prisma.experience.count();
  if (experiencesCount === 0) {
    await prisma.experience.createMany({
      data: [
        {
          organization: "Himpunan Mahasiswa Informatika",
          role: "Anggota Divisi Hubungan Masyarakat",
          period: "2023 - 2024",
          description: "Bertanggung jawab menjalin relasi antar mahasiswa, mengoordinasikan acara sosialisasi, dan mengelola penyebaran informasi kegiatan akademik.",
          order: 1,
        },
        {
          organization: "Unit Kegiatan Mahasiswa Pemrograman",
          role: "Ketua Bidang Pengembangan Web",
          period: "2024 - Sekarang",
          description: "Memimpin divisi pengembangan web, mengadakan workshop mingguan pemrograman HTML/CSS/JS, serta mengoordinasikan pembuatan proyek tim.",
          order: 2,
        },
      ],
    });
    console.log("Experiences seeded");
  }

  // 9. Seed Achievements
  const achievementsCount = await prisma.achievement.count();
  if (achievementsCount === 0) {
    await prisma.achievement.createMany({
      data: [
        {
          title: "Juara 2 Hackathon Mahasiswa Nasional",
          awarder: "Kementerian Komunikasi dan Informatika",
          date: "November 2024",
          description: "Merancang solusi aplikasi DARLI untuk manajemen alumni pesantren terintegrasi dalam waktu 48 jam.",
          icon: "Award",
        },
        {
          title: "Mahasiswa Berprestasi Bidang Teknologi",
          awarder: "Rektorat Universitas",
          date: "Maret 2025",
          description: "Diberikan atas kontribusi aktif dalam riset aplikasi mobile kemasyarakatan dan IPK di atas 3.75.",
          icon: "Trophy",
        },
      ],
    });
    console.log("Achievements seeded");
  }

  // 10. Seed Goals
  const goalsCount = await prisma.goal.count();
  if (goalsCount === 0) {
    await prisma.goal.createMany({
      data: [
        {
          title: "Lulus Tepat Waktu dengan Predikat Cum Laude",
          description: "Menyelesaikan skripsi yang berfokus pada optimasi pencarian alumni dan lulus dengan IPK memuaskan.",
          targetYear: "2026",
        },
        {
          title: "Mendapatkan Sertifikasi Profesional AWS / Google Cloud",
          description: "Memperdalam arsitektur cloud untuk meningkatkan kesiapan kerja di industri skala besar.",
          targetYear: "2026",
        },
        {
          title: "Bekerja Sebagai Software Engineer di Tech Startup / Enterprise",
          description: "Memulai karir profesional untuk mengimplementasikan solusi pemrograman skala besar dan belajar praktik terbaik tim.",
          targetYear: "2027",
        },
      ],
    });
    console.log("Goals seeded");
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
