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
import { MutationCreateCustomer }       from '../../services/operations/mutations/create-customer.mutation'
import { M_CREATE_CUSTOMER }            from '../../services/operations/mutations/create-customer.mutation'
//---------------------------------------------------------------------------------
// Imports Section (React Component Interfaces)
//---------------------------------------------------------------------------------
import { ICreateCustomersProps }        from '../../interfaces/react-components/create-customer.interfaces'
import { ICreateCustomersState}         from '../../interfaces/react-components/create-customer.interfaces'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { getEnumFromString }            from '../../helpers/type.helpers'
import { ValidationHelper }             from '../../helpers/validations.helper' 
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
    // Render Method Section
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
                
                {/* FORM  */}
                <div className="row justify-content-center">

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

                                    {this.ctrl_form_layout(props, state, validators)}

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

            Swal.fire(
                'Crear Nuevo Cliente',
                'El Nuevo Cliente ha sido guardado con éxito.',
                'success'
            )
            try
            {
                await createCustomer({
                    variables: { input }
                })
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
    
    //-------------------------------------------------------------------------
    // Private ComponentFragments Section (Controls)
    //-------------------------------------------------------------------------
    // First Name:
    //-------------------------------------------------------------------------
    private ctrl_firstname(
        props       : ICreateCustomersProps, 
        state       : ICreateCustomersState, 
        validators  : ValidationHelper
    ): JSX.Element
    { 
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Nombre</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            placeholder="Nombre"
                            required={validators.getRequired('first_name')}
                            minLength={validators.getMinLength('first_name')}
                            maxLength={validators.getMaxLength('first_name')}
                            pattern={validators.getRegex('first_name')}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="far fa-address-book"></i>
                            </span>
                        </div>
                    </div> 
                </div>              
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    // Last Name:
    //-------------------------------------------------------------------------
    private ctrl_lastname(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
        validators  : ValidationHelper
    ): JSX.Element
    {
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Apellido</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            placeholder="Apellido"
                            required={validators.getRequired('last_name')}
                            minLength={validators.getMinLength('last_name')}
                            maxLength={validators.getMaxLength('last_name')}
                            pattern={validators.getRegex('last_name')}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="far fa-address-book"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    // Company:
    //-------------------------------------------------------------------------
    private ctrl_company(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
    validators      : ValidationHelper
    ) : JSX.Element
    {
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Empresa</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="company"
                            className="form-control"
                            placeholder="Empresa"
                            required={validators.getRequired('company')}
                            minLength={validators.getMinLength('company')}
                            maxLength={validators.getMaxLength('company')}
                            pattern={validators.getRegex('company')}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="fas fa-city"></i>
                            </span>
                        </div>
                    </div>                        
                </div>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    // Email:
    //-------------------------------------------------------------------------
    private ctrl_email(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
        validators  : ValidationHelper
    ): JSX.Element
    {
        return (
            <React.Fragment>
                {this.state.emails.map((email: EmailInput, index: number) => {
                    return (
                        <div key={index} className="form-group col-md-12 pl-1 pr-0">
                            <label>Email {index +1}</label>
                            <div className="form-row input-group mb-3">
                                <input  type="email" 
                                        className="form-control" 
                                        name={`email_${index+1}`}
                                        placeholder="Email"
                                        required={validators.getRequired('emails')}
                                        minLength={validators.getMinLength('emails')}
                                        maxLength={validators.getMaxLength('emails')}
                                        pattern={validators.getRegex('emails')}
                                />
                                <div className="input-group-append">
                                    <button id="cmdRemoveEmail"
                                            type="button"
                                            className="btn btn-outline-danger" 
                                            onClick={e => this.cmdRemoveEmail_click(e, index)}
                                    >
                                        &times; Eliminar Email
                                    </button>
                                </div>
                            </div>
                        </div>            
                    )
                })}
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    // Age:
    //-------------------------------------------------------------------------
    private ctrl_age(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
        validators  : ValidationHelper
    ): JSX.Element
    {
        return (
            <React.Fragment>
                
                <div className="form-group pl-1 pr-0">                
                    <label>Edad</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-birthday-cake"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            placeholder="Edad"
                            required={validators.getRequired('age')}
                            min={validators.getMin('age')}
                            max={validators.getMax('age')}
                        />
                    </div>
                </div>
                
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    // CustomerType:
    //-------------------------------------------------------------------------
    private ctrl_type
    (
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
        validators  : ValidationHelper
    ): JSX.Element
    {
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">  
                    <label>Tipo Cliente</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text">
                                <i className="fas fa-hand-peace"></i>
                            </label>
                        </div>


                        <select
                            name="type"
                            className="custom-select"
                            required={validators.getRequired('type')}
                        >
                            <option value="">Elegir...</option>
                            <option value="PREMIUM">PREMIUM</option>
                            <option value="BASIC">BASICO</option>
                        </select>


                    </div>
                </div>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    // Submit Button:
    //-------------------------------------------------------------------------
    private ctrl_submit: JSX.Element =
    (
        <button
            type="submit"
            className="btn btn-success float-right"
        >
            Guardar Cambios
        </button>
    )
    
    //-------------------------------------------------------------------------
    // Private ComponentFragments Section: (Form Layout)
    //-------------------------------------------------------------------------
    private ctrl_form_layout(
        props: ICreateCustomersProps, 
        state: ICreateCustomersState, 
        validators: ValidationHelper
    )
    : JSX.Element
    {
        return (
            <React.Fragment>
                
                <div className="form-row">
                    <div className="form-group col-md-6">   
                        {this.ctrl_firstname(this.props, this.state, this.validators)}
                    </div>
                    <div className="form-group col-md-6">
                        {this.ctrl_lastname(this.props, this.state, this.validators)}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        {this.ctrl_company(this.props, this.state, this.validators)}
                    </div>
                </div>

                {this.ctrl_email(this.props, this.state, this.validators)}    

                <div className="form-row mt-3 mb-4">
                    <div className="col-md-12 text-center">
                        <button id="cmdNewEmail"
                                className="btn btn-warning"
                                onClick={e => this.cmdNewEmail_click(e)}
                        >
                            <i className="fas fa-plus"></i>
                            &nbsp;&nbsp;Agregar Email
                        </button>
                    </div>
                </div>  

                
                <div className="form-row">
                    <div className="form-group col-md-6">
                        {this.ctrl_age(this.props, this.state, this.validators)}
                    </div>
                    <div className="form-group col-md-6">
                        {this.ctrl_type(this.props, this.state, this.validators)}
                    </div>
                </div>
                
                {this.ctrl_submit}
                
            </React.Fragment>                
        )
    }
}

