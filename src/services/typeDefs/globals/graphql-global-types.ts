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

export interface CustomerInput {
  id?: string | null;
  first_name: string;
  last_name: string;
  company: string;
  age: number;
  type: CustomerType;
  email: string;
  orders?: (OrderInput | null)[] | null;
}

export interface OrderInput {
  product: string;
  price: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
