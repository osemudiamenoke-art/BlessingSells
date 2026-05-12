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
        E-Bikes &amp; Scooters &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Men's Wallets &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Toilet &amp; Bath &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Pets &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Home Appliances &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Smart Cameras &amp; Door Locks &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Accessories &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Hair &amp; Beauty &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Smart &amp; Fitness Watch &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Headphone &amp; Ear Bud &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Smart Ring &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Baby &amp; Maternity &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; <strong style={{ fontWeight: 600, color: "var(--hot-pink)" }}>Smart Intelligence</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        E-Bikes &amp; Scooters &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Men's Wallets &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Toilet &amp; Bath &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Pets &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Home Appliances &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Smart Cameras &amp; Door Locks &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Accessories &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Hair &amp; Beauty &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Smart &amp; Fitness Watch &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Headphone &amp; Ear Bud &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Smart Ring &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; Baby &amp; Maternity &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; <strong style={{ fontWeight: 600, color: "var(--hot-pink)" }}>Smart Intelligence</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    </div>
  );
}
