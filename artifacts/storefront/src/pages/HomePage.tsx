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

  const nextCollection = () => {
    if (collections && collectionIndex < collections.length - 1) {
      setCollectionIndex(prev => prev + 1);
    }
  };

  const prevCollection = () => {
    if (collectionIndex > 0) {
      setCollectionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[400px] md:h-[540px] bg-[#E8E1D5] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-[480px]">
            <span className="text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-primary mb-4 block">
              New Arrivals
            </span>
            <MixedHeading className="text-[40px] md:text-[56px] leading-[1.1] mb-6">
              Discover the <em className="font-serif italic font-normal">Best Deals</em>
            </MixedHeading>
            <p className="text-[14px] md:text-[15px] text-foreground/80 mb-8 max-w-[380px] leading-[1.6]">
              Curated essentials for your home, daily commute, and lifestyle. Quality you can trust.
            </p>
            <Link 
              href="/collections/all"
              className="inline-flex items-center justify-center h-12 px-8 bg-foreground hover:bg-foreground/90 text-background text-[13px] font-medium tracking-[0.15em] uppercase rounded-full transition-colors"
            >
              Discover More →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BRAND STANDARDS STRIP */}
      <section className="bg-white py-12 md:py-16 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
            <div className="lg:w-1/3">
              <MixedHeading className="text-[28px] md:text-[32px]">
                The <em className="font-serif italic font-normal">BlessingSells</em> Promise
              </MixedHeading>
            </div>
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
              <div className="space-y-3">
                <Truck className="w-6 h-6 stroke-[1.5] text-primary" />
                <h4 className="text-[14px] font-medium">Free Shipping $50+</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">On all domestic orders over fifty dollars.</p>
              </div>
              <div className="space-y-3">
                <ShieldCheck className="w-6 h-6 stroke-[1.5] text-primary" />
                <h4 className="text-[14px] font-medium">30-Day Returns</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">Not completely satisfied? Return it easily.</p>
              </div>
              <div className="space-y-3">
                <Lock className="w-6 h-6 stroke-[1.5] text-primary" />
                <h4 className="text-[14px] font-medium">Secure Checkout</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">Your payment information is always protected.</p>
              </div>
              <div className="space-y-3">
                <Award className="w-6 h-6 stroke-[1.5] text-primary" />
                <h4 className="text-[14px] font-medium">Premium Quality</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">Carefully selected products built to last.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS ROW */}
      <section className="py-16 md:py-24 border-b border-border overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            <div className="md:w-[260px] flex-shrink-0 flex flex-col justify-between">
              <div>
                <MixedHeading className="text-[32px] md:text-[38px] mb-6">
                  BlessingSells <em className="font-serif italic font-normal">Exclusives</em>
                </MixedHeading>
                <p className="text-sm text-muted-foreground mb-8">
                  Browse our most popular categories curated just for you.
                </p>
                <Link 
                  href="/collections/all"
                  className="inline-flex items-center justify-center h-10 px-6 border border-primary text-primary hover:bg-primary hover:text-primary-foreground text-[12px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors mb-12"
                >
                  Shop All →
                </Link>
              </div>
              
              <div className="hidden md:flex gap-3">
                <button 
                  onClick={prevCollection}
                  disabled={collectionIndex === 0}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground disabled:opacity-30 disabled:hover:border-border transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextCollection}
                  disabled={!collections || collectionIndex >= collections.length - 1}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground disabled:opacity-30 disabled:hover:border-border transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto no-scrollbar pb-4 -mx-6 md:mx-0 px-6 md:px-0">
              {loadingCollections ? (
                <div className="flex gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-[280px] flex-shrink-0 space-y-4">
                      <Skeleton className="w-full aspect-[4/5]" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))}
                </div>
              ) : collections ? (
                <div 
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(calc(-${collectionIndex * 100}% - ${collectionIndex * 24}px))` }}
                >
                  {collections.map((collection) => (
                    <Link 
                      key={collection.id} 
                      href={`/collections/${collection.handle}`}
                      className="w-[280px] md:w-[320px] flex-shrink-0 group no-underline"
                    >
                      <div className="w-full aspect-[4/5] bg-card mb-4 overflow-hidden rounded-[2px]">
                        {collection.image ? (
                          <img 
                            src={collection.image.url} 
                            alt={collection.image.altText || collection.title}
                            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                            {collection.title}
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {collection.title}
                      </h3>
                      <span className="text-[13px] text-muted-foreground mt-1 inline-block">
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

      {/* 5. EDITORIAL TRIO */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Link href="/collections/e-bikes-scooters" className="group block">
              <div className="aspect-[3/4] bg-card mb-5 overflow-hidden rounded-[2px] relative">
                <img src="https://images.unsplash.com/photo-1571188654248-7a89213915f7?q=80&w=800&auto=format&fit=crop" alt="E-Bikes" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-[18px] font-medium text-foreground mb-2">E-Bikes & Scooters</h3>
              <span className="text-[13px] text-foreground border-b border-foreground pb-0.5 group-hover:text-primary group-hover:border-primary transition-colors">
                Shop The Collection
              </span>
            </Link>
            <Link href="/collections/smart-cameras-door-locks" className="group block">
              <div className="aspect-[3/4] bg-card mb-5 overflow-hidden rounded-[2px] relative">
                <img src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop" alt="Smart Home" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-[18px] font-medium text-foreground mb-2">Smart Security</h3>
              <span className="text-[13px] text-foreground border-b border-foreground pb-0.5 group-hover:text-primary group-hover:border-primary transition-colors">
                Shop The Collection
              </span>
            </Link>
            <Link href="/collections/home-appliances" className="group block">
              <div className="aspect-[3/4] bg-card mb-5 overflow-hidden rounded-[2px] relative">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" alt="Home Appliances" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-[18px] font-medium text-foreground mb-2">Home Appliances</h3>
              <span className="text-[13px] text-foreground border-b border-foreground pb-0.5 group-hover:text-primary group-hover:border-primary transition-colors">
                Shop The Collection
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FULL-WIDTH CATEGORY BANNER */}
      <section className="relative w-full h-[360px] md:h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#4A5240] opacity-90"></div>
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 text-right">
          <div className="max-w-[480px] ml-auto">
            <span className="text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-primary-foreground/80 mb-4 block">
              Curated Selection
            </span>
            <MixedHeading className="text-[36px] md:text-[48px] leading-[1.1] mb-6 text-primary-foreground">
              Elevate Your <em className="font-serif italic font-normal">Daily Life</em>
            </MixedHeading>
            <Link 
              href="/collections/all"
              className="inline-flex items-center justify-center h-12 px-8 bg-white text-foreground hover:bg-white/90 text-[13px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. NEWEST PRODUCTS ROW */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <MixedHeading className="text-[32px] md:text-[38px] mb-4">
              Recently <em className="font-serif italic font-normal">Added</em>
            </MixedHeading>
            <Link href="/collections/all" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View all products
            </Link>
          </div>
          
          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full aspect-square" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : newestProducts && newestProducts.length > 0 ? (
            <ProductGrid products={newestProducts.slice(0, 4)} />
          ) : (
            <div className="text-center text-muted-foreground py-12">No products available at the moment.</div>
          )}
        </div>
      </section>
    </div>
  );
}
