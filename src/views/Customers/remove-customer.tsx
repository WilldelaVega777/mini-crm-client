//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { QueryGetCustomerById }     from '../../services/operations/queries/customers/getCustomerById.query'
import { Q_GET_CUSTOMER_BY_ID }     from '../../services/operations/queries/customers/getCustomerById.query'
import { CustomerInput }            from '../../services/typeDefs/globals/graphql-global-types'
import { EmailInput }               from '../../services/typeDefs/globals/graphql-global-types'
import { MutationRemoveCustomer }   from '../../services/operations/mutations/customers/remove-customer.mutation'
import { M_REMOVE_CUSTOMER }        from '../../services/operations/mutations/customers/remove-customer.mutation'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper }         from '../../helpers/validations.helper'
import { ValidationDescriptor }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CustomerLayout }           from '../../components/customers/customer-layout'
import { Loading }                  from '../../components/Shared/loading'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal                         from 'sweetalert2'


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class RemoveCustomer extends
    React.Component<IRemoveCustomerProps, IRemoveCustomerState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private validators                  : ValidationHelper    
    private customer                    : CustomerInput
    private timeoutId                   : number 
    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IRemoveCustomerProps)
    {
        // Calls Super
        super(props)
        
        // Initial Values for Private Fields
        this.validators = new ValidationHelper()
        this.customer   = {} as CustomerInput
        this.timeoutId  = 0
        
        // Initialize State
        this.state = {
            validators  : [],
            emails      : []
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
                {this.getCSS()}
                
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
            .form-expand
            {
                min-width: 600px !important;
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
        props: IRemoveCustomerProps,
        state: IRemoveCustomerState,
        validators: ValidationHelper
    ): JSX.Element
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params
                
        return (
            <React.Fragment>
                {/* PAGE TITLE  */}
                <h2 className="text-center">Eliminar Cliente</h2>
                <h4 className="text-center mb-3">Está seguro que desea eliminar a este cliente?</h4>

                {/* GET CUSTOMER DATA  */}
                <QueryGetCustomerById
                    query={Q_GET_CUSTOMER_BY_ID}
                    variables={{ id: id }}
                >
                    {
                        ({ loading, error, data, refetch }) =>
                        {
                            if (loading)
                            {
                                return (
                                    <Loading/>
                                )
                            }
                            if (error)
                            {
                                Swal.fire(
                                    'Error', 
                                    `Cargando Datos: ${error.message}`, 
                                    'error'
                                )
                                return ''
                            }
                            if (data && data.getCustomer)
                            {
                                this.setCustomer(id, data.getCustomer as CustomerInput)
                            }
                            return (

                                <MutationRemoveCustomer
                                    mutation={M_REMOVE_CUSTOMER}
                                    onCompleted={() => this.props.history.push('/')}
                                >
                                    {
                                        removeCustomer =>
                                        {
                                            return (
                                                <React.Fragment>

                                                    <div className="row justify-content-center">
                                                        <form className="form-expand">
                                                            <CustomerLayout
                                                                data={this.customer}
                                                                emails={this.state.emails}
                                                                validators={this.validators}
                                                                readOnly={true}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger float-right"
                                                                onClick={e => this.confirmRemove(id, removeCustomer, refetch)}
                                                            >
                                                                ELIMINAR DEFINITIVAMENTE
                                                            </button>
                                                        </form>

                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                    }
                                </MutationRemoveCustomer>
                            )
                        }
                    }
                </QueryGetCustomerById>
            </React.Fragment>
        )
        
    }    
    
    //-------------------------------------------------------------------------
    private setCustomer(id: string, ci: CustomerInput)
    {
        if (!this.customer.id)
        {
            this.customer = ci
            this.customer.id = id
            this.timeoutId = window.setTimeout(() =>
            {
                this.setState({
                    emails: this.customer.emails
                })
                window.clearTimeout(this.timeoutId)
            }, 0)
        }
    }
    //-------------------------------------------------------------------------
    private async confirmRemove(input: string, removeCustomer: any, refetch: any)
    {
        try
        {
            await removeCustomer({ variables: {input} })
            await refetch()
            
            Swal.fire(
                'Eliminar Cliente',
                'El Cliente ha sido eliminado con éxito.',
                'success'
            )
        }
        catch (error)
        {
            Swal.fire(
                'Eliminar Cliente',
                `Error: ${error.message}`,
                'error'
            )
            console.error(error)
        }
    }
    
}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface IRemoveCustomerProps
{
    shouldNavigateBack  : boolean,
    history             : any,
    match               : any
}
//---------------------------------------------------------------------------------
export interface IRemoveCustomerState
{
    validators          : ValidationDescriptor[],
    emails              : EmailInput[]
}