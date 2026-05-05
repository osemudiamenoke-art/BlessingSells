import { X } from "lucide-react";
import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { label: "E-Bikes & Scooters", handle: "e-bikes-scooters" },
  { label: "Men's Wallets", handle: "mens-wallets" },
  { label: "Toilet & Bath", handle: "toilet-bath" },
  { label: "Pets", handle: "pets" },
  { label: "Home Appliances", handle: "home-appliances" },
  { label: "Smart Cameras & Door Locks", handle: "smart-cameras-door-locks" },
  { label: "Accessories", handle: "accessories" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-[85vw] h-full bg-[#4A5240] text-primary-foreground shadow-2xl flex flex-col animate-in slide-in-from-left">
        <div className="h-16 flex items-center justify-between px-6 border-b border-primary-foreground/10">
          <span className="text-sm font-medium tracking-widest uppercase">Menu</span>
          <button onClick={onClose} className="p-2 -mr-2">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
          <nav className="flex flex-col space-y-4">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.handle} 
                href={`/collections/${cat.handle}`}
                onClick={onClose}
                className="text-[15px] font-medium opacity-90 hover:opacity-100"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
          
          <div className="pt-6 border-t border-primary-foreground/10 flex flex-col space-y-4">
            <Link href="/pages/shipping-policy" onClick={onClose} className="text-sm opacity-70">Shipping & Returns</Link>
            <Link href="/faq" onClick={onClose} className="text-sm opacity-70">FAQ</Link>
            <Link href="/pages/contact" onClick={onClose} className="text-sm opacity-70">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
