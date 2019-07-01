//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                          from 'apollo-boost';
import { Query }                        from 'react-apollo'

import { getUser }                      from '../../../typeDefs/operations/getUser'
import { getUserVariables }             from '../../../typeDefs/operations/getUser'

//---------------------------------------------------------------------------------
// GQL Query: User
//---------------------------------------------------------------------------------
export const Q_GET_USER_BY_ID = gql`
    query getUser($id: ID) {
        getUser(id: $id) {
                username
                first_name
                last_name
                role
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: User
//---------------------------------------------------------------------------------
export class QueryGetUserById extends Query<getUser, getUserVariables> { }

