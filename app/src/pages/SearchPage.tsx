import { useState, useEffect, useMemo } from "react";
import { useSearch, useLocation } from "wouter";
import { useSearchProducts } from "@/hooks/useShopify";
import { ProductCard } from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import type { Product } from "@/types/shopify";

// ── Filter types ────────────────────────────────────────────────
type SortKey = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

interface Filters {
  sort: SortKey;
  priceMin: string;
  priceMax: string;
  availability: "all" | "in-stock" | "out-of-stock";
  categories: string[];
}

const DEFAULT_FILTERS: Filters = {
  sort: "relevance",
  priceMin: "",
  priceMax: "",
  availability: "all",
  categories: [],
};

// Categories matching the site's collections
const SITE_CATEGORIES = [
  "E-Bikes & Scooters",
  "Men's Wallets",
  "Toilet & Bath",
  "Pets",
  "Home Appliances",
  "Smart Cameras & Door Locks",
  "Cell Phones & Accessories",
  "Groceries",
  "Health & Beauty",
  "Home & Garden",
  "Accessories",
];

// ── Helper: apply client-side filters ───────────────────────────
function applyFilters(products: Product[], filters: Filters): Product[] {
  let result = [...products];

  // Availability
  if (filters.availability === "in-stock") {
    result = result.filter((p) => p.availableForSale);
  } else if (filters.availability === "out-of-stock") {
    result = result.filter((p) => !p.availableForSale);
  }

  // Price range
  const min = parseFloat(filters.priceMin);
  const max = parseFloat(filters.priceMax);
  if (!isNaN(min)) result = result.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) >= min);
  if (!isNaN(max)) result = result.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) <= max);

  // Category (match vendor or tags)
  if (filters.categories.length > 0) {
    result = result.filter((p) => {
      const vendorMatch = filters.categories.some((c) =>
        p.vendor?.toLowerCase().includes(c.toLowerCase())
      );
      const tagMatch = p.tags?.some((t) =>
        filters.categories.some((c) => t.toLowerCase().includes(c.toLowerCase()))
      );
      return vendorMatch || tagMatch;
    });
  }

  // Sort
  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
      break;
    case "price-desc":
      result.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
      break;
    case "name-asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      break;
  }

  return result;
}

