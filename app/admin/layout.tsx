"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Sparkles,
  FolderCode,
  Award,
  Briefcase,
  Target,
  Mail,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Loader2,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { name: "Ringkasan", href: "/admin", icon: LayoutDashboard },
    { name: "Profil", href: "/admin/profile", icon: User },
    { name: "Pendidikan", href: "/admin/education", icon: GraduationCap },
    { name: "Keterampilan", href: "/admin/skills", icon: Sparkles },
    { name: "Proyek", href: "/admin/projects", icon: FolderCode },
    { name: "Sertifikat", href: "/admin/certificates", icon: Award },
    { name: "Pengalaman", href: "/admin/experience", icon: Briefcase },
    { name: "Prestasi", href: "/admin/achievements", icon: Award },
    { name: "Target & Cita-Cita", href: "/admin/goals", icon: Target },
  ];

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      setIsLoggingOut(true);
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        if (res.ok) {
          router.push("/login");
          router.refresh();
        }
      } catch (err) {
        console.error("Logout error", err);
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  // Close sidebar on page change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shrink-0 dark:bg-slate-950 dark:border-r dark:border-slate-800">
        <div className="h-16 flex items-center justify-between px-6 bg-slate-955 border-b border-slate-800">
          <Link href="/admin" className="font-bold text-lg tracking-wider text-blue-400">
            HAFIZ ADMIN
          </Link>
          <Link href="/" target="_blank" className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="Lihat Website">
            <Home className="h-5 w-5" />
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-350 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <span className="flex items-center gap-3">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
            </span>
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoggingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5 shrink-0" />}
            Keluar
          </button>
        </div>
      </aside>

      {/* Sidebar for Mobile (Overlay) */}
      <div
        className={`fixed inset-0 z-50 md:hidden bg-black/50 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <aside
          className={`flex flex-col w-64 h-full bg-slate-900 text-white transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
            <span className="font-bold text-lg text-blue-400">HAFIZ ADMIN</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-350 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-800 space-y-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
            >
              <span className="flex items-center gap-3">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
              </span>
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5 shrink-0" />}
              Keluar
            </button>
          </div>
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 md:hidden text-slate-650 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="font-semibold text-lg text-slate-800 dark:text-slate-100 hidden sm:block">
              {pathname === "/admin"
                ? "Ringkasan Dashboard"
                : pathname.split("/").pop()?.toUpperCase() || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-450 hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors"
            >
              Lihat Website Utama &rarr;
            </Link>
          </div>
        </header>

        {/* Content Box */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
