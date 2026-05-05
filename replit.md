# BlessingSells Storefront

A headless Shopify storefront for BlessingSells (blessingsells.com) styled after the Elevare market design — warm cream palette, editorial serif/sans typography, terracotta accents, olive footer.

## Run & Operate

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

Workflows:
- `artifacts/storefront: web` — React Vite storefront at `/`
- `artifacts/api-server: API Server` — Express API at `/api`

Required env vars (shared):
- `SHOPIFY_STORE_DOMAIN` — blessingsells.myshopify.com (server-side)
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — public storefront token (server-side)
- `SHOPIFY_API_VERSION` — 2024-01
- `VITE_SHOPIFY_STORE_DOMAIN` — same as above (client-side reference)
- `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` — public storefront token (client-side fallback)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Wouter + TanStack Query
- **API framework**: Express 5 (proxy layer for Shopify)
- **Database**: PostgreSQL + Drizzle ORM (not used by storefront)
- **Shopify**: Storefront API v2024-01 via GraphQL proxy at `/api/shopify`

## Where things live

- `artifacts/storefront/src/` — React storefront
  - `lib/shopify.ts` — GraphQL client (calls `/api/shopify` proxy)
  - `lib/queries.ts` — all Shopify GraphQL query strings
  - `lib/cart.ts` — cart mutation strings
  - `context/CartContext.tsx` — cart state, localStorage cartId
  - `hooks/useShopify.ts` — React Query hooks
  - `components/layout/` — Header, Footer, CartDrawer, AnnouncementBar, SecondaryNav, MobileMenu
  - `pages/` — HomePage, CollectionPage, ProductPage, SearchPage, PolicyPage, FaqPage, CartPage
- `artifacts/api-server/src/routes/shopify.ts` — Shopify GraphQL proxy (avoids CORS)
- `lib/api-spec/openapi.yaml` — REST API spec (health check only for now)

## Architecture decisions

- **Shopify proxy via Express**: All Shopify GraphQL calls go through `/api/shopify` on the Express server to avoid CORS restrictions. The frontend never calls Shopify directly.
- **Cart in localStorage**: `cartId` persisted in localStorage; full cart state fetched from Shopify on mount.
- **No custom database for storefront**: Product/order data lives in Shopify. The DB is available for future features (wishlists, reviews, etc.).
- **Mixed serif/sans headings**: Cormorant Garamond italic + DM Sans are the signature typography pair (matches Elevare design).

## Product

- Homepage with hero, brand standards strip, featured collections, editorial trio, newest products, footer
- Collection pages with filter/sort (price, title, availability)
- Product detail pages with gallery, variants, quantity stepper, FAQ accordion
- Search across all products
- Cart drawer with Shopify checkout redirect
- Policy pages (shipping, refund, privacy, terms)

## User preferences

- Design must mirror elevaremarket.com exactly: warm cream (#F5F2EC), terracotta (#B75C47), olive footer (#4A5240)
- Mobile view is equally important — must be polished and fully responsive

## Gotchas

- Shopify Storefront API CORS blocks browser-direct calls — always proxy through `/api/shopify`
- Vite env vars must be prefixed with `VITE_` to be available in the browser
- Google Fonts `@import url(...)` must be the VERY FIRST line of index.css
- Cart drawer uses portal/fixed positioning — ensure z-index is above sticky header (z-40)
