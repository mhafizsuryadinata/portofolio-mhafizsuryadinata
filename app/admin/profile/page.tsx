"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, ShieldAlert, Loader2, Save, CheckCircle2, Upload } from "lucide-react";

export default function AdminProfilePage() {
  // Profile State
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");
  const [vision, setVision] = useState("");
  const [careerGoals, setCareerGoals] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  // Contact State
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");

  // Password State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "cv") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "avatar") setUploadingAvatar(true);
    else setUploadingCv(true);

    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        if (type === "avatar") {
          setAvatarUrl(data.url);
        } else {
          setCvUrl(data.url);
        }
      } else {
        setMessage({ type: "error", text: data.message || "Gagal mengunggah file." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Kesalahan koneksi saat mengunggah file." });
    } finally {
      if (type === "avatar") setUploadingAvatar(false);
      else setUploadingCv(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [profRes, contRes] = await Promise.all([
          fetch("/api/admin/profile"),
          fetch("/api/admin/contact"),
        ]);
        
        const profData = await profRes.json();
        const contData = await contRes.json();

        if (profData.success && profData.profile) {
          setFullName(profData.profile.fullName || "");
          setStatus(profData.profile.status || "");
          setBio(profData.profile.bio || "");
          setVision(profData.profile.vision || "");
          setCareerGoals(profData.profile.careerGoals || "");
          setAvatarUrl(profData.profile.avatarUrl || "");
          setCvUrl(profData.profile.cvUrl || "");
        }

        if (contData.success && contData.contact) {
          setEmail(contData.contact.email || "");
          setWhatsapp(contData.contact.whatsapp || "");
          setGithub(contData.contact.github || "");
          setLinkedin(contData.contact.linkedin || "");
          setInstagram(contData.contact.instagram || "");
        }
      } catch (err) {
        setMessage({ type: "error", text: "Gagal mengambil data dari server. Periksa database Anda." });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Konfirmasi password baru tidak cocok." });
      setSaving(false);
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setMessage({ type: "error", text: "Password baru minimal 6 karakter." });
      setSaving(false);
      return;
    }

    try {
      // 1. Save Profile (including password if filled)
      const profRes = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          status,
          bio,
          vision,
          careerGoals,
          avatarUrl,
          cvUrl,
          newPassword: newPassword || undefined,
        }),
      });

      // 2. Save Contact
      const contRes = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          whatsapp,
          github,
          linkedin,
          instagram,
        }),
      });

      const profData = await profRes.json();
      const contData = await contRes.json();

      if (profData.success && contData.success) {
        setMessage({ type: "success", text: "Profil dan data kontak berhasil disimpan!" });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: profData.message || contData.message || "Gagal menyimpan perubahan." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan data." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data profil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Profil & Kontak</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Perbarui biodata personal, link sosial media, dan kredensial login Anda.</p>
        </div>
      </div>

      {message && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border text-sm ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-250 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-450"
              : "bg-red-50 border-red-250 text-red-800 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-405"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <ShieldAlert className="h-5 w-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <User className="h-5 w-5 text-blue-600" />
            Informasi Profil
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Status / Pekerjaan</label>
              <input
                type="text"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Cerita Singkat (Bio)</label>
              <textarea
                rows={4}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Visi Pengembangan</label>
              <textarea
                rows={3}
                required
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Tujuan Karier</label>
              <textarea
                rows={3}
                required
                value={careerGoals}
                onChange={(e) => setCareerGoals(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Foto Profil (Avatar)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="flex-1 text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
                <label className="flex items-center gap-1.5 cursor-pointer justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 shrink-0 select-none">
                  {uploadingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {uploadingAvatar ? "Mengunggah..." : "Pilih File"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "avatar")}
                    disabled={uploadingAvatar}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">File CV (Unduhan)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={cvUrl}
                  onChange={(e) => setCvUrl(e.target.value)}
                  className="flex-1 text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
                <label className="flex items-center gap-1.5 cursor-pointer justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 shrink-0 select-none">
                  {uploadingCv ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {uploadingCv ? "Mengunggah..." : "Pilih File"}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "cv")}
                    disabled={uploadingCv}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Mail className="h-5 w-5 text-blue-600" />
            Informasi Kontak & Sosial Media
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">WhatsApp Link (e.g. https://wa.me/...)</label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">GitHub Link</label>
              <input
                type="text"
                required
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">LinkedIn Link</label>
              <input
                type="text"
                required
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-355 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Instagram Link</label>
              <input
                type="text"
                required
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <ShieldAlert className="h-5 w-5 text-red-650" />
            Ubah Password Admin
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Password Baru (Biarkan kosong jika tidak diubah)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Konfirmasi Password Baru</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password baru"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 transition-colors disabled:bg-blue-450 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
