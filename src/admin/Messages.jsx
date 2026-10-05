import { useEffect, useState } from "react"
import { api } from "./api.js"

const ACT = "inline-flex min-h-[44px] items-center justify-center rounded px-3 py-1.5 text-xs font-medium"

const PRIORITY_STYLES = {
  Urgent: "bg-red-100 text-red-700",
  High: "bg-amber-100 text-amber-800",
  Normal: "bg-shell-gray-100 text-shell-gray-700",
}

export default function Messages() {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(0)
  const [msg, setMsg] = useState("")
  async function load() { try { const r = await api.get("messages.php"); setRows(r.messages || []) } catch (e) { setMsg(e.message) } }
  useEffect(() => { load() }, [])
  async function remove(id) { if (!window.confirm("Delete this message?")) return; try { await api.post("messages.php", { action: "delete", id }); load() } catch (e) { setMsg(e.message) } }
  return (
    <div>
      <h2 className="text-lg font-bold text-shell-gray-900">Messages</h2>
      {msg ? <p className="mt-2 text-sm text-red-600">{msg}</p> : null}
      <div className="mt-3 space-y-2">
        {rows.map((m) => (
          <div key={m.id} className="rounded-xl bg-white ring-1 ring-shell-gray-300">
            <button onClick={() => setOpen(open === m.id ? 0 : m.id)} aria-expanded={open === m.id} className="flex min-h-[56px] w-full items-center justify-between gap-3 px-3 py-2.5 text-left sm:px-4">
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 truncate text-sm font-semibold text-shell-gray-900">
                  <span className="truncate">{m.subject || "(no subject)"}</span>
                  {m.priority ? (
                    <span className={"shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide " + (PRIORITY_STYLES[m.priority] || PRIORITY_STYLES.Normal)}>
                      {m.priority}
                    </span>
                  ) : null}
                </p>
                <p className="truncate text-xs text-shell-gray-500">{m.name} - {m.email}</p>
              </div>
              <span className="shrink-0 text-xs text-shell-gray-400">{(m.created_at || "").slice(0, 10)}</span>
            </button>
            {open === m.id ? (
              <div className="border-t border-shell-gray-100 px-3 py-3 sm:px-4">
                <div className="grid grid-cols-1 gap-1.5 text-xs text-shell-gray-600 sm:grid-cols-2">
                  <span>Phone: {m.phone || "-"}</span>
                  <span>Company: {m.company || "-"}</span>
                </div>
                <p className="mt-2.5 whitespace-pre-wrap text-sm text-shell-gray-800">{m.body}</p>
                <div className="mt-3 flex gap-2">
                  <a href={"mailto:" + m.email} className={ACT + " bg-shell-gray-900 text-white hover:bg-shell-red"}>Reply</a>
                  <button onClick={() => remove(m.id)} className={ACT + " bg-red-100 text-red-700 hover:bg-red-200"}>Delete</button>
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

