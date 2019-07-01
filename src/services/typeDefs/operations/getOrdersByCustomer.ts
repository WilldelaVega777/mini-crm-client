/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL query operation: getOrdersByCustomer
// ====================================================

export interface getOrdersByCustomer_getOrdersByCustomer_orders_items_product {
  __typename: "Product";
  id: string;
  name: string;
  stock: number;
  projected_stock: number | null;
  reorder: number;
  price: number;
}

export interface getOrdersByCustomer_getOrdersByCustomer_orders_items {
  __typename: "OrderItem";
  quantity: number | null;
  product: getOrdersByCustomer_getOrdersByCustomer_orders_items_product | null;
}

export interface getOrdersByCustomer_getOrdersByCustomer_orders {
  __typename: "Order";
  id: string;
  date: any;
  customer: string;
  salesman: string | null;
  status: OrderStatus;
  total: number;
  items: getOrdersByCustomer_getOrdersByCustomer_orders_items[];
}

export interface getOrdersByCustomer_getOrdersByCustomer_metadata {
  __typename: "PaginatedMetadata";
  totalRecords: number;
}

export interface getOrdersByCustomer_getOrdersByCustomer {
  __typename: "OrderPaginated";
  orders: getOrdersByCustomer_getOrdersByCustomer_orders[];
  metadata: getOrdersByCustomer_getOrdersByCustomer_metadata;
}

export interface getOrdersByCustomer {
  getOrdersByCustomer: getOrdersByCustomer_getOrdersByCustomer;
}

export interface getOrdersByCustomerVariables {
  limit?: number | null;
  offset?: number | null;
  id?: string | null;
}
