// server.js — Express server: Shopify proxy API + Vite dev/static serving
// Works on Windows & Linux, no Replit dependencies required.

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load .env file in development
const { config } = await import("dotenv").catch(() => ({ config: () => {} }));
if (typeof config === "function") config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

// ─── Shopify Config ────────────────────────────────────────────────────────────
// Uses the PRIVATE token server-side (never exposed to browser)
// IMPORTANT: Use the .myshopify.com internal domain — NOT the custom domain (blessingsells.com).
// Your store handle from admin.shopify.com/store/blessingelectronic is "blessingelectronic".
const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2026-04";

if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
  console.error("❌  Missing required env vars: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  process.exit(1);
}

// ─── App setup ────────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// ─── Shopify GraphQL Proxy ─────────────────────────────────────────────────────
// The browser never touches Shopify directly — all requests go through here.
app.post("/api/shopify", async (req, res) => {
  try {
    const { query, variables } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Missing GraphQL query" });
    }

    const shopifyRes = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
          // Required for server-side Storefront API calls
          "Shopify-Storefront-Buyer-IP": req.ip || "127.0.0.1",
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    if (!shopifyRes.ok) {
      const errorText = await shopifyRes.text();
      console.error(`Shopify API error ${shopifyRes.status}:`, errorText);
      return res.status(shopifyRes.status).json({
        error: `Shopify API returned ${shopifyRes.status}`,
        details: errorText,
      });
    }

    const data = await shopifyRes.json();
    res.json(data);
  } catch (err) {
    console.error("Shopify proxy error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    shopifyDomain: SHOPIFY_DOMAIN,
    apiVersion: SHOPIFY_API_VERSION,
  });
});

// ─── Static / Vite Dev ────────────────────────────────────────────────────────
if (isProd) {
  // Serve built Vite output
  const distPath = path.resolve(__dirname, "dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // In dev: use Vite as middleware (HMR, instant refresh)
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`\n✅  BlessingSells Storefront running at http://localhost:${PORT}`);
  console.log(`   Shopify Proxy: http://localhost:${PORT}/api/shopify`);
  console.log(`   Health Check:  http://localhost:${PORT}/api/health\n`);
});
