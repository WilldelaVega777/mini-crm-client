/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomerType } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL query operation: getCustomers
// ====================================================

export interface getCustomers_customers_emails {
  __typename: "Email";
  email: string | null;
}

export interface getCustomers_customers {
  __typename: "Customer";
  id: string;
  last_name: string;
  first_name: string;
  company: string;
  emails: getCustomers_customers_emails[];
  age: number;
  type: CustomerType;
}

export interface getCustomers {
  customers: getCustomers_customers[];
}

export interface getCustomersVariables {
  limit: number;
  offset: number;
}
