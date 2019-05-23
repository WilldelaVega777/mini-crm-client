//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                  from 'apollo-boost';
import { Query }                from 'react-apollo'

import { customers }            from '../../typeDefs/operations/customers'
import { customersVariables }   from '../../typeDefs/operations/customers'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_CUSTOMERS = gql`
    query customers($limit: Int) {
        customers(limit: $limit) 
        {
            id
            first_name
            last_name
            company
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Customers
//---------------------------------------------------------------------------------
export class QueryCustomers extends Query<customers, customersVariables> {}