"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Plus, Edit2, Trash2, Save, X, Loader2, AlertCircle } from "lucide-react";

type Experience = {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  order: number;
};

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);

  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/experience");
      const data = await res.json();
      if (data.success) {
        setItems(data.experiences);
      } else {
        setError(data.message || "Gagal mengambil data pengalaman.");
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

  const handleEdit = (item: Experience) => {
    setEditingId(item.id);
    setOrganization(item.organization);
    setRole(item.role);
    setPeriod(item.period);
    setDescription(item.description);
    setOrder(item.order);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setOrganization("");
    setRole("");
    setPeriod("");
    setDescription("");
    setOrder(0);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { organization, role, period, description, order };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/experience/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/experience", {
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
    if (confirm("Apakah Anda yakin ingin menghapus data pengalaman ini?")) {
      setError(null);
      try {
        const res = await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
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
        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data pengalaman...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Pengalaman Organisasi & Kerja</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Atur pengalaman kepemimpinan, kepanitiaan, atau pekerjaan magang Anda.</p>
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
            Tambah Pengalaman
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
              <Briefcase className="h-5 w-5 text-blue-600" />
              {editingId ? "Edit Pengalaman Organisasi" : "Tambah Pengalaman Organisasi"}
            </h3>
            <button type="button" onClick={handleCancel} className="text-slate-450 hover:text-slate-700 dark:hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Nama Organisasi / Perusahaan</label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Contoh: Himpunan Mahasiswa Informatika"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-955 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Jabatan / Posisi</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Contoh: Ketua Bidang Pengembangan Web"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-955 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Periode Keaktifan</label>
              <input
                type="text"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Contoh: 2023 - 2024 atau 2024 - Sekarang"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-955 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Urutan Tampilan</label>
              <input
                type="number"
                required
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                placeholder="Urutan keaktifan"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-955 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Deskripsi Tugas / Pencapaian</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tuliskan tugas utama, divisi, dan program kerja yang sukses Anda jalankan..."
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

      {/* Grid Experience List */}
      <div className="grid grid-cols-1 gap-4">
        {items.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Briefcase className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Belum Ada Riwayat Pengalaman</h3>
            <p className="mt-1 text-sm text-slate-500">Silakan tambahkan data organisasi/kerja yang pernah diikuti.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start p-5 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    {item.period}
                  </span>
                  <span className="text-xs text-slate-400">
                    Urutan: {item.order}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.organization}</h4>
                <p className="text-sm font-semibold text-slate-705 dark:text-slate-300">{item.role}</p>
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
