//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                      from 'apollo-boost';
import { Mutation }                 from 'react-apollo'
import { updateCustomer }           from '../../../typeDefs/operations/updateCustomer'
import { updateCustomerVariables }  from '../../../typeDefs/operations/updateCustomer'


//---------------------------------------------------------------------------------
// GQL Mutation: Edit Customer
//---------------------------------------------------------------------------------
export const M_UPDATE_CUSTOMER = gql`
    mutation updateCustomer($input : CustomerInput) {
        updateCustomer(input: $input)
        {
            id
            first_name
            last_name
            company
            emails {
                email
            }
            age
            type
        }
    }
`;

//---------------------------------------------------------------------------------
// Mutation Class: EditCustomer
//---------------------------------------------------------------------------------
export class MutationUpdateCustomer extends
    Mutation<updateCustomer, updateCustomerVariables> { }




