import { type ReactNode, useState, useEffect } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { SecondaryNav } from "./SecondaryNav";
import { Footer } from "./Footer";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { useLocation } from "wouter";

export function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <AnnouncementBar />
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      <SecondaryNav />

      <main className="flex-1 w-full relative">{children}</main>

      <Footer />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartDrawer />
    </div>
  );
}
