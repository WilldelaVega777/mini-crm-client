//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                  from 'apollo-boost';
import { Query }                from 'react-apollo'

import { getTopSellers }        from '../../../typeDefs/operations/getTopSellers'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_TOP_SELLERS = gql`
    query getTopSellers {
        getTopSellers
        {
            name
            total
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Customers
//---------------------------------------------------------------------------------
export class QueryGetTopSellers extends Query<getTopSellers> { }