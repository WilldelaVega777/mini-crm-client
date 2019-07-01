/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderInput, OrderStatus } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateOrder
// ====================================================

export interface updateOrder_updateOrder_items_product {
  __typename: "Product";
  id: string;
  name: string;
  stock: number;
  reorder: number;
  price: number;
}

export interface updateOrder_updateOrder_items {
  __typename: "OrderItem";
  quantity: number | null;
  product: updateOrder_updateOrder_items_product | null;
}

export interface updateOrder_updateOrder {
  __typename: "Order";
  id: string;
  date: any;
  customer: string;
  salesman: string | null;
  status: OrderStatus;
  total: number;
  items: updateOrder_updateOrder_items[];
}

export interface updateOrder {
  updateOrder: updateOrder_updateOrder | null;
}

export interface updateOrderVariables {
  input?: OrderInput | null;
}
