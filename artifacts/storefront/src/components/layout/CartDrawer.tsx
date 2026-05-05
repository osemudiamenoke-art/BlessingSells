import { X, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Link } from "wouter";
import { useState } from "react";

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  if (!isOpen) return null;

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
  const progressPercent = Math.min(100, (parseFloat(subtotal) / 50) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)}
      />
      
      <div className="relative w-full md:w-[420px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-medium text-foreground">
            Your Cart ({cart?.totalQuantity || 0})
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart?.totalQuantity ? (
          <>
            <div className="px-6 py-4 bg-muted/50 border-b border-border">
              <div className="text-[12px] text-foreground mb-2 font-medium">
                {isFreeShipping 
                  ? "You've unlocked free shipping!" 
                  : `Add $${(50 - parseFloat(subtotal)).toFixed(2)} more to reach free shipping`}
              </div>
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.lines.edges.map(({ node: line }) => (
                <div key={line.id} className="flex gap-4 p-4 border border-border rounded-lg bg-background relative group">
                  <Link href={`/products/${line.merchandise.product.handle}`} onClick={() => setIsOpen(false)}>
                    <div className="w-20 h-20 bg-card rounded-[2px] overflow-hidden flex-shrink-0">
                      {line.merchandise.image ? (
                        <img 
                          src={line.merchandise.image.url} 
                          alt={line.merchandise.image.altText || line.merchandise.title}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-card text-muted-foreground/30 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] tracking-[0.12em] text-primary uppercase font-medium mb-1">
                        {line.merchandise.product.vendor}
                      </div>
                      <Link href={`/products/${line.merchandise.product.handle}`} onClick={() => setIsOpen(false)}>
                        <h3 className="text-[14px] leading-tight font-normal text-foreground hover:text-primary transition-colors line-clamp-2">
                          {line.merchandise.product.title}
                        </h3>
                      </Link>
                      {line.merchandise.title !== "Default Title" && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {line.merchandise.title}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <QuantityStepper 
                        value={line.quantity} 
                        onChange={(val) => handleUpdateQuantity(line.id, val)}
                      />
                      <div className="text-[14px] font-medium text-foreground">
                        {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleRemove(line.id)}
                    className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                    disabled={isUpdating === line.id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  {isUpdating === line.id && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center rounded-lg z-10">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border p-6 bg-background space-y-4">
              <div className="flex items-center justify-between text-base font-medium text-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currencyCode)}</span>
              </div>
              <p className="text-[12px] text-muted-foreground">
                Taxes and shipping calculated at checkout.
              </p>
              
              <label className="flex items-start gap-2 cursor-pointer pt-2">
                <input type="checkbox" className="mt-1 accent-primary" required />
                <span className="text-[12px] text-foreground">
                  I accept the <Link href="/pages/terms-of-service" className="underline hover:text-primary" onClick={() => setIsOpen(false)}>terms of service</Link>
                </span>
              </label>

              <a 
                href={cart.checkoutUrl}
                className="flex items-center justify-center w-full h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] font-medium tracking-[0.15em] uppercase rounded-[3px] transition-colors mt-4"
              >
                Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <p className="text-foreground font-medium">Your cart is empty</p>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 bg-primary text-primary-foreground text-[13px] font-medium tracking-[0.15em] uppercase rounded-[3px] hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { ShoppingCart, ArrowRight } from "lucide-react";
