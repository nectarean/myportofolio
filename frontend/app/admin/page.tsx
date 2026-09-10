"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LogOut, LayoutDashboard, User, Briefcase, Wrench,
  Award, MessageSquare, Star, Plus, Trash2, Pencil, X, Save, ArrowLeft
} from "lucide-react";

const API = "http://localhost:3001";

// ─── Reusable Modal ───
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Reusable Input ───
function Input({ label, value, onChange, type = "text", rows }: { label: string; value: string; onChange: (v: string) => void; type?: string; rows?: number }) {
  const cls = "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white text-sm";
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      {rows ? (
        <textarea className={cls + " resize-none"} rows={rows} value={value} onChange={e => onChange(e.target.value)} />
      ) : (
        <input type={type} className={cls} value={value} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  );
}

// ─── Delete Confirm Button ───
function DeleteBtn({ onDelete }: { onDelete: () => void }) {
  const [confirm, setConfirm] = useState(false);
  if (confirm) return (
    <div className="flex items-center gap-1">
      <button onClick={onDelete} className="text-xs px-2 py-1 bg-red-600 text-white rounded-lg">Ya, Hapus</button>
      <button onClick={() => setConfirm(false)} className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded-lg">Batal</button>
    </div>
  );
  return <button onClick={() => setConfirm(true)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={16} /></button>;
}

// ═══════════════════════════════════════════════════════
// TAB: PROFILE
// ═══════════════════════════════════════════════════════
function ProfileTab() {
  const [d, setD] = useState({ name: "", title: "", bio: "", avatar: "", cv_url: "", github: "", linkedin: "", email: "", instagram: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${API}/hero`).then(r => r.json()).then(r => { if (r.data) setD(r.data); });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(`${API}/hero`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
    setMsg("Profile berhasil disimpan!"); setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Kelola Profile</h2>
      {msg && <div className="p-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-xl text-sm">{msg}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nama" value={d.name || ""} onChange={v => setD({ ...d, name: v })} />
        <Input label="Title / Jabatan" value={d.title || ""} onChange={v => setD({ ...d, title: v })} />
        <Input label="Email" value={d.email || ""} onChange={v => setD({ ...d, email: v })} />
        <Input label="Avatar URL" value={d.avatar || ""} onChange={v => setD({ ...d, avatar: v })} />
        <Input label="CV URL" value={d.cv_url || ""} onChange={v => setD({ ...d, cv_url: v })} />
        <Input label="GitHub" value={d.github || ""} onChange={v => setD({ ...d, github: v })} />
        <Input label="LinkedIn" value={d.linkedin || ""} onChange={v => setD({ ...d, linkedin: v })} />
        <Input label="Instagram" value={d.instagram || ""} onChange={v => setD({ ...d, instagram: v })} />
      </div>
      <Input label="Bio" value={d.bio || ""} onChange={v => setD({ ...d, bio: v })} rows={4} />
      <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-60">
        <Save size={18} />{saving ? "Menyimpan..." : "Simpan Profile"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TAB: PROJECTS
// ═══════════════════════════════════════════════════════
function ProjectsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState<any>(null);

  const load = () => fetch(`${API}/projects`).then(r => r.json()).then(r => setItems(r.data || []));
  useEffect(() => { load(); }, []);

  const save = async (item: any) => {
    const method = item.id ? "PUT" : "POST";
    const url = item.id ? `${API}/projects/${item.id}` : `${API}/projects`;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
    setModal(null); load();
  };

  const del = async (id: number) => {
    await fetch(`${API}/projects/${id}`, { method: "DELETE" }); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Kelola Projects</h2>
        <button onClick={() => setModal({ title: "", description: "", image_url: "", github_url: "", live_url: "", tags: "[]" })} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
          <Plus size={16} />Tambah
        </button>
      </div>
      <div className="space-y-3">
        {items.map((p: any) => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">{p.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-1">{p.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setModal({ ...p, tags: typeof p.tags === 'string' ? p.tags : JSON.stringify(p.tags || []) })} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"><Pencil size={16} /></button>
              <DeleteBtn onDelete={() => del(p.id)} />
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate-500 text-center py-8">Belum ada proyek.</p>}
      </div>
      {modal && (
        <Modal title={modal.id ? "Edit Project" : "Tambah Project"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Input label="Judul" value={modal.title} onChange={v => setModal({ ...modal, title: v })} />
            <Input label="Deskripsi" value={modal.description} onChange={v => setModal({ ...modal, description: v })} rows={3} />
            <Input label="Image URL" value={modal.image_url || ""} onChange={v => setModal({ ...modal, image_url: v })} />
            <Input label="GitHub URL" value={modal.github_url || ""} onChange={v => setModal({ ...modal, github_url: v })} />
            <Input label="Live URL" value={modal.live_url || ""} onChange={v => setModal({ ...modal, live_url: v })} />
            <Input label='Tags (JSON array, e.g. ["React","Node.js"])' value={modal.tags || "[]"} onChange={v => setModal({ ...modal, tags: v })} />
            <button onClick={() => save(modal)} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Simpan</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TAB: SKILLS
// ═══════════════════════════════════════════════════════
function SkillsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState<any>(null);

  const load = () => fetch(`${API}/skills/raw`).then(r => r.json()).then(r => setItems(r.data || []));
  useEffect(() => { load(); }, []);

  const save = async (item: any) => {
    const method = item.id ? "PUT" : "POST";
    const url = item.id ? `${API}/skills/${item.id}` : `${API}/skills`;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
    setModal(null); load();
  };

  const del = async (id: number) => {
    await fetch(`${API}/skills/${id}`, { method: "DELETE" }); load();
  };

  // Group by category for display
  const grouped: Record<string, any[]> = {};
  items.forEach(s => { if (!grouped[s.category]) grouped[s.category] = []; grouped[s.category].push(s); });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Kelola Skills</h2>
        <button onClick={() => setModal({ category: "", name: "" })} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
          <Plus size={16} />Tambah
        </button>
      </div>
      {Object.entries(grouped).map(([cat, skills]) => (
        <div key={cat} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{cat}</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: any) => (
              <div key={s.id} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">
                <span className="text-slate-700 dark:text-slate-300">{s.name}</span>
                <button onClick={() => setModal(s)} className="text-blue-500 hover:text-blue-700"><Pencil size={12} /></button>
                <DeleteBtn onDelete={() => del(s.id)} />
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-slate-500 text-center py-8">Belum ada skill.</p>}
      {modal && (
        <Modal title={modal.id ? "Edit Skill" : "Tambah Skill"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Input label="Kategori (e.g. Frontend Development)" value={modal.category} onChange={v => setModal({ ...modal, category: v })} />
            <Input label="Nama Skill" value={modal.name} onChange={v => setModal({ ...modal, name: v })} />
            <button onClick={() => save(modal)} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Simpan</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TAB: CERTIFICATES
// ═══════════════════════════════════════════════════════
function CertificatesTab() {
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState<any>(null);

  const load = () => fetch(`${API}/certificates`).then(r => r.json()).then(r => setItems(r.data || []));
  useEffect(() => { load(); }, []);

  const save = async (item: any) => {
    const method = item.id ? "PUT" : "POST";
    const url = item.id ? `${API}/certificates/${item.id}` : `${API}/certificates`;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
    setModal(null); load();
  };

  const del = async (id: number) => {
    await fetch(`${API}/certificates/${id}`, { method: "DELETE" }); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Kelola Sertifikat</h2>
        <button onClick={() => setModal({ title: "", issuer: "", date: "", image_url: "" })} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
          <Plus size={16} />Tambah
        </button>
      </div>
      <div className="space-y-3">
        {items.map((c: any) => (
          <div key={c.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">{c.title}</h4>
              <p className="text-sm text-slate-500">{c.issuer} &middot; {c.date}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setModal(c)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"><Pencil size={16} /></button>
              <DeleteBtn onDelete={() => del(c.id)} />
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate-500 text-center py-8">Belum ada sertifikat.</p>}
      </div>
      {modal && (
        <Modal title={modal.id ? "Edit Sertifikat" : "Tambah Sertifikat"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Input label="Judul" value={modal.title} onChange={v => setModal({ ...modal, title: v })} />
            <Input label="Penerbit" value={modal.issuer} onChange={v => setModal({ ...modal, issuer: v })} />
            <Input label="Tanggal/Tahun" value={modal.date} onChange={v => setModal({ ...modal, date: v })} />
            <Input label="Image URL" value={modal.image_url || ""} onChange={v => setModal({ ...modal, image_url: v })} />
            <button onClick={() => save(modal)} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Simpan</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TAB: TESTIMONIALS
// ═══════════════════════════════════════════════════════
function TestimonialsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [modal, setModal] = useState<any>(null);

  const load = () => fetch(`${API}/testimonials`).then(r => r.json()).then(r => setItems(r.data || []));
  useEffect(() => { load(); }, []);

  const save = async (item: any) => {
    const method = item.id ? "PUT" : "POST";
    const url = item.id ? `${API}/testimonials/${item.id}` : `${API}/testimonials`;
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
    setModal(null); load();
  };

  const del = async (id: number) => {
    await fetch(`${API}/testimonials/${id}`, { method: "DELETE" }); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Kelola Testimoni</h2>
        <button onClick={() => setModal({ name: "", role: "", content: "", avatar: "" })} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
          <Plus size={16} />Tambah
        </button>
      </div>
      <div className="space-y-3">
        {items.map((t: any) => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{t.name}</h4>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setModal(t)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"><Pencil size={16} /></button>
              <DeleteBtn onDelete={() => del(t.id)} />
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate-500 text-center py-8">Belum ada testimoni.</p>}
      </div>
      {modal && (
        <Modal title={modal.id ? "Edit Testimoni" : "Tambah Testimoni"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Input label="Nama" value={modal.name} onChange={v => setModal({ ...modal, name: v })} />
            <Input label="Jabatan/Role" value={modal.role} onChange={v => setModal({ ...modal, role: v })} />
            <Input label="Isi Testimoni" value={modal.content} onChange={v => setModal({ ...modal, content: v })} rows={3} />
            <Input label="Avatar URL" value={modal.avatar || ""} onChange={v => setModal({ ...modal, avatar: v })} />
            <button onClick={() => save(modal)} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Simpan</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TAB: MESSAGES
// ═══════════════════════════════════════════════════════
function MessagesTab() {
  const [items, setItems] = useState<any[]>([]);

  const load = () => fetch(`${API}/messages`).then(r => r.json()).then(r => setItems(r.data || []));
  useEffect(() => { load(); }, []);

  const del = async (id: number) => {
    await fetch(`${API}/messages/${id}`, { method: "DELETE" }); load();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pesan Masuk</h2>
      <div className="space-y-3">
        {items.map((m: any) => (
          <div key={m.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{m.name}</h4>
                <p className="text-sm text-blue-500">{m.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">{m.created_at ? new Date(m.created_at).toLocaleString("id-ID") : ""}</span>
                <DeleteBtn onDelete={() => del(m.id)} />
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300">{m.message}</p>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate-500 text-center py-8">Belum ada pesan masuk.</p>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TAB: DASHBOARD
// ═══════════════════════════════════════════════════════
function DashboardTab({ counts }: { counts: Record<string, number> }) {
  const stats = [
    { label: "Projects", count: counts.projects, icon: <Briefcase size={24} />, color: "text-blue-500" },
    { label: "Skills", count: counts.skills, icon: <Wrench size={24} />, color: "text-emerald-500" },
    { label: "Sertifikat", count: counts.certificates, icon: <Award size={24} />, color: "text-amber-500" },
    { label: "Testimoni", count: counts.testimonials, icon: <Star size={24} />, color: "text-violet-500" },
    { label: "Pesan", count: counts.messages, icon: <MessageSquare size={24} />, color: "text-rose-500" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className={s.color}>{s.icon}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{s.count}</p>
            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN ADMIN PAGE
// ═══════════════════════════════════════════════════════
const TABS = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { id: "profile", label: "Profile", icon: <User size={20} /> },
  { id: "projects", label: "Projects", icon: <Briefcase size={20} /> },
  { id: "skills", label: "Skills", icon: <Wrench size={20} /> },
  { id: "certificates", label: "Sertifikat", icon: <Award size={20} /> },
  { id: "testimonials", label: "Testimoni", icon: <Star size={20} /> },
  { id: "messages", label: "Pesan Masuk", icon: <MessageSquare size={20} /> },
];

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, skills: 0, certificates: 0, testimonials: 0, messages: 0 });

  useEffect(() => {
    if (isAuth) {
      Promise.all([
        fetch(`${API}/projects`).then(r => r.json()),
        fetch(`${API}/skills/raw`).then(r => r.json()),
        fetch(`${API}/certificates`).then(r => r.json()),
        fetch(`${API}/testimonials`).then(r => r.json()),
        fetch(`${API}/messages`).then(r => r.json()),
      ]).then(([p, s, c, t, m]) => {
        setCounts({
          projects: (p.data || []).length,
          skills: (s.data || []).length,
          certificates: (c.data || []).length,
          testimonials: (t.data || []).length,
          messages: (m.data || []).length,
        });
      });
    }
  }, [isAuth, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") setIsAuth(true);
    else alert("Password salah!");
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Login</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Masukkan password untuk akses dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white" />
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">Login</button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-500 hover:underline text-sm flex items-center justify-center gap-1"><ArrowLeft size={14} />Kembali ke Portfolio</Link>
          </div>
        </div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case "profile": return <ProfileTab />;
      case "projects": return <ProjectsTab />;
      case "skills": return <SkillsTab />;
      case "certificates": return <CertificatesTab />;
      case "testimonials": return <TestimonialsTab />;
      case "messages": return <MessagesTab />;
      default: return <DashboardTab counts={counts} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
          <LayoutDashboard size={20} />
        </button>
        <h2 className="font-bold text-slate-900 dark:text-white">Admin Panel</h2>
        <button onClick={() => setIsAuth(false)} className="p-2 text-red-500"><LogOut size={20} /></button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col z-50 transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Panel</h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === tab.id
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === "messages" && counts.messages > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 rounded-full">{counts.messages}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl font-medium w-full">
            <ArrowLeft size={18} />Lihat Website
          </Link>
          <button onClick={() => setIsAuth(false)} className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium">
            <LogOut size={18} />Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
        <div className="max-w-5xl mx-auto">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
