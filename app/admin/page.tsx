"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FolderCode, Award, Sparkles, Briefcase, GraduationCap, Trophy, ChevronRight, Loader2, Database } from "lucide-react";

type Stats = {
  projectsCount: number;
  certificatesCount: number;
  skillsCount: number;
  experienceCount: number;
  educationCount: number;
  achievementsCount: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        } else {
          setError(data.message || "Gagal mengambil data statistik.");
        }
      } catch (err) {
        setError("Koneksi gagal atau database belum dikonfigurasi.");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Proyek Pemrograman",
      count: stats?.projectsCount ?? 0,
      icon: FolderCode,
      color: "bg-blue-500 text-blue-500",
      bgLight: "bg-blue-50 dark:bg-blue-900/10",
      href: "/admin/projects",
    },
    {
      title: "Sertifikasi Profesional",
      count: stats?.certificatesCount ?? 0,
      icon: Award,
      color: "bg-emerald-500 text-emerald-500",
      bgLight: "bg-emerald-50 dark:bg-emerald-900/10",
      href: "/admin/certificates",
    },
    {
      title: "Keahlian & Teknologi",
      count: stats?.skillsCount ?? 0,
      icon: Sparkles,
      color: "bg-purple-500 text-purple-500",
      bgLight: "bg-purple-50 dark:bg-purple-900/10",
      href: "/admin/skills",
    },
    {
      title: "Pengalaman Organisasi",
      count: stats?.experienceCount ?? 0,
      icon: Briefcase,
      color: "bg-amber-500 text-amber-500",
      bgLight: "bg-amber-50 dark:bg-amber-900/10",
      href: "/admin/experience",
    },
    {
      title: "Timeline Pendidikan",
      count: stats?.educationCount ?? 0,
      icon: GraduationCap,
      color: "bg-indigo-500 text-indigo-500",
      bgLight: "bg-indigo-50 dark:bg-indigo-900/10",
      href: "/admin/education",
    },
    {
      title: "Prestasi Milestones",
      count: stats?.achievementsCount ?? 0,
      icon: Trophy,
      color: "bg-red-500 text-red-500",
      bgLight: "bg-red-50 dark:bg-red-900/10",
      href: "/admin/achievements",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat statistik dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-slate-800 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/40">
            <Database className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Gagal Menghubungkan ke Database</h3>
            <p className="mt-1 text-sm text-slate-650 dark:text-slate-400">
              Prisma tidak dapat terhubung ke database Supabase Anda. Hal ini kemungkinan disebabkan karena Anda belum melengkapi file <code>.env</code> dengan kredensial database Supabase Anda, atau belum mengimpor file SQL ke Supabase SQL Editor.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/admin/profile"
                className="text-xs font-semibold px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800 transition-colors"
              >
                Tetap Masuk ke Pengaturan Profile
              </Link>
              <a
                href="/supabase_setup.sql"
                target="_blank"
                className="text-xs font-semibold px-4 py-2 border border-slate-350 dark:border-slate-750 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                Lihat File SQL Supabase
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        <div className="relative z-10 space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold">Selamat Datang Kembali, M. Hafiz!</h2>
          <p className="text-sm sm:text-base text-blue-100 font-light">
            Melalui panel admin ini, Anda dapat mengelola semua data portofolio pribadi Anda seperti proyek, keterampilan, sertifikat, dan kontak secara dinamis dan real-time.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white text-blue-900 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors shadow-sm"
            >
              Kunjungi Web Portofolio
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div>
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">Statistik Data Portofolio</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-6 rounded-xl bg-white border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
                  <p className="text-3xl font-bold tracking-tight">{card.count}</p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-0.5 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline pt-1"
                  >
                    Kelola data
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className={`p-3 rounded-lg ${card.bgLight}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shortcuts / Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-semibold text-base">Alur Kerja Cepat</h3>
          <ul className="text-sm space-y-3 text-slate-600 dark:text-slate-400">
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold shrink-0 dark:bg-blue-950 dark:text-blue-400">1</span>
              <span>Perbarui biodata dan visi karir Anda di tab <strong>Profil</strong>.</span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold shrink-0 dark:bg-blue-950 dark:text-blue-400">2</span>
              <span>Tambahkan keahlian baru di tab <strong>Keterampilan</strong>.</span>
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold shrink-0 dark:bg-blue-950 dark:text-blue-400">3</span>
              <span>Unggah dan deskripsikan proyek terbaru Anda di tab <strong>Proyek</strong>.</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-semibold text-base">Catatan Integrasi Supabase</h3>
          <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
            Karena website portofolio ini menggunakan Supabase PostgreSQL sebagai backend basis datanya, pastikan skema tabel sudah diimpor. Anda bisa menyalin file SQL yang disediakan langsung ke console query editor Supabase Anda agar relasi dan nilai awal terbuat secara instan.
          </p>
          <div className="text-xs bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 font-mono text-slate-500">
            Path File SQL: root/supabase_setup.sql
          </div>
        </div>
      </div>
    </div>
  );
}
