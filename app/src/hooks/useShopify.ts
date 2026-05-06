import { useQuery } from "@tanstack/react-query";
import { shopifyFetch } from "@/lib/shopify";
import {
  FEATURED_COLLECTIONS_QUERY,
  PRODUCTS_QUERY,
  NEWEST_PRODUCTS_QUERY,
  PRODUCT_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from "@/lib/queries";
import type { Collection, Product } from "@/types/shopify";

export function useFeaturedCollections() {
  return useQuery({
    queryKey: ["featuredCollections"],
    queryFn: async () => {
      const data = await shopifyFetch(FEATURED_COLLECTIONS_QUERY);
      return data.collections.edges.map((e: any) => e.node) as Collection[];
    },
  });
}

export function useCollectionProducts(
  handle: string,
  first = 24,
  sortKey = "BEST_SELLING",
  reverse = false
) {
  return useQuery({
    queryKey: ["collectionProducts", handle, first, sortKey, reverse],
    queryFn: async () => {
      const data = await shopifyFetch(PRODUCTS_QUERY, {
        handle,
        first,
        sortKey,
        reverse,
      });
      return (
        (data.collection?.products.edges.map((e: any) => e.node) as Product[]) ||
        []
      );
    },
    enabled: !!handle,
  });
}

export function useNewestProducts(first = 8) {
  return useQuery({
    queryKey: ["newestProducts", first],
    queryFn: async () => {
      const data = await shopifyFetch(NEWEST_PRODUCTS_QUERY, { first });
      return data.products.edges.map((e: any) => e.node) as Product[];
    },
  });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const data = await shopifyFetch(PRODUCT_QUERY, { handle });
      return data.product as Product | null;
    },
    enabled: !!handle,
  });
}

export function useSearchProducts(query: string, first = 24) {
  return useQuery({
    queryKey: ["searchProducts", query, first],
    queryFn: async () => {
      if (!query) return [];
      const data = await shopifyFetch(SEARCH_PRODUCTS_QUERY, { query, first });
      return data.products.edges.map((e: any) => e.node) as Product[];
    },
    enabled: !!query,
  });
}
