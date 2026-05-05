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
  const { data: similarProducts } = useCollectionProducts("frontpage", 4);
  const { addItem, isAdding } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Initialize options when product loads
  useMemo(() => {
    if (product && product.variants?.edges.length) {
      const firstVariant = product.variants.edges[0].node;
      const initialOptions: Record<string, string> = {};
      firstVariant.selectedOptions.forEach(opt => {
        initialOptions[opt.name] = opt.value;
      });
      setSelectedOptions(initialOptions);
    }
  }, [product]);

  // Find the variant that matches selected options
  const currentVariant = useMemo(() => {
    if (!product?.variants?.edges) return null;
    
    return product.variants.edges.find(({ node }) => {
      return node.selectedOptions.every(
        opt => selectedOptions[opt.name] === opt.value
      );
    })?.node || product.variants.edges[0].node;
  }, [product, selectedOptions]);

  // Extract unique options for UI
  const productOptions = useMemo(() => {
    if (!product?.variants?.edges) return [];
    
    const optionsMap = new Map<string, Set<string>>();
    
    product.variants.edges.forEach(({ node }) => {
      node.selectedOptions.forEach(opt => {
        if (!optionsMap.has(opt.name)) {
          optionsMap.set(opt.name, new Set());
        }
        if (opt.value !== "Default Title") {
          optionsMap.get(opt.name)?.add(opt.value);
        }
      });
    });

    return Array.from(optionsMap.entries())
      .filter(([_, values]) => values.size > 0)
      .map(([name, values]) => ({
        name,
        values: Array.from(values)
      }));
  }, [product]);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = async () => {
    if (currentVariant && currentVariant.availableForSale) {
      await addItem(currentVariant.id, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <Skeleton className="w-48 h-4 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <Skeleton className="w-full aspect-square" />
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-20 h-20" />)}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-3/4 h-10" />
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-12" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const images = product.images.edges.map(e => e.node);
  const mainImage = images[selectedImageIndex] || images[0];
  const price = currentVariant ? currentVariant.price.amount : product.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: product.vendor, href: `/collections/all` },
          { label: product.title }
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-8">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-card rounded-[2px] overflow-hidden">
            {mainImage ? (
              <img 
                src={mainImage.url} 
                alt={mainImage.altText || product.title}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                No Image Available
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 flex-shrink-0 bg-card rounded-[2px] overflow-hidden border-2 transition-colors ${
                    idx === selectedImageIndex ? "border-primary" : "border-transparent hover:border-border"
                  }`}
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

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="text-[12px] tracking-[0.15em] text-primary uppercase font-medium mb-2">
            by {product.vendor}
          </div>
          
          <h1 className="text-[28px] md:text-[34px] font-medium leading-[1.2] text-foreground mb-4">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[22px] md:text-[24px] font-medium text-foreground">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>

          {/* Options (Size, Color, etc) */}
          {productOptions.length > 0 && (
            <div className="space-y-6 mb-8">
              {productOptions.map((option) => (
                <div key={option.name}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[13px] font-medium uppercase tracking-wider">{option.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selectedOptions[option.name] === value;
                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`min-w-[48px] h-10 px-4 text-[13px] rounded-[2px] border transition-colors ${
                            isSelected 
                              ? "border-primary bg-primary/5 text-primary font-medium" 
                              : "border-border hover:border-foreground text-foreground"
                          }`}
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
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isAdding ? "Adding..." : currentVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
            
            <button className="w-full h-12 bg-transparent border border-border hover:border-foreground text-foreground text-[13px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors">
              View Similar Products
            </button>
          </div>

          {/* Stock Status */}
          {currentVariant?.availableForSale && (
            <div className="flex items-center gap-2 mb-8 text-[13px] text-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              In stock and ready to ship
            </div>
          )}

          {/* Highlights */}
          <div className="bg-card border border-border rounded-[2px] p-5 mb-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-4 items-start">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-medium mb-1">Free Shipping</h4>
                  <p className="text-[12px] text-muted-foreground">Orders over $50 qualify for free standard shipping.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-medium mb-1">30-Day Returns</h4>
                  <p className="text-[12px] text-muted-foreground">Return items within 30 days for a full refund.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-medium mb-1">2-Year Warranty</h4>
                  <p className="text-[12px] text-muted-foreground">Covered against all manufacturer defects.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.descriptionHtml && (
            <div className="prose prose-sm prose-neutral max-w-none text-[14px] leading-relaxed text-foreground/80 pt-6 border-t border-border"
                 dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts && similarProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-border">
          <MixedHeading className="text-[28px] md:text-[34px] mb-10 text-center">
            You May Also <em className="font-serif italic font-normal">Like</em>
          </MixedHeading>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </div>
  );
}