// ── Collapsible section ──────────────────────────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem", marginBottom: "1rem" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "none", border: "none", cursor: "pointer", padding: "0 0 0.75rem",
          fontFamily: "inherit", fontSize: "13px", fontWeight: 600,
          letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--foreground)",
        }}
      >
        {title}
        <ChevronDown style={{ width: 15, height: 15, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "var(--muted-foreground)" }} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function SearchPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialQuery = params.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  const { data: rawProducts, isLoading } = useSearchProducts(debouncedQuery, 48);

  const filteredProducts = useMemo(() => {
    if (!rawProducts) return [];
    return applyFilters(rawProducts, filters);
  }, [rawProducts, filters]);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.sort !== "relevance") n++;
    if (filters.priceMin || filters.priceMax) n++;
    if (filters.availability !== "all") n++;
    if (filters.categories.length > 0) n++;
    return n;
  }, [filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setLocation(`/search?q=${encodeURIComponent(query)}`);
  };

  const toggleCategory = (cat: string) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(cat) ? f.categories.filter((c) => c !== cat) : [...f.categories, cat],
    }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // Shared radio style
  const radioLabel = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
    fontSize: 13, color: active ? "var(--primary)" : "var(--foreground)",
    fontWeight: active ? 500 : 400, padding: "3px 0",
  });

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
      {/* Page heading */}
      <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 500, marginBottom: "1.5rem" }}>
        Search <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>Products</em>
      </h1>

      {/* Search bar */}
      <form onSubmit={handleSubmit} style={{ position: "relative", maxWidth: 520, marginBottom: "2rem" }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          autoFocus
          style={{
            width: "100%", height: 48, paddingLeft: 48, paddingRight: 16,
            fontSize: 15, background: "transparent", border: "none",
            borderBottom: "2px solid var(--border)", color: "var(--foreground)",
            outline: "none", fontFamily: "inherit",
          }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--primary)")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--border)")}
        />
        <Search style={{ position: "absolute", left: 14, top: 14, width: 20, height: 20, color: "var(--muted-foreground)" }} />
      </form>

      {/* Result count + mobile filter toggle */}
      {debouncedQuery && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
            {isLoading
              ? `Searching for "${debouncedQuery}"…`
              : `${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} for "${debouncedQuery}"`
            }
            {activeFilterCount > 0 && !isLoading && (
              <button onClick={resetFilters} style={{ marginLeft: 12, fontSize: 12, color: "var(--primary)", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Clear filters
              </button>
            )}
          </p>
          {/* Mobile filter button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden"
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
              border: "1.5px solid var(--border)", borderRadius: 9999, fontSize: 13,
              background: "none", cursor: "pointer", fontFamily: "inherit", color: "var(--foreground)",
            }}
          >
            <SlidersHorizontal style={{ width: 15, height: 15 }} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>
      )}

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>

        {/* ── Sidebar (desktop always visible, mobile overlay) ── */}
        <>
          {/* Mobile overlay backdrop */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 49 }}
            />
          )}

          <aside
            style={{
              width: 240, flexShrink: 0,
              // Desktop: always visible
              ...(typeof window !== "undefined" && window.innerWidth >= 768
                ? {}
                : {
                    position: "fixed", top: 0, left: 0, bottom: 0, width: 280,
                    background: "var(--background)", zIndex: 50, overflowY: "auto",
                    padding: "1.5rem 1.25rem",
                    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                    transition: "transform 0.28s ease",
                    boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
                  }),
            }}
            className="hidden md:block"
          >
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              toggleCategory={toggleCategory}
              radioLabel={radioLabel}
              onClose={() => setSidebarOpen(false)}
            />
          </aside>

          {/* Mobile drawer (separate DOM node so it always renders) */}
          <div
            style={{
              position: "fixed", top: 0, left: 0, bottom: 0, width: 288,
              background: "var(--background)", zIndex: 50, overflowY: "auto",
              padding: "1.5rem 1.25rem",
              transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.28s ease",
              boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
            }}
            className="md:hidden"
          >
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              toggleCategory={toggleCategory}
              radioLabel={radioLabel}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </>

        {/* ── Results grid ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.5rem" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Skeleton className="w-full" style={{ aspectRatio: "1/1", borderRadius: 16 }} />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.5rem" }}>
              {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : debouncedQuery ? (
            <div style={{ textAlign: "center", padding: "5rem 1rem", color: "var(--muted-foreground)" }}>
              <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>No results found</p>
              <p style={{ fontSize: 14 }}>
                {activeFilterCount > 0 ? "Try adjusting your filters or search terms." : "Try different search terms or browse our collections."}
              </p>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} style={{ marginTop: 16, padding: "8px 20px", border: "1.5px solid var(--foreground)", borderRadius: 9999, fontSize: 13, background: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "5rem 1rem", color: "var(--muted-foreground)" }}>
              <p style={{ fontSize: 14 }}>Start typing to search for products.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Filter Sidebar component ─────────────────────────────────────
function FilterSidebar({
  filters,
  setFilters,
  toggleCategory,
  radioLabel,
  onClose,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleCategory: (cat: string) => void;
  radioLabel: (active: boolean) => React.CSSProperties;
  onClose: () => void;
}) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Filters</span>
        <button onClick={onClose} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <X style={{ width: 18, height: 18, color: "var(--muted-foreground)" }} />
        </button>
      </div>

      {/* Sort */}
      <FilterSection title="Sort By">
        {(["relevance", "price-asc", "price-desc", "name-asc", "name-desc"] as SortKey[]).map((key) => {
          const labels: Record<SortKey, string> = {
            relevance: "Relevance",
            "price-asc": "Price: Low → High",
            "price-desc": "Price: High → Low",
            "name-asc": "Name: A → Z",
            "name-desc": "Name: Z → A",
          };
          return (
            <label key={key} style={radioLabel(filters.sort === key)}>
              <input
                type="radio"
                name="sort"
                checked={filters.sort === key}
                onChange={() => setFilters((f) => ({ ...f, sort: key }))}
                style={{ accentColor: "var(--primary)" }}
              />
              {labels[key]}
            </label>
          );
        })}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        {(["all", "in-stock", "out-of-stock"] as const).map((key) => {
          const labels = { all: "All Products", "in-stock": "In Stock", "out-of-stock": "Out of Stock" };
          return (
            <label key={key} style={radioLabel(filters.availability === key)}>
              <input
                type="radio"
                name="availability"
                checked={filters.availability === key}
                onChange={() => setFilters((f) => ({ ...f, availability: key }))}
                style={{ accentColor: "var(--primary)" }}
              />
              {labels[key]}
            </label>
          );
        })}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="number"
            placeholder="Min"
            min={0}
            value={filters.priceMin}
            onChange={(e) => setFilters((f) => ({ ...f, priceMin: e.target.value }))}
            style={{
              width: "100%", height: 36, padding: "0 10px", fontSize: 13,
              border: "1.5px solid var(--border)", borderRadius: 8,
              background: "var(--background)", color: "var(--foreground)",
              fontFamily: "inherit", outline: "none",
            }}
          />
          <span style={{ color: "var(--muted-foreground)", fontSize: 13 }}>–</span>
          <input
            type="number"
            placeholder="Max"
            min={0}
            value={filters.priceMax}
            onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value }))}
            style={{
              width: "100%", height: 36, padding: "0 10px", fontSize: 13,
              border: "1.5px solid var(--border)", borderRadius: 8,
              background: "var(--background)", color: "var(--foreground)",
              fontFamily: "inherit", outline: "none",
            }}
          />
        </div>
        {/* Quick price chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {[["Under 50", "", "50"], ["50–100", "50", "100"], ["100–200", "100", "200"], ["200+", "200", ""]].map(([label, mn, mx]) => {
            const active = filters.priceMin === mn && filters.priceMax === mx;
            return (
              <button
                key={label}
                onClick={() => setFilters((f) => ({ ...f, priceMin: active ? "" : mn, priceMax: active ? "" : mx }))}
                style={{
                  padding: "4px 10px", fontSize: 12, borderRadius: 9999, cursor: "pointer", fontFamily: "inherit",
                  border: `1.5px solid ${active ? "var(--primary)" : "var(--border)"}`,
                  background: active ? "var(--primary)" : "transparent",
                  color: active ? "var(--primary-foreground)" : "var(--foreground)",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        {SITE_CATEGORIES.map((cat) => {
          const active = filters.categories.includes(cat);
          return (
            <label key={cat} style={{ ...radioLabel(active), gap: 8 }}>
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggleCategory(cat)}
                style={{ accentColor: "var(--primary)", width: 14, height: 14 }}
              />
              {cat}
            </label>
          );
        })}
      </FilterSection>
    </div>
  );
}
