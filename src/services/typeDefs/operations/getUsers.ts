/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../globals/graphql-global-types";

// ====================================================
// GraphQL query operation: getUsers
// ====================================================

export interface getUsers_getUsers_users {
  __typename: "User";
  id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface getUsers_getUsers_metadata {
  __typename: "PaginatedMetadata";
  totalRecords: number;
}

export interface getUsers_getUsers {
  __typename: "UserPaginated";
  users: getUsers_getUsers_users[];
  metadata: getUsers_getUsers_metadata;
}

export interface getUsers {
  getUsers: getUsers_getUsers;
}

export interface getUsersVariables {
  limit: number;
  offset: number;
}
