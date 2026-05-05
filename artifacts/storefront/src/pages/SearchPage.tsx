import { useSearchProducts } from "@/hooks/useShopify";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { Search } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);

  const { data: products, isLoading, error } = useSearchProducts(query, 48);

  useEffect(() => {
    setInputValue(initialQuery);
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setLocation(`/search?q=${encodeURIComponent(inputValue)}`);
      setQuery(inputValue);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <MixedHeading className="text-[32px] md:text-[42px] mb-8">
          Search <em className="font-serif italic font-normal">Products</em>
        </MixedHeading>
        
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for items, categories, brands..."
            className="w-full h-14 pl-12 pr-6 bg-card border border-border text-base outline-none focus:border-primary transition-colors rounded-[2px]"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-1.5 text-xs tracking-wider uppercase font-medium rounded-[2px] hover:bg-foreground/90 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {!query ? (
        <div className="text-center py-20 text-muted-foreground">
          Enter a search term above to find products.
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-destructive">
          Failed to perform search. Please try again.
        </div>
      ) : products && products.length > 0 ? (
        <div>
          <div className="text-sm text-muted-foreground mb-8">
            Showing {products.length} results for "{query}"
          </div>
          <ProductGrid products={products} />
        </div>
      ) : (
        <div className="text-center py-24">
          <h3 className="text-xl font-medium mb-3">No results found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any products matching "{query}". Try checking your spelling or using more general terms.
          </p>
        </div>
      )}
    </div>
  );
}
