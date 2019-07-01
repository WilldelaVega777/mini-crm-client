/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_getUser {
  __typename: "User";
  username: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface getUser {
  getUser: getUser_getUser | null;
}

export interface getUserVariables {
  id?: string | null;
}
