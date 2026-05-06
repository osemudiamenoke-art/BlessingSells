// Central Shopify GraphQL proxy client
// ALL requests go to our own server at /api/shopify — never directly to Shopify.
// The server uses the private token and adds the required Buyer-IP header.

export async function shopifyFetch<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const res = await fetch("/api/shopify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Proxy error ${res.status}: ${text}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "Shopify GraphQL error");
  }

  return json.data as T;
}
