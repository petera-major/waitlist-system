import { useEffect, useState } from "react";

export default function StaffGate({ onChange }) {
  const [pin, setPin] = useState(localStorage.getItem("staffPin") || "");

  useEffect(() => { onChange(Boolean(pin)); }, [pin, onChange]);

  const submit = (e) => {
    e.preventDefault();
    const v = e.target.pin.value.trim();
    if (v.length < 4) return;
    localStorage.setItem("staffPin", v);
    setPin(v);
  };

  const signOut = () => {
    localStorage.removeItem("staffPin");
    setPin("");
    onChange(false);
  };

  return (
    <div className="flex items-center gap-2">
      {!pin ? (
        <form onSubmit={submit} className="flex items-center gap-2">
          <input
            name="pin"
            placeholder="Staff PIN"
            inputMode="numeric"
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
