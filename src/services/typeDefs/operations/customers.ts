/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: customers
// ====================================================

export interface customers_customers {
  __typename: "Customer";
  id: string;
  first_name: string;
  last_name: string;
  company: string;
}

export interface customers {
  customers: customers_customers[];
}

export interface customersVariables {
  limit?: number | null;
}
