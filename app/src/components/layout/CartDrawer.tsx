import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Link } from "wouter";
import { useState } from "react";

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeItem, toasts, dismissToast } =
    useCart();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleUpdate = async (lineId: string, quantity: number) => {
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
  const currency = cart?.cost?.subtotalAmount?.currencyCode || "USD";
  const progressPercent = Math.min(100, (parseFloat(subtotal) / 50) * 100);
  const isFreeShipping = parseFloat(subtotal) >= 50;

  return (
    <>
      {/* Toast notifications */}
      <div id="toast-root">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast${toast.variant === "destructive" ? " destructive" : ""}`}
            onClick={() => dismissToast(toast.id)}
          >
            <strong>{toast.title}</strong>
            {toast.description && <div style={{ marginTop: 2 }}>{toast.description}</div>}
          </div>
        ))}
      </div>

      {/* Cart drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)" }}
            onClick={() => setIsOpen(false)}
          />

          <div
            className="relative w-full md:w-[420px] h-full shadow-2xl flex flex-col"
            style={{ background: "var(--background)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-6"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <h2 className="text-lg font-medium">
                Your Cart ({cart?.totalQuantity || 0})
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 transition-opacity hover:opacity-60"
                style={{ color: "var(--muted-foreground)" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart?.totalQuantity ? (
              <>
                {/* Shipping progress */}
                <div
                  className="px-6 py-4"
                  style={{
                    background: "var(--card)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="text-[12px] font-medium mb-2">
                    {isFreeShipping
                      ? "🎉 You've unlocked free shipping!"
                      : `Add $${(50 - parseFloat(subtotal)).toFixed(2)} more for free shipping`}
                  </div>
                  <div
                    className="h-1.5 w-full rounded-full overflow-hidden"
                    style={{ background: "var(--border)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progressPercent}%`,
                        background: "var(--primary)",
                      }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.lines.edges.map(({ node: line }) => (
                    <div
                      key={line.id}
                      className="flex gap-4 p-4 relative"
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        background: "var(--background)",
                      }}
                    >
                      <Link
                        href={`/products/${line.merchandise.product.handle}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <div
                          className="w-20 h-20 flex-shrink-0 overflow-hidden"
                          style={{
                            background: "var(--card)",
                            borderRadius: "2px",
                          }}
                        >
                          {line.merchandise.image ? (
                            <img
                              src={line.merchandise.image.url}
                              alt={line.merchandise.title}
                              className="w-full h-full object-cover mix-blend-multiply"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: "var(--muted-foreground)" }}>
                              No img
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div
                            className="text-[10px] tracking-[0.12em] font-medium uppercase mb-1"
                            style={{ color: "var(--primary)" }}
                          >
                            {line.merchandise.product.vendor}
                          </div>
                          <Link
                            href={`/products/${line.merchandise.product.handle}`}
                            onClick={() => setIsOpen(false)}
                          >
                            <h3 className="text-[13px] font-normal line-clamp-2 capitalize" style={{ color: "var(--foreground)" }}>
                              {line.merchandise.product.title.toLowerCase()}
                            </h3>
                          </Link>
                          {line.merchandise.title !== "Default Title" && (
                            <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                              {line.merchandise.title}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <QuantityStepper
                            value={line.quantity}
                            onChange={(val) => handleUpdate(line.id, val)}
                          />
                          <span className="text-[14px] font-medium">
                            {formatPrice(
                              line.merchandise.price.amount,
                              line.merchandise.price.currencyCode
                            )}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(line.id)}
                        disabled={isUpdating === line.id}
                        className="absolute top-3 right-3 p-1.5 transition-opacity hover:opacity-70 disabled:opacity-30"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {isUpdating === line.id && (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.6)",
                            backdropFilter: "blur(1px)",
                            borderRadius: "4px",
                          }}
                        >
                          <div
                            className="w-5 h-5 rounded-full border-2 border-t-transparent"
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

                {/* Footer */}
                <div
                  className="p-6 space-y-4"
                  style={{ borderTop: "1px solid var(--border)", background: "var(--background)" }}
                >
                  <div className="flex items-center justify-between font-medium">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, currency)}</span>
                  </div>
                  <p className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>
                    Taxes and shipping calculated at checkout.
                  </p>

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
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--card)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="font-medium" style={{ color: "var(--foreground)" }}>
                  Your cart is empty
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 text-[13px] font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    borderRadius: "3px",
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
