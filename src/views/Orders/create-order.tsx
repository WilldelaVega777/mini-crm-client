//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                            from 'react' 
//---------------------------------------------------------------------------------
// Imports Section (Apollo & Interfaces)
//---------------------------------------------------------------------------------
import { QueryGetCustomerById }         from '../../services/operations/queries/customers/getCustomerById.query'
import { Q_GET_CUSTOMER_BY_ID }         from '../../services/operations/queries/customers/getCustomerById.query'
import { CustomerInput }                from '../../services/typeDefs/globals/graphql-global-types'
import { OrderInput }                   from '../../services/typeDefs/globals/graphql-global-types'
import { OrderItemInput }               from '../../services/typeDefs/globals/graphql-global-types'
import { QueryGetProducts }             from '../../services/operations/queries/products/getProductsPaginated.query'
import { Q_GET_PRODUCTS }               from '../../services/operations/queries/products/getProductsPaginated.query'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper }             from '../../helpers/validations.helper' 
import { ValidationDescriptor }         from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { OrderLayout }                  from '../../components/orders/order-layout'
import { Loading }                      from '../../components/Shared/loading'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal                             from 'sweetalert2'


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class CreateOrder extends 
    React.Component<ICreateOrderProps, ICreateOrderState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private validators          : ValidationHelper
    private customer            : CustomerInput
    private timeoutId           : number
    private errorCounter        : number
    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ICreateOrderProps)
    {
        // Calls Super
        super(props)
        
        // Initialize CustomerInput for State
        const customer: CustomerInput = {} as CustomerInput
        const order   : OrderInput    = {} as OrderInput

        // Initial Values for Private Fields
        this.validators     = new ValidationHelper()
        this.customer       = customer
        this.timeoutId      = 0
        this.errorCounter   = 0
        
        // Initialize State
        this.state = {
            viewCustomer : customer,
            validators   : [],
            order        : order,
            orderItems   : []
        }
    }
    
    //-------------------------------------------------------------------------
    // RENDER Method
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {
        return (
            <React.Fragment>
                
                {/* Apply CSS  */}
                { this.getCSS() }
                
                {/* Create Form  */}
                {this.renderForm(this.props, this.state, this.validators)}
                
            </React.Fragment>
        );
    }

    //-------------------------------------------------------------------------
    // Private Methods Section
    //-------------------------------------------------------------------------
    private getCSS(): JSX.Element
    {
        const css = `
            .button_new_email 
            {
                position:absolute;
                bottom:0             
            }
        `

        return (
            <React.Fragment>
                <style>
                    {css}
                </style>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    private renderForm(
        props: ICreateOrderProps,
        state: ICreateOrderState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params
        
        // Return JSX
        return (
            <React.Fragment>
                
                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Crear Orden de Compra</h2>
                
                {/* MAIN COMPONENT LAYOUT  */}
                <div className="row justify-content-center">
                    
                    {/* GET CUSTOMER DATA  */}
                    <QueryGetCustomerById 
                        query={Q_GET_CUSTOMER_BY_ID} 
                        variables={{ id: id }}
                    >
                        {({ loading, error, data }) => {
                            if (loading)
                            {
                                return (
                                    <Loading/>
                                )
                            }
                            if (error)
                            {
                                if (this.errorCounter === 0)
                                {
                                    Swal.fire(
                                        'Error', 
                                        `Cargando Datos: ${error.message}`, 
                                        'error'
                                    )
                                    this.errorCounter++
                                    return (
                                        <Loading/>
                                    )
                                }
                            }
                            if (data && data.getCustomer)
                            {
                                this.errorCounter = 0
                                this.setCustomer(id, data.getCustomer as CustomerInput)
                            }
                            return (
                                <React.Fragment>
                                    <QueryGetProducts
                                        query={Q_GET_PRODUCTS}
                                        variables={{ limit: 0, offset: 0 }}
                                        pollInterval={1000}
                                    >
                                    {
                                        ({loading, error, data, startPolling, stopPolling}) => {
                                            if (loading)
                                            {
                                                return (
                                                    <Loading/>
                                                )                                                
                                            }
                                            if (error)
                                            {
                                                if (this.errorCounter === 0)
                                                {
                                                    Swal.fire(
                                                        'Error', 
                                                        `Cargando Datos: ${error.message}`, 
                                                        'error'
                                                    )
                                                    this.errorCounter++
                                                    return (
                                                        <Loading/>
                                                    )
                                                }
                                            }
                                            if (data)
                                            {
                                                this.errorCounter = 0
                                                return (
                                                    <OrderLayout
                                                        customer={this.customer}
                                                        products={(data.getProducts.products)}
                                                        validators={this.validators}
                                                        maxEmails={1}
                                                        onOrderItemsSave={(orderItems: OrderItemInput[]) => this.saveOrderItems(orderItems)}
                                                    />                                                    
                                                )
                                            }
                                        }
                                    }    
                                        
                                    </QueryGetProducts>

                                    
                                </React.Fragment>
                            )
                        }}
                    </QueryGetCustomerById>
                </div>
            </React.Fragment>
        )
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section (Utility)
    //-------------------------------------------------------------------------
    private setCustomer(id: string, ci: CustomerInput)
    {
        if (!this.customer.id)
        {
            this.customer = ci
            this.customer.id = id
            this.timeoutId = window.setTimeout(() => {
                this.setState({
                    viewCustomer: {
                        ...this.customer
                    }
                })
                window.clearTimeout(this.timeoutId)
            },0)            
        }
    }
    //-------------------------------------------------------------------------
    private saveOrderItems(orderItems: OrderItemInput[])
    {
        /// Add Mutation for saving order to renderLayout()
        /// TODO: Implement this by validating and executing a mutation
    }
}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface ICreateOrderProps
{
    shouldNavigateBack: boolean,
    history: any,
    match: any
}
//---------------------------------------------------------------------------------
export interface ICreateOrderState
{
    viewCustomer    : CustomerInput
    validators      : ValidationDescriptor[]
    order           : OrderInput
    orderItems      : OrderItemInput[]
}