import { Link } from "wouter";

const CATEGORIES = [
  { label: "E-Bikes & Scooters", handle: "electronic-bike" },
  { label: "Men's Wallets", handle: "advance-wallets" },
  { label: "Toilet & Bath", handle: "toilet-bath" },
  { label: "Pets", handle: "pet-collection" },
  { label: "Home Appliances", handle: "home-appliance" },
  { label: "Smart Cameras & Door Locks", handle: "smart-security-camera" },
  { label: "Cell Phones & Accessories", handle: "cell-phones-accessories" },
];

export function SecondaryNav() {
  return (
    <nav
      style={{
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
      }}
    >
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
  );
}
