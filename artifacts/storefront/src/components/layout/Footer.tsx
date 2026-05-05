import { Link } from "wouter";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { Instagram, Linkedin, MessageCircle, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#4A5240] text-primary-foreground pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 mb-16">
          <div className="md:col-span-4 lg:col-span-5 space-y-6">
            <MixedHeading className="text-[32px] md:text-[40px] text-primary-foreground">
              Thrive <em className="font-serif italic font-normal">With Us</em>
            </MixedHeading>
            <p className="text-sm text-primary-foreground/80 max-w-sm">
              Subscribe to our newsletter for exclusive offers, new arrivals, and the latest updates.
            </p>
            <form className="relative max-w-[320px]">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full h-10 bg-transparent border-b border-primary-foreground/20 text-sm outline-none focus:border-primary-foreground transition-colors pr-10"
                required
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-primary transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="md:col-span-3 lg:col-span-2 space-y-4">
            <h3 className="text-[13px] font-medium tracking-[0.1em] uppercase mb-6">Discover</h3>
            <ul className="space-y-3">
              <li><Link href="/collections/e-bikes-scooters" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">E-Bikes & Scooters</Link></li>
              <li><Link href="/collections/all" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">All Collections</Link></li>
              <li><Link href="/" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">Featured Products</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2 space-y-4">
            <h3 className="text-[13px] font-medium tracking-[0.1em] uppercase mb-6">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link href="/pages/shipping-policy" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">Delivery & Returns</Link></li>
              <li><Link href="/pages/contact" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">Contact Us</Link></li>
              <li><Link href="/faq" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">FAQs</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-3 space-y-4">
            <h3 className="text-[13px] font-medium tracking-[0.1em] uppercase mb-6">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/pages/about" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">Our Story</Link></li>
              <li><Link href="/pages/journal" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">Journal</Link></li>
              <li><Link href="/pages/press" className="text-[13px] font-light text-primary-foreground/80 hover:text-primary-foreground transition-colors block py-0.5">Press</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-primary-foreground/10 gap-6">
          <div className="flex items-center space-x-6">
            <a href="#" className="text-primary-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5 stroke-[1.5]" /></a>
            <a href="#" className="text-primary-foreground hover:text-primary transition-colors"><Linkedin className="w-5 h-5 stroke-[1.5]" /></a>
            <a href="#" className="text-primary-foreground hover:text-primary transition-colors"><MessageCircle className="w-5 h-5 stroke-[1.5]" /></a>
          </div>
          
          <div className="flex items-center flex-wrap justify-center gap-3 text-[11px] font-medium tracking-wider text-primary-foreground/60">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>AMEX</span>
            <span>PAYPAL</span>
            <span>APPLE PAY</span>
            <span>GOOGLE PAY</span>
          </div>

          <div className="text-[12px] font-light text-primary-foreground/60">
            © {new Date().getFullYear()} BlessingSells. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
