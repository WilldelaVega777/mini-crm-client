/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserInput, UserRole } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser {
  __typename: "User";
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface createUser {
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  input?: UserInput | null;
}
