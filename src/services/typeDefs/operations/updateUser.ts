/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserInput, UserRole } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser {
  __typename: "User";
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  role: UserRole;
}

export interface updateUser {
  updateUser: updateUser_updateUser | null;
}

export interface updateUserVariables {
  input?: UserInput | null;
}
