/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomerInput } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createCustomer
// ====================================================

export interface createCustomer_createCustomer {
  __typename: "Customer";
  id: string;
  first_name: string;
  last_name: string;
  salesman: string | null;
}

export interface createCustomer {
  createCustomer: createCustomer_createCustomer | null;
}

export interface createCustomerVariables {
  input?: CustomerInput | null;
}
