import { useParams } from "wouter";
import { useProduct, useCollectionProducts } from "@/hooks/useShopify";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState, useMemo } from "react";
import { ShieldCheck, Truck, RotateCcw, CheckCircle2 } from "lucide-react";

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useProduct(handle || "");
  const { data: similarProducts } = useCollectionProducts("advance-wallets", 4);
  const { addItem, isAdding } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const productOptions = useMemo(() => {
    if (!product?.variants?.edges) return [];
    const map = new Map<string, Set<string>>();
    product.variants.edges.forEach(({ node }) => {
      node.selectedOptions.forEach((opt) => {
        if (!map.has(opt.name)) map.set(opt.name, new Set());
        if (opt.value !== "Default Title") map.get(opt.name)!.add(opt.value);
      });
    });
    return Array.from(map.entries())
      .filter(([, v]) => v.size > 0)
      .map(([name, values]) => ({ name, values: Array.from(values) }));
  }, [product]);

  const currentVariant = useMemo(() => {
    if (!product?.variants?.edges) return null;
    return (
      product.variants.edges.find(({ node }) =>
        node.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
      )?.node || product.variants.edges[0]?.node
    );
  }, [product, selectedOptions]);

  const handleAddToCart = async () => {
    if (currentVariant?.availableForSale) {
      await addItem(currentVariant.id, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <Skeleton className="w-48 h-4 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Skeleton className="w-full" style={{ aspectRatio: "1/1" }} />
          </div>
          <div className="space-y-6">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-3/4 h-10" />
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-full h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const mainImage = images[selectedImageIndex] || images[0];
  const price = currentVariant?.price.amount ?? product.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: product.vendor, href: "/collections/all" },
          { label: product.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-8">
        {/* Images */}
        <div className="space-y-4">
          <div
            className="w-full overflow-hidden"
            style={{ aspectRatio: "1/1", background: "var(--card)", borderRadius: "2px" }}
          >
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ color: "var(--muted-foreground)" }}
              >
                No Image
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className="w-20 h-20 flex-shrink-0 overflow-hidden transition-colors"
                  style={{
                    background: "var(--card)",
                    borderRadius: "2px",
                    border: `2px solid ${idx === selectedImageIndex ? "var(--primary)" : "transparent"}`,
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.altText || `Thumbnail ${idx}`}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div
            className="text-[12px] tracking-[0.15em] uppercase font-medium mb-2"
            style={{ color: "var(--rose-gold)" }}
          >
            by {product.vendor}
          </div>

          <h1 className="text-[28px] md:text-[34px] font-medium leading-[1.2] mb-4 capitalize">
            {product.title.toLowerCase()}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[22px] md:text-[24px] font-medium">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span
                className="text-lg line-through"
                style={{ color: "var(--muted-foreground)" }}
              >
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>

          {/* Options */}
          {productOptions.length > 0 && (
            <div className="space-y-6 mb-8">
              {productOptions.map((option) => (
                <div key={option.name}>
                  <div className="text-[13px] font-medium uppercase tracking-wider mb-3">
                    {option.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selectedOptions[option.name] === value;
                      return (
                        <button
                          key={value}
                          onClick={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [option.name]: value,
                            }))
                          }
                          className="min-w-[48px] h-10 px-4 text-[13px] transition-colors"
                          style={{
                            borderRadius: "2px",
                            border: `1px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                            background: isSelected ? "rgba(42,66,52,0.05)" : "transparent",
                            color: isSelected ? "var(--primary)" : "var(--foreground)",
                            fontWeight: isSelected ? 500 : 400,
                          }}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <QuantityStepper value={quantity} onChange={setQuantity} max={10} />
              <button
                onClick={handleAddToCart}
                disabled={!currentVariant?.availableForSale || isAdding}
                className="flex-1 h-12 text-[13px] font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  borderRadius: "3px",
                }}
              >
                {isAdding
                  ? "Adding..."
                  : currentVariant?.availableForSale
                  ? "Add to Cart"
                  : "Out of Stock"}
              </button>
            </div>
          </div>

          {/* Stock */}
          {currentVariant?.availableForSale && (
            <div className="flex items-center gap-2 mb-8 text-[13px]">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              In stock and ready to ship
            </div>
          )}

          {/* Highlights */}
          <div
            className="p-5 mb-8"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "2px",
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  Icon: Truck,
                  title: "Free Shipping",
                  body: "Orders over $50 qualify for free standard shipping.",
                },
                {
                  Icon: RotateCcw,
                  title: "30-Day Returns",
                  body: "Return items within 30 days for a full refund.",
                },
                {
                  Icon: ShieldCheck,
                  title: "2-Year Warranty",
                  body: "Covered against all manufacturer defects.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="flex gap-4 items-start">
                  <Icon
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "var(--primary)" }}
                  />
                  <div>
                    <h4 className="text-[13px] font-medium mb-1">{title}</h4>
                    <p className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {product.descriptionHtml && (
            <div
              className="pt-6 text-[14px] leading-relaxed"
              style={{
                borderTop: "1px solid var(--border)",
                color: "rgba(26,26,26,0.8)",
              }}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts && similarProducts.length > 0 && (
        <div className="mt-24 pt-16" style={{ borderTop: "1px solid var(--border)" }}>
          <MixedHeading className="text-[28px] md:text-[34px] mb-10 text-center">
            You May Also{" "}
            <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
              Like
            </em>
          </MixedHeading>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </div>
  );
}
