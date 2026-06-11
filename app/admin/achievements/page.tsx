"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Plus, Edit2, Trash2, Save, X, Loader2, AlertCircle } from "lucide-react";

type Achievement = {
  id: string;
  title: string;
  awarder: string;
  date: string;
  description: string;
  icon: string;
};

const ICONS = ["Trophy", "Award", "Medal", "Star"];

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [awarder, setAwarder] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(ICONS[0]);

  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/achievements");
      const data = await res.json();
      if (data.success) {
        setItems(data.achievements);
      } else {
        setError(data.message || "Gagal mengambil data prestasi.");
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

  const handleEdit = (item: Achievement) => {
    setEditingId(item.id);
    setTitle(item.title);
    setAwarder(item.awarder);
    setDate(item.date);
    setDescription(item.description);
    setIcon(item.icon);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setAwarder("");
    setDate("");
    setDescription("");
    setIcon(ICONS[0]);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { title, awarder, date, description, icon };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/achievements/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/achievements", {
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
    if (confirm("Apakah Anda yakin ingin menghapus data prestasi ini?")) {
      setError(null);
      try {
        const res = await fetch(`/api/admin/achievements/${id}`, { method: "DELETE" });
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
        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data prestasi...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Prestasi & Milestones</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Atur pencapaian, juara kompetisi, atau penghargaan akademik/non-akademik Anda.</p>
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
            Tambah Prestasi
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-955/20 dark:text-red-400 border border-red-105 dark:border-red-900/30">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-4 animate-slideDown">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Trophy className="h-5 w-5 text-blue-600" />
              {editingId ? "Edit Pencapaian Prestasi" : "Tambah Pencapaian Prestasi"}
            </h3>
            <button type="button" onClick={handleCancel} className="text-slate-450 hover:text-slate-700 dark:hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Judul Penghargaan / Juara</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Juara 1 Web Design Competition"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Penyelenggara / Instansi Pemberi</label>
              <input
                type="text"
                required
                value={awarder}
                onChange={(e) => setAwarder(e.target.value)}
                placeholder="Contoh: Universitas Indonesia"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-955 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Tanggal Perolehan</label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Contoh: Juni 2024 atau 12 Juli 2024"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-955 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Ikon Tampilan</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-955 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              >
                {ICONS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Deskripsi & Rincian Pencapaian</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan mengenai kompetisi, jumlah peserta, atau pencapaian yang berhasil diraih..."
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-955 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
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
              Simpan Data
            </button>
          </div>
        </form>
      )}

      {/* Grid Achievements List */}
      <div className="grid grid-cols-1 gap-4">
        {items.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Trophy className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Belum Ada Riwayat Prestasi</h3>
            <p className="mt-1 text-sm text-slate-500">Silakan tambahkan data pencapaian prestasi Anda.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start p-5 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    {item.date}
                  </span>
                  <span className="text-xs text-slate-400">
                    Ikon: {item.icon}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.awarder}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-1 whitespace-pre-line">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-slate-500 hover:text-red-650 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
