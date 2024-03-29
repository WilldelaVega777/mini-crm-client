//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                              from 'apollo-boost';
import { Query }                            from 'react-apollo'

import { getCustomersPaginated }            from '../../../typeDefs/operations/getCustomersPaginated'
import { getCustomersPaginatedVariables }   from '../../../typeDefs/operations/getCustomersPaginated'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_CUSTOMERS = gql`
    query getCustomersPaginated($limit: Int!, $offset: Int!, $salesman: ID) {
        getCustomers(limit: $limit, offset: $offset, salesman: $salesman) {
            customers {
                id,
                first_name
                last_name
                company
                emails {
                    email
                }
                age
                type
                salesman
            }

            metadata {
                totalRecords
            }
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Customers
//---------------------------------------------------------------------------------
export class QueryGetCustomersPaginated extends 
        Query<getCustomersPaginated, getCustomersPaginatedVariables> { }
