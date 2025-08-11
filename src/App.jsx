import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { api } from "./lib/api";
import StaffGate from "./components/StaffGate";
import WaitlistTable from "./components/WaitlistTable";

function useWaitlist() {
  const [list, setList] = useState([]);
  const load = useCallback(async () => {
    const { data } = await api.get(`waitlist`);
    setList(data);
  }, []);
  useEffect(() => { load(); }, [load]);
  return { list, load };
}

function AddPartyCard({ form, setForm, onSubmit, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-4">Add party</h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Name"
               value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
        <input type="number" min="1" className="w-full rounded-xl border px-3 py-2" placeholder="Size"
               value={form.partySize} onChange={(e)=>setForm({...form, partySize:Number(e.target.value)})} required />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Phone (+1XXXXXXXXXX)"
               value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} required />
        <button type="submit" disabled={loading}
                className="rounded-xl bg-black text-white px-4 py-2 font-medium hover:bg-black/90 disabled:opacity-50">
          {loading ? "Adding..." : "Add to waitlist"}
        </button>
      </form>
    </div>
  );
}

function PublicPage() {
  const { list, load } = useWaitlist();
  const [form, setForm] = useState({ name: "", partySize: 2, phone: "" });
  const [loading, setLoading] = useState(false);

  const addParty = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`waitlist`, form);
      setForm({ name: "", partySize: 2, phone: "" });
      await load();
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <AddPartyCard form={form} setForm={setForm} onSubmit={addParty} loading={loading} />
      <WaitlistTable list={list} onRefresh={load} isEmployee={false} />
    </div>
  );
}

function StaffPage() {
  const { list, load } = useWaitlist();
  const [isEmployee, setIsEmployee] = useState(Boolean(localStorage.getItem("staffPin")));

  const notify = async (id) => { await api.patch(`waitlist/${id}/notify`); load(); };
  const seat   = async (id) => { await api.patch(`waitlist/${id}/seat`);   load(); };
  const remove = async (id) => { await api.delete(`waitlist/${id}`);       load(); };

  if (!isEmployee) {
    return (
      <div className="min-h-[70vh] grid place-items-center px-4">
        <div className="w-full max-w-sm bg-white border rounded-2xl shadow-sm p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Staff sign-in</h2>
          <p className="text-sm text-neutral-500 mb-4">Enter today’s PIN to continue.</p>
          <div className="flex justify-center">
            <StaffGate onChange={setIsEmployee} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

      <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Staff controls</h2>
        <StaffGate onChange={setIsEmployee} />
      </div>

      <WaitlistTable
        list={list}
        onRefresh={load}
        isEmployee={isEmployee}
        onNotify={notify}
        onSeat={seat}
        onRemove={remove}
      />
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="bg-white/70 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-3 text-sm">
            <button onClick={()=>navigate('/')} className="px-3 py-1.5 rounded-lg border hover:bg-neutral-50">Waitlist</button>
            <button onClick={()=>navigate('/staff')} className="px-3 py-1.5 rounded-lg border hover:bg-neutral-50">Staff</button>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>

      <footer className="text-center text-xs text-neutral-500 py-4">
        Made with ❤️ by Petera M
      </footer>
    </div>
  );
}
