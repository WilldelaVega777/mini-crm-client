//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { useState }             from 'react'

//---------------------------------------------------------------------------------
// Imports Section (Main Type)
//---------------------------------------------------------------------------------
import { getOrdersByCustomer_getOrdersByCustomer_orders as Order }   
from '../../../services/typeDefs/operations/getOrdersByCustomer'
import { getOrdersByCustomer_getOrdersByCustomer_orders_items as OrderItem }
from '../../../services/typeDefs/operations/getOrdersByCustomer'
import { getOrdersByCustomer_getOrdersByCustomer_orders_items_product as Product }
from '../../../services/typeDefs/operations/getOrdersByCustomer'
//---------------------------------------------------------------------------------
// Imports Section (Apollo Types)
//---------------------------------------------------------------------------------
import { OrderStatus }          from '../../../services/typeDefs/globals/graphql-global-types' 
import { OrderItemInput }       from '../../../services/typeDefs/globals/graphql-global-types'
import { MutationUpdateOrder }  from '../../../services/operations/mutations/orders/edit-order-mutation'
import { M_UPDATE_ORDER }       from '../../../services/operations/mutations/orders/edit-order-mutation'
//---------------------------------------------------------------------------------
// Imports Section (Helpers)
//---------------------------------------------------------------------------------
import { getFormattedDateFor }  from '../../../helpers/date.helpers'
//---------------------------------------------------------------------------------
// Imports Section (Components)
//---------------------------------------------------------------------------------
import * as CurrencyFormat      from 'react-currency-format'
import { OrderProductItem }     from './order-product-item'
import Swal                     from 'sweetalert2'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IOrderCardProps
{
    order: Order
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const OrderCard: React.SFC<IOrderCardProps> = 
(props) => {    
    //-------------------------------------------------------------------------
    // Component State Section
    //-------------------------------------------------------------------------    
    const [componentState, setComponentState] = useState({
        dirty: false,
        originalStatus: OrderStatus[props.order.status],
        newStatus     : OrderStatus[props.order.status]
    })
    
    let cssClass: string = getCSSClass()
    
    //-------------------------------------------------------------------------
    // Render Section
    //-------------------------------------------------------------------------
    return (
        <MutationUpdateOrder
            mutation={M_UPDATE_ORDER}
        >
        {
            (updateOrder) => {
                return (
                    <div className="col-md-4">
                        <div className={`card mb-3 ${cssClass}`}>
                            <div className="card-body">
                                <p className="card-text font-weight-bold">
                                    Estado:
                                    <select 
                                        className="form-control my-3"
                                        defaultValue={props.order.status.toString()}
                                        onChange={e => { cbStatus_change(e) }}
                                    >
                                        <option 
                                            value={OrderStatus.REQUESTED.toString()}
                                        >
                                            PENDIENTE
                                        </option>
                                        <option 
                                            value={OrderStatus.CANCELLED.toString()}
                                        >
                                            CANCELADO
                                        </option>
                                        <option 
                                            value={OrderStatus.DISPATCHED.toString()}
                                        >
                                            COMPLETADO
                                        </option>
                                        <option 
                                            value={OrderStatus.PAID.toString()}
                                        >
                                            PAGADO
                                        </option>
                                    </select>
                                </p>
                                
                                <p className="card-text font-weight-bold">
                                    ID: &nbsp;
                                    <span className="font-weight-normal">{props.order.id}</span>
                                </p>
                                
                                <p className="card-text font-weight-bold">
                                    Fecha Pedido: &nbsp;
                                    <span className="font-weight-normal">
                                        {
                                            getFormattedDateFor(props.order.date)
                                        }
                                    </span>
                                </p>
                                
                                <p className="card-text font-weight-bold">
                                    Total: &nbsp;
                                    <span className="font-weight-normal">
                                        <CurrencyFormat 
                                            value={props.order.total.toFixed(2)} 
                                            thousandSeparator={true} 
                                            prefix={'$'} 
                                            displayType={'text'}
                                        />                            
                                    </span>
                                </p>
                                
                                <h4 className="card-text text-center mb-3">
                                    Artículos del Pedido
                                </h4>
                                {
                                    props.order.items.map((orderItem, index: number) => {
                                        return (
                                            <OrderProductItem 
                                                key={`${props.order.id}_${index}`} 
                                                orderItem={orderItem as OrderItemInput} 
                                            />
                                        )
                                    })
                                }
                                <button 
                                    type="button" 
                                    className="btn btn-block btn-primary"
                                    disabled={!isDirty()}
                                    onClick={e => updateOrderStatus(updateOrder)}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        </MutationUpdateOrder>
    )
    
    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    function cbStatus_change(e: React.ChangeEvent<HTMLSelectElement>)
    {
        const status: OrderStatus = OrderStatus[e.target.value];
        const newDirty: boolean   = (status !== componentState.originalStatus ? true : false)
        
        setComponentState({
            ...componentState,
            dirty: newDirty,
            newStatus: status
        })
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section
    //-------------------------------------------------------------------------
    function isDirty(): boolean
    {
        return componentState.dirty
    }
    //-------------------------------------------------------------------------
    async function updateOrderStatus(updateOrder: any)
    {
        console.log('before save: ' + componentState.newStatus)
        
        const input: Order = {
            ...props.order,
            status: componentState.newStatus,
            items: props.order.items.map((orderItem: OrderItem) => {
                return {
                    ...orderItem,
                    product: {
                        ...(orderItem.product as Product)
                    }
                }
            })
        }
        
        try
        {
            await updateOrder({
                variables: { input }
            })
            
            Swal.fire(
                'Pedidos',
                'El Pedido se ha actualizado exitosamente',
                'success'
            )
            
            // Post Update Settings
            setComponentState({
                ...componentState,
                dirty: false,
                originalStatus: componentState.newStatus
            })            
        }
        catch (error)
        {
            Swal.fire(
                'Pedidos',
                `Ha ocurrido un error: ${error.message}`,
                'error'
            )   
        }    
    }
    //-------------------------------------------------------------------------
    function getCSSClass(): string
    {
        let retVal: string = 'border-warning'
        
        switch(componentState.newStatus)
        {
            case OrderStatus.REQUESTED:
                retVal = 'bg-bright-yarrow'
                break;
            case OrderStatus.CANCELLED:
                retVal = 'bg-light'
                break;
            case OrderStatus.DISPATCHED:
                retVal = 'bg-info'
                break;
            case OrderStatus.PAID:
                retVal = 'bg-success'
                break;
            default:
                break;
        }
        return retVal
    }
}