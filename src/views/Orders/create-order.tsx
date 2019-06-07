//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                            from 'react' 
//import { SyntheticEvent }               from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Apollo & Interfaces)
//---------------------------------------------------------------------------------
import { QueryGetCustomerById }         from '../../services/operations/queries/customers/getCustomerById.query'
import { Q_GET_CUSTOMER_BY_ID }         from '../../services/operations/queries/customers/getCustomerById.query'
import { CustomerInput }                from '../../services/typeDefs/globals/graphql-global-types'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper }             from '../../helpers/validations.helper' 
import { ValidationDescriptor }         from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { OrderLayout }                  from '../../components/orders/order-layout'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
//import Swal                             from 'sweetalert2';


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
    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ICreateOrderProps)
    {
        // Calls Super
        super(props)
        
        // Initialize CustomerInput for State
        const customer: CustomerInput = {} as CustomerInput

        // Initial Values for Private Fields
        this.validators = new ValidationHelper()
        this.customer   = customer
        this.timeoutId  = 0
        
        // Initialize State
        this.state = {
            viewCustomer    : customer,
            validators      : []
        }
    }

    
    //-------------------------------------------------------------------------
    // Lifecycle Eventhandler Methods
    //-------------------------------------------------------------------------
    async componentWillMount()
    {
        await this.validators.setValidators('Customer')
        this.setState({
            validators: this.validators.getValidators()
        })
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
                        {({ loading, error, data, refetch }) => {
                            if (loading)
                            {
                                return "Put something that looks good for loading here..."
                            }
                            if (error)
                            {
                                return `Error: ${error.message}` 
                            }
                            if (data && data.getCustomer)
                            {
                                this.setCustomer(id, data.getCustomer as CustomerInput)
                            }
                            return (
                                <React.Fragment>
       
                                    <OrderLayout
                                        data={this.customer}
                                        validators={this.validators}
                                        maxEmails={1}
                                    />
                                    
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
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
 

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
    viewCustomer: CustomerInput
    validators  : ValidationDescriptor[]
}