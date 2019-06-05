//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                  from 'apollo-boost';
import { Query }                from 'react-apollo'

import { getCustomerById }            from '../../../typeDefs/operations/getCustomerById'
import { getCustomerByIdVariables }   from '../../../typeDefs/operations/getCustomerById'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_CUSTOMER_BY_ID = gql`
    query getCustomerById($id: ID) {
        getCustomer(id: $id)
        {
            first_name
            last_name
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
export class QueryGetCustomerById extends Query<getCustomerById, getCustomerByIdVariables> { }













/*

*/