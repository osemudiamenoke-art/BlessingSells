import { Router } from "express";

const router = Router();

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "blessingsells.myshopify.com";
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-01";

router.post("/shopify", async (req, res) => {
  try {
    const { query, variables } = req.body;

    const response = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Shopify proxy error");
    res.status(500).json({ error: "Shopify request failed" });
  }
});

export default router;
