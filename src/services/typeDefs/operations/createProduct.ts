/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductInput } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createProduct
// ====================================================

export interface createProduct_createProduct {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface createProduct {
  createProduct: createProduct_createProduct | null;
}

export interface createProductVariables {
  input?: ProductInput | null;
}
