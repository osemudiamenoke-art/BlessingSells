import { useParams } from "wouter";
import { useCollectionProducts, useNewestProducts } from "@/hooks/useShopify";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

function AllProductsPage() {
  // Special page for /collections/all — uses the products query directly
  const { data: products, isLoading } = useNewestProducts(48);
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "All Products" }]} />
      <div className="mt-8 mb-10">
        <MixedHeading className="text-[32px] md:text-[40px]">All Products</MixedHeading>
        {!isLoading && products && (
          <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            {products.length} products
          </p>
        )}
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full" style={{ aspectRatio: "1/1" }} />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-24" style={{ color: "var(--muted-foreground)" }}>
          <p className="text-lg font-medium mb-4">No products found</p>
        </div>
      )}
    </div>
  );
}
export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();

  // Handle the special 'all' case — no such collection exists in Shopify
  if (handle === "all") return <AllProductsPage />;

  const { data: products, isLoading, error } = useCollectionProducts(handle || "advance-wallets", 24);

  const title = handle
    ? handle.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "All Products";

  if (error) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-medium mb-4">Failed to load collection</h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          {error instanceof Error ? error.message : "Please try again later."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: title }]}
      />

      <div className="mt-8 mb-10">
        <MixedHeading className="text-[32px] md:text-[40px]">
          {title}
        </MixedHeading>
        {!isLoading && products && (
          <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full" style={{ aspectRatio: "1/1" }} />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div
          className="text-center py-24"
          style={{ color: "var(--muted-foreground)" }}
        >
          <p className="text-lg font-medium mb-4">No products found</p>
          <p className="text-sm">This collection is empty or doesn't exist.</p>
        </div>
      )}
    </div>
  );
}
