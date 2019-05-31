/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomerInput, CustomerType } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateCustomer
// ====================================================

export interface updateCustomer_updateCustomer_emails {
  __typename: "Email";
  email: string | null;
}

export interface updateCustomer_updateCustomer {
  __typename: "Customer";
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  emails: updateCustomer_updateCustomer_emails[];
  age: number;
  type: CustomerType;
}

export interface updateCustomer {
  updateCustomer: updateCustomer_updateCustomer | null;
}

export interface updateCustomerVariables {
  input?: CustomerInput | null;
}
