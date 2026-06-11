"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Plus, Edit2, Trash2, Save, X, Loader2, AlertCircle } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  category: string;
  percentage: number;
};

const CATEGORIES = ["Frontend", "Backend", "Mobile Development", "Database", "Tools"];

export default function AdminSkillsPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [percentage, setPercentage] = useState(80);

  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.success) {
        setItems(data.skills);
      } else {
        setError(data.message || "Gagal mengambil data keahlian.");
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

  const handleEdit = (item: Skill) => {
    setEditingId(item.id);
    setName(item.name);
    setCategory(item.category);
    setPercentage(item.percentage);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setCategory(CATEGORIES[0]);
    setPercentage(80);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { name, category, percentage };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/skills/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/skills", {
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
    if (confirm("Apakah Anda yakin ingin menghapus keahlian ini?")) {
      setError(null);
      try {
        const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
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

  // Group items by category for rendering
  const groupedSkills = items.reduce((acc: { [key: string]: Skill[] }, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data keahlian...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Keterampilan & Teknologi</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Atur skill pemrograman, persentase penguasaan, dan kategori penempatan.</p>
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
            Tambah Keterampilan
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
              <Sparkles className="h-5 w-5 text-blue-600" />
              {editingId ? "Edit Keterampilan" : "Tambah Keterampilan"}
            </h3>
            <button type="button" onClick={handleCancel} className="text-slate-450 hover:text-slate-700 dark:hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Nama Skill / Teknologi</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Laravel, React, Kotlin"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Kategori</label>
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
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Tingkat Penguasaan ({percentage}%)</label>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-bold w-12 text-center">{percentage}%</span>
              </div>
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

      {/* Grouped Skills View */}
      {items.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <Sparkles className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Belum Ada Data Keahlian</h3>
          <p className="mt-1 text-sm text-slate-500">Silakan tambahkan data teknologi keahlian Anda.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.map((cat) => {
            const skillsInCat = groupedSkills[cat] || [];
            if (skillsInCat.length === 0) return null;
            return (
              <div key={cat} className="space-y-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 border-l-4 border-blue-600 pl-3">
                  {cat}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillsInCat.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm"
                    >
                      <div className="flex-1 mr-4">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{skill.name}</span>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{skill.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="p-1.5 text-slate-500 hover:text-red-650 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
