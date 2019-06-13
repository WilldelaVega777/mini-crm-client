/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CustomerType {
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
}

export enum OrderStatus {
  CANCELLED = "CANCELLED",
  DISPATCHED = "DISPATCHED",
  PAID = "PAID",
  REQUESTED = "REQUESTED",
}

export interface CustomerInput {
  id?: string | null;
  first_name: string;
  last_name: string;
  company: string;
  age: number;
  type: CustomerType;
  emails: EmailInput[];
  orders?: (OrderInput | null)[] | null;
}

export interface EmailInput {
  email: string;
}

export interface OrderInput {
  id?: string | null;
  date: any;
  customer: string;
  status: OrderStatus;
  items: OrderItemInput[];
  total: number;
}

export interface OrderItemInput {
  quantity: number;
  product: ProductInput;
}

export interface ProductInput {
  id?: string | null;
  name: string;
  price: number;
  stock: number;
  reorder: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
