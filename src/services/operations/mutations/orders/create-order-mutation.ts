//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql } from 'apollo-boost';
import { Mutation }                 from 'react-apollo'

import { createOrder }              from '../../../typeDefs/operations/createOrder'
import { createOrderVariables }     from '../../../typeDefs/operations/createOrder'


//---------------------------------------------------------------------------------
// GQL Mutation: Create Customer
//---------------------------------------------------------------------------------
export const M_CREATE_ORDER = gql`
    mutation createOrder($input: OrderInput) {
        createOrder(input: $input)
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
// Mutation Class: CreateCustomer
//---------------------------------------------------------------------------------
export class MutationCreateOrder extends
    Mutation<createOrder, createOrderVariables> { }

