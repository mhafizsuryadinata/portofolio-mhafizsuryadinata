"use client";

import React, { useState, useEffect } from "react";
import { Target, Plus, Edit2, Trash2, Save, X, Loader2, AlertCircle } from "lucide-react";

type Goal = {
  id: string;
  title: string;
  description: string;
  targetYear: string;
};

export default function AdminGoalsPage() {
  const [items, setItems] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetYear, setTargetYear] = useState("");

  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/goals");
      const data = await res.json();
      if (data.success) {
        setItems(data.goals);
      } else {
        setError(data.message || "Gagal mengambil data target.");
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

  const handleEdit = (item: Goal) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setTargetYear(item.targetYear);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setTargetYear("");
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { title, description, targetYear };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/goals/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/goals", {
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
    if (confirm("Apakah Anda yakin ingin menghapus data target ini?")) {
      setError(null);
      try {
        const res = await fetch(`/api/admin/goals/${id}`, { method: "DELETE" });
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
        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data target...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Target & Cita-Cita</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Atur roadmap pencapaian karir, target tahunan, dan rencana jangka pendek/panjang Anda.</p>
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
            Tambah Target
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
              <Target className="h-5 w-5 text-blue-600" />
              {editingId ? "Edit Rencana Target" : "Tambah Rencana Target"}
            </h3>
            <button type="button" onClick={handleCancel} className="text-slate-450 hover:text-slate-700 dark:hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Rencana / Cita-Cita</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Lulus Cumlaude & Bekerja sebagai Software Engineer"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Target Tahun Tercapai</label>
              <input
                type="text"
                required
                value={targetYear}
                onChange={(e) => setTargetYear(e.target.value)}
                placeholder="Contoh: 2026 atau Jangka Pendek (2026)"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Keterangan / Rincian Target</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan detail action plan untuk mencapai target ini..."
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
              Simpan Data
            </button>
          </div>
        </form>
      )}

      {/* Grid Goals List */}
      <div className="grid grid-cols-1 gap-4">
        {items.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Target className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Belum Ada Target / Rencana Cita-Cita</h3>
            <p className="mt-1 text-sm text-slate-500">Silakan tambahkan target karir masa depan Anda.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start p-5 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-1 max-w-2xl">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-400">
                  Target: {item.targetYear}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white pt-1">{item.title}</h4>
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
