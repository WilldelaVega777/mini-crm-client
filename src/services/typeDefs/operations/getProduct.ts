/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProduct
// ====================================================

export interface getProduct_getProduct {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  reorder: number;
  projected_stock: number | null;
  stock: number;
}

export interface getProduct {
  getProduct: getProduct_getProduct | null;
}

export interface getProductVariables {
  id?: string | null;
}
