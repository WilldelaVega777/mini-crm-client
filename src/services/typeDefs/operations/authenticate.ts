/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: authenticate
// ====================================================

export interface authenticate_authenticate {
  __typename: "Token";
  token: string;
}

export interface authenticate {
  authenticate: authenticate_authenticate | null;
}

export interface authenticateVariables {
  username: string;
  password: string;
}
