import { X } from "lucide-react";
import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { label: "E-Bikes & Scooters", handle: "electronic-bike" },
  { label: "Men's Wallets", handle: "advance-wallets" },
  { label: "Toilet & Bath", handle: "toilet-bath" },
  { label: "Pets", handle: "pet-collection" },
  { label: "Home Appliances", handle: "home-appliance" },
  { label: "Smart Cameras & Door Locks", handle: "smart-security-camera" },
  { label: "Cell Phones & Accessories", handle: "cell-phones-accessories" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-[85vw] h-full flex flex-col shadow-2xl"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        <div
          className="h-16 flex items-center justify-between px-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="text-sm font-medium tracking-widest uppercase">
            Menu
          </span>
          <button onClick={onClose} className="p-2 -mr-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
          <nav className="flex flex-col space-y-4">
            {/* Home */}
            <Link
              href="/"
              onClick={onClose}
              className="text-[15px] font-medium opacity-90 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              🏠 Home
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.handle}
                href={`/collections/${cat.handle}`}
                onClick={onClose}
                className="text-[15px] font-medium opacity-90 hover:opacity-100 transition-opacity"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          <div
            className="pt-6 flex flex-col space-y-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Link
              href="/pages/shipping-policy"
              onClick={onClose}
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              Shipping & Returns
            </Link>
            <Link
              href="/faq"
              onClick={onClose}
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              FAQ
            </Link>
            <Link
              href="/pages/contact"
              onClick={onClose}
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
