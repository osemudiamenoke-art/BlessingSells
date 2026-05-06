export function AnnouncementBar() {
  return (
    <div
      style={{
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        height: "32px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
      <span className="marquee-track text-[11px] tracking-[0.08em] font-light">
        Premium Electronics &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; 30-Day Returns &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Secure Checkout &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; E-Bikes &amp; Scooters &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Smart Home Devices &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Trusted Brands &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Premium Electronics &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; 30-Day Returns &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Secure Checkout &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; E-Bikes &amp; Scooters &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Smart Home Devices &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Trusted Brands &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    </div>
  );
}
