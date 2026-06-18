import { Link } from "wouter";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCollectionProducts } from "@/hooks/useShopify";
import type { Product } from "@/types/shopify";

const CATEGORIES = [
  { label: "E-Bikes & Scooters",          handle: "electronic-bike",         img: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?q=80&w=800&auto=format&fit=crop" },
  { label: "Men's Wallets",               handle: "advance-wallets",          img: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop" },
  { label: "Toilet & Bath",              handle: "toilet-bath",              img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop" },
  { label: "Pets",                        handle: "pet-collection",           img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop" },
  { label: "Home Appliances",            handle: "home-appliance",           img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
  { label: "Smart Cameras & Door Locks", handle: "smart-security-camera",    img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop" },
  { label: "Accessories",                handle: "cell-phones-accessories",  img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop" },
  { label: "Hair & Beauty",              handle: "hair-care",                img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop" },
  { label: "Smart & Fitness Watch",      handle: "watch",                    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop" },
  { label: "Headphone & Ear Bud",        handle: "smart-earbuds",            img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" },
  { label: "Smart Ring",                 handle: "smart-ring",               img: "https://images.unsplash.com/photo-1605100804763-247f67b45456?q=80&w=800&auto=format&fit=crop" },
  { label: "Baby & Maternity",           handle: "baby-maternity",           img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop" },
];

// ── View All placeholder — full-bleed clear image with floating badge ──
function ViewAllCard({ handle, label, img }: { handle: string; label: string; img: string }) {
  return (
    <Link href={`/collections/${handle}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.25s, transform 0.25s",
        position: "relative",
      }} className="view-all-card">
        {/* Full-coverage clear image */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "3/4",
        }}>
          <img
            src={img}
            alt={label}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            className="view-all-img"
            loading="lazy"
          />
          {/* Subtle gradient at the bottom for text contrast */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, transparent 60%)",
            pointerEvents: "none",
          }} />
          {/* "View All" text — positioned neatly on the image */}
          <div style={{
            position: "absolute",
            bottom: "24px",
            left: "16px",
            right: "16px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <span style={{
              fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#fff",
              lineHeight: 1.4,
              textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.6)",
              transition: "transform 0.25s, color 0.25s",
            }} className="view-all-text">
              View All / {label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── One collection strip ──────────────────────────────────────────
function CollectionStrip({ label, handle, img }: { label: string; handle: string; img: string }) {
  const { data: products, isLoading } = useCollectionProducts(handle, 4, "BEST_SELLING");

  return (
    <section style={{ padding: "40px 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 1rem" }}>
        {/* Section header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.5rem", gap: 12, flexWrap: "wrap" }}>
          <MixedHeading className="text-[22px] md:text-[28px]">
            {label.split(" ").slice(0, -1).join(" ")}{" "}
            <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
              {label.split(" ").slice(-1)}
            </em>
          </MixedHeading>
          <Link
            href={`/collections/${handle}`}
            style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--foreground)",
              borderBottom: "1.5px solid var(--foreground)", paddingBottom: 2,
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "opacity 0.15s",
            }}
          >
            View All →
          </Link>
        </div>

        {/* Products + View All card in a 2-col (mobile) / 5-col (desktop) grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Skeleton className="w-full" style={{ aspectRatio: "1/1", borderRadius: 16 }} />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {products.slice(0, 4).map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
            <ViewAllCard handle={handle} label={label} img={img} />
          </div>
        ) : (
          // Fallback — full-width View All if collection is empty
          <ViewAllCard handle={handle} label={label} img={img} />
        )}
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="w-full">

      {/* Category strips */}

      {/* Category strips */}
      {CATEGORIES.map((cat) => (
        <CollectionStrip key={cat.handle} {...cat} />
      ))}

      <style>{`
        .view-all-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }
        .view-all-card:hover .view-all-img {
          transform: scale(1.06);
        }
        .view-all-card:hover .view-all-text {
          color: var(--primary);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
