//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { SyntheticEvent }           from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Apollo & Interfaces)
//---------------------------------------------------------------------------------
import { authenticateVariables as User } 
from '../../services/typeDefs/operations/authenticate'

import { getCurrentLogin_getCurrentLogin }
from '../../services/typeDefs/operations/getCurrentLogin'

import { MutationAuthenticate }     from '../../services/operations/mutations/security/authenticate.mutation'
import { M_AUTHENTICATE }           from '../../services/operations/mutations/security/authenticate.mutation'

//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper }         from '../../helpers/validations.helper'
import { ValidationDescriptor }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { LoginLayout }              from '../../components/security/login-layout'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal from 'sweetalert2'

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Login extends React.Component<ILoginProps, ILoginState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private validators: ValidationHelper
    private user: User
    private timeoutId: number
    private initialState: ILoginState

    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ILoginProps)
    {
        // Calls Super
        super(props)

        // Initialize ProductInput for State
        const user: User = {
            username: '',
            password: ''
        } as User

        // Initial Values for Private Fields
        this.validators = new ValidationHelper()
        this.user = user
        this.timeoutId = 0

        // Initialize State
        this.initialState = {
            loginUser: {
                ...user
            },
            validators: []
        }
        this.state = {
            ...this.initialState
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
        props: ILoginProps,
        state: ILoginState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        return (
            <React.Fragment>

                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Login</h2>

                {/* MAIN COMPONENT LAYOUT  */}
                <div className="row justify-content-center"> 
                    <MutationAuthenticate
                        mutation={M_AUTHENTICATE}
                    >
                    {
                        (authenticate) => 
                        {
                            return (
                                <React.Fragment>
                                    <form name="frmUserLogin"
                                        className="col-md-8 m-3"
                                        onSubmit={e => this.frmUserLogin_submit(e, authenticate)}
                                        onChange={e => this.frmUserLogin_change(e)}
                                    >
                                        <LoginLayout
                                            data={this.state.loginUser}
                                            validators={this.validators}
                                        />
                                    </form>
                                </React.Fragment>
                            )
                        }
                    }
                    </MutationAuthenticate>
                </div>
            </React.Fragment>
        )
    }

    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    frmUserLogin_change(e: SyntheticEvent)
    {
        let { name, value } = (e.target as HTMLFormElement) 

        this.setState({
            loginUser : {
                ...this.state.loginUser,
                [name]: value
            }
        })

    }
    //-------------------------------------------------------------------------
    async frmUserLogin_submit(e: SyntheticEvent, authenticate: any)
        : Promise<void | undefined>
    {
        e.preventDefault()

        // Validation Analysis        
        if ((e.target as HTMLFormElement).checkValidity())
        {
            // Specific Form (Entity) Preparation
            const {username, password} = this.state.loginUser
            try
            {
                const response = await authenticate({
                    variables: { username, password }
                })
                
                const { token } = response.data.authenticate
                
                localStorage.setItem('token', token)

                await this.props.refetch()

                this.setState({
                    ...this.initialState
                })

                setTimeout(() => {
                    this.props.history.push('/dashboard')
                }, 1000)

            }
            catch (error)
            {
                const rawError = error.graphQLErrors[0].message
                const thisError = rawError.substring((rawError.indexOf('"')+1), (rawError.length - 1))                
                Swal.fire(
                    'Error en Login',
                    `Error: ${thisError}`,
                    'error'
                )
            }
        }
    }
}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface ILoginProps
{
    shouldNavigateBack  : boolean
    history             : any
    match               : any
    refetch             : any
    session             : getCurrentLogin_getCurrentLogin
}
//---------------------------------------------------------------------------------
export interface ILoginState
{
    loginUser           : User
    validators          : ValidationDescriptor[]
}