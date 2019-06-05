//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                  from 'apollo-boost';
import { Query }                from 'react-apollo'

import { getCustomers }            from '../../../typeDefs/operations/getCustomers'
import { getCustomersVariables }   from '../../../typeDefs/operations/getCustomers'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_CUSTOMERS = gql`
    query getCustomers($limit: Int!, $offset: Int!) {
        customers(limit: $limit, offset: $offset) {
            id,
            last_name
            first_name
            company
            emails {
                email
            }
            age
            type
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Customers
//---------------------------------------------------------------------------------
export class QueryGetCustomers extends Query<getCustomers, getCustomersVariables> {}