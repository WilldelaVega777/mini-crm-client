/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL query operation: getCurrentLogin
// ====================================================

export interface getCurrentLogin_getCurrentLogin {
  __typename: "LoggedUser";
  id: string | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  role: UserRole | null;
}

export interface getCurrentLogin {
  getCurrentLogin: getCurrentLogin_getCurrentLogin | null;
}
