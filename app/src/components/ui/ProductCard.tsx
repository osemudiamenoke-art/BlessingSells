import { useState } from "react";
import { Link } from "wouter";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/types/shopify";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { QuickView } from "./QuickView";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const firstImage = product.images?.edges[0]?.node;
  const firstVariant = product.variants?.edges[0]?.node;

  const price = product.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (firstVariant?.id && product.availableForSale) {
      await addItem(firstVariant.id, 1);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <Link href={`/products/${product.handle}`} className="group block">
        <div
          style={{
            background: "var(--card)",
            borderRadius: "16px",
            overflow: "hidden",
            padding: "12px",
            transition: "box-shadow 0.2s ease",
          }}
          className="group-hover:shadow-md"
        >
          {/* Image area */}
          <div
            style={{
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              aspectRatio: "1/1",
              background: "#f0ede8",
              marginBottom: "12px",
            }}
          >
            {firstImage ? (
              <img
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", mixBlendMode: "multiply",
                  transition: "transform 0.5s ease",
                }}
                className="group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)", fontSize: "13px", opacity: 0.4 }}>
                No Image
              </div>
            )}

            {/* Sold out overlay */}
            {!product.availableForSale && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  Sold Out
                </span>
              </div>
            )}

            {/* ── Top-right: Heart ── */}
            <button
              id={`wishlist-${product.id}`}
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              style={{
                position: "absolute", top: "10px", right: "10px",
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "none", cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                transition: "transform 0.15s ease",
              }}
              className="wishlist-btn"
            >
              <Heart style={{ width: "17px", height: "17px", color: wishlisted ? "#e05252" : "#888", fill: wishlisted ? "#e05252" : "none", transition: "color 0.2s ease, fill 0.2s ease" }} strokeWidth={2} />
            </button>

            {/* ── Bottom-centre: Eye / Quick view ──
                Always visible on mobile (md:opacity-0 + group-hover:opacity-100) */}
            <button
              id={`quickview-${product.id}`}
              onClick={handleQuickView}
              aria-label="Quick view product"
              style={{
                position: "absolute", bottom: "10px", left: "50%",
                transform: "translateX(-50%)",
                width: "36px", height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.95)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "none", cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
                color: "var(--foreground)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              className="quick-view-btn"
            >
              <Eye style={{ width: "16px", height: "16px" }} strokeWidth={2} />
            </button>
          </div>

          {/* Product info */}
          <div style={{ padding: "0 4px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--primary)", textTransform: "uppercase", fontWeight: 500, marginBottom: "4px" }}>
              {product.vendor}
            </div>
            <h3 style={{ fontSize: "13px", lineHeight: 1.4, fontWeight: 400, color: "var(--foreground)", margin: "0 0 8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {product.title}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--foreground)" }}>
                {formatPrice(price)}
              </span>
              {hasDiscount && (
                <span style={{ fontSize: "13px", color: "var(--muted-foreground)", textDecoration: "line-through" }}>
                  {formatPrice(compareAtPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.availableForSale}
              style={{
                width: "100%", height: "40px",
                background: "transparent",
                border: "1.5px solid var(--foreground)",
                borderRadius: "9999px",
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--foreground)",
                cursor: product.availableForSale ? "pointer" : "not-allowed",
                opacity: product.availableForSale ? 1 : 0.4,
                transition: "background 0.2s ease, color 0.2s ease",
                fontFamily: "inherit",
              }}
              className="add-to-cart-btn"
            >
              {product.availableForSale ? "Add to Cart" : "Sold Out"}
            </button>
          </div>
        </div>
      </Link>

      {/* Quick View modal portal */}
      {quickViewOpen && (
        <QuickView product={product} onClose={() => setQuickViewOpen(false)} />
      )}

      <style>{`
        /* Desktop: hide eye btn until hover */
        @media (min-width: 768px) {
          .quick-view-btn {
            opacity: 0;
            transform: translateX(-50%) translateY(4px);
          }
          .group:hover .quick-view-btn {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        /* Mobile: always visible */
        @media (max-width: 767px) {
          .quick-view-btn {
            opacity: 1 !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </>
  );
}
