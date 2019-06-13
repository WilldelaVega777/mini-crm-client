//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Apollo Types)
//---------------------------------------------------------------------------------
import { OrderItemInput }       from '../../../services/typeDefs/globals/graphql-global-types'
//---------------------------------------------------------------------------------
// Imports Section (Components)
//---------------------------------------------------------------------------------
import * as CurrencyFormat      from 'react-currency-format';

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IOrderProductItemProps
{
    orderItem: OrderItemInput
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const OrderProductItem: React.SFC<IOrderProductItemProps> = 
(props) => {    
    
    //-------------------------------------------------------------------------
    // Render Section
    //-------------------------------------------------------------------------
    return (
       <React.Fragment>
           <div className="border mb-4 p-4 bg-light border-primary">
               <p className="card-text font-weight-bold">
                   Producto: &nbsp;
                   <span className="font-weight-normal">
                       {props.orderItem.product.name}
                   </span>
               </p>
               <p className="card-text font-weight-bold">
                   Cantidad: &nbsp;
                   <span className="font-weight-normal">
                       {props.orderItem.quantity}
                   </span>
               </p>
               <p className="card-text font-weight-bold">
                   Precio: &nbsp;
                   <span className="font-weight-normal">
                        <CurrencyFormat 
                            value={props.orderItem.product.price.toFixed(2)}
                            thousandSeparator={true} 
                            prefix={'$'} 
                            displayType={'text'}
                        />   
                   </span>
               </p>               
           </div>
       </React.Fragment>
    )
    
    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    
}