//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                            from 'react' 
import { SyntheticEvent }               from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Apollo & Interfaces)
//---------------------------------------------------------------------------------
import { QueryGetCustomerById }         from '../../services/operations/queries/customers/getCustomerById.query'
import { Q_GET_CUSTOMER_BY_ID }         from '../../services/operations/queries/customers/getCustomerById.query'
import { CustomerInput }                from '../../services/typeDefs/globals/graphql-global-types'
import { EmailInput}                    from '../../services/typeDefs/globals/graphql-global-types'
import { CustomerType }                 from '../../services/typeDefs/globals/graphql-global-types'
import { MutationUpdateCustomer }       from '../../services/operations/mutations/customers/edit-customer.mutation'
import { M_UPDATE_CUSTOMER }            from '../../services/operations/mutations/customers/edit-customer.mutation'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { getEnumFromString }            from '../../helpers/type.helpers'
import { ValidationHelper }             from '../../helpers/validations.helper' 
import { ValidationDescriptor }         from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CustomerLayout }                   from '../../components/customers/customer-layout'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal                             from 'sweetalert2';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class EditCustomer extends 
    React.Component<IEditCustomerProps, IEditCustomerState>
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
    constructor(props: IEditCustomerProps)
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
            editCustomer: {
                ...customer,
                age: 0,
                type: CustomerType.BASIC
            },
            validators: [],
            emails: []
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
        props: IEditCustomerProps,
        state: IEditCustomerState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params
        
        return (
            <React.Fragment>
                
                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Editar Cliente</h2>
                
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
                                    
                                    {/* DEFINE DATA MUTATION / MUTATION UI  */}
                                    <MutationUpdateCustomer 
                                        mutation={M_UPDATE_CUSTOMER}
                                        onCompleted={() => this.props.history.push('/')}
                                    >
                                    {
                                        (updateCustomer) => {
                                            return (
                                                
                                                <form name="frmEditCustomer"
                                                    className="col-md-8 m-3"
                                                    onSubmit={e => this.frmEditCustomer_submit(e, updateCustomer, refetch)}
                                                    onChange={e => this.frmEditCustomer_change(e)}
                                                >

                                                    <CustomerLayout
                                                        emails={this.state.emails}
                                                        triggerCreate={(e: SyntheticEvent) =>
                                                        {
                                                            this.cmdNewEmail_click(e)
                                                        }}
                                                        triggerDelete={(e: SyntheticEvent, indexToRemove: number) =>
                                                        {
                                                            this.cmdRemoveEmail_click(e, indexToRemove)
                                                        }}
                                                        data={this.customer}
                                                        validators={this.validators}
                                                    />

                                                </form>
                                                
                                            )
                                        }
                                    }
                                    </MutationUpdateCustomer>
                                    
                                </React.Fragment>
                            )
                        }}
                    </QueryGetCustomerById>
                </div>
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
            this.timeoutId = window.setTimeout(() => {
                this.setState({
                    editCustomer: this.customer,
                    emails: this.customer.emails
                })
                window.clearTimeout(this.timeoutId)
            },0)            
        }
    }
    //-------------------------------------------------------------------------
    private validateEmails(): boolean
    {
        let bRetVal: boolean = false
        if (this.state.emails.length > 0)
        {
            const emptyOnes: EmailInput[] =
                this.state.emails.filter(
                    (email: EmailInput) => (email.email === '')
                )
            if (emptyOnes.length === 0)
            {
                bRetVal = true
            }
        }
        return bRetVal;
    }
    
    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    frmEditCustomer_change(e: SyntheticEvent)
    {
        let { name, value } = (e.target as HTMLFormElement)

        // Debug:
        //const message = `Campo: ${name}, Valor: ${value}`
        //console.log(message);

        value = ((name === "age") ? Number(value) : value)
        value = ((name === "type") ? getEnumFromString(CustomerType, value) : value)

        if (name.substring(0, 5) === 'email')
        {
            const ctrlIndex: number = Number(name.substr(6))
            this.setState({
                emails: this.state.emails.map((email: EmailInput, index: number) =>
                {
                    if (index === (ctrlIndex - 1))
                    {
                        return {
                            email: value
                        }
                    }
                    else
                    {
                        return {
                            ...email
                        }
                    }
                })
            })
        }
        else
        {
            this.setState({
                editCustomer: {
                    ...this.state.editCustomer,
                    [name]: value
                }
            })
        }
    }
    //-------------------------------------------------------------------------
    async frmEditCustomer_submit(e: SyntheticEvent, updateCustomer: any, refetch: any): Promise<void | undefined>
    {
        e.preventDefault()
        e.persist()

        // Validation Analysis        
        if ((e.target as HTMLFormElement).checkValidity())
        {
            // Specific Form (Entity) Validations
            if (!this.validateEmails())
            {
                Swal.fire('Crear Nuevo Cliente',
                    'No se capturó ningún correo.',
                    'warning')
                return
            }

            // Specific Form (Entity) Preparation
             const input = {
                ...this.state.editCustomer,
                emails: this.state.emails
            }
            
            try
            {
                await updateCustomer({
                    variables: { input }
                })
                
                await refetch()
                
                Swal.fire(
                    'Actualizar Cliente',
                    'El Cliente ha sido actualizado con éxito.',
                    'success'
                )
            }
            catch (error)
            {
                Swal.fire(
                    'Actualizar Cliente',
                    `Error: ${error.message}`,
                    'error'
                )
                console.error(error)
            }

        }
    }
    //-------------------------------------------------------------------------
    cmdNewEmail_click(e: SyntheticEvent)
    {
        e.preventDefault()
        this.setState({
            emails: this.state.emails.concat(
                [{ email: '' }]
            )
        })
    }
    //-------------------------------------------------------------------------
    cmdRemoveEmail_click(e: SyntheticEvent, pIndex: number)
    {
        e.preventDefault()

        this.setState({
            emails: this.state.emails.filter((email, index) => index !== pIndex)
        })
    }
}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface IEditCustomerProps
{
    shouldNavigateBack: boolean,
    history: any,
    match: any
}
//---------------------------------------------------------------------------------
export interface IEditCustomerState
{
    editCustomer: CustomerInput,
    validators: ValidationDescriptor[],
    emails: EmailInput[]
}