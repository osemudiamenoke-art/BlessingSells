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
        background: "var(--foreground)",
        borderBottom: "none",
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
          className="p-2 -ml-2 transition-opacity hover:opacity-70"
          style={{ color: "var(--background)" }}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Logo */}
      <div className="flex-1 md:flex-none flex justify-center md:justify-start">
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 text-lg tracking-[0.1em] font-medium uppercase flex items-center gap-1"
          style={{ color: "var(--background)" }}
        >
          <img src="/logo.png" alt="BlessingSells Logo" className="h-12 w-auto object-contain" />
          <span style={{ color: "var(--background)" }}>
            BLESSINGSELLS
          </span>
        </Link>
      </div>

      {/* Desktop search */}
      <div className="hidden md:flex flex-1 justify-center px-8">
        <form onSubmit={handleSearch} className="w-full max-w-[500px] flex">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              borderRadius: "4px 0 0 4px",
              border: "none",
              background: "var(--background)",
              fontSize: "13px",
              outline: "none",
              color: "#000000",
            }}
          />
          <button
            type="submit"
            style={{
              width: "44px",
              height: "40px",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "0 4px 4px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer"
            }}
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Actions */}
      <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
        {/* Wishlist */}
        <Link
          href="/wishlist"
          id="header-wishlist-btn"
          className="hidden md:flex p-2 transition-opacity hover:opacity-70 relative"
          style={{ color: "var(--background)" }}
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5" strokeWidth={1.5} />
          {wishlistCount > 0 && (
            <span
              className="absolute -top-0 -right-0 w-4 h-4 text-[9px] font-medium flex items-center justify-center rounded-full"
              style={{ background: "var(--royal-magenta)", color: "var(--background)" }}
            >
              {wishlistCount}
            </span>
          )}
        </Link>
        {/* Sign In */}
        <a
          href="https://shopify.com/authentication/56098226229/login?client_id=88d54eb3-db8f-442d-bc20-e1e522247ce4&locale=en-CA&redirect_uri=%2Fauthentication%2F56098226229%2Foauth%2Fauthorize%3Fbuyer_flags%3DeyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzaGVpc2tpbmdlbXBpcmUubXlzaG9waWZ5LmNvbSIsImZsYWdzIjpbXSwiZXhwIjoxNzgyOTMwMTgzLCJuYmYiOjE3ODIzMjUzODN9.e_6G3vBaQXjfwcpqXHrCS8EXCXQwhnn26dBK8bl5AWQ%26client_id%3D88d54eb3-db8f-442d-bc20-e1e522247ce4%26locale%3Den-CA%26nonce%3Da214cdba-4df9-43a8-8be6-432dece558ce%26redirect_uri%3Dhttps%253A%252F%252Fshopify.com%252F56098226229%252Faccount%252Fcallback%26region_country%3DCA%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bcustomer-account-api%253Afull%26state%3DhWNDic1b4Qd76X8RyiByHfZB&region_country=CA"
          id="header-signin-btn"
          className="hidden md:flex p-2 transition-opacity hover:opacity-70"
          style={{ color: "var(--background)" }}
          aria-label="Sign in"
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
        </a>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 relative transition-opacity hover:opacity-70"
          style={{ color: "var(--background)" }}
        >
          <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span
              className="absolute -top-0 -right-0 w-4 h-4 text-[9px] font-medium flex items-center justify-center rounded-full"
              style={{
                background: "var(--royal-magenta)",
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
