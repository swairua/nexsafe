import { useContent } from "../../content/ContentContext.jsx"

/**
 * Contact detail rows (email / phone / address) from Site settings, each
 * rendered only when filled. Shared by the contact page and the homepage
 * contact section so both can never drift apart. The detail rows are worded
 * as they are on nexsate.com ("Call us at:"), which is why they have their
 * own labels rather than reusing the form's.
 */
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
