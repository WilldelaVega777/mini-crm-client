//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                  from 'apollo-boost';
import { Mutation }             from 'react-apollo'

import { createUser }           from '../../../typeDefs/operations/createUser'
import { createUserVariables }  from '../../../typeDefs/operations/createUser'


//---------------------------------------------------------------------------------
// GQL Mutation: Create Products
//---------------------------------------------------------------------------------
export const M_CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input : $input) {
            username
            password
            first_name
            last_name
            role
        }
    }  
`;

//---------------------------------------------------------------------------------
// Mutation Class: CreateProduct
//---------------------------------------------------------------------------------
export class MutationCreateUser extends
    Mutation<createUser, createUserVariables> { }
