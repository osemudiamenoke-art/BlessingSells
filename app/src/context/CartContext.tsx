import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { shopifyFetch } from "@/lib/shopify";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
} from "@/lib/cart";
import type { Cart } from "@/types/shopify";

interface Toast {
  id: number;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isAdding: boolean;
  toasts: Toast[];
  setIsOpen: (v: boolean) => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  dismissToast: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

let toastIdCounter = 0;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (t: Omit<Toast, "id">) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  };

  const dismissToast = (id: number) =>
    setToasts((prev) => prev.filter((x) => x.id !== id));

  useEffect(() => {
    const storedCartId = localStorage.getItem("shopify_cart_id");
    if (!storedCartId) return;
    shopifyFetch(CART_QUERY, { cartId: storedCartId })
      .then((data) => {
        if (data.cart) setCart(data.cart);
        else localStorage.removeItem("shopify_cart_id");
      })
      .catch(() => localStorage.removeItem("shopify_cart_id"));
  }, []);

  const createCart = async () => {
    const data = await shopifyFetch(CART_CREATE_MUTATION);
    const newCart = data.cartCreate.cart;
    setCart(newCart);
    localStorage.setItem("shopify_cart_id", newCart.id);
    return newCart;
  };

  const addItem = async (variantId: string, quantity = 1) => {
    try {
      setIsAdding(true);
      let currentCartId = cart?.id;
      if (!currentCartId) {
        const newCart = await createCart();
        currentCartId = newCart.id;
      }
      const data = await shopifyFetch(CART_LINES_ADD_MUTATION, {
        cartId: currentCartId,
        lines: [{ merchandiseId: variantId, quantity }],
      });
      setCart(data.cartLinesAdd.cart);
      setIsOpen(true);
      addToast({ title: "Added to cart", description: "Item added successfully." });
    } catch (err) {
      console.error("Error adding to cart:", err);
      addToast({ title: "Error", description: "Failed to add item.", variant: "destructive" });
    } finally {
      setIsAdding(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart?.id) return;
    try {
      const data = await shopifyFetch(CART_LINES_REMOVE_MUTATION, {
        cartId: cart.id,
        lineIds: [lineId],
      });
      setCart(data.cartLinesRemove.cart);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    if (quantity === 0) { await removeItem(lineId); return; }
    try {
      const data = await shopifyFetch(CART_LINES_UPDATE_MUTATION, {
        cartId: cart.id,
        lines: [{ id: lineId, quantity }],
      });
      setCart(data.cartLinesUpdate.cart);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("shopify_cart_id");
  };

  return (
    <CartContext.Provider
      value={{
        cart, isOpen, isAdding, toasts,
        setIsOpen, addItem, removeItem, updateQuantity, clearCart, dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
