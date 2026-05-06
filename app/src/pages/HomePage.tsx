import { Link } from "wouter";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { useFeaturedCollections, useNewestProducts } from "@/hooks/useShopify";
import { Truck, ShieldCheck, Lock, Award, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const { data: collections, isLoading: loadingCollections } = useFeaturedCollections();
  const { data: newestProducts, isLoading: loadingProducts } = useNewestProducts(8);
  const [collectionIndex, setCollectionIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative w-full flex items-center overflow-hidden"
        style={{ height: "500px", background: "#E8E1D5" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2000&auto=format&fit=crop')",
            opacity: 0.4,
            mixBlendMode: "multiply",
          }}
        />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-[480px]">
            <span
              className="text-xs font-medium tracking-[0.15em] uppercase mb-4 block"
              style={{ color: "var(--primary)" }}
            >
              New Arrivals
            </span>
            <MixedHeading className="text-[40px] md:text-[56px] leading-[1.1] mb-6">
              Discover the{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                Best Deals
              </em>
            </MixedHeading>
            <p
              className="text-[14px] md:text-[15px] mb-8 max-w-[380px] leading-[1.6]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Curated essentials for your home, daily commute, and lifestyle.
              Quality you can trust.
            </p>
            <Link
              href="/collections/advance-wallets"
              className="inline-flex items-center justify-center h-12 px-8 text-[13px] font-medium tracking-[0.15em] uppercase rounded-full transition-opacity hover:opacity-90"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              Discover More →
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Standards */}
      <section
        className="py-12 md:py-16"
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
            <div className="lg:w-1/3">
              <MixedHeading className="text-[28px] md:text-[32px]">
                The{" "}
                <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                  BlessingSells
                </em>{" "}
                Promise
              </MixedHeading>
            </div>
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
              {[
                {
                  Icon: Truck,
                  title: "Free Shipping $50+",
                  body: "On all domestic orders over fifty dollars.",
                },
                {
                  Icon: ShieldCheck,
                  title: "30-Day Returns",
                  body: "Not completely satisfied? Return it easily.",
                },
                {
                  Icon: Lock,
                  title: "Secure Checkout",
                  body: "Your payment information is always protected.",
                },
                {
                  Icon: Award,
                  title: "Premium Quality",
                  body: "Carefully selected products built to last.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="space-y-3">
                  <Icon
                    className="w-6 h-6"
                    strokeWidth={1.5}
                    style={{ color: "var(--primary)" }}
                  />
                  <h4 className="text-[14px] font-medium">{title}</h4>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collections carousel */}
      <section
        className="py-16 md:py-24 overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            <div className="md:w-[260px] flex-shrink-0 flex flex-col justify-between">
              <div>
                <MixedHeading className="text-[32px] md:text-[38px] mb-6">
                  BlessingSells{" "}
                  <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                    Exclusives
                  </em>
                </MixedHeading>
                <p
                  className="text-sm mb-8"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Browse our most popular categories.
                </p>
                <Link
                  href="/collections/advance-wallets"
                  className="inline-flex items-center justify-center h-10 px-6 text-[12px] font-medium tracking-[0.15em] uppercase transition-colors mb-12"
                  style={{
                    border: "1px solid var(--primary)",
                    color: "var(--primary)",
                    borderRadius: "3px",
                  }}
                >
                  Shop All →
                </Link>
              </div>
              <div className="hidden md:flex gap-3">
                <button
                  onClick={() => setCollectionIndex((i) => Math.max(0, i - 1))}
                  disabled={collectionIndex === 0}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setCollectionIndex((i) =>
                      collections ? Math.min(collections.length - 1, i + 1) : i
                    )
                  }
                  disabled={
                    !collections || collectionIndex >= collections.length - 1
                  }
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto no-scrollbar pb-4 -mx-6 md:mx-0 px-6 md:px-0">
              {loadingCollections ? (
                <div className="flex gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[280px] flex-shrink-0 space-y-4">
                      <Skeleton className="w-full" style={{ aspectRatio: "4/5" }} />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))}
                </div>
              ) : collections ? (
                <div
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(calc(-${collectionIndex * 100}% - ${collectionIndex * 24}px))`,
                  }}
                >
                  {collections.map((col) => (
                    <Link
                      key={col.id}
                      href={`/collections/${col.handle}`}
                      className="w-[280px] md:w-[320px] flex-shrink-0 group"
                    >
                      <div
                        className="w-full overflow-hidden mb-4"
                        style={{
                          aspectRatio: "4/5",
                          background: "var(--card)",
                          borderRadius: "2px",
                        }}
                      >
                        {col.image ? (
                          <img
                            src={col.image.url}
                            alt={col.image.altText || col.title}
                            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-sm"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {col.title}
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-medium">{col.title}</h3>
                      <span
                        className="text-[13px] mt-1 inline-block"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        Explore Collection →
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Trio */}
      <section
        className="py-16 md:py-24"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                href: "/collections/electronic-bike",
                img: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?q=80&w=800&auto=format&fit=crop",
                title: "E-Bikes & Scooters",
              },
              {
                href: "/collections/smart-security-camera",
                img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop",
                title: "Smart Security",
              },
              {
                href: "/collections/home-appliance",
                img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
                title: "Home Appliances",
              },
            ].map(({ href, img, title }) => (
              <Link key={href} href={href} className="group block">
                <div
                  className="mb-5 overflow-hidden"
                  style={{ aspectRatio: "3/4", borderRadius: "2px", background: "var(--card)" }}
                >
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-[18px] font-medium mb-2">{title}</h3>
                <span
                  className="text-[13px] pb-0.5 transition-colors"
                  style={{
                    borderBottom: "1px solid var(--foreground)",
                    color: "var(--foreground)",
                  }}
                >
                  Shop The Collection
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width CTA banner */}
      <section className="relative w-full flex items-center overflow-hidden" style={{ height: "400px" }}>
        <div className="absolute inset-0" style={{ background: "#4A5240", opacity: 0.95 }} />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=2000&auto=format&fit=crop')",
            opacity: 0.25,
            mixBlendMode: "multiply",
          }}
        />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 text-right">
          <div className="max-w-[480px] ml-auto">
            <span
              className="text-xs font-medium tracking-[0.15em] uppercase mb-4 block"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Curated Selection
            </span>
            <h2
              className="text-[36px] md:text-[48px] leading-[1.1] mb-6 font-medium"
              style={{ color: "#fff" }}
            >
              Elevate Your{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                Daily Life
              </em>
            </h2>
            <Link
              href="/collections/advance-wallets"
              className="inline-flex items-center justify-center h-12 px-8 text-[13px] font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
              style={{
                background: "#fff",
                color: "var(--foreground)",
                borderRadius: "3px",
              }}
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Newest Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <MixedHeading className="text-[32px] md:text-[38px] mb-4">
              Recently{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                Added
              </em>
            </MixedHeading>
            <Link
              href="/collections/advance-wallets"
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: "var(--muted-foreground)" }}
            >
              View all products
            </Link>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full" style={{ aspectRatio: "1/1" }} />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : newestProducts && newestProducts.length > 0 ? (
            <ProductGrid products={newestProducts.slice(0, 4)} />
          ) : (
            <div
              className="text-center py-12"
              style={{ color: "var(--muted-foreground)" }}
            >
              No products available at the moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
