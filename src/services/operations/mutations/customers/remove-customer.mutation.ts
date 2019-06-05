//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Mutation }                 from 'react-apollo'

import { removeCustomer }           from '../../../typeDefs/operations/removeCustomer'
import { removeCustomerVariables }  from '../../../typeDefs/operations/removeCustomer'

//---------------------------------------------------------------------------------
// GQL Mutation: Remove Customer
//---------------------------------------------------------------------------------
export const M_REMOVE_CUSTOMER = gql`
    mutation removeCustomer($input : ID!) {
        removeCustomer(input: $input)
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: RemoveCustomer
//---------------------------------------------------------------------------------
 export class MutationRemoveCustomer extends
     Mutation<removeCustomer, removeCustomerVariables> { }














