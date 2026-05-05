const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

export async function shopifyFetch<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/shopify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify proxy error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
  }

  return json.data;
}
