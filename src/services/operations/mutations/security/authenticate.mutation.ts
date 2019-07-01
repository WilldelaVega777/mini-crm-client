//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Mutation }                 from 'react-apollo'
import { authenticate }            from '../../../typeDefs/operations/authenticate'
import { authenticateVariables }   from '../../../typeDefs/operations/authenticate'


//---------------------------------------------------------------------------------
// GQL Mutation: Authenticate
//---------------------------------------------------------------------------------
export const M_AUTHENTICATE = gql`
    mutation authenticate($username: String!, $password: String!) {
        authenticate(username:$username, password: $password) {
            token
        }
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: Authenticate
//---------------------------------------------------------------------------------
export class MutationAuthenticate extends
    Mutation<authenticate, authenticateVariables> { }
