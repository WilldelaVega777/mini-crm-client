//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                          from 'apollo-boost';
import { Mutation }                     from 'react-apollo'
import { updateProduct }               from '../../../typeDefs/operations/updateProduct'
import { updateProductVariables }      from '../../../typeDefs/operations/updateProduct'


//---------------------------------------------------------------------------------
// GQL Mutation: Edit Product
//---------------------------------------------------------------------------------
export const M_UPDATE_PRODUCT = gql`
    mutation updateProduct($input: ProductInput) {
        updateProduct(input: $input)
        {
            id
            name
            price
            stock
        }
    }    
`;

//---------------------------------------------------------------------------------
// Mutation Class: EditProduct
//---------------------------------------------------------------------------------
export class MutationUpdateProduct extends
    Mutation<updateProduct, updateProductVariables> { }
