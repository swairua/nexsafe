import { useEffect, useState } from "react"
import { api } from "./api.js"

export default function Messages() {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(0)
  const [msg, setMsg] = useState("")
  async function load() { try { const r = await api.get("messages.php"); setRows(r.messages || []) } catch (e) { setMsg(e.message) } }
  useEffect(() => { load() }, [])
  async function remove(id) { if (!window.confirm("Delete this message?")) return; try { await api.post("messages.php", { action: "delete", id }); load() } catch (e) { setMsg(e.message) } }
  return (
    <div>
      <h2 className="text-xl font-bold text-shell-gray-900">Messages</h2>
      {msg ? <p className="mt-3 text-sm text-red-600">{msg}</p> : null}
      <div className="mt-4 space-y-2">
        {rows.map((m) => (
          <div key={m.id} className="rounded-xl bg-white ring-1 ring-shell-gray-300">
            <button onClick={() => setOpen(open === m.id ? 0 : m.id)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-shell-gray-900">{m.subject || "(no subject)"}</p>
                <p className="truncate text-xs text-shell-gray-500">{m.name} - {m.email}</p>
              </div>
              <span className="shrink-0 text-xs text-shell-gray-400">{(m.created_at || "").slice(0, 10)}</span>
            </button>
            {open === m.id ? (
              <div className="border-t border-shell-gray-100 px-4 py-3">
                <div className="grid grid-cols-2 gap-2 text-xs text-shell-gray-600">
                  <span>Phone: {m.phone || "-"}</span>
                  <span>Company: {m.company || "-"}</span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-shell-gray-800">{m.body}</p>
                <div className="mt-3 flex gap-2">
                  <a href={"mailto:" + m.email} className="rounded bg-shell-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-shell-red">Reply</a>
                  <button onClick={() => remove(m.id)} className="rounded bg-red-100 px-3 py-1.5 text-xs text-red-700 hover:bg-red-200">Delete</button>
                </div>
              </div>
            ) : null}
          </div>
        ))}
        {rows.length === 0 ? <p className="text-sm text-shell-gray-500">No messages yet.</p> : null}
      </div>
    </div>
  )
}

