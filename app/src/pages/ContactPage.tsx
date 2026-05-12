import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link as fallback (no backend)
    const subject = encodeURIComponent("Customer Inquiry from BlessingSells");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nDetails:\n${form.details}`
    );
    window.location.href = `mailto:customercare@blessingsells.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 52,
    padding: "0 16px",
    fontSize: 14,
    borderRadius: 12,
    border: "1.5px solid var(--border)",
    background: "var(--card)",
    color: "var(--foreground)",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    color: "var(--foreground)",
    marginBottom: 6,
    display: "block",
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
      {/* Page heading */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rose-gold)" }}>
          Get In Touch
        </span>
        <h1 style={{ fontSize: "clamp(30px,5vw,48px)", fontWeight: 500, margin: "12px 0 0" }}>
          Contact{" "}
          <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>Us</em>
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="contact-grid">

        {/* ── Left: Info ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7, margin: 0 }}>
            We'd love to hear from you. Whether you have a question about your order, a product, or anything else — our team is ready to help.
          </p>

          {/* Info cards */}
          {[
            { Icon: Phone, label: "Phone", value: "+1 (217) 695-4009", href: "tel:+12176954009" },
            { Icon: Mail, label: "Email", value: "customercare@blessingsells.com", href: "mailto:customercare@blessingsells.com" },
            { Icon: MapPin, label: "Address", value: "824 N 7th Street, Quincy, IL 62301", href: "https://maps.google.com/?q=824+N+7th+Street+Quincy+IL" },
            { Icon: Clock, label: "Hours", value: "Mon – Fri, 6:00 am – 6:00 pm", href: undefined },
          ].map(({ Icon, label, value, href }) => (
            <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: "var(--card)", border: "1.5px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon style={{ width: 18, height: 18, color: "var(--primary)" }} strokeWidth={1.75} />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: "0 0 4px" }}>
                  {label}
                </p>
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    style={{ fontSize: 14, color: "var(--foreground)", textDecoration: "none", fontWeight: 500 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)")}
                  >
                    {value}
                  </a>
                ) : (
                  <p style={{ fontSize: 14, color: "var(--foreground)", margin: 0, fontWeight: 500 }}>{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: Form ── */}
        <div style={{
          background: "var(--card)",
          border: "1.5px solid var(--border)",
          borderRadius: 20,
          padding: "2.5rem",
          boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
        }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ fontSize: 14, color: "var(--muted-foreground)" }}>
                Your email client should have opened. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label htmlFor="contact-name" style={labelStyle}>Your full name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  required
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label htmlFor="contact-email" style={labelStyle}>Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="name@yourcompany.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label htmlFor="contact-phone" style={labelStyle}>Phone number</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="+1"
                  value={form.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label htmlFor="contact-details" style={labelStyle}>Details</label>
                <textarea
                  id="contact-details"
                  name="details"
                  placeholder="Provide us with further details"
                  required
                  rows={4}
                  value={form.details}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    height: "auto",
                    padding: "14px 16px",
                    resize: "vertical",
                    minHeight: 110,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%", height: 52, borderRadius: 12,
                  background: "var(--primary)", color: "var(--primary-foreground)",
                  border: "none", fontSize: 14, fontWeight: 700,
                  letterSpacing: "0.08em", cursor: "pointer",
                  fontFamily: "inherit", transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                Send a request
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactPage;
