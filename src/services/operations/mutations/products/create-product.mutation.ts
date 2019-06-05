//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                          from 'apollo-boost';
import { Mutation }                     from 'react-apollo'
import { createProduct }               from '../../../typeDefs/operations/createProduct'
import { createProductVariables }      from '../../../typeDefs/operations/createProduct'


//---------------------------------------------------------------------------------
// GQL Mutation: Create Products
//---------------------------------------------------------------------------------
export const M_CREATE_PRODUCT = gql`
    mutation createProduct($input: ProductInput) {
        createProduct(input: $input)
        {
            id
            name
            price
            stock
        }
    }    
`;

//---------------------------------------------------------------------------------
// Mutation Class: CreateProduct
//---------------------------------------------------------------------------------
export class MutationCreateProduct extends
    Mutation<createProduct, createProductVariables> { }