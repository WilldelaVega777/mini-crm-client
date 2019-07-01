//---------------------------------------------------------------------------------
// Imports Section (React/Apollo Libs)
//---------------------------------------------------------------------------------
import { gql }                          from 'apollo-boost';
import { Query }                        from 'react-apollo'

import { getOrdersByCustomer }          from '../../../typeDefs/operations/getOrdersByCustomer'
import { getOrdersByCustomerVariables } from '../../../typeDefs/operations/getOrdersByCustomer'

//---------------------------------------------------------------------------------
// GQL Query: Customers
//---------------------------------------------------------------------------------
export const Q_GET_ORDERS_BY_CUSTOMER = gql`
    query getOrdersByCustomer($limit: Int, $offset: Int, $id: ID) {
        getOrdersByCustomer(limit: $limit, offset: $offset, id: $id) {
            orders {
                id
                date
                customer
                salesman
                status
                total
                items {
                    quantity
                    product {
                        id
                        name
                        stock
                        projected_stock
                        reorder
                        price
                    }
                }
            }
            metadata {
                totalRecords
            }
        }
    }
`;

//---------------------------------------------------------------------------------
// Query Class: Customers
//---------------------------------------------------------------------------------
export class QueryGetOrdersByCustomer 
  extends Query<getOrdersByCustomer, getOrdersByCustomerVariables> { }
