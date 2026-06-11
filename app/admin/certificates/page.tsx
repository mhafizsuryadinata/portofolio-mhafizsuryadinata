"use client";

import React, { useState, useEffect } from "react";
import { Award, Plus, Edit2, Trash2, Save, X, Loader2, AlertCircle, ExternalLink } from "lucide-react";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl: string;
  credentialUrl: string | null;
  order: number;
};

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [order, setOrder] = useState(0);

  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/certificates");
      const data = await res.json();
      if (data.success) {
        setItems(data.certificates);
      } else {
        setError(data.message || "Gagal mengambil data sertifikat.");
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

  const handleEdit = (item: Certificate) => {
    setEditingId(item.id);
    setTitle(item.title);
    setIssuer(item.issuer);
    setIssueDate(item.issueDate);
    setImageUrl(item.imageUrl);
    setCredentialUrl(item.credentialUrl || "");
    setOrder(item.order);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setIssuer("");
    setIssueDate("");
    setImageUrl("");
    setCredentialUrl("");
    setOrder(0);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      issuer,
      issueDate,
      imageUrl: imageUrl || "/certs/placeholder.png",
      credentialUrl: credentialUrl || null,
      order: Number(order) || 0,
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/certificates/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/certificates", {
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
    if (confirm("Apakah Anda yakin ingin menghapus sertifikat ini?")) {
      setError(null);
      try {
        const res = await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
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
        <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data sertifikat...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Sertifikat & Penghargaan</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Atur kredensial sertifikasi profesional, tahun perolehan, dan instansi penerbit.</p>
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
            Tambah Sertifikat
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
              <Award className="h-5 w-5 text-blue-600" />
              {editingId ? "Edit Kredensial Sertifikat" : "Tambah Kredensial Sertifikat"}
            </h3>
            <button type="button" onClick={handleCancel} className="text-slate-455 hover:text-slate-700 dark:hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Nama / Judul Sertifikat</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Belajar Dasar Pemrograman Web"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Instansi Penerbit</label>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="Contoh: Dicoding Indonesia atau Oracle Academy"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Waktu Perolehan (Tanggal / Bulan Tahun)</label>
              <input
                type="text"
                required
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                placeholder="Contoh: Oktober 2023 atau Mei 2023"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">URL Gambar Sertifikat</label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Contoh: /certs/oracle-db.png atau URL luar"
                className="w-full text-sm rounded-lg border border-slate-350 bg-slate-50 px-3.5 py-2.5 text-slate-950 placeholder-slate-455 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Link Kredensial Detail (Opsional)</label>
              <input
                type="text"
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                placeholder="Contoh: https://www.dicoding.com/certificates/..."
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
                placeholder="Urutan tampilan di list"
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
              Simpan Sertifikat
            </button>
          </div>
        </form>
      )}

      {/* Grid Certificates List */}
      {items.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <Award className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">Belum Ada Data Sertifikat</h3>
          <p className="mt-1 text-sm text-slate-500">Silakan tambahkan data sertifikasi kompetensi Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-100 bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-slate-50 dark:bg-slate-950 flex items-center justify-center relative border-b border-slate-100 dark:border-slate-850">
                <span className="text-xs absolute right-3 top-3 text-slate-400">
                  Urutan: {item.order}
                </span>
                <Award className="h-10 w-10 text-slate-400" />
                <span className="text-xs text-slate-400 absolute bottom-4 select-none italic text-center px-4 line-clamp-1">
                  Path: {item.imageUrl}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">{item.title}</h4>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.issuer}</p>
                  <p className="text-[11px] text-slate-455 dark:text-slate-400">{item.issueDate}</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-850">
                  <div>
                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        className="flex items-center gap-1 text-[11px] font-medium text-blue-650 hover:underline dark:text-blue-400"
                      >
                        Kredensial
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-xs font-semibold px-2 py-1 text-slate-750 bg-slate-100 hover:bg-slate-200 rounded dark:text-slate-300 dark:bg-slate-850 dark:hover:bg-slate-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs font-semibold px-2 py-1 text-red-650 bg-red-50 hover:bg-red-100 rounded dark:text-red-400 dark:bg-red-955/20 dark:hover:bg-red-950/30 transition-colors"
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
