//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                          from 'apollo-boost';
import { Query }                        from 'react-apollo'

import { getUsers }                     from '../../../typeDefs/operations/getUsers'
import { getUsersVariables }            from '../../../typeDefs/operations/getUsers'

//---------------------------------------------------------------------------------
// GQL Query: Users
//---------------------------------------------------------------------------------
export const Q_GET_USERS = gql`
    query getUsers($limit: Int!, $offset: Int!) {
        getUsers(limit: $limit, offset: $offset) {
            users {
                id
                username
                password
                first_name
                last_name
                role
            }
            metadata {
                totalRecords
            }
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Users
//---------------------------------------------------------------------------------
export class QueryGetUsersPaginated extends
    Query<getUsers, getUsersVariables> { }
