/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomerType } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL query operation: getCustomersPaginated
// ====================================================

export interface getCustomersPaginated_getCustomers_customers_emails {
  __typename: "Email";
  email: string | null;
}

export interface getCustomersPaginated_getCustomers_customers {
  __typename: "Customer";
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  emails: getCustomersPaginated_getCustomers_customers_emails[];
  age: number;
  type: CustomerType;
  salesman: string | null;
}

export interface getCustomersPaginated_getCustomers_metadata {
  __typename: "PaginatedMetadata";
  totalRecords: number;
}

export interface getCustomersPaginated_getCustomers {
  __typename: "CustomerPaginated";
  customers: getCustomersPaginated_getCustomers_customers[];
  metadata: getCustomersPaginated_getCustomers_metadata;
}

export interface getCustomersPaginated {
  getCustomers: getCustomersPaginated_getCustomers;
}

export interface getCustomersPaginatedVariables {
  limit: number;
  offset: number;
  salesman?: string | null;
}
