//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                            from 'react'
import { SyntheticEvent }               from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Apollo Types/Interfaces)
//---------------------------------------------------------------------------------
import { CustomerInput }                from '../../services/typeDefs/globals/graphql-global-types' 
import { EmailInput }                   from '../../services/typeDefs/globals/graphql-global-types'
import { CustomerType }                 from '../../services/typeDefs/globals/graphql-global-types'
import { MutationCreateCustomer }       from '../../services/operations/mutations/customers/create-customer.mutation'
import { M_CREATE_CUSTOMER }            from '../../services/operations/mutations/customers/create-customer.mutation'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { getEnumFromString }            from '../../helpers/type.helpers'
import { ValidationHelper }             from '../../helpers/validations.helper' 
import { ValidationDescriptor }         from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CustomerLayout }               from '../../components/customers/customer-layout' 
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal                             from 'sweetalert2';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class CreateCustomer extends 
                    React.Component<ICreateCustomersProps, ICreateCustomersState>
{    
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private validators: ValidationHelper;
    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ICreateCustomersProps)
    {
        // Calls Super
        super(props)

        // Initialize CustomerInput for State
        const customer: CustomerInput = {} as CustomerInput
        
        // Initial Values for Private Fields
        this.validators = new ValidationHelper();
        
        // Initialize State
        this.state = {
            newCustomer : {
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
        // Return Form
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
        props: ICreateCustomersProps,
        state: ICreateCustomersState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        return (
            <React.Fragment>
                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Agregar Nuevo Cliente</h2>
                
                {/* MAIN COMPONENT LAYOUT  */}
                <div className="row justify-content-center">
                    
                    {/* DEFINE DATA MUTATION / MUTATION UI  */}
                    <MutationCreateCustomer
                        mutation={M_CREATE_CUSTOMER}
                        onCompleted={() => this.props.history.push('/')}
                    >
                        {(createCustomer: any) =>
                        {
                            return (
                                
                                <form name="frmNewCustomer"
                                    className="col-md-8 m-3"
                                    onSubmit={e => this.frmNewCustomer_submit(e, createCustomer)}
                                    onChange={e => this.frmNewCustomer_change(e)}
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
                                        validators={this.validators}
                                    />
                                    
                                </form>
                            )
                        }}
                    </MutationCreateCustomer>
                </div>
                
                
            </React.Fragment>

        )
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
    frmNewCustomer_change(e: SyntheticEvent)
    {
        let {name, value} = (e.target as HTMLFormElement)

        // Debug:
        //const message = `Campo: ${name}, Valor: ${value}`
        //console.log(message);
        
        value = ((name === "age") ? Number(value) : value)
        value = ((name === "type") ? getEnumFromString(CustomerType, value) : value)
        
        if (name.substring(0,5) === 'email')
        {
            const ctrlIndex: number = Number(name.substr(6))
            this.setState({
                emails: this.state.emails.map((email: EmailInput, index: number) => {
                    if (index === (ctrlIndex-1))
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
                newCustomer: {
                    ...this.state.newCustomer,
                    [name] : value
                }
            })            
        }
    }
    //-------------------------------------------------------------------------
    async frmNewCustomer_submit(e: SyntheticEvent, createCustomer: any): Promise<void | undefined>
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
                ...this.state.newCustomer,
                emails: this.state.emails
            }

            try
            {
                await createCustomer({
                    variables: { input }
                })
                
                Swal.fire(
                    'Crear Nuevo Cliente',
                    'El Nuevo Cliente ha sido guardado con éxito.',
                    'success'
                )
            }
            catch (error)
            {
                Swal.fire(
                    'Crear Nuevo Cliente',
                    `Error: ${error.message}`,
                    'error'
                )
                console.error(error)
            }

            await (e.target as HTMLFormElement).reset()
        }
    }
    //-------------------------------------------------------------------------
    cmdNewEmail_click(e: SyntheticEvent)
    {
        e.preventDefault()
        this.setState({
            emails: this.state.emails.concat(
               [ { email: '' } ]
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
interface ICreateCustomersProps
{
    shouldNavigateBack: boolean
    history: any
}
//---------------------------------------------------------------------------------
interface ICreateCustomersState
{
    newCustomer: CustomerInput,
    validators: ValidationDescriptor[]
    emails: EmailInput[]
}