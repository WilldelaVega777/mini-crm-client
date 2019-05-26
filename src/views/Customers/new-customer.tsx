//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                            from 'react'
import { SyntheticEvent }               from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Apollo Types/Interfaces)
//---------------------------------------------------------------------------------
import { QueryCustomerValidations }     from '../../services/operations/queries/customer-validations.query'
import { Q_GET_CUSTOMER_VALIDATIONS }   from '../../services/operations/queries/customer-validations.query'

import { CustomerInput }                from '../../services/typeDefs/globals/graphql-global-types'
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
import { ValidationDescriptor }         from '../../helpers/validations.helper'
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
    constructor(props: ICreateCustomersProps, state: ICreateCustomersState)
    {
        // Calls Super
        super(props, state)

        // Initialize CustomerInput for State
        const customer: CustomerInput = {} as CustomerInput
        
        this.validators = new ValidationHelper();
        
        // Initialize State
        this.state = {
            newCustomer : {
                ...customer,
                age: 0,
                type: CustomerType.BASIC
            }
        }
    }

    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {
        // Return Form
        return (
            <React.Fragment>
                
                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Agregar Nuevo Cliente</h2>
                
                {/* LOAD VALIDATIONS INTO STATE  */}
                <QueryCustomerValidations
                    query={Q_GET_CUSTOMER_VALIDATIONS}
                >
                    {({ loading: loadingValidations, error: errorValidations, data: dataValidations }) =>
                    {
                        if (loadingValidations)
                        {
                            return "Cargando..."
                        }
                        if (errorValidations)
                        {
                            return `Error: ${errorValidations.message}`
                        }
                        if (dataValidations)
                        {
                            const validators: ValidationDescriptor[] = []
                            dataValidations.getCustomerValidations.forEach((validator) => {
                                validators.push(validator as ValidationDescriptor)
                            })
                            this.validators.setValidators(validators)
                        }

                        /* DATA ENTRY FORM  */
                        return (
                            <div className="row justify-content-center">
                                
                                <MutationCreateCustomer 
                                    mutation={M_CREATE_CUSTOMER}
                                    onCompleted={() => this.props.history.push('/')}
                                >
                                    {(createCustomer: any) => (
                                        
                                        <form name="frmNewCustomer"
                                                className="col-md-8 m-3"
                                                onSubmit={e => this.frmNewCustomer_submit(e, createCustomer)}
                                        >
                                            
                                            { this.formFields(this.props, this.state, this.validators) }
    
                                        </form>
                                        
                                    )}
                                </MutationCreateCustomer>
                            </div>
                        )
                    }}
                
                </QueryCustomerValidations>

            </React.Fragment>
        );
    }
    
    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    async frmNewCustomer_submit(e: SyntheticEvent, createCustomer: any): Promise<void | undefined>
    {
        e.preventDefault()
        e.persist()
        
        // Validation Analysis        
        if ( (e.target as HTMLFormElement).checkValidity() )
        {               
            const input = {
                ...this.state.newCustomer
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
    // Private Methods Section
    //-------------------------------------------------------------------------
    private renderValidationsAlert(renderAlert: boolean, submitted: boolean): JSX.Element
    {
        const retVal = (renderAlert && submitted) ? (
            <p className = "alert alert-danger p-3 text-center" >
                Todos los Campos son Necesarios
            </p >   
        ) : ''
        
        return (
            <React.Fragment>
                {retVal}
            </React.Fragment>
        )
    }

    
    //-------------------------------------------------------------------------
    // Private ComponentFragments Section (Controls)
    //-------------------------------------------------------------------------
    // First Name:
    //-------------------------------------------------------------------------
    private firstNameControl(
        props       : ICreateCustomersProps, 
        state       : ICreateCustomersState, 
        validators  : ValidationHelper
    ): JSX.Element
    { 
        return (
            <div className="form-group col-md-6">
                <label>Nombre</label>
                <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    placeholder="Nombre"
                    required={validators.getRequired('first_name')}
                    minLength={validators.getMinLength('first_name')}
                    maxLength={validators.getMaxLength('first_name')}
                    pattern={validators.getRegex('first_name')}
                    onChange={e =>
                    {
                        this.setState({
                            newCustomer: {
                                ...state.newCustomer,
                                first_name: e.target.value
                            }
                        })
                    }}
                />
            </div>
        )
    }
    //-------------------------------------------------------------------------
    // Last Name:
    //-------------------------------------------------------------------------
    private lastnameControl(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
        validators  : ValidationHelper
    ): JSX.Element
    {
        return (
            <div className="form-group col-md-6">
                <label>Apellido</label>
                <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    placeholder="Apellido"
                    required={validators.getRequired('last_name')}
                    minLength={validators.getMinLength('last_name')}
                    maxLength={validators.getMaxLength('last_name')}
                    pattern={validators.getRegex('last_name')}                    
                    onChange={e =>
                    {
                        this.setState({
                            newCustomer: {
                                ...this.state.newCustomer,
                                last_name: e.target.value
                            }
                        });
                    }}
                />
            </div>
        )
    }
    //-------------------------------------------------------------------------
    // Company:
    //-------------------------------------------------------------------------
    private companyControl(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
    validators      : ValidationHelper
    ) : JSX.Element
    {
        return (
            <div className="form-group col-md-6">
                <label>Empresa</label>
                <input
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="Empresa"
                    required={validators.getRequired('company')}
                    minLength={validators.getMinLength('company')}
                    maxLength={validators.getMaxLength('company')}
                    pattern={validators.getRegex('company')}                    
                    onChange={e =>
                    {
                        this.setState({
                            newCustomer: {
                                ...this.state.newCustomer,
                                company: e.target.value
                            }
                        });
                    }}
                />
            </div>
        )
    }
    //-------------------------------------------------------------------------
    // Email:
    //-------------------------------------------------------------------------
    private emailControl(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
        validators  : ValidationHelper
    ): JSX.Element
    {
        return (
            <div className="form-group col-md-6">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required={validators.getRequired('email')}
                    minLength={validators.getMinLength('email')}
                    maxLength={validators.getMaxLength('email')}
                    pattern={validators.getRegex('email')}
                    onChange={e =>
                    {
                        this.setState({
                            newCustomer: {
                                ...this.state.newCustomer,
                                email: e.target.value
                            }
                        });
                    }}
                />
            </div>
        )
    }
    //-------------------------------------------------------------------------
    // Age:
    //-------------------------------------------------------------------------
    private ageControl(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
        validators  : ValidationHelper
    ): JSX.Element
    {
        return (
            <div className="form-group col-md-6">
                <label>Edad</label>
                <input
                    type="number"
                    name="age"
                    className="form-control"
                    placeholder="Edad"
                    required={validators.getRequired('age')}
                    min={validators.getMin('age')}
                    max={validators.getMax('age')}
                    onChange={e =>
                    {
                        this.setState({
                            newCustomer: {
                                ...this.state.newCustomer,
                                age: Number(e.target.value)
                            }
                        });
                    }}
                />
            </div>
        )
    }
    //-------------------------------------------------------------------------
    // CustomerType:
    //-------------------------------------------------------------------------
    private customerTypeControl(
        props       : ICreateCustomersProps,
        state       : ICreateCustomersState,
        validators  : ValidationHelper
    ): JSX.Element
    {
        return (
            <div className="form-group col-md-6">
                <label>Tipo Cliente</label>
                <select className="form-control"
                    required={validators.getRequired('type')}
                    onChange={e =>
                    {
                        this.setState({
                            newCustomer: {
                                ...this.state.newCustomer,
                                type: getEnumFromString(CustomerType, e.target.value)
                            }
                        });
                    }}
                >
                    <option value="">Elegir...</option>
                    <option value="PREMIUM">PREMIUM</option>
                    <option value="BASIC">BASICO</option>
                </select>
            </div>
        )
    }
    //-------------------------------------------------------------------------
    // Submit Button:
    //-------------------------------------------------------------------------
    private submitButtonControl: JSX.Element =
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
    private formFields(props: ICreateCustomersProps, state: ICreateCustomersState, validators: ValidationHelper): JSX.Element
    {
        return (
            <React.Fragment>
                <div className="form-row">
                    {this.firstNameControl(this.props, this.state, this.validators)}
                    {this.lastnameControl(this.props, this.state, this.validators)}
                </div>
                <div className="form-row">
                    {this.companyControl(this.props, this.state, this.validators)}
                    {this.emailControl(this.props, this.state, this.validators)}
                </div>
                <div className="form-row">
                    {this.ageControl(this.props, this.state, this.validators)}
                    {this.customerTypeControl(this.props, this.state, this.validators)}
                </div>
                
                {this.submitButtonControl}
            </React.Fragment>                
        )
    }
}
