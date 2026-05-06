import { Link } from "wouter";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = async (product: (typeof wishlist)[0]) => {
    const firstVariant = product.variants?.edges[0]?.node;
    if (firstVariant?.id && product.availableForSale) {
      await addItem(firstVariant.id, 1);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem 1rem 4rem",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1.5rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              margin: 0,
              color: "var(--foreground)",
            }}
          >
            My Wishlist
          </h1>
          <p
            style={{
              marginTop: "6px",
              fontSize: "14px",
              color: "var(--muted-foreground)",
            }}
          >
            {wishlist.length === 0
              ? "Your wishlist is empty"
              : `${wishlist.length} saved item${wishlist.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            style={{
              fontSize: "13px",
              color: "var(--muted-foreground)",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "6rem 1rem",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#f0ede8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <Heart
              style={{ width: "36px", height: "36px", color: "#c9b8a8" }}
              strokeWidth={1.5}
            />
          </div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 500,
              marginBottom: "0.75rem",
              color: "var(--foreground)",
            }}
          >
            Save things as you browse
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "var(--muted-foreground)",
              maxWidth: "340px",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Tap ♡ on any product. It lands here so you don't lose it.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              border: "1.5px solid var(--foreground)",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--foreground)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Keep Browsing
          </Link>
        </div>
      ) : (
        /* Product Grid */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {wishlist.map((product) => {
            const firstImage = product.images?.edges[0]?.node;
            const price = product.priceRange.minVariantPrice.amount;
            const compareAtPrice =
              product.compareAtPriceRange?.minVariantPrice.amount;
            const hasDiscount =
              compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);

            return (
              <div key={product.id} className="group">
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
                  {/* Image */}
                  <Link href={`/products/${product.handle}`}>
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
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            mixBlendMode: "multiply",
                            transition: "transform 0.5s ease",
                          }}
                          className="group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--muted-foreground)",
                            fontSize: "13px",
                            opacity: 0.4,
                          }}
                        >
                          No Image
                        </div>
                      )}

                      {/* Remove from wishlist */}
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label="Remove from wishlist"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.92)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                          transition: "transform 0.15s ease",
                        }}
                      >
                        <Heart
                          style={{
                            width: "17px",
                            height: "17px",
                            color: "#e05252",
                            fill: "#e05252",
                          }}
                          strokeWidth={2}
                        />
                      </button>
                    </div>
                  </Link>

                  {/* Info */}
                  <div style={{ padding: "0 4px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        marginBottom: "4px",
                      }}
                    >
                      {product.vendor}
                    </div>
                    <Link href={`/products/${product.handle}`}>
                      <h3
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.4,
                          fontWeight: 400,
                          color: "var(--foreground)",
                          margin: "0 0 8px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.title}
                      </h3>
                    </Link>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "var(--foreground)",
                        }}
                      >
                        {formatPrice(price)}
                      </span>
                      {hasDiscount && (
                        <span
                          style={{
                            fontSize: "13px",
                            color: "var(--muted-foreground)",
                            textDecoration: "line-through",
                          }}
                        >
                          {formatPrice(compareAtPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.availableForSale}
                      style={{
                        width: "100%",
                        height: "40px",
                        background: "transparent",
                        border: "1.5px solid var(--foreground)",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--foreground)",
                        cursor: product.availableForSale
                          ? "pointer"
                          : "not-allowed",
                        opacity: product.availableForSale ? 1 : 0.4,
                        fontFamily: "inherit",
                        transition: "background 0.2s, color 0.2s",
                      }}
                      className="add-to-cart-btn"
                    >
                      {product.availableForSale ? "Add to Cart" : "Sold Out"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
