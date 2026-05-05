import { useParams } from "wouter";
import { useCollectionProducts } from "@/hooks/useShopify";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();
  const [sortKey, setSortKey] = useState("BEST_SELLING");
  const [reverse, setReverse] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  
  // Safe handle fallback for 'all'
  const collectionHandle = handle === "all" ? "frontpage" : handle;
  
  const { data: products, isLoading, error } = useCollectionProducts(collectionHandle || "", 48, sortKey, reverse);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "PRICE_LOW_HIGH") {
      setSortKey("PRICE");
      setReverse(false);
    } else if (val === "PRICE_HIGH_LOW") {
      setSortKey("PRICE");
      setReverse(true);
    } else if (val === "NEWEST") {
      setSortKey("CREATED_AT");
      setReverse(true);
    } else {
      setSortKey("BEST_SELLING");
      setReverse(false);
    }
  };

  const title = handle ? handle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "Collection";

  const filteredProducts = products ? (showInStockOnly ? products.filter(p => p.availableForSale) : products) : [];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: title }
        ]} 
      />

      <div className="mb-10 text-center md:text-left">
        <MixedHeading className="text-[32px] md:text-[42px] mb-4">
          {title.split(' ')[0]} <em className="font-serif italic font-normal">{title.split(' ').slice(1).join(' ')}</em>
        </MixedHeading>
        {/* We would fetch collection description here ideally, but using placeholder for layout */}
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto md:mx-0">
          Discover our curated selection of premium {title.toLowerCase()}.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
        <div className="flex items-center gap-4 text-sm w-full md:w-auto">
          <button className="flex items-center gap-2 text-foreground md:hidden border border-border px-4 py-2 rounded-sm w-full justify-center">
            <SlidersHorizontal className="w-4 h-4" /> Filter & Sort
          </button>
          
          <div className="hidden md:flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showInStockOnly}
                onChange={(e) => setShowInStockOnly(e.target.checked)}
                className="accent-primary"
              />
              <span className="text-[13px]">In stock only</span>
            </label>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-[13px] text-muted-foreground">Sort by:</span>
          <select 
            onChange={handleSortChange}
            className="text-[13px] bg-transparent border-none outline-none cursor-pointer text-foreground font-medium py-1"
          >
            <option value="BEST_SELLING">Best Selling</option>
            <option value="NEWEST">Newest</option>
            <option value="PRICE_LOW_HIGH">Price: Low-High</option>
            <option value="PRICE_HIGH_LOW">Price: High-Low</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-destructive">
          Failed to load products. Please try again.
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-24 text-muted-foreground">
          No products found in this collection.
        </div>
      )}
    </div>
  );
}
