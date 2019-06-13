/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderInput, OrderStatus } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createOrder
// ====================================================

export interface createOrder_createOrder_items_product {
  __typename: "Product";
  id: string;
  name: string;
  stock: number;
  reorder: number;
  price: number;
}

export interface createOrder_createOrder_items {
  __typename: "OrderItem";
  quantity: number | null;
  product: createOrder_createOrder_items_product | null;
}

export interface createOrder_createOrder {
  __typename: "Order";
  id: string;
  date: any;
  customer: string;
  status: OrderStatus;
  total: number;
  items: createOrder_createOrder_items[];
}

export interface createOrder {
  createOrder: createOrder_createOrder | null;
}

export interface createOrderVariables {
  input?: OrderInput | null;
}
