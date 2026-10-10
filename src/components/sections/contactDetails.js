import { useContent } from "../../content/ContentContext.jsx"

export function useContactDetails() {
  const content = useContent()
  const form = content.contactForm || {}
  const settings = content.settings || {}
  return [
    { label: form.detailEmailLabel || form.emailLabel, value: settings.email, href: settings.email ? "mailto:" + settings.email : "" },
    { label: form.detailPhoneLabel || form.phoneLabel, value: settings.phone, href: settings.phone ? "tel:" + String(settings.phone).replace(/\s+/g, "") : "" },
    { label: form.detailSupportLabel || "Support line:", value: settings.supportPhone, href: settings.supportPhone ? "tel:" + String(settings.supportPhone).replace(/\s+/g, "") : "" },
    { label: form.detailAddressLabel || form.addressLabel, value: settings.address, href: "" },
  ].filter((d) => d.value)
}
