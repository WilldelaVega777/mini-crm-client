//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Mutation }                 from 'react-apollo'

import { updateUser }               from '../../../typeDefs/operations/updateUser'
import { updateUserVariables }      from '../../../typeDefs/operations/updateUser'


//---------------------------------------------------------------------------------
// GQL Mutation: Edit User
//---------------------------------------------------------------------------------
export const M_UPDATE_USER = gql`
    mutation updateUser($input: UserInput) {
        updateUser(input : $input) {
            id
            username
            first_name
            last_name
            password
            role
        }
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: EditUser
//---------------------------------------------------------------------------------
export class MutationUpdateUser extends
    Mutation<updateUser, updateUserVariables> { }




