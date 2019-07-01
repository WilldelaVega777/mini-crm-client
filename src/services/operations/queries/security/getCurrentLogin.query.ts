//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                          from 'apollo-boost'
import { Query }                        from 'react-apollo'

import { getCurrentLogin }              from '../../../typeDefs/operations/getCurrentLogin'

//---------------------------------------------------------------------------------
// GQL Query: Products
//---------------------------------------------------------------------------------
export const Q_GET_CURRENT_LOGIN = gql`
    query getCurrentLogin {
        getCurrentLogin {
            id,
            username,
            first_name,
            last_name,
            role
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Products
//---------------------------------------------------------------------------------
export class QueryGetCurrentLogin extends Query<getCurrentLogin> { }
