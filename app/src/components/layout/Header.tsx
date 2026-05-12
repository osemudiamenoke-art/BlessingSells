import { Link, useLocation } from "wouter";
import { Heart, User, ShoppingCart, Menu, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { cart, setIsOpen } = useCart();
  const { wishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const cartCount = cart?.totalQuantity || 0;
  const wishlistCount = wishlist.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header
      style={{
        height: "64px",
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        padding: "0 1rem",
      }}
    >
      {/* Mobile hamburger */}
      <div className="flex-1 flex items-center md:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2"
          style={{ color: "var(--foreground)" }}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Logo */}
      <div className="flex-1 md:flex-none flex justify-center md:justify-start">
        <Link
          href="/"
          className="text-lg tracking-[0.1em] font-medium uppercase flex items-center gap-2"
          style={{ color: "var(--foreground)" }}
        >
          <span>
            <span style={{ color: "var(--hot-pink)" }}>B</span>
            LESSING
            <span style={{ color: "var(--primary)" }}>S</span>
            ELLS
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--rose-gold)" }}
          />
        </Link>
      </div>

      {/* Desktop search */}
      <div className="hidden md:flex flex-1 justify-center px-8">
        <form onSubmit={handleSearch} className="w-full max-w-[340px] relative">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "2.5rem",
              paddingRight: "1rem",
              borderRadius: "9999px",
              border: "1px solid var(--border)",
              background: "transparent",
              fontSize: "13px",
              outline: "none",
              color: "var(--foreground)",
            }}
          />
          <Search
            className="w-4 h-4 absolute left-4 top-3"
            style={{ color: "var(--muted-foreground)" }}
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
        {/* Wishlist */}
        <Link
          href="/wishlist"
          id="header-wishlist-btn"
          className="hidden md:flex p-2 transition-colors hover:opacity-70 relative"
          style={{ color: "var(--foreground)" }}
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5" strokeWidth={1.5} />
          {wishlistCount > 0 && (
            <span
              className="absolute -top-0 -right-0 w-4 h-4 text-[9px] font-medium flex items-center justify-center rounded-full"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              {wishlistCount}
            </span>
          )}
        </Link>
        {/* Sign In */}
        <a
          href="https://account.blessingsells.com/authentication/login?client_id=88d54eb3-db8f-442d-bc20-e1e522247ce4&locale=en-CA&redirect_uri=%2Fauthentication%2Foauth%2Fauthorize%3F_cs%3D3.AMPS_CAQC___mI4o6GhISzKc-z%252AoCcXOUw%26buyer_flags%3DeyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzaGVpc2tpbmdlbXBpcmUubXlzaG9waWZ5LmNvbSIsImZsYWdzIjpbXSwiZXhwIjoxNzc4NjMzNDU2LCJuYmYiOjE3NzgwMjg2NTZ9.wVhcoGM1bbaDV08cfBLx_eH7B_-1JLR7XJt6HfsFS3c%26client_id%3D88d54eb3-db8f-442d-bc20-e1e522247ce4%26locale%3Den-CA%26nonce%3Df4a88de3-a4e6-4c8e-84f0-b3abf6d66cb6%26redirect_uri%3Dhttps%253A%252F%252Faccount.blessingsells.com%252Fcallback%26region_country%3DCA%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bcustomer-account-api%253Afull%26state%3DhWNBpZWuQ9xQAe3uxmaym3BB&region_country=CA"
          id="header-signin-btn"
          className="hidden md:flex p-2 transition-colors hover:opacity-70"
          style={{ color: "var(--foreground)" }}
          aria-label="Sign in"
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
        </a>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 relative transition-colors hover:opacity-70"
          style={{ color: "var(--foreground)" }}
        >
          <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span
              className="absolute -top-0 -right-0 w-4 h-4 text-[9px] font-medium flex items-center justify-center rounded-full"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
