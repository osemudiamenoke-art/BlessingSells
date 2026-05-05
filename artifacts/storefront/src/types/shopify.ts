export interface Product {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  descriptionHtml?: string;
  tags?: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
  variants?: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
        };
        availableForSale: boolean;
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: {
    url: string;
    altText: string;
  };
  products?: {
    edges: {
      node: Product;
    }[];
    pageInfo?: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    product: {
      id: string;
      handle: string;
      title: string;
      vendor: string;
    };
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      url: string;
      altText: string;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
}
