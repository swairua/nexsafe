import { useState } from "react"
import { apiUrl, useContent } from "../../content/ContentContext.jsx"

const EMPTY = { name: "", email: "", phone: "", company: "", subject: "", message: "" }

export default function ContactForm() {
  const { contactForm } = useContent()
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState("")
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.email) { setStatus(contactForm.requiredText); return }
    setBusy(true); setStatus(""); setDone(false)
    try {
      const r = await fetch(apiUrl("messages.php"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, action: "create" }) })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || j.ok === false) throw new Error((j && j.error) || contactForm.errorText)
      setDone(true)
      setStatus(contactForm.successText)
      setForm(EMPTY)
    } catch (err) { setStatus(err.message) }
    finally { setBusy(false) }
  }
  const F = "w-full rounded-lg border border-shell-gray-300 px-3 py-2 text-sm outline-none focus:border-shell-gray-900 focus:ring-1 focus:ring-shell-gray-900"
  const L = "block text-sm font-medium text-shell-gray-700"
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold tracking-tight text-shell-gray-900 md:text-3xl">{contactForm.title}</h2>
      <p className="mt-2 text-base text-shell-gray-600">{contactForm.text}</p>
      <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className={L}>{contactForm.nameLabel}<input value={form.name} onChange={set("name")} className={F + " mt-1"} /></label>
        <label className={L}>{contactForm.emailLabel}<input type="email" value={form.email} onChange={set("email")} className={F + " mt-1"} /></label>
        <label className={L}>{contactForm.phoneLabel}<input value={form.phone} onChange={set("phone")} className={F + " mt-1"} /></label>
        <label className={L}>{contactForm.companyLabel}<input value={form.company} onChange={set("company")} className={F + " mt-1"} /></label>
        <label className={L + " sm:col-span-2"}>{contactForm.subjectLabel}<input value={form.subject} onChange={set("subject")} className={F + " mt-1"} /></label>
        <label className={L + " sm:col-span-2"}>{contactForm.messageLabel}<textarea rows={5} value={form.message} onChange={set("message")} className={F + " mt-1"} /></label>
        {status ? <p className={"sm:col-span-2 rounded-lg px-3 py-2 text-sm " + (done ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>{status}</p> : null}
        <button type="submit" disabled={busy} className="sm:col-span-2 justify-self-start rounded-lg bg-shell-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-shell-red disabled:opacity-50">{busy ? contactForm.sendingLabel : contactForm.submitLabel}</button>
      </form>
    </div>
  )
}
