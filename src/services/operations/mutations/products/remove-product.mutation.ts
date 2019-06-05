//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Mutation }                 from 'react-apollo'
//-------------------------------------------------------------------------Product
import { removeProduct }           from '../../../typeDefs/operations/removeProduct'
import { removeProductVariables }  from '../../../typeDefs/operations/removeProduct'

//---------------------------------------------------------------------------------
// GQL Mutation: Remove Product
//---------------------------------------------------------------------------------
export const M_REMOVE_PRODUCT = gql`
    mutation removeProduct($input : ID!) {
        removeProduct(input: $input)
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: RemoveProduct
//---------------------------------------------------------------------------------
export class MutationRemoveProduct extends
    Mutation<removeProduct, removeProductVariables> { }

