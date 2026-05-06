import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Layout } from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import CollectionPage from "@/pages/CollectionPage";
import ProductPage from "@/pages/ProductPage";
import SearchPage from "@/pages/SearchPage";
import CartPage from "@/pages/CartPage";
import PolicyPage from "@/pages/PolicyPage";
import FaqPage from "@/pages/FaqPage";
import WishlistPage from "@/pages/WishlistPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/collections/:handle" component={CollectionPage} />
      <Route path="/products/:handle" component={ProductPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/wishlist" component={WishlistPage} />
      <Route path="/pages/:policy" component={PolicyPage} />
      <Route path="/faq" component={FaqPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <WouterRouter>
            <Layout>
              <AppRouter />
            </Layout>
          </WouterRouter>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
