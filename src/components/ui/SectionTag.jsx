export function RichText({ value, className = "" }) {
  const html = String(value || "")
  if (!/<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(html)) return null
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />
}

export function Rich({ as: Tag = "span", className = "", children, ...rest }) {
  const value = children
  const html = String(value == null ? "" : value)
  if (/<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(html)) {
    const clean = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")

    const block = /<\s*(p|ul|ol|blockquote|h3|h4)[\s/>]/i.test(clean)
    const Use = block ? "div" : Tag
    return <Use className={className} dangerouslySetInnerHTML={{ __html: clean }} {...rest} />
  }
  return <Tag className={className} {...rest}>{value}</Tag>
}

export default function SectionTag({ children, light = false }) {
  return (
    <span
      className={`inline-block text-xs font-bold uppercase tracking-[0.14em] ${
        light ? 'text-shell-yellow' : 'text-shell-red'
      }`}
    >
      {children}
    </span>
  )
}
