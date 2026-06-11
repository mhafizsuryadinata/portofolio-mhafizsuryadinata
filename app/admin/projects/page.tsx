"use client";

import React, { useState, useEffect } from "react";
import { FolderCode, Plus, Edit2, Trash2, Save, X, Loader2, AlertCircle, ExternalLink, Link2, Upload } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string;
  category: string;
  demoUrl: string | null;
  githubUrl: string | null;
  order: number;
};

const CATEGORIES = ["Web", "Mobile", "IoT", "UI/UX", "Others"];

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [techStack, setTechStack] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [order, setOrder] = useState(0);

  const [showForm, setShowForm] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        setError(data.message || "Gagal mengunggah gambar.");
      }
    } catch (err) {
      setError("Kesalahan koneksi saat mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success) {
        setItems(data.projects);
      } else {
        setError(data.message || "Gagal mengambil data proyek.");
      }
    } catch (err) {
      setError("Gagal menghubungkan ke server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item: Project) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setTechStack(item.techStack);
    setCategory(item.category);
    setDemoUrl(item.demoUrl || "");
    setGithubUrl(item.githubUrl || "");
    setOrder(item.order);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setTechStack("");
    setCategory(CATEGORIES[0]);
    setDemoUrl("");
    setGithubUrl("");
    setOrder(0);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      description,
      imageUrl: imageUrl || "/projects/placeholder.png",
      techStack,
      category,
      demoUrl: demoUrl || null,
      githubUrl: githubUrl || null,
      order: Number(order) || 0,
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (data.success) {
        handleCancel();
        await fetchItems();
      } else {
        setError(data.message || "Gagal menyimpan data.");
      }
    } catch (err) {
      setError("Kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      setError(null);
      try {
        const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          await fetchItems();
        } else {
          setError(data.message || "Gagal menghapus data.");
        }
      } catch (err) {
        setError("Kesalahan koneksi saat menghapus.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data proyek...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Portofolio Proyek</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Atur kartu proyek, screenshot, link demo live, repositori github, dan teknologi stack.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              handleCancel();
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Tambah Proyek
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-4 animate-slideDown">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <FolderCode className="h-5 w-5 text-blue-600" />
              {editingId ? "Edit Proyek Pemrograman" : "Tambah Proyek Pemrograman"}
            </h3>
            <button type="button" onClick={handleCancel} className="text-slate-450 hover:text-slate-700 dark:hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Nama / Judul Proyek</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: DARLI (Aplikasi Alumni Pesantren)"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Kategori Proyek</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Teknologi Stack (Pisahkan dengan koma)</label>
              <input
                type="text"
                required
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="Contoh: Laravel, Next.js, Kotlin, MySQL"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Gambar Screenshot Proyek</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Contoh: /projects/darli.png atau URL eksternal"
                  className="flex-1 text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
                <label className="flex items-center gap-1.5 cursor-pointer justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 shrink-0 select-none">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {uploading ? "Mengunggah..." : "Pilih File"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Link Demo Aplikasi (Opsional)</label>
              <input
                type="text"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="Contoh: https://darli-demo.example.com"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Link GitHub Repository (Opsional)</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="Contoh: https://github.com/mhafizsuryadinata/AlumniDarli"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Urutan Tampilan</label>
              <input
                type="number"
                required
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                placeholder="Urutan tampilan di halaman depan"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Deskripsi Singkat Proyek</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tuliskan latar belakang, fitur utama, dan penyelesaian masalah dari proyek ini..."
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs font-semibold px-4 py-2.5 border border-slate-300 dark:border-slate-750 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Simpan Proyek
            </button>
          </div>
        </form>
      )}

      {/* Grid Projects */}
      {items.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <FolderCode className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Belum Ada Proyek Pemrograman</h3>
          <p className="mt-1 text-sm text-slate-500">Silakan tambahkan proyek coding buatan Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-100 bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Image preview */}
              <div className="relative border-b border-slate-100 dark:border-slate-850 bg-slate-100 dark:bg-slate-950">
                <span className="text-xs absolute left-3 top-3 px-2 py-0.5 rounded-full bg-blue-600 text-white font-semibold shadow z-10">
                  {item.category}
                </span>
                <span className="text-xs absolute right-3 top-3 text-slate-100 z-10 bg-slate-900/60 px-2 py-0.5 rounded">
                  Urutan: {item.order}
                </span>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto object-contain max-h-64"
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center">
                    <FolderCode className="h-10 w-10 text-slate-400" />
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.techStack.split(",").map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-655 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 pt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-850">
                  <div className="flex gap-2">
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Demo Live"
                      >
                        <ExternalLink className="h-4.5 w-4.5" />
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        className="p-1.5 text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors"
                        title="Repository GitHub"
                      >
                        <Link2 className="h-4.5 w-4.5" />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-xs font-semibold px-3 py-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg dark:text-slate-300 dark:bg-slate-850 dark:hover:bg-slate-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs font-semibold px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg dark:text-red-400 dark:bg-red-955/20 dark:hover:bg-red-950/30 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
