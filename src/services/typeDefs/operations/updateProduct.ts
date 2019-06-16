/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductInput } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateProduct
// ====================================================

export interface updateProduct_updateProduct {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  stock: number;
  projected_stock: number | null;
}

export interface updateProduct {
  updateProduct: updateProduct_updateProduct | null;
}

export interface updateProductVariables {
  input?: ProductInput | null;
}
