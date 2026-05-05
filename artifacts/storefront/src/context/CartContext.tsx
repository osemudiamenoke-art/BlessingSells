import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { shopifyFetch } from "@/lib/shopify";
import { CART_CREATE_MUTATION, CART_LINES_ADD_MUTATION, CART_LINES_REMOVE_MUTATION, CART_LINES_UPDATE_MUTATION, CART_QUERY } from "@/lib/cart";
import { Cart } from "@/types/shopify";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isAdding: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeCart = async () => {
      const storedCartId = localStorage.getItem("shopify_cart_id");
      
      if (storedCartId) {
        try {
          const data = await shopifyFetch(CART_QUERY, { cartId: storedCartId });
          if (data.cart) {
            setCart(data.cart);
          } else {
            localStorage.removeItem("shopify_cart_id");
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          localStorage.removeItem("shopify_cart_id");
        }
      }
    };

    initializeCart();
  }, []);

  const createCart = async () => {
    const data = await shopifyFetch(CART_CREATE_MUTATION);
    const newCart = data.cartCreate.cart;
    setCart(newCart);
    localStorage.setItem("shopify_cart_id", newCart.id);
    return newCart;
  };

  const addItem = async (variantId: string, quantity: number = 1) => {
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
      toast({
        title: "Added to cart",
        description: "Your item has been added to the cart.",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add item to cart.",
      });
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
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;

    try {
      if (quantity === 0) {
        await removeItem(lineId);
        return;
      }

      const data = await shopifyFetch(CART_LINES_UPDATE_MUTATION, {
        cartId: cart.id,
        lines: [{ id: lineId, quantity }],
      });
      setCart(data.cartLinesUpdate.cart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("shopify_cart_id");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isAdding,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
