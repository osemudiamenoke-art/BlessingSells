import { useEffect, useState } from "react";
import { Link } from "wouter";
import { X, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import type { Product } from "@/types/shopify";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const { addItem, isAdding } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [activeImg, setActiveImg] = useState(0);

  // Reset state when product changes
  useEffect(() => {
    setSelectedVariantIdx(0);
    setActiveImg(0);
  }, [product?.id]);

  // Lock body scroll when open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!product) return null;

  const images = product.images?.edges?.map((e) => e.node) || [];
  const variants = product.variants?.edges?.map((e) => e.node) || [];
  const selectedVariant = variants[selectedVariantIdx];
  const price = selectedVariant?.price?.amount || product.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = async () => {
    if (selectedVariant?.id && product.availableForSale) {
      await addItem(selectedVariant.id, 1);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1000,
          backdropFilter: "blur(2px)",
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.title}`}
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(92vw, 820px)",
          maxHeight: "90vh",
          background: "var(--background)",
          borderRadius: "20px",
          zIndex: 1001,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          animation: "slideUp 0.25s ease",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close quick view"
          style={{
            position: "absolute", top: 14, right: 14, zIndex: 10,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          <X style={{ width: 16, height: 16, color: "var(--foreground)" }} />
        </button>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
          }} className="qv-grid">
            {/* ── Image panel ── */}
            <div style={{ background: "var(--background)", padding: 16 }}>
              {/* Main image */}
              <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1/1", marginBottom: 10 }}>
                {images[activeImg] ? (
                  <img
                    src={images[activeImg].url}
                    alt={images[activeImg].altText || product.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)", fontSize: 13 }}>
                    No Image
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        width: 54, height: 54, borderRadius: 8, overflow: "hidden",
                        border: `2px solid ${i === activeImg ? "var(--primary)" : "transparent"}`,
                        padding: 0, cursor: "pointer", background: "var(--card)",
                        transition: "border-color 0.15s",
                      }}
                    >
                      <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Info panel ── */}
            <div style={{ padding: "24px 24px 24px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Vendor */}
              <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-gold)", textTransform: "uppercase", fontWeight: 600 }}>
                {product.vendor}
              </div>

              {/* Title */}
              <h2 style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.3, margin: 0, color: "var(--foreground)", textTransform: "capitalize" }}>
                {product.title.toLowerCase()}
              </h2>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)" }}>
                  {formatPrice(price)}
                </span>
                {hasDiscount && (
                  <span style={{ fontSize: 15, color: "var(--muted-foreground)", textDecoration: "line-through" }}>
                    {formatPrice(compareAtPrice)}
                  </span>
                )}
                {hasDiscount && (
                  <span style={{ fontSize: 11, fontWeight: 600, background: "rgba(232, 124, 181, 0.15)", color: "var(--hot-pink)", padding: "2px 8px", borderRadius: 9999 }}>
                    SALE
                  </span>
                )}
              </div>

              {/* Variants */}
              {variants.length > 1 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, color: "var(--foreground)" }}>
                    {variants[0]?.selectedOptions?.[0]?.name || "Option"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {variants.map((v, i) => {
                      const label = v.selectedOptions?.[0]?.value || v.title;
                      const active = i === selectedVariantIdx;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariantIdx(i)}
                          disabled={!v.availableForSale}
                          style={{
                            padding: "5px 12px", fontSize: 12, borderRadius: 9999,
                            border: `1.5px solid ${active ? "var(--foreground)" : "var(--border)"}`,
                            background: active ? "var(--foreground)" : "transparent",
                            color: active ? "var(--background)" : "var(--foreground)",
                            cursor: v.availableForSale ? "pointer" : "not-allowed",
                            opacity: v.availableForSale ? 1 : 0.4,
                            fontFamily: "inherit", transition: "all 0.15s",
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Description snippet */}
              {product.descriptionHtml && (
                <div
                  style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6, maxHeight: 80, overflow: "hidden" }}
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              )}

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.availableForSale || isAdding}
                  style={{
                    height: 46, borderRadius: 9999, fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    background: product.availableForSale ? "var(--primary)" : "var(--border)",
                    color: product.availableForSale ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    border: "none", cursor: product.availableForSale ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontFamily: "inherit", transition: "opacity 0.2s",
                    opacity: isAdding ? 0.7 : 1,
                  }}
                >
                  <ShoppingBag style={{ width: 16, height: 16 }} />
                  {isAdding ? "Adding…" : product.availableForSale ? "Add to Cart" : "Sold Out"}
                </button>

                {/* Wishlist + View Full */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => toggleWishlist(product)}
                    style={{
                      flex: 1, height: 42, borderRadius: 9999, fontSize: 12, fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      border: "1.5px solid var(--border)", background: "transparent",
                      color: wishlisted ? "var(--hot-pink)" : "var(--foreground)",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      fontFamily: "inherit", transition: "all 0.15s",
                    }}
                  >
                    <Heart style={{ width: 15, height: 15, fill: wishlisted ? "var(--hot-pink)" : "none", color: wishlisted ? "var(--hot-pink)" : "var(--foreground)" }} />
                    {wishlisted ? "Saved" : "Wishlist"}
                  </button>
                  <Link
                    href={`/products/${product.handle}`}
                    onClick={onClose}
                    style={{
                      flex: 1, height: 42, borderRadius: 9999, fontSize: 12, fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      border: "1.5px solid var(--border)", background: "transparent",
                      color: "var(--foreground)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      fontFamily: "inherit", textDecoration: "none", transition: "all 0.15s",
                    }}
                  >
                    Full Page <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                </div>
              </div>

              {/* Availability badge */}
              <div style={{ fontSize: 12, color: product.availableForSale ? "var(--hot-pink)" : "var(--muted-foreground)", fontWeight: 500 }}>
                {product.availableForSale ? "✓ In stock" : "✗ Out of stock"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, -46%) } to { opacity: 1; transform: translate(-50%, -50%) } }
        @media (max-width: 600px) {
          .qv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
