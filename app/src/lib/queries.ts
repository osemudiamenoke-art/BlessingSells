export const FEATURED_COLLECTIONS_QUERY = `
  query FeaturedCollections {
    collections(first: 7) {
      edges {
        node {
          id
          handle
          title
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = `
  query Products($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            handle
            title
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            availableForSale
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const NEWEST_PRODUCTS_QUERY = `
  query NewestProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          handle
          title
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          availableForSale
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      vendor
      tags
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(query: $query, first: $first) {
      edges {
        node {
          id
          handle
          title
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          availableForSale
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;
