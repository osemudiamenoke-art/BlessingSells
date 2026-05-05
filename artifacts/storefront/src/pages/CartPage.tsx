import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Link } from "wouter";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    setIsUpdating(lineId);
    await updateQuantity(lineId, quantity);
    setIsUpdating(null);
  };

  const handleRemove = async (lineId: string) => {
    setIsUpdating(lineId);
    await removeItem(lineId);
    setIsUpdating(null);
  };

  const subtotal = cart?.cost?.subtotalAmount?.amount || "0";
  const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || "USD";
  const isFreeShipping = parseFloat(subtotal) >= 50;

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Your Cart" }
        ]} 
      />

      <div className="mt-8 mb-10">
        <MixedHeading className="text-[36px] md:text-[48px]">
          Your <em className="font-serif italic font-normal">Cart</em>
        </MixedHeading>
      </div>

      {!cart?.totalQuantity ? (
        <div className="py-20 text-center border-y border-border">
          <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center text-muted-foreground mx-auto mb-6">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-medium mb-4">Your cart is currently empty</h2>
          <p className="text-muted-foreground mb-8">Before proceed to checkout you must add some products to your shopping cart.</p>
          <Link 
            href="/collections/all"
            className="inline-flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {/* Desktop header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            {cart.lines.edges.map(({ node: line }) => (
              <div key={line.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center py-6 border-b border-border relative">
                <div className="md:col-span-6 flex gap-4">
                  <Link href={`/products/${line.merchandise.product.handle}`} className="shrink-0">
                    <div className="w-[100px] h-[100px] bg-card rounded-[2px] overflow-hidden">
                      {line.merchandise.image ? (
                        <img 
                          src={line.merchandise.image.url} 
                          alt={line.merchandise.image.altText || line.merchandise.title}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground/30">
                          No Image
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-col justify-center">
                    <div className="text-[10px] tracking-[0.12em] text-primary uppercase font-medium mb-1">
                      {line.merchandise.product.vendor}
                    </div>
                    <Link href={`/products/${line.merchandise.product.handle}`} className="text-[15px] font-medium hover:text-primary transition-colors mb-1">
                      {line.merchandise.product.title}
                    </Link>
                    {line.merchandise.title !== "Default Title" && (
                      <div className="text-[13px] text-muted-foreground mb-2">
                        {line.merchandise.title}
                      </div>
                    )}
                    <div className="text-[14px] font-medium md:hidden">
                      {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                    </div>
                    <button 
                      onClick={() => handleRemove(line.id)}
                      className="text-[12px] text-muted-foreground hover:text-destructive underline text-left w-fit mt-auto md:hidden"
                      disabled={isUpdating === line.id}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="md:col-span-3 flex md:justify-center items-center mt-4 md:mt-0">
                  <QuantityStepper 
                    value={line.quantity} 
                    onChange={(val) => handleUpdateQuantity(line.id, val)}
                  />
                </div>

                <div className="md:col-span-3 hidden md:flex flex-col items-end justify-center">
                  <div className="text-[16px] font-medium">
                    {formatPrice((parseFloat(line.merchandise.price.amount) * line.quantity).toString(), line.merchandise.price.currencyCode)}
                  </div>
                  <button 
                    onClick={() => handleRemove(line.id)}
                    className="text-[12px] text-muted-foreground hover:text-destructive flex items-center gap-1 mt-2"
                    disabled={isUpdating === line.id}
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
                
                {isUpdating === line.id && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-[2px] border border-border sticky top-24">
              <h3 className="text-lg font-medium mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 border-b border-border pb-6">
                <div className="flex justify-between text-[14px]">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal, currencyCode)}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{isFreeShipping ? "Free" : "Calculated at checkout"}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-[18px] font-medium mb-6">
                <span>Total</span>
                <span>{formatPrice(subtotal, currencyCode)}</span>
              </div>

              {!isFreeShipping && (
                <div className="mb-6 p-4 bg-background border border-border rounded-[2px] text-center text-[13px]">
                  You are <strong>${(50 - parseFloat(subtotal)).toFixed(2)}</strong> away from Free Shipping!
                </div>
              )}

              <a 
                href={cart.checkoutUrl}
                className="flex items-center justify-center w-full h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors mb-4"
              >
                Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              
              <p className="text-[11px] text-center text-muted-foreground uppercase tracking-widest">
                Secure checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
