import { Link, useLocation } from "wouter";
import { Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { label: "All",                        handle: "all" },
  { label: "E-Bikes & Scooters",          handle: "electronic-bike" },
  { label: "Men's Wallets",               handle: "advance-wallets" },
  { label: "Toilet & Bath",              handle: "toilet-bath" },
  { label: "Pets",                        handle: "pet-collection" },
  { label: "Home Appliances",            handle: "home-appliance" },
  { label: "Smart Cameras & Door Locks", handle: "smart-security-camera" },
  { label: "Cell Phones & Accessories",  handle: "cell-phones-accessories" },
  { label: "Hair & Beauty",              handle: "hair-care" },
  { label: "Smart & Fitness Watch",      handle: "watch" },
  { label: "Headphone & Ear Bud",        handle: "smart-earbuds" },
  { label: "Smart Ring",                 handle: "smart-ring" },
  { label: "Baby & Maternity",           handle: "baby-maternity" },
];

export function SecondaryNav() {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <div
      style={{
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* ── Desktop: category links ── */}
      <nav className="hidden md:block">
        <div
          className="max-w-[1400px] mx-auto overflow-x-auto no-scrollbar"
          style={{ overflowX: "auto" }}
        >
          <ul
            className="flex items-center space-x-6 md:justify-center px-4 min-w-max"
            style={{ height: "42px" }}
          >
            {CATEGORIES.map((cat) => (
              <li key={cat.handle}>
                <Link
                  href={`/collections/${cat.handle}`}
                  className="text-sm font-normal whitespace-nowrap block py-2 transition-colors"
                  style={{
                    color: "var(--foreground)",
                    borderBottom: "2px solid transparent",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--primary)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--foreground)")
                  }
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Mobile: search bar & categories ── */}
      <div className="md:hidden">
        {/* Search Bar */}
        <div className="px-4 py-2">
          <form onSubmit={handleSearch} style={{ position: "relative" }}>
            <Search
              style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)",
                width: 16, height: 16,
                color: "var(--muted-foreground)",
                pointerEvents: "none",
              }}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              style={{
                width: "100%",
                height: 38,
                paddingLeft: 36,
                paddingRight: 12,
                borderRadius: 9999,
                border: "1.5px solid var(--border)",
                background: "var(--card)",
                fontSize: 13,
                color: "var(--foreground)",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </form>
        </div>

        {/* Mobile Categories Scroll */}
        <nav className="pb-2">
          <div
            className="overflow-x-auto no-scrollbar"
            style={{ overflowX: "auto" }}
          >
            <ul
              className="flex items-center space-x-4 px-4 min-w-max"
              style={{ height: "36px" }}
            >
              {CATEGORIES.map((cat) => (
                <li key={cat.handle}>
                  <Link
                    href={`/collections/${cat.handle}`}
                    className="text-[13px] font-medium whitespace-nowrap block px-3 py-1.5 transition-colors"
                    style={{
                      color: "var(--foreground)",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "9999px",
                    }}
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
