//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React, { ChangeEvent }               from 'react'
import { OrderItemInput }                   from '../../../services/typeDefs/globals/graphql-global-types'
import { ProductInput }                     from '../../../services/typeDefs/globals/graphql-global-types'
import * as CurrencyFormat                  from 'react-currency-format';

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICtrlOrderItemProps
{
    orderItem: OrderItemInput
    quantityChanged: (newOrderItem: OrderItemInput, newQuantity: number) => void
    orderItemDeleted: (orderItemId: string) => void
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CtrlOrderItem: React.SFC<ICtrlOrderItemProps> = 
(props) => {
    
    //-------------------------------------------------------------------------
    // Local Variables Section
    //-------------------------------------------------------------------------    
    const currentProduct    : ProductInput = props.orderItem.product
    
    //-------------------------------------------------------------------------
    // Render Section
    //-------------------------------------------------------------------------    
    return (
        <tr className="animated fadeInDown">
            
            <td>
                <input
                    type="number"
                    name="first_name"
                    className="form-control"
                    placeholder="Cant."
                    required
                    min={0}
                    max={(props.orderItem.product.projected_stock as number)}
                    minLength={1}
                    maxLength={8}
                    pattern="^[0-9]*$"
                    onChange={(value) => txtQuantity_changed(value)}
                    style={{maxWidth: '80px', textAlign: 'right'}}
                    value={props.orderItem.quantity.toString()}
                />
            </td>
            
            <td className="align-middle">
                {currentProduct.name}
            </td>
            
            <td className="align-middle text-right">
                <CurrencyFormat 
                    value={currentProduct.price.toFixed(2)} 
                    thousandSeparator={true} 
                    prefix={'$'} 
                    displayType={'text'}
                />
            </td>
            
            <td className="align-middle text-right">
                <CurrencyFormat 
                    value={(props.orderItem.quantity * currentProduct.price).toFixed(2)} 
                    thousandSeparator={true} 
                    prefix={'$'} 
                    displayType={'text'} 
                />
            </td>
            
            <td className="align-middle">
               <button  type="button"
                        className="btn btn-danger"
                        onClick={() => cmdDelete_click(props.orderItem.product.id as string)}
                >
                   <i className="far fa-trash-alt"></i>
                </button> 
            </td>
            
        </tr>
    )
    
    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    function txtQuantity_changed(event: ChangeEvent<HTMLInputElement>) 
    {    
        const currentQuantity = event.target.value ? Number(event.target.value) : 0
        props.quantityChanged(props.orderItem, currentQuantity)
    }
    //-------------------------------------------------------------------------
    function cmdDelete_click(productId: string)
    {
        props.orderItemDeleted(productId)
    }
}