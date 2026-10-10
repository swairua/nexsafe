import { useState } from "react"
import { apiUrl, useContent } from "../../content/ContentContext.jsx"
import { Rich } from "../ui/SectionTag.jsx"

const EMPTY = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  priority: "",
  message: "",
  consent: false,
}

export default function ContactForm({ simple = false } = {}) {
  const { contactForm } = useContent()
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState("")
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value })
  const options = Array.isArray(contactForm.options) ? contactForm.options : []
  const priorities = Array.isArray(contactForm.priorityOptions) && contactForm.priorityOptions.length
    ? contactForm.priorityOptions
    : ["Normal", "High", "Urgent"]

  async function submit(e) {
    e.preventDefault()
    const name = `${form.firstName} ${form.lastName}`.trim()
    if (!name || !form.email) { setStatus(contactForm.requiredText); return }
    if (!simple && !form.consent) { setStatus(contactForm.consentRequired); return }
    setBusy(true); setStatus(""); setDone(false)
    try {
      const r = await fetch(apiUrl("messages.php"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email: form.email, phone: form.phone, company: form.company, subject: form.subject, priority: form.priority, message: form.message, action: "create" }) })
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
      <h2 className="text-2xl font-bold tracking-tight text-shell-gray-900 md:text-3xl"><Rich>{contactForm.title}</Rich></h2>
      {contactForm.text ? <div className="mt-2 text-base text-shell-gray-600"><Rich as="p">{contactForm.text}</Rich></div> : null}
      <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className={L}>{contactForm.firstNameLabel}<input value={form.firstName} onChange={set("firstName")} className={F + " mt-1"} /></label>
        <label className={L}>{contactForm.lastNameLabel}<input value={form.lastName} onChange={set("lastName")} className={F + " mt-1"} /></label>
        <label className={L + " sm:col-span-2"}>{contactForm.companyLabel}<input value={form.company} onChange={set("company")} className={F + " mt-1"} /></label>
        <label className={L}>{contactForm.emailLabel}<input type="email" value={form.email} onChange={set("email")} className={F + " mt-1"} /></label>
        <label className={L}>{contactForm.phoneLabel}<input value={form.phone} onChange={set("phone")} className={F + " mt-1"} /></label>
        <label className={L + " sm:col-span-2"}>{contactForm.subjectLabel}<select value={form.subject} onChange={set("subject")} className={F + " mt-1"}>
          {options.map((opt) => <option key={opt} value={opt === options[0] ? "" : opt}>{opt}</option>)}
        </select></label>
        {!simple && (
          <label className={L}>{contactForm.priorityLabel || "Priority"}<select value={form.priority} onChange={set("priority")} className={F + " mt-1"}>
            <option value="">{contactForm.priorityPlaceholder || "Select priority"}</option>
            {priorities.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select></label>
        )}
        <label className={L + " sm:col-span-2"}>{contactForm.messageLabel}<textarea rows={5} value={form.message} onChange={set("message")} className={F + " mt-1"} /></label>
        {!simple && (
          <label className="flex gap-3 text-sm leading-relaxed text-shell-gray-700 sm:col-span-2">
            <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-1 h-4 w-4 shrink-0 accent-shell-red" />
            <span>{contactForm.consentText}</span>
          </label>
        )}
        {status ? <p className={"sm:col-span-2 rounded-lg px-3 py-2 text-sm " + (done ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>{status}</p> : null}
        <button type="submit" disabled={busy} className="sm:col-span-2 justify-self-start rounded-lg bg-shell-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-shell-red disabled:opacity-50">{busy ? contactForm.sendingLabel : contactForm.submitLabel}</button>
      </form>
    </div>
  )
}
