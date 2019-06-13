/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProductsPaginated
// ====================================================

export interface getProductsPaginated_getProducts_products {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  reorder: number;
  stock: number;
}

export interface getProductsPaginated_getProducts_metadata {
  __typename: "PaginatedMetadata";
  totalRecords: number;
}

export interface getProductsPaginated_getProducts {
  __typename: "ProductPaginated";
  products: getProductsPaginated_getProducts_products[];
  metadata: getProductsPaginated_getProducts_metadata;
}

export interface getProductsPaginated {
  getProducts: getProductsPaginated_getProducts;
}

export interface getProductsPaginatedVariables {
  limit: number;
  offset: number;
  stock?: boolean | null;
}
