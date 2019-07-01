//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Mutation }                 from 'react-apollo'

import { createCustomer }           from '../../../typeDefs/operations/createCustomer'
import { createCustomerVariables }  from '../../../typeDefs/operations/createCustomer'

//---------------------------------------------------------------------------------
// GQL Mutation: Create Customer
//---------------------------------------------------------------------------------
export const M_CREATE_CUSTOMER = gql`
    mutation createCustomer($input: CustomerInput) {
        createCustomer(input: $input)
        {
            id
            first_name
            last_name
            salesman
        }
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: CreateCustomer
//---------------------------------------------------------------------------------
export class MutationCreateCustomer extends 
    Mutation<createCustomer, createCustomerVariables> {}