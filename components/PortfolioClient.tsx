"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Sparkles,
  FolderCode,
  Award,
  Briefcase,
  Trophy,
  Target,
  Mail,
  Link2,
  ExternalLink,
  AtSign,
  ArrowUpRight,
  Menu,
  X,
  Sun,
  Moon,
  Send,
  Download,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface PortfolioClientProps {
  profile: any;
  contact: any;
  education: any[];
  skills: any[];
  projects: any[];
  certificates: any[];
  experience: any[];
  achievements: any[];
  goals: any[];
}

export default function PortfolioClient({
  profile,
  contact,
  education,
  skills,
  projects,
  certificates,
  experience,
  achievements,
  goals,
}: PortfolioClientProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectCategory, setActiveProjectCategory] = useState("Semua");
  
  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navLinks = [
    { label: "Tentang", href: "#tentang" },
    { label: "Pendidikan", href: "#pendidikan" },
    { label: "Keahlian", href: "#keahlian" },
    { label: "Proyek", href: "#proyek" },
    { label: "Sertifikat", href: "#sertifikat" },
    { label: "Pengalaman", href: "#pengalaman" },
    { label: "Prestasi", href: "#prestasi" },
    { label: "Target", href: "#target" },
    { label: "Kontak", href: "#kontak" },
  ];

  // Filtering projects
  const projectCategories = ["Semua", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects =
    activeProjectCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === activeProjectCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 scroll-smooth">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="#" className="font-extrabold text-xl tracking-wider text-blue-600 dark:text-blue-400">
            MHS.
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors"
              title="Ganti Tema"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 lg:hidden text-slate-650 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white rounded-full transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slideover */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 p-6 flex flex-col gap-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-lg tracking-wider text-blue-600 dark:text-blue-400">MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-bold tracking-wide text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-36 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 dark:bg-blue-400/2 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/5 dark:bg-emerald-400/2 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/30 dark:bg-blue-950/30 dark:text-blue-400 text-xs font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {profile.status}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Halo, Saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">{profile.fullName}</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-650 dark:text-slate-400 leading-relaxed max-w-xl font-light">
              {profile.bio}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="#kontak"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/15 transition-all"
              >
                <Mail className="h-4.5 w-4.5" />
                Hubungi Saya
              </a>
              {profile.cvUrl && profile.cvUrl !== "#" && (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl border border-slate-300 hover:border-slate-800 dark:border-slate-750 dark:hover:border-slate-200 px-6 py-3.5 text-sm font-bold transition-all"
                >
                  <Download className="h-4.5 w-4.5" />
                  Unduh CV
                </a>
              )}
            </div>
          </motion.div>

          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative group w-64 h-64 sm:w-80 sm:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 blur-md opacity-40 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden relative z-10 bg-slate-100 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Profil Saya</h2>
            <p className="text-3xl font-bold tracking-tight">Visi & Sasaran Karier</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 shadow-sm space-y-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Visi Pengembangan</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                {profile.vision}
              </p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 30 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 shadow-sm space-y-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Tujuan & Rencana Karir</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                {profile.careerGoals}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section id="pendidikan" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Timeline Akademik</h2>
            <p className="text-3xl font-bold tracking-tight">Riwayat Pendidikan</p>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-12">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.id}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                className="relative space-y-2"
              >
                <div className="absolute -left-11 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md border-4 border-slate-50 dark:border-slate-950">
                  <GraduationCap className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                    {edu.period}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.schoolName}</h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-350">{edu.degree}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="keahlian" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Keahlian & Teknologi</h2>
            <p className="text-3xl font-bold tracking-tight">Teknologi yang Saya Kuasai</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {Array.from(new Set(skills.map((s) => s.category))).map((cat) => (
              <div key={cat} className="space-y-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 border-l-4 border-blue-600 pl-3">
                  {cat}
                </h3>
                <div className="space-y-4">
                  {skills
                    .filter((s) => s.category === cat)
                    .map((skill) => (
                      <div key={skill.id} className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-950 dark:text-white">{skill.name}</span>
                          <span className="text-slate-500 dark:text-slate-400 font-semibold">{skill.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2.5 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyek" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Portofolio Pemrograman</h2>
            <p className="text-3xl font-bold tracking-tight">Proyek Pilihan Terkini</p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveProjectCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all border ${
                  activeProjectCategory === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                    : "border-slate-250 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-slate-100 bg-white dark:border-slate-900 dark:bg-slate-900/50 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all group"
                >
                  <div className="relative bg-slate-100 dark:bg-slate-950">
                    <span className="text-[10px] absolute left-4 top-4 px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold shadow z-10">
                      {project.category}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-auto object-contain max-h-72 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          const icon = parent.querySelector(".fallback-icon");
                          if (icon) (icon as HTMLElement).style.display = "flex";
                        }
                      }}
                    />
                    <div className="fallback-icon h-52 items-center justify-center" style={{ display: "none" }}>
                      <FolderCode className="h-12 w-12 text-slate-300 dark:text-slate-700" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.split(",").map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100 dark:bg-slate-950/60 dark:text-slate-350 dark:border-slate-850"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light pt-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-2 border-t border-slate-50 dark:border-slate-850/60">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Demo Live
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:underline"
                        >
                          <Link2 className="h-3.5 w-3.5" />
                          Repository
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="sertifikat" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Kredensial Profesional</h2>
            <p className="text-3xl font-bold tracking-tight">Sertifikasi Kompetensi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 p-5 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="space-y-4">
                  <div className="bg-slate-100 dark:bg-slate-950/80 rounded-lg relative overflow-hidden border border-slate-150 dark:border-slate-850">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-auto object-contain max-h-56"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          const icon = parent.querySelector(".fallback-icon");
                          if (icon) (icon as HTMLElement).style.display = "flex";
                        }
                      }}
                    />
                    <div className="fallback-icon h-32 items-center justify-center" style={{ display: "none" }}>
                      <Award className="h-10 w-10 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold leading-snug line-clamp-2 text-slate-900 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-705 dark:text-slate-350">{cert.issuer}</p>
                    <p className="text-[11px] text-slate-450 dark:text-slate-400">{cert.issueDate}</p>
                  </div>
                </div>
                {cert.credentialUrl && (
                  <div className="pt-4 border-t border-slate-150 dark:border-slate-850 mt-4">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Verifikasi Kredensial
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="pengalaman" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Pengalaman Keorganisasian</h2>
            <p className="text-3xl font-bold tracking-tight">Organisasi & Kepemimpinan</p>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-12">
            {experience.map((item) => (
              <motion.div
                key={item.id}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                className="relative space-y-2"
              >
                <div className="absolute -left-11 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md border-4 border-slate-50 dark:border-slate-950">
                  <Briefcase className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-650 dark:bg-emerald-950/30 dark:text-emerald-400">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.organization}</h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-350">{item.role}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="prestasi" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Pencapaian Terbaik</h2>
            <p className="text-3xl font-bold tracking-tight">Prestasi & Kompetisi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((item) => (
              <motion.div
                key={item.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="flex gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shrink-0">
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-650 border border-amber-150 dark:bg-amber-955/20 dark:text-amber-400">
                    {item.date}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white pt-1">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-705 dark:text-slate-350">{item.awarder}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section id="target" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Roadmap Masa Depan</h2>
            <p className="text-3xl font-bold tracking-tight">Target & Cita-Cita Terdekat</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((item) => (
              <motion.div
                key={item.id}
                whileInView={{ opacity: 1, scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-slate-100 bg-white dark:border-slate-900 dark:bg-slate-900/50 shadow-sm space-y-4 hover:border-blue-300 dark:hover:border-blue-900 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-650 dark:text-indigo-400">
                    <Target className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                    Tahun {item.targetYear}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 bg-slate-900 text-white dark:bg-slate-950 border-t border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest font-black text-blue-400">HUBUNGI SAYA</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Mari Berkolaborasi!</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Apakah Anda memiliki proyek menarik, tawaran kolaborasi, atau sekadar ingin menyapa? Hubungi saya kapan saja dan mari diskusikan solusinya.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Email</p>
                  <a href={`mailto:${contact.email}`} className="hover:underline font-semibold">
                    {contact.email}
                  </a>
                </div>
              </div>
              {contact.whatsapp && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">WhatsApp</p>
                    <a href={contact.whatsapp} target="_blank" className="hover:underline font-semibold">
                      Hubungi via WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  title="GitHub"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white transition-colors"
                >
                  <Link2 className="h-5 w-5" />
                </a>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  title="LinkedIn"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  title="Instagram"
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white transition-colors"
                >
                  <AtSign className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-800 border border-slate-700 text-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="text-lg font-bold">Pesan Terkirim!</h3>
                <p className="text-sm text-slate-350 max-w-sm">
                  Terima kasih atas pesan Anda. Saya akan meninjau dan merespon kembali secepatnya.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 p-8 rounded-2xl bg-slate-800/50 border border-slate-800 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Alamat Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Isi Pesan</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full text-sm rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full justify-center items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-750 px-5 py-3 text-sm font-bold text-white transition-all shadow-md"
                  >
                    Kirim Pesan
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-8 border-t border-slate-900 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <p>&copy; {new Date().getFullYear()} M. Hafiz Suryadinata. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="font-light text-[10px]">Dibuat dengan Next.js App Router, TypeScript, dan Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
