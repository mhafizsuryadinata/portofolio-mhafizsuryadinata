-- ============================================================
-- SUPABASE SQL SETUP — Portfolio M. Hafiz Suryadinata
-- ============================================================
-- Cara penggunaan:
--   1. Buka https://supabase.com/dashboard → pilih project Anda
--   2. Klik "SQL Editor" di sidebar kiri
--   3. Klik "New query", paste seluruh isi file ini, lalu klik RUN
--   4. Setelah berhasil, isi .env Anda dan jalankan: npx prisma db push
-- ============================================================


-- ─────────────────────────────────────────────
-- BAGIAN 0: EKSTENSI & FUNGSI HELPER
-- ─────────────────────────────────────────────

-- Aktifkan ekstensi UUID bawaan PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Fungsi trigger untuk auto-update kolom updatedAt
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ─────────────────────────────────────────────
-- BAGIAN 1: BUAT TABEL (DROP IF EXISTS)
-- Urutan: tabel standalone terlebih dahulu
-- ─────────────────────────────────────────────

-- Tabel Admin (kredensial login dashboard)
DROP TABLE IF EXISTS "Admin" CASCADE;
CREATE TABLE "Admin" (
    "id"        TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "username"  TEXT UNIQUE NOT NULL,
    "password"  TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Profile (data diri pemilik portofolio)
DROP TABLE IF EXISTS "Profile" CASCADE;
CREATE TABLE "Profile" (
    "id"          TEXT PRIMARY KEY DEFAULT 'profile',
    "fullName"    TEXT NOT NULL DEFAULT 'M.Hafiz Suryadinata',
    "status"      TEXT NOT NULL DEFAULT 'Mahasiswa',
    "bio"         TEXT NOT NULL DEFAULT '',
    "vision"      TEXT NOT NULL DEFAULT '',
    "careerGoals" TEXT NOT NULL DEFAULT '',
    "avatarUrl"   TEXT NOT NULL DEFAULT '/avatar.jpg',
    "cvUrl"       TEXT NOT NULL DEFAULT '/cv.pdf',
    "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Contact (informasi kontak dan social media)
DROP TABLE IF EXISTS "Contact" CASCADE;
CREATE TABLE "Contact" (
    "id"        TEXT PRIMARY KEY DEFAULT 'contact',
    "email"     TEXT NOT NULL DEFAULT 'mhafizsuryadinata@gmail.com',
    "whatsapp"  TEXT NOT NULL DEFAULT '',
    "github"    TEXT NOT NULL DEFAULT '',
    "linkedin"  TEXT NOT NULL DEFAULT '',
    "instagram" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Education (riwayat pendidikan)
DROP TABLE IF EXISTS "Education" CASCADE;
CREATE TABLE "Education" (
    "id"          TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "schoolName"  TEXT NOT NULL,
    "degree"      TEXT NOT NULL,
    "period"      TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "order"       INTEGER NOT NULL DEFAULT 0,
    "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Skill (keahlian teknis)
DROP TABLE IF EXISTS "Skill" CASCADE;
CREATE TABLE "Skill" (
    "id"         TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "name"       TEXT NOT NULL,
    "category"   TEXT NOT NULL,
    "percentage" INTEGER NOT NULL DEFAULT 80,
    "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Project (proyek pemrograman)
DROP TABLE IF EXISTS "Project" CASCADE;
CREATE TABLE "Project" (
    "id"          TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "title"       TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "imageUrl"    TEXT NOT NULL DEFAULT '/projects/placeholder.png',
    "techStack"   TEXT NOT NULL DEFAULT '',
    "category"    TEXT NOT NULL DEFAULT 'Web',
    "demoUrl"     TEXT,
    "githubUrl"   TEXT,
    "order"       INTEGER NOT NULL DEFAULT 0,
    "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Certificate (sertifikasi & kredensial)
DROP TABLE IF EXISTS "Certificate" CASCADE;
CREATE TABLE "Certificate" (
    "id"            TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "title"         TEXT NOT NULL,
    "issuer"        TEXT NOT NULL,
    "issueDate"     TEXT NOT NULL,
    "imageUrl"      TEXT NOT NULL DEFAULT '/certs/placeholder.png',
    "credentialUrl" TEXT,
    "order"         INTEGER NOT NULL DEFAULT 0,
    "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Experience (pengalaman organisasi / kerja)
DROP TABLE IF EXISTS "Experience" CASCADE;
CREATE TABLE "Experience" (
    "id"           TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "organization" TEXT NOT NULL,
    "role"         TEXT NOT NULL,
    "period"       TEXT NOT NULL,
    "description"  TEXT NOT NULL DEFAULT '',
    "order"        INTEGER NOT NULL DEFAULT 0,
    "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Achievement (prestasi & penghargaan)
DROP TABLE IF EXISTS "Achievement" CASCADE;
CREATE TABLE "Achievement" (
    "id"          TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "title"       TEXT NOT NULL,
    "awarder"     TEXT NOT NULL,
    "date"        TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "icon"        TEXT NOT NULL DEFAULT 'Award',
    "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Goal (target & cita-cita)
DROP TABLE IF EXISTS "Goal" CASCADE;
CREATE TABLE "Goal" (
    "id"          TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    "title"       TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "targetYear"  TEXT NOT NULL,
    "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- BAGIAN 2: TRIGGER AUTO-UPDATE updatedAt
-- ─────────────────────────────────────────────

-- Admin
DROP TRIGGER IF EXISTS set_updated_at_admin ON "Admin";
CREATE TRIGGER set_updated_at_admin
BEFORE UPDATE ON "Admin"
FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();

-- Profile
DROP TRIGGER IF EXISTS set_updated_at_profile ON "Profile";
CREATE TRIGGER set_updated_at_profile
BEFORE UPDATE ON "Profile"
FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();

-- Contact
DROP TRIGGER IF EXISTS set_updated_at_contact ON "Contact";
CREATE TRIGGER set_updated_at_contact
BEFORE UPDATE ON "Contact"
FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();


-- ─────────────────────────────────────────────
-- BAGIAN 3: INDEX PERFORMA
-- ─────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_education_order     ON "Education" ("order");
CREATE INDEX IF NOT EXISTS idx_skill_category      ON "Skill" ("category");
CREATE INDEX IF NOT EXISTS idx_project_order       ON "Project" ("order");
CREATE INDEX IF NOT EXISTS idx_project_category    ON "Project" ("category");
CREATE INDEX IF NOT EXISTS idx_certificate_order   ON "Certificate" ("order");
CREATE INDEX IF NOT EXISTS idx_experience_order    ON "Experience" ("order");
CREATE INDEX IF NOT EXISTS idx_achievement_created ON "Achievement" ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_goal_year           ON "Goal" ("targetYear");


-- ─────────────────────────────────────────────
-- BAGIAN 4: DATA AWAL (SEED)
-- ─────────────────────────────────────────────

-- ── 4.1 Admin default ──────────────────────────────────────
-- Username : admin
-- Password : admin123
-- (Hash bcrypt $2b$10 rounds, gunakan bcryptjs di aplikasi)
INSERT INTO "Admin" ("id", "username", "password", "createdAt", "updatedAt")
VALUES (
  'admin-default-id-001',
  'admin',
  '$2b$10$gESzsw/BWEP2yITgk9wPXOQchT5vPGPiIJoL5cAnpXWOyvDVcdfs6',
  NOW(),
  NOW()
)
ON CONFLICT ("username") DO NOTHING;


-- ── 4.2 Profile default ────────────────────────────────────
-- Ganti data ini sesuai dengan informasi pribadi Anda
INSERT INTO "Profile" ("id", "fullName", "status", "bio", "vision", "careerGoals", "avatarUrl", "cvUrl", "updatedAt")
VALUES (
  'profile',
  'M.Hafiz Suryadinata',
  'Mahasiswa Teknik Informatika & Web Developer',
  'Saya adalah seorang mahasiswa Teknik Informatika yang bersemangat dalam pengembangan web dan mobile modern. Saya gemar membangun solusi digital yang efisien, estetis, dan berdampak nyata — mulai dari antarmuka yang responsif hingga arsitektur backend yang kuat. Senang berkolaborasi, terus belajar, dan selalu antusias menghadapi tantangan teknis baru.',
  'Menjadi Software Engineer profesional yang mampu merancang dan mengimplementasikan sistem teknologi berskala besar, berkontribusi aktif pada ekosistem open-source, serta memberikan dampak positif melalui produk digital yang inovatif dan inklusif.',
  'Terus mengembangkan keahlian Full-Stack, memperdalam arsitektur cloud (AWS/GCP), membangun portofolio proyek nyata yang berdampak, serta memperoleh pengalaman profesional di perusahaan teknologi terkemuka untuk memperkuat fondasi karir jangka panjang.',
  '/avatar.jpg',
  '/cv.pdf',
  NOW()
)
ON CONFLICT ("id") DO UPDATE SET
  "fullName"    = EXCLUDED."fullName",
  "status"      = EXCLUDED."status",
  "bio"         = EXCLUDED."bio",
  "vision"      = EXCLUDED."vision",
  "careerGoals" = EXCLUDED."careerGoals",
  "updatedAt"   = NOW();


-- ── 4.3 Contact default ────────────────────────────────────
-- Ganti nomor WhatsApp dan URL sosial media dengan milik Anda
INSERT INTO "Contact" ("id", "email", "whatsapp", "github", "linkedin", "instagram", "updatedAt")
VALUES (
  'contact',
  'mhafizsuryadinata@gmail.com',
  'https://wa.me/6281234567890',
  'https://github.com/mhafizsuryadinata',
  'https://linkedin.com/in/mhafizsuryadinata',
  'https://instagram.com/mhafizsuryadinata',
  NOW()
)
ON CONFLICT ("id") DO UPDATE SET
  "email"     = EXCLUDED."email",
  "whatsapp"  = EXCLUDED."whatsapp",
  "github"    = EXCLUDED."github",
  "linkedin"  = EXCLUDED."linkedin",
  "instagram" = EXCLUDED."instagram",
  "updatedAt" = NOW();


-- ── 4.4 Education default ──────────────────────────────────
INSERT INTO "Education" ("id", "schoolName", "degree", "period", "description", "order", "createdAt")
VALUES
  (
    uuid_generate_v4()::TEXT,
    'SD Negeri',
    'Sekolah Dasar',
    '2010 – 2016',
    'Menyelesaikan pendidikan dasar dan aktif dalam kegiatan ekstrakurikuler matematika dan kepramukaan.',
    1,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'SMP Negeri',
    'Sekolah Menengah Pertama',
    '2016 – 2019',
    'Mengikuti berbagai olimpiade sains tingkat kabupaten dan aktif dalam organisasi siswa (OSIS).',
    2,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'SMA / Pondok Pesantren Terpadu',
    'Sekolah Menengah Atas (MIPA)',
    '2019 – 2022',
    'Mendalami studi keagamaan sekaligus sains, memimpin organisasi santri, dan mulai tertarik pada dunia pemrograman web.',
    3,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Universitas Negeri',
    'S1 Teknik Informatika / Sistem Informasi',
    '2022 – Sekarang',
    'Fokus pada pengembangan perangkat lunak, rekayasa web & mobile, arsitektur basis data, dan aktif dalam UKM pemrograman kampus.',
    4,
    NOW()
  );


-- ── 4.5 Skills default ─────────────────────────────────────
INSERT INTO "Skill" ("id", "name", "category", "percentage", "createdAt")
VALUES
  (uuid_generate_v4()::TEXT, 'HTML5 & CSS3',       'Frontend',          95, NOW()),
  (uuid_generate_v4()::TEXT, 'JavaScript (ES6+)',   'Frontend',          88, NOW()),
  (uuid_generate_v4()::TEXT, 'React.js',            'Frontend',          85, NOW()),
  (uuid_generate_v4()::TEXT, 'Next.js',             'Frontend',          82, NOW()),
  (uuid_generate_v4()::TEXT, 'Tailwind CSS',        'Frontend',          90, NOW()),
  (uuid_generate_v4()::TEXT, 'PHP',                 'Backend',           85, NOW()),
  (uuid_generate_v4()::TEXT, 'Laravel',             'Backend',           85, NOW()),
  (uuid_generate_v4()::TEXT, 'Node.js',             'Backend',           75, NOW()),
  (uuid_generate_v4()::TEXT, 'MySQL',               'Database',          80, NOW()),
  (uuid_generate_v4()::TEXT, 'PostgreSQL',          'Database',          78, NOW()),
  (uuid_generate_v4()::TEXT, 'Kotlin (Android)',    'Mobile',            72, NOW()),
  (uuid_generate_v4()::TEXT, 'Git & GitHub',        'Tools & DevOps',    88, NOW()),
  (uuid_generate_v4()::TEXT, 'Docker',              'Tools & DevOps',    65, NOW()),
  (uuid_generate_v4()::TEXT, 'Linux (Ubuntu/Arch)', 'Tools & DevOps',    78, NOW());


-- ── 4.6 Projects default ───────────────────────────────────
INSERT INTO "Project" ("id", "title", "description", "imageUrl", "techStack", "category", "demoUrl", "githubUrl", "order", "createdAt")
VALUES
  (
    uuid_generate_v4()::TEXT,
    'AlumniDarli — Portal Alumni Pesantren',
    'Platform jejaring alumni pesantren terintegrasi dengan fitur peta persebaran alumni (Leaflet), portal lowongan kerja, sistem donasi, verifikasi OTP, moderasi komentar admin & mudir, serta dashboard statistik real-time.',
    '/projects/darli.png',
    'Laravel, MySQL, Leaflet.js, Bootstrap, Kotlin, Retrofit',
    'Web',
    'https://alumni.darlis.net',
    'https://github.com/mhafizsuryadinata/AlumniDarli',
    1,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Website Portofolio Pribadi',
    'Website portofolio premium dengan mode gelap/terang, animasi scroll Framer Motion, admin dashboard CRUD untuk semua konten, serta backend Prisma + Supabase PostgreSQL untuk manajemen data dinamis.',
    '/projects/portfolio.png',
    'Next.js, TypeScript, Tailwind CSS, Prisma, Supabase, Framer Motion',
    'Web',
    'https://mhafizsuryadinata.vercel.app',
    'https://github.com/mhafizsuryadinata/portfolio-mhafizsuryadinata',
    2,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Sistem Login Multi-Role Laravel',
    'Implementasi autentikasi dan otorisasi multi-role (Admin, Mudir, Alumni) menggunakan guard bawaan Laravel, middleware custom, session security token, dan ACL kelola hak akses halaman.',
    '/projects/multirole.png',
    'Laravel, Blade, MySQL, Tailwind CSS',
    'Web',
    NULL,
    'https://github.com/mhafizsuryadinata/laravel-multirole',
    3,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Aplikasi Android Alumni (DARLI Mobile)',
    'Klien Android native untuk platform DARLI menggunakan Kotlin, integrasi Retrofit REST API, autentikasi sesi, verifikasi keamanan pertanyaan rahasia, dan WebView peta interaktif alumni.',
    '/projects/kotlin.png',
    'Kotlin, Android SDK, Retrofit, WebView, JSON',
    'Mobile',
    NULL,
    'https://github.com/mhafizsuryadinata/darli-android',
    4,
    NOW()
  );


-- ── 4.7 Certificates default ───────────────────────────────
INSERT INTO "Certificate" ("id", "title", "issuer", "issueDate", "imageUrl", "credentialUrl", "order", "createdAt")
VALUES
  (
    uuid_generate_v4()::TEXT,
    'Belajar Dasar Pemrograman Web',
    'Dicoding Indonesia',
    'Februari 2023',
    '/certs/dicoding-web.png',
    'https://www.dicoding.com/certificates/example1',
    1,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Belajar Membuat Aplikasi Android untuk Pemula',
    'Dicoding Indonesia',
    'Mei 2023',
    '/certs/dicoding-android.png',
    'https://www.dicoding.com/certificates/example2',
    2,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Database Design and Programming with SQL',
    'Oracle Academy',
    'Oktober 2023',
    '/certs/oracle-db.png',
    NULL,
    3,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Belajar Back-End Pemula dengan JavaScript',
    'Dicoding Indonesia',
    'Januari 2024',
    '/certs/dicoding-backend.png',
    'https://www.dicoding.com/certificates/example3',
    4,
    NOW()
  );


-- ── 4.8 Experience default ─────────────────────────────────
INSERT INTO "Experience" ("id", "organization", "role", "period", "description", "order", "createdAt")
VALUES
  (
    uuid_generate_v4()::TEXT,
    'Himpunan Mahasiswa Informatika',
    'Anggota Divisi Hubungan Masyarakat',
    '2023 – 2024',
    'Bertanggung jawab menjalin relasi antar mahasiswa, mengoordinasikan acara sosialisasi, mengelola saluran komunikasi resmi, dan mendistribusikan informasi kegiatan akademik & non-akademik.',
    1,
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Unit Kegiatan Mahasiswa Pemrograman',
    'Ketua Bidang Pengembangan Web',
    '2024 – Sekarang',
    'Memimpin divisi pengembangan web, menyelenggarakan workshop mingguan pemrograman (HTML, CSS, JavaScript, React), mengoordinasikan proyek tim, dan membimbing anggota junior dalam pengerjaan tugas akhir.',
    2,
    NOW()
  );


-- ── 4.9 Achievements default ───────────────────────────────
INSERT INTO "Achievement" ("id", "title", "awarder", "date", "description", "icon", "createdAt")
VALUES
  (
    uuid_generate_v4()::TEXT,
    'Juara 2 Hackathon Mahasiswa Nasional',
    'Kementerian Komunikasi dan Informatika RI',
    'November 2024',
    'Merancang dan mengembangkan solusi aplikasi AlumniDarli untuk pengelolaan jaringan alumni pesantren secara terintegrasi dalam waktu 48 jam intensif bersama tim 3 orang.',
    'Award',
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Mahasiswa Berprestasi Bidang Teknologi',
    'Rektorat Universitas',
    'Maret 2025',
    'Diberikan atas kontribusi aktif dalam riset dan pengembangan aplikasi mobile kemasyarakatan serta prestasi akademik dengan IPK di atas 3.75.',
    'Trophy',
    NOW()
  );


-- ── 4.10 Goals default ─────────────────────────────────────
INSERT INTO "Goal" ("id", "title", "description", "targetYear", "createdAt")
VALUES
  (
    uuid_generate_v4()::TEXT,
    'Lulus Tepat Waktu dengan Predikat Cumlaude',
    'Menyelesaikan skripsi dengan topik Kecerdasan Buatan / Rekayasa Perangkat Lunak dan lulus tepat waktu dengan IPK ≥ 3.75.',
    '2026',
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Mendapatkan Sertifikasi AWS Solutions Architect',
    'Memperdalam pengetahuan arsitektur komputasi awan untuk meningkatkan kesiapan kerja di industri teknologi skala besar dan enterprise.',
    '2026',
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Bekerja Sebagai Software Engineer Profesional',
    'Memulai karir profesional sebagai Software Engineer (Frontend/Fullstack) di perusahaan teknologi terkemuka untuk mengimplementasikan solusi nyata berskala besar.',
    '2026',
    NOW()
  ),
  (
    uuid_generate_v4()::TEXT,
    'Membangun Produk SaaS atau Open-Source Sendiri',
    'Merancang dan meluncurkan produk digital (SaaS / library open-source) yang bisa digunakan oleh komunitas pengembang Indonesia secara luas.',
    '2027',
    NOW()
  );


-- ─────────────────────────────────────────────
-- BAGIAN 5: VERIFIKASI
-- ─────────────────────────────────────────────
-- Jalankan query ini secara terpisah untuk memverifikasi data berhasil masuk:
--
-- SELECT 'Admin'       AS tabel, COUNT(*) FROM "Admin"
-- UNION ALL
-- SELECT 'Profile'     AS tabel, COUNT(*) FROM "Profile"
-- UNION ALL
-- SELECT 'Contact'     AS tabel, COUNT(*) FROM "Contact"
-- UNION ALL
-- SELECT 'Education'   AS tabel, COUNT(*) FROM "Education"
-- UNION ALL
-- SELECT 'Skill'       AS tabel, COUNT(*) FROM "Skill"
-- UNION ALL
-- SELECT 'Project'     AS tabel, COUNT(*) FROM "Project"
-- UNION ALL
-- SELECT 'Certificate' AS tabel, COUNT(*) FROM "Certificate"
-- UNION ALL
-- SELECT 'Experience'  AS tabel, COUNT(*) FROM "Experience"
-- UNION ALL
-- SELECT 'Achievement' AS tabel, COUNT(*) FROM "Achievement"
-- UNION ALL
-- SELECT 'Goal'        AS tabel, COUNT(*) FROM "Goal";


-- ─────────────────────────────────────────────
-- SELESAI ✅
-- Setelah menjalankan SQL ini, lanjutkan ke:
--   1. Isi .env dengan DATABASE_URL & DIRECT_URL dari Supabase
--   2. Jalankan: npx prisma db push
--   3. Akses admin di: http://localhost:3000/admin
--      Username: admin | Password: admin123
-- ─────────────────────────────────────────────
