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

export enum UserRole {
  ADMINISTRATOR = "ADMINISTRATOR",
  SALESMAN = "SALESMAN",
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
  salesman: string;
}

export interface EmailInput {
  email: string;
}

export interface OrderInput {
  id?: string | null;
  date: any;
  customer: string;
  salesman?: string | null;
  status: OrderStatus;
  items: OrderItemInput[];
  total: number;
}

export interface OrderItemInput {
  id?: string | null;
  quantity: number;
  product: ProductInput;
}

export interface ProductInput {
  id?: string | null;
  name: string;
  price: number;
  projected_stock?: number | null;
  stock: number;
  reorder: number;
}

export interface UserInput {
  id?: string | null;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  role: UserRole;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
