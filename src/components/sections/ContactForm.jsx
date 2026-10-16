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
  const F = "w-full rounded-xl border border-shell-gray-300 bg-white px-3 py-2.5 text-sm text-shell-gray-900 outline-none transition-all duration-200 hover:border-brand-ink/50 focus:border-brand-ink focus:ring-1 focus:ring-brand-ink/40 focus:shadow-[0_0_0_4px_rgba(1,116,164,0.12)]"
  const L = "block text-sm font-semibold text-shell-gray-800 mb-1"
  return (
    <div className={`${simple ? "w-full" : "mx-auto max-w-3xl"} rounded-2xl border border-shell-gray-300 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)] md:p-10`}>
      {!simple && (
        <span className="mb-3 inline-flex items-center rounded-full bg-brand-ink/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-ink ring-1 ring-brand-ink/25 shadow-[0_0_14px_2px_rgba(1,116,164,0.25)]">
          Contact us
        </span>
      )}
      <h2 className={simple ? "text-center text-lg font-bold tracking-tight text-shell-gray-900" : "mt-3 bg-gradient-to-r from-[#0a1440] via-[#0174a4] to-[#0a1440] bg-clip-text text-2xl font-bold tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(1,116,164,0.25)] md:text-3xl"}><Rich>{contactForm.title}</Rich></h2>
      {contactForm.text ? <div className="mt-2 text-base text-shell-gray-600"><Rich as="p">{contactForm.text}</Rich></div> : null}
      <form onSubmit={submit} className={simple ? "mt-4 grid gap-4 sm:grid-cols-2" : "mt-8 grid gap-4 sm:grid-cols-2"}>
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
        <label className={L + " sm:col-span-2"}>{contactForm.messageLabel}<textarea rows={5} value={form.message} onChange={set("message")} placeholder={contactForm.messagePlaceholder} className={F + " mt-1"} /></label>
        {!simple && (
          <label className="flex gap-3 text-sm leading-relaxed text-shell-gray-700 sm:col-span-2">
            <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-1 h-4 w-4 shrink-0 accent-brand-ink" />
            <span>{contactForm.consentText}</span>
          </label>
        )}
        {status ? <p className={"sm:col-span-2 rounded-lg px-3 py-2 text-sm " + (done ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>{status}</p> : null}
        <button type="submit" disabled={busy} className="sm:col-span-2 justify-self-start rounded-lg bg-brand-ink px-6 py-3 text-sm font-semibold text-white btn-lift-glow transition-all hover:bg-brand-ink/90 disabled:opacity-50">{busy ? contactForm.sendingLabel : contactForm.submitLabel}</button>
      </form>
    </div>
  )
}
