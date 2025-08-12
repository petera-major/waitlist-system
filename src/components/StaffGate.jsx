import { useState } from "react";

export default function StaffGate({ onChange }) {
  const [token, setToken] = useState(localStorage.getItem("staffToken") || "");

  const signedIn = !!localStorage.getItem("staffToken");

  const submit = (e) => {
    e.preventDefault();
    const t = token.trim();
    if (!t) return;
    localStorage.setItem("staffToken", t);
    onChange(true);            // tell parent to show staff view
  };

  const signOut = () => {
    localStorage.removeItem("staffToken");
    setToken("");
    onChange(false);
  };

  return !signedIn ? (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
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
  );
}