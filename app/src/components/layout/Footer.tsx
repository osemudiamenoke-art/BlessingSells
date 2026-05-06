import { Link } from "wouter";
import { Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="pt-8 md:pt-14 pb-6 px-4 md:px-12"
      style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-16 mb-8 md:mb-16">
          {/* Discover */}
          <div className="space-y-4">
            <h3 className="text-[13px] font-medium tracking-[0.1em] uppercase mb-6">
              Discover
            </h3>
            <ul className="space-y-3">
              {[
                ["E-Bikes & Scooters", "/collections/electronic-bike"],
                ["Men's Wallets", "/collections/advance-wallets"],
                ["Home Appliances", "/collections/home-appliance"],
                ["All Collections", "/collections/electronic-bike"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] font-light block py-0.5 transition-opacity hover:opacity-100"
                    style={{ opacity: 0.8 }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-[13px] font-medium tracking-[0.1em] uppercase mb-6">
              Customer Support
            </h3>
            <ul className="space-y-3">
              {[
                ["Delivery & Returns", "/pages/shipping-policy"],
                ["Contact Us", "/pages/contact"],
                ["FAQs", "/faq"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] font-light block py-0.5 transition-opacity hover:opacity-100"
                    style={{ opacity: 0.8 }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="flex items-center space-x-6">
            <a href="https://instagram.com/blessingsell88" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-70">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="https://facebook.com/blessingsell" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-opacity hover:opacity-70">
              <Facebook className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="mailto:blessingoboh@gmail.com" aria-label="Email us" className="transition-opacity hover:opacity-70">
              <Mail className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>

          <div
            className="flex items-center flex-wrap justify-center gap-3 text-[11px] font-medium tracking-wider"
            style={{ opacity: 0.5 }}
          >
            {["VISA", "MASTERCARD", "AMEX", "PAYPAL", "APPLE PAY", "GOOGLE PAY"].map(
              (p) => (
                <span key={p}>{p}</span>
              )
            )}
          </div>

          <div className="text-[12px] font-light" style={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} BlessingSells. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
