//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                        from 'apollo-boost';
import { Query }                      from 'react-apollo'

import { getProduct }            from '../../../typeDefs/operations/getProduct'
import { getProductVariables }   from '../../../typeDefs/operations/getProduct'

//---------------------------------------------------------------------------------
// GQL Query: Products
//---------------------------------------------------------------------------------
export const Q_GET_PRODUCT = gql`
    query getProduct($id:ID) {
        getProduct(id: $id)
        {
            id
            name
            price
            stock
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Products
//---------------------------------------------------------------------------------
export class QueryGetProduct extends Query<getProduct, getProductVariables> { }
