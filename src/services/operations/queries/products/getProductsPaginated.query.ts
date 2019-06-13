//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                              from 'apollo-boost';
import { Query }                            from 'react-apollo'

import { getProductsPaginated }             from '../../../typeDefs/operations/getProductsPaginated'
import { getProductsPaginatedVariables }    from '../../../typeDefs/operations/getProductsPaginated'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_PRODUCTS = gql`
    query getProductsPaginated($limit: Int!, $offset: Int!, $stock: Boolean) {
        getProducts(limit: $limit, offset: $offset, stock: $stock) {
            products {
                id,
                name,
                price,
                reorder,
                stock
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
export class QueryGetProducts extends Query<getProductsPaginated, getProductsPaginatedVariables> { }