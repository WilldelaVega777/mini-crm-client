//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                          from 'apollo-boost';
import { Mutation }                     from 'react-apollo'

import { removeUser }               from '../../../typeDefs/operations/removeUser'
import { removeUserVariables }      from '../../../typeDefs/operations/removeUser'

//---------------------------------------------------------------------------------
// GQL Mutation: Remove Customer
//---------------------------------------------------------------------------------
export const M_REMOVE_USER = gql`
    mutation removeUser($input: ID!) {
        removeUser(input: $input)
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: RemoveCustomer
//---------------------------------------------------------------------------------
export class MutationRemoveUser extends
    Mutation<removeUser, removeUserVariables> { }

