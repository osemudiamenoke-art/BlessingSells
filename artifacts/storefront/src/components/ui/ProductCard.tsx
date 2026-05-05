import { Link } from "wouter";
import { Product } from "@/types/shopify";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const firstImage = product.images?.edges[0]?.node;
  const firstVariant = product.variants?.edges[0]?.node;
  const variantId = firstVariant?.id;
  
  const price = product.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (variantId && product.availableForSale) {
      await addItem(variantId, 1);
    }
  };

  return (
    <Link href={`/products/${product.handle}`} className="group block no-underline">
      <div className="relative aspect-square bg-card overflow-hidden mb-4 rounded-[2px]">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
            No Image
          </div>
        )}
      </div>
      
      <div className="space-y-1 mb-3">
        <div className="text-[10px] tracking-[0.12em] text-primary uppercase font-medium">
          {product.vendor}
        </div>
        <h3 className="text-[13px] leading-[1.4] md:text-sm font-normal text-foreground line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-medium text-foreground">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-[13px] text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!product.availableForSale}
        className="w-full h-10 flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid={`add-to-cart-${product.handle}`}
      >
        {product.availableForSale ? "Add to Cart" : "Coming Soon"}
      </button>
    </Link>
  );
}
