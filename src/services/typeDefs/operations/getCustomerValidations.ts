/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCustomerValidations
// ====================================================

export interface getCustomerValidations_getCustomerValidations {
  __typename: "ValidationDescriptor";
  field: string | null;
  type: string | null;
  required: boolean;
  max: number | null;
  min: number | null;
  regex: string | null;
}

export interface getCustomerValidations {
  getCustomerValidations: getCustomerValidations_getCustomerValidations[];
}
