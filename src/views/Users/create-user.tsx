//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                    from 'react'
import { SyntheticEvent }       from 'react'
import { Redirect }             from 'react-router';
//---------------------------------------------------------------------------------
// Imports Section (Apollo Types/Interfaces)
//---------------------------------------------------------------------------------
import { UserInput }                from '../../services/typeDefs/globals/graphql-global-types'
import { UserRole }                 from '../../services/typeDefs/globals/graphql-global-types'
import { MutationCreateUser }       from '../../services/operations/mutations/users/create-user.mutation'
import { M_CREATE_USER }            from '../../services/operations/mutations/users/create-user.mutation'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper }         from '../../helpers/validations.helper'
import { ValidationDescriptor }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { UserLayout }               from '../../components/users/user-layout'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal                         from 'sweetalert2';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class CreateUser extends
    React.Component<ICreateUsersProps, ICreateUsersState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private validators: ValidationHelper;

    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ICreateUsersProps)
    {
        // Calls Super
        super(props)

        // Initialize CustomerInput for State
        const user: UserInput = {} as UserInput

        // Initial Values for Private Fields
        this.validators = new ValidationHelper();

        // Initialize State
        this.state = {
            newUser: {
                ...user
            },
            confirmPassword: '',
            validators: []
        }
    }

    //-------------------------------------------------------------------------
    // Lifecycle Eventhandler Methods
    //-------------------------------------------------------------------------
    async componentWillMount()
    {
        await this.validators.setValidators('User')
        this.setState({
            validators: this.validators.getValidators()
        })
    }

    //-------------------------------------------------------------------------
    // RENDER Method
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {
        const role = this.props.session.role;
        const securityValidation = (role !== UserRole.ADMINISTRATOR) ? <Redirect to="/customers" /> : ''

        // Return Form
        return (
            <React.Fragment>

                {securityValidation}

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
        props: ICreateUsersProps,
        state: ICreateUsersState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        return (
            <React.Fragment>
                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Agregar Nuevo Usuario</h2>

                {/* MAIN COMPONENT LAYOUT  */}
                <div className="row justify-content-center">

                    {/* DEFINE DATA MUTATION / MUTATION UI  */}
                    <MutationCreateUser
                        mutation={M_CREATE_USER}
                        onCompleted={() => this.props.history.push('/users')}
                    >
                        {(createUser: any) =>
                        {
                            return (

                                <form name="frmNewUser"
                                    className="col-md-8 m-3"
                                    onSubmit={e => this.frmNewUser_submit(e, createUser)}
                                    onChange={e => this.frmNewUser_change(e)}
                                >

                                    <UserLayout
                                        validators={this.validators}
                                    />

                                </form>
                            )
                        }}
                    </MutationCreateUser>
                </div>
            </React.Fragment>
        )
    }


    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    frmNewUser_change(e: SyntheticEvent)
    {
        let { name, value } = (e.target as HTMLFormElement)

        // Debug:
        //const message = `Campo: ${name}, Valor: ${value}`
        //console.log(message);

        if (name !== 'confirm-password')
        {
            this.setState({
                newUser: {
                    ...this.state.newUser,
                    [name]: value
                }
            })
        }
        else
        {
            this.setState({
                confirmPassword : value
            })
        }
    }
    //-------------------------------------------------------------------------
    async frmNewUser_submit(e: SyntheticEvent, createUser: any): Promise<void | undefined>
    {
        e.preventDefault()
        e.persist()

        // Validation Analysis        
        if ((e.target as HTMLFormElement).checkValidity())
        {
            // Validation for Confirm Password
            if (this.state.confirmPassword !== this.state.newUser.password)
            {
                Swal.fire(
                    'Crear Nuevo Usuario',
                    'Las contraseñas no coinciden, por favor reintenta.',
                    'warning'
                )

                return
            }

            // Specific Form (Entity) Preparation
            const input = {
                ...this.state.newUser
            }

            try
            {
                await createUser({
                    variables: { input }
                })

                Swal.fire(
                    'Crear Nuevo Usuario',
                    'El Nuevo Usuario ha sido guardado con éxito.',
                    'success'
                )
            }
            catch (error)
            {
                Swal.fire(
                    'Crear Nuevo Usuario',
                    `Error: ${error.message}`,
                    'error'
                )
                console.error(error)
            }

            await (e.target as HTMLFormElement).reset()
        }
    }
}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
interface ICreateUsersProps
{
    shouldNavigateBack  : boolean
    history             : any
    session             : any
}
//---------------------------------------------------------------------------------
interface ICreateUsersState
{
    newUser             : UserInput
    confirmPassword     : string
    validators          : ValidationDescriptor[]
}