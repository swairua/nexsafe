import { useState } from "react"
import { api } from "./api.js"
import { BTN, BTN_PRIMARY } from "./ui.js"

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [busy, setBusy] = useState(false)

  // ... message management logic using new tokens

  return (
    <div>
      <h2 className="text-base font-bold text-shell-gray-900">Messages</h2>
      {/* Message list using new design tokens */}
      <div className="space-y-2">
        {messages.map((m) => (
          <div key={m.id} className={CARD + " mb-2 p-3"}>
            <p className="font-medium text-shell-gray-900">{m.name}</p>
            <p className="text-sm text-shell-gray-600">{m.email}</p>
            <a href={"mailto:" + m.email} className={BTN_PRIMARY + " text-white hover:bg-brand-ink"}>Reply</a>
          </div>
        ))}
      </div>
    </div>
  )
}