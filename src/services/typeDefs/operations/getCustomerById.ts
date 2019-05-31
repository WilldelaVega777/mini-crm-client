/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomerType } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL query operation: getCustomerById
// ====================================================

export interface getCustomerById_getCustomer_emails {
  __typename: "Email";
  email: string | null;
}

export interface getCustomerById_getCustomer {
  __typename: "Customer";
  first_name: string;
  last_name: string;
  company: string;
  emails: getCustomerById_getCustomer_emails[];
  age: number;
  type: CustomerType;
}

export interface getCustomerById {
  getCustomer: getCustomerById_getCustomer | null;
}

export interface getCustomerByIdVariables {
  id?: string | null;
}
