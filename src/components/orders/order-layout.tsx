//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
//import { SyntheticEvent }     from 'react'
import { ValidationHelper }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CustomerLayout }       from '../customers/customer-layout'
import { CustomerInput }        from '../../services/typeDefs/globals/graphql-global-types'
import { ProductInput }         from '../../services/typeDefs/globals/graphql-global-types'
import { OrderItemInput }       from '../../services/typeDefs/globals/graphql-global-types'
import { CtrlOrderItem }        from './layout/ctrl-order-item';
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Select                   from 'react-select'
import Animated                 from 'react-select/animated'
import * as CurrencyFormat      from 'react-currency-format'
import Swal                     from 'sweetalert2'


//-------------------------------------------------------------------------
// Component for Emails:
//-------------------------------------------------------------------------
export class OrderLayout extends React.Component<IOrderLayoutProps, IOrderLayoutState>
{
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------    
    constructor(props: IOrderLayoutProps)
    {
        super(props)
        
        this.state = {
            orderItems: [],
            orderTotal: 0
        }
    }
    
    //-------------------------------------------------------------------------
    // Render Method
    //-------------------------------------------------------------------------
    public render()
    {
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <h4 className="mb-3 text-secondary" style={{textAlign: 'center'}}>
                                Resumen del Cliente
                            </h4>
                            <hr/>
                            <CustomerLayout
                                data={this.props.customer}
                                emails={(this.props.customer as CustomerInput).emails}
                                validators={this.props.validators}
                                readOnly={true}
                                maxEmails={1}
                                hideLabels={true}
                            />
                        </div>
                        <div className="col col-md-8">
                            <div className="row">
                                <div className="col col-md-12 d-flex justify-content-center">
                                    <h4 className="mb-3 ml-5 text-secondary">
                                        Datos de la Orden
                                    </h4>
                                </div>
                            </div>
                            <div className="row ml-5" style={{marginTop: '-17px'}}>
                                <div className="col col-md-12">
                                    <hr/>
                                    <Select 
                                        options={this.productsToOptions(this.props.products)} 
                                        isMulti={true}
                                        components={Animated()}
                                        placeholder="Seleccionar Productos"
                                        className="mb-4"
                                        onChange={
                                            (value) => this.selectProduct_change(value)}
                                        value={this.orderItemsToOptions(this.state.orderItems)}
                                    />
                                    <div className="d-flex justify-content-end mb-2" 
                                         style={{marginTop: '-17px', minWidth: '100%'}}>

                                        <span className="ml-4">
                                            <strong className="text-primary">Subtotal:</strong>
                                            &nbsp; 
                                            <CurrencyFormat 
                                                value={(this.state.orderTotal).toFixed(2)} 
                                                thousandSeparator={true} 
                                                prefix={'$'} 
                                                displayType={'text'}
                                            />                                            
                                        </span>

                                        <span className="ml-4">
                                            <strong className="text-primary">IVA:</strong>
                                            &nbsp; 
                                            <CurrencyFormat 
                                                value={(this.state.orderTotal * .16).toFixed(2)} 
                                                thousandSeparator={true} 
                                                prefix={'$'} 
                                                displayType={'text'}
                                            />                                            
                                        </span>

                                    
                                        <span className="ml-4">
                                            <strong className="text-primary">Total:</strong>
                                            &nbsp; 
                                            <CurrencyFormat 
                                                value={(this.state.orderTotal * 1.16).toFixed(2)}
                                                thousandSeparator={true} 
                                                prefix={'$'} 
                                                displayType={'text'}
                                            />                                            
                                        </span>
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr className="table-primary">
                                                <th className="align-center">Cantidad</th>
                                                <th className="align-center">Producto</th>
                                                <th className="align-center">Precio</th>
                                                <th className="align-center">Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.orderItems.map((orderItem: OrderItemInput, index: number) => {
                                                return (
                                                    <CtrlOrderItem
                                                        key={(orderItem.product.id as string)}
                                                        orderItem={orderItem}
                                                        quantityChanged={(newOrderItem: OrderItemInput, newQuantity: number) => this.ctrlOrderItem_quantityChanged(newOrderItem, newQuantity)}
                                                        orderItemDeleted={(orderItemId: string) => this.ctrlOrderItem_orderItemDeleted(orderItemId)}
                                                    />                                                    
                                                )                                                
                                            })                                            
                                        }   
                                        </tbody>
                                        <tfoot>
                                            <tr className="table-success">
                                                <td className="d-flex justify-content-end">IVA</td>
                                                <td>
                                                    <CurrencyFormat 
                                                        value={(this.state.orderTotal * .16).toFixed(2)} 
                                                        thousandSeparator={true} 
                                                        prefix={'$'} 
                                                        displayType={'text'} 
                                                    />
                                                </td>
                                                <td></td>
                                                <td>
                                                    <strong>
                                                        <CurrencyFormat 
                                                            value={(this.state.orderTotal * 1.16).toFixed(2)} 
                                                            thousandSeparator={true} 
                                                            prefix={'$'} 
                                                            displayType={'text'} 
                                                        />
                                                    </strong>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                <div className="container">
                    <div className="form-row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <button  
                                type="button"
                                className="btn btn-success"
                                onClick={() => this.cmdSaveChanges_click()}
                            >
                                Guardar Cambios
                            </button> 
                        </div>
                    </div>          
                </div>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    selectProduct_change(items: any)
    {
        console.log(items)
        
        if (items)
        {
            this.setState({
                orderItems : items.map(item => {
                    
                    // Find Quantity in OrderItems (if available)
                    let currentQuantity = 0
                    let ordersMatched = this.state.orderItems.filter(orderItem => {
                        return (orderItem.product.id === item.value)
                    })
                    
                    if (ordersMatched && ordersMatched.length > 0)
                    {
                        currentQuantity = ordersMatched[0].quantity
                    }

                    // Find Product in Products array
                    let currentProduct = (this.props.products.filter(
                        (product: ProductInput) => {
                            return product.id === item.value
                        })
                    )
                    return ({
                        quantity: currentQuantity,
                        product: currentProduct[0]
                    } as OrderItemInput)
                })
            }, () => this.calculateTotals() )
        }
        else
        {
            this.setState({
                orderItems: []
            }, () => this.calculateTotals() )
        }
        
    }
    //-------------------------------------------------------------------------
    ctrlOrderItem_quantityChanged(newOrderItem: OrderItemInput, newQuantity: number)
    {
        this.setState({
            orderItems: this.state.orderItems.map(orderItem => {
                if (orderItem.product.id === newOrderItem.product.id)
                {
                    // Enough in stock???
                    if (newOrderItem.product.stock < newQuantity)
                    {
                        Swal.fire(
                            'IMPORTANTE!', 
                            'No existen suficientes productos en stock' +
                                ' para surtir su pedido en este momento.', 
                            'warning'
                        )
                    }
                    
                    return ({
                        ...newOrderItem,
                        quantity: newQuantity
                    } as OrderItemInput)
                }
                else
                {
                    return {
                        ...orderItem
                    }
                }
            })
        }, () => this.calculateTotals() )
    }
    //-------------------------------------------------------------------------
    ctrlOrderItem_orderItemDeleted(productId: string)
    {
        this.setState({
            orderItems : this.state.orderItems.filter((orderItem: OrderItemInput) => {
                return (orderItem.product.id !== productId)
            })
        }, () => this.calculateTotals() )
    }
    //-------------------------------------------------------------------------
    cmdSaveChanges_click()
    {
        this.props.onOrderItemsSave(this.state.orderItems)
    }
    //-------------------------------------------------------------------------
    // Private Methods Section
    //-------------------------------------------------------------------------
    private calculateTotals()
    {
        let newTotal = 0
        this.state.orderItems.forEach((orderItem: OrderItemInput) => {
            newTotal += (orderItem.quantity * orderItem.product.price)
        })
        this.setState({
            orderTotal: newTotal
        })
    }
    //-------------------------------------------------------------------------
    private productsToOptions(products: ProductInput[]): ISelectOptions[]
    {
        return products.map(product => {
            return {
                label: product.name,
                value: product.id
            }
        })
    }
    //-------------------------------------------------------------------------
    private orderItemsToOptions(orderItems: OrderItemInput[]): ISelectOptions[]
    {
        return this.state.orderItems.map(
            (orderItem: OrderItemInput) => {
                return {
                    label: orderItem.product.name,
                    value: orderItem.product.id
                }    
            }
        )
    }
}

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IOrderLayoutProps
{
    customer?           : CustomerInput | undefined
    products            : ProductInput[]
    validators          : ValidationHelper
    readOnly?           : boolean | undefined
    maxEmails?          : number  | undefined
    onOrderItemsSave    : (orderItems: OrderItemInput[]) => void
}
//---------------------------------------------------------------------------------
interface IOrderLayoutState
{
    orderItems      : OrderItemInput[],
    orderTotal      : number
}

//---------------------------------------------------------------------------------
// Component Specific Interfaces
//---------------------------------------------------------------------------------
interface ISelectOptions
{
    label       : string
    value       : any
}
