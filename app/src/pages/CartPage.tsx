import { useCart } from "@/context/CartContext";
import { MixedHeading } from "@/components/ui/MixedHeading";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Link } from "wouter";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleUpdate = async (lineId: string, qty: number) => {
    setUpdating(lineId);
    await updateQuantity(lineId, qty);
    setUpdating(null);
  };

  const handleRemove = async (lineId: string) => {
    setUpdating(lineId);
    await removeItem(lineId);
    setUpdating(null);
  };

  if (!cart?.totalQuantity) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-24 text-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--card)", color: "var(--muted-foreground)" }}
        >
          <ShoppingCart className="w-10 h-10" />
        </div>
        <MixedHeading className="text-[28px] mb-4">Your cart is empty</MixedHeading>
        <p className="mb-8" style={{ color: "var(--muted-foreground)" }}>
          Add some products to get started.
        </p>
        <Link
          href="/collections/all"
          className="inline-flex items-center justify-center h-12 px-8 text-[13px] font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "3px",
          }}
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const subtotal = cart.cost.subtotalAmount.amount;
  const currency = cart.cost.subtotalAmount.currencyCode;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <MixedHeading className="text-[28px] md:text-[36px] mb-8">
        Your{" "}
        <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>Cart</em>
        <span className="text-[18px] font-normal ml-3" style={{ color: "var(--muted-foreground)" }}>
          ({cart.totalQuantity} item{cart.totalQuantity !== 1 ? "s" : ""})
        </span>
      </MixedHeading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.lines.edges.map(({ node: line }) => (
            <div
              key={line.id}
              className="flex gap-4 p-4 relative"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "4px",
                background: "#fff",
              }}
            >
              <Link href={`/products/${line.merchandise.product.handle}`}>
                <div
                  className="w-24 h-24 flex-shrink-0 overflow-hidden"
                  style={{ background: "var(--card)", borderRadius: "2px" }}
                >
                  {line.merchandise.image ? (
                    <img
                      src={line.merchandise.image.url}
                      alt={line.merchandise.title}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      No image
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex-1">
                <div
                  className="text-[10px] tracking-wider uppercase font-medium mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  {line.merchandise.product.vendor}
                </div>
                <Link href={`/products/${line.merchandise.product.handle}`}>
                  <h3 className="text-[14px] font-normal mb-1">
                    {line.merchandise.product.title}
                  </h3>
                </Link>
                {line.merchandise.title !== "Default Title" && (
                  <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
                    {line.merchandise.title}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <QuantityStepper
                    value={line.quantity}
                    onChange={(qty) => handleUpdate(line.id, qty)}
                  />
                  <span className="font-medium">
                    {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRemove(line.id)}
                disabled={updating === line.id}
                className="absolute top-3 right-3 p-1.5 transition-opacity hover:opacity-60 disabled:opacity-30"
                style={{ color: "var(--muted-foreground)" }}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {updating === line.id && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(1px)",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2"
                    style={{
                      borderColor: "var(--primary)",
                      borderTopColor: "transparent",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div
            className="p-6 space-y-4"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "4px",
              background: "#fff",
              position: "sticky",
              top: "80px",
            }}
          >
            <h2 className="text-lg font-medium">Order Summary</h2>
            <div
              className="space-y-2 py-4"
              style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "var(--muted-foreground)" }}>
                <span>Shipping</span>
                <span>{parseFloat(subtotal) >= 50 ? "Free" : "Calculated at checkout"}</span>
              </div>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(subtotal, currency)}</span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="flex items-center justify-center w-full gap-2 text-[13px] font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
              style={{
                height: "52px",
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/collections/all"
              className="flex items-center justify-center w-full text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--muted-foreground)", marginTop: "8px" }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
