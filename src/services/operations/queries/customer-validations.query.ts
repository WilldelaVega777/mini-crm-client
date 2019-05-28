//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                              from 'apollo-boost'
import { Query }                            from 'react-apollo'
import { getCustomerValidations }           from '../../typeDefs/operations/getCustomerValidations'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_CUSTOMER_VALIDATIONS = gql`
    query getCustomerValidations {
        getCustomerValidations
        {
            field
            type
            required
            max
            min
            regex
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Customers
//---------------------------------------------------------------------------------
export class QueryCustomerValidations extends Query<getCustomerValidations> { }
