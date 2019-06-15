//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Query }                    from 'react-apollo'

import { getTopCustomers }          from '../../../typeDefs/operations/getTopCustomers'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_TOP_CUSTOMERS = gql`
    query getTopCustomers {
        getTopCustomers
        {
            name
            total
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Customers
//---------------------------------------------------------------------------------
export class QueryGetTopCustomers extends Query<getTopCustomers> { }