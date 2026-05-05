import { Link } from "wouter";

const CATEGORIES = [
  { label: "E-Bikes & Scooters", handle: "e-bikes-scooters" },
  { label: "Men's Wallets", handle: "mens-wallets" },
  { label: "Toilet & Bath", handle: "toilet-bath" },
  { label: "Pets", handle: "pets" },
  { label: "Home Appliances", handle: "home-appliances" },
  { label: "Smart Cameras & Door Locks", handle: "smart-cameras-door-locks" },
  { label: "Accessories", handle: "accessories" },
];

export function SecondaryNav() {
  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-[1400px] mx-auto overflow-x-auto no-scrollbar">
        <ul className="flex items-center space-x-6 md:justify-center px-4 min-w-max h-[42px]">
          {CATEGORIES.map((cat) => (
            <li key={cat.handle}>
              <Link 
                href={`/collections/${cat.handle}`}
                className="text-sm font-normal text-foreground capitalize hover:text-primary transition-colors whitespace-nowrap block py-2 border-b-2 border-transparent hover:border-primary"
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
