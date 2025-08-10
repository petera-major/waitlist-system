import { api } from "../lib/api";

export default function WaitlistTable({ list, onRefresh, isEmployee, onNotify, onSeat, onRemove }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Current waitlist</h2>
        <button onClick={onRefresh} className="text-sm rounded-lg border px-3 py-1.5 hover:bg-neutral-50">
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-neutral-100 text-neutral-600 text-sm">
            <tr>
              <th className="px-4 md:px-6 py-3">Name</th>
              <th className="px-4 md:px-6 py-3">Size</th>
              <th className="px-4 md:px-6 py-3">Status</th>
              <th className="px-4 md:px-6 py-3">Since</th>
              {isEmployee && <th className="px-4 md:px-6 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.length === 0 && (
              <tr>
                <td colSpan={isEmployee ? 5 : 4} className="px-6 py-10 text-center text-neutral-500">
                  No one waiting yet.
                </td>
              </tr>
            )}
            {list.map((p) => (
              <tr key={p._id} className="hover:bg-neutral-50">
                <td className="px-4 md:px-6 py-3 font-medium">{p.name}</td>
                <td className="px-4 md:px-6 py-3">{p.partySize}</td>
                <td className="px-4 md:px-6 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${p.status === "waiting" ? "bg-amber-100 text-amber-800" :
                      p.status === "notified" ? "bg-sky-100 text-sky-800" :
                      "bg-emerald-100 text-emerald-800"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3">{new Date(p.createdAt).toLocaleTimeString()}</td>
                {isEmployee && (
                  <td className="px-4 md:px-6 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onNotify(p._id)}
                        disabled={p.status !== "waiting"}
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          p.status !== "waiting"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-sky-600 text-white hover:bg-sky-700"
                        }`}
                      >
                        Notify
                      </button>
                      <button
                        onClick={() => onSeat(p._id)}
                        className="rounded-lg px-3 py-1.5 text-sm bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        Seat
                      </button>
                      <button
                        onClick={() => onRemove(p._id)}
                        className="rounded-lg px-3 py-1.5 text-sm bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
