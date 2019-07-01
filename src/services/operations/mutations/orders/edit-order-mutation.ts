//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Mutation }                 from 'react-apollo'

import { updateOrder }            from '../../../typeDefs/operations/updateOrder'
import { updateOrderVariables }   from '../../../typeDefs/operations/updateOrder'


//---------------------------------------------------------------------------------
// GQL Mutation: Edit Product
//---------------------------------------------------------------------------------
export const M_UPDATE_ORDER = gql`
    mutation updateOrder($input: OrderInput) {
        updateOrder(input: $input)
        {
            id
            date
            customer
            salesman
            status
            total
            items {
                quantity
                product {
                    id
                    name
                    stock
                    reorder
                    price
                }
            }
        }
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: EditProduct
//---------------------------------------------------------------------------------
export class MutationUpdateOrder extends
    Mutation<updateOrder, updateOrderVariables> { }
















