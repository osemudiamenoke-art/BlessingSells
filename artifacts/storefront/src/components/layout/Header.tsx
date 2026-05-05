import { Link, useLocation } from "wouter";
import { Heart, User, ShoppingCart, Menu, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { cart, setIsOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartCount = cart?.totalQuantity || 0;

  return (
    <header className="h-16 bg-background border-b border-border sticky top-0 z-40 flex items-center px-4 md:px-8">
      <div className="flex-1 flex items-center md:hidden">
        <button onClick={onMenuClick} className="p-2 -ml-2 text-foreground">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 md:flex-none flex justify-center md:justify-start">
        <Link href="/" className="text-lg md:text-[18px] tracking-[0.1em] font-sans font-medium text-foreground uppercase flex items-baseline">
          BLESSINGSELLS<span className="text-primary ml-1.5 w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center px-8">
        <form onSubmit={handleSearch} className="w-full max-w-[340px] relative">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-full border border-border bg-transparent text-[13px] outline-none focus:border-primary transition-colors"
          />
          <Search className="w-4 h-4 absolute left-4 top-3 text-muted-foreground" />
        </form>
      </div>

      <div className="flex-1 flex items-center justify-end gap-2 md:gap-5">
        <button className="hidden md:flex p-2 text-foreground hover:text-primary transition-colors">
          <Heart className="w-5 h-5 stroke-[1.5]" />
        </button>
        <button className="hidden md:flex p-2 text-foreground hover:text-primary transition-colors">
          <User className="w-5 h-5 stroke-[1.5]" />
        </button>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-foreground hover:text-primary transition-colors relative flex items-center"
        >
          <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-foreground text-background text-[9px] font-medium flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
