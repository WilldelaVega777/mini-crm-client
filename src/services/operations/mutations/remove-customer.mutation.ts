//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Mutation }                 from 'react-apollo'

import { removeCustomer }           from '../../typeDefs/operations/removeCustomer'
import { removeCustomerVariables }  from '../../typeDefs/operations/removeCustomer'

//---------------------------------------------------------------------------------
// GQL Mutation: Create Customer
//---------------------------------------------------------------------------------
export const M_REMOVE_CUSTOMER = gql`
    mutation removeCustomer($input : ID!) {
        removeCustomer(input: $input)
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: CreateCustomer
//---------------------------------------------------------------------------------
 export class MutationRemoveCustomer extends
     Mutation<removeCustomer, removeCustomerVariables> { }














