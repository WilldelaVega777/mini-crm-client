//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { SyntheticEvent }           from 'react'
import { Redirect }                 from 'react-router';
//---------------------------------------------------------------------------------
// Imports Section (Apollo & Interfaces)
//---------------------------------------------------------------------------------
import { 
    getUsers_getUsers_users as User 
} from '../../services/typeDefs/operations/getUsers'

import { QueryGetUserById }         from '../../services/operations/queries/users/getUserById.query'
import { Q_GET_USER_BY_ID }         from '../../services/operations/queries/users/getUserById.query'
import { MutationUpdateUser }       from '../../services/operations/mutations/users/edit-user.mutation'
import { M_UPDATE_USER }            from '../../services/operations/mutations/users/edit-user.mutation'
import { UserRole }                 from '../../services/typeDefs/globals/graphql-global-types';
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper } from '../../helpers/validations.helper'
import { ValidationDescriptor } from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { UserLayout }               from '../../components/users/user-layout'
import { Loading }                  from '../../components/Shared/loading'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal from 'sweetalert2'


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class EditUser extends
    React.Component<IEditUserProps, IEditUserState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private validators: ValidationHelper
    private user: User
    private timeoutId: number

    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IEditUserProps)
    {
        // Calls Super
        super(props)

        // Initialize ProductInput for State
        const user: User = {} as User

        // Initial Values for Private Fields
        this.validators = new ValidationHelper()
        this.user = user
        this.timeoutId = 0

        // Initialize State
        this.state = {
            editUser: {
                ...user
            },
            confirmPassword : '',
            validators      : []
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
        props: IEditUserProps,
        state: IEditUserState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params

        return (
            <React.Fragment>

                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Editar Usuario</h2>

                {/* MAIN COMPONENT LAYOUT  */}
                <div className="row justify-content-center">

                    {/* GET CUSTOMER DATA  */}
                    <QueryGetUserById
                        query={Q_GET_USER_BY_ID}
                        variables={{ id: id }}
                    >
                        {({ loading, error, data, refetch }) =>
                        {
                            if (loading)
                            {
                                return (
                                    <Loading />
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
                            if (data && data.getUser)
                            {
                                this.setUser(id, data.getUser as User)
                            }
                            return (
                                <React.Fragment>

                                    {/* DEFINE DATA MUTATION / MUTATION UI  */}
                                    <MutationUpdateUser
                                        mutation={M_UPDATE_USER}
                                        onCompleted={() => this.props.history.push('/users')}
                                    >
                                        {
                                            (updateProduct) =>
                                            {
                                                return (

                                                    <form name="frmEditUser"
                                                        className="col-md-8 m-3"
                                                        onSubmit={e => this.frmEditUser_submit(e, updateProduct, refetch)}
                                                        onChange={e => this.frmEditUser_change(e)}
                                                    >

                                                        <UserLayout
                                                            data={this.user}
                                                            validators={validators}
                                                            editMode={true}
                                                        />

                                                    </form>

                                                )
                                            }
                                        }
                                    </MutationUpdateUser>

                                </React.Fragment>
                            )
                        }}
                    </QueryGetUserById>
                </div>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    private setUser(id: string, ci: User)
    {
        if (!this.user.id)
        {
            this.user = ci
            this.user.id = id
            this.timeoutId = window.setTimeout(() =>
            {
                this.setState({
                    editUser: this.user
                })
                window.clearTimeout(this.timeoutId)
            }, 0)
        }
    }

    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    frmEditUser_change(e: SyntheticEvent)
    {
        let { name, value } = (e.target as HTMLFormElement)

        // Debug:
        //const message = `Campo: ${name}, Valor: ${value}`
        //console.log(message);

        if (name !== 'confirm-password')
        {
            this.setState({
                editUser: {
                    ...this.state.editUser,
                    [name]: value
                }
            })
        }
        else
        {
            this.setState({
                confirmPassword: value
            })
        }
    }
    //-------------------------------------------------------------------------
    async frmEditUser_submit(e: SyntheticEvent, updateUser: any, refetch: any)
        : Promise<void | undefined>
    {
        e.preventDefault()
        e.persist()

        // Validation Analysis        
        if ((e.target as HTMLFormElement).checkValidity())
        {
            // Validates confirmPassword
            if (this.state.confirmPassword !== this.state.editUser.password)
            {
                Swal.fire(
                    'Actualizar Usuario',
                    'La contraseña no coincide, por favor reintente',
                    'warning'
                )
                return
            }

            // Specific Form (Entity) Preparation
            const input = {
                ...this.state.editUser
            }

            try
            {
                await updateUser({
                    variables: { input }
                })

                await refetch()

                Swal.fire(
                    'Actualizar Usuario',
                    'El Usuario ha sido actualizado con éxito.',
                    'success'
                )
            }
            catch (error)
            {
                Swal.fire(
                    'Actualizar Usuario',
                    `Error: ${error.message}`,
                    'error'
                )
                console.error(error)
            }

        }
    }
}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface IEditUserProps
{
    shouldNavigateBack  : boolean
    history             : any
    match               : any
    session             : any
}
//---------------------------------------------------------------------------------
export interface IEditUserState
{
    editUser            : User
    confirmPassword     : string
    validators          : ValidationDescriptor[]
}