import { useEffect, useState } from "react";

export default function StaffGate({ onChange }) {
  const [token, setToken] = useState(localStorage.getItem('staffToken') || '');
  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('staffToken', token.trim());
    onChange(true)
  };

  const signOut = () => {
    localStorage.removeItem("staffToken");
    setToken("");
    onChange(false);
  };

  return (
    <div className="flex items-center gap-2">
      {!token ? (
        <form onSubmit={submit} className="flex items-center gap-2">
          <input value={token} onChange={e=setToken(e.target.value)}
            placeholder="Staff token"
            className="w-28 rounded-lg border px-3 py-1.5 text-sm"
          />
          <button className="rounded-lg bg-black text-white px-3 py-1.5 text-sm">
            Enter
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Staff mode</span>
          <button onClick={signOut} className="rounded-lg border px-3 py-1.5 text-sm">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
