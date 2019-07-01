//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { Redirect }                 from 'react-router';

import { 
    getUsers_getUsers_users as User 
} from '../../services/typeDefs/operations/getUsers'

import { QueryGetUserById }         from '../../services/operations/queries/users/getUserById.query'
import { Q_GET_USER_BY_ID }         from '../../services/operations/queries/users/getUserById.query'
import { MutationRemoveUser }       from '../../services/operations/mutations/users/remove-user.mutation'
import { M_REMOVE_USER }            from '../../services/operations/mutations/users/remove-user.mutation'
import { UserRole }                 from '../../services/typeDefs/globals/graphql-global-types';

//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper }         from '../../helpers/validations.helper'
import { ValidationDescriptor }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { UserLayout }               from '../../components/users/user-layout'
import { Loading }                  from '../../components/Shared/loading'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal                         from 'sweetalert2'


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class RemoveUser extends
    React.Component<IRemoveUserProps, IRemoveUserState>
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
    constructor(props: IRemoveUserProps)
    {
        // Calls Super
        super(props)

        // Initial Values for Private Fields
        this.validators = new ValidationHelper()
        this.user = {} as User
        this.timeoutId = 0

        // Initialize State
        this.state = {
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
        props: IRemoveUserProps,
        state: IRemoveUserState,
        validators: ValidationHelper
    ): JSX.Element
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params

        return (
            <React.Fragment>
                {/* PAGE TITLE  */}
                <h2 className="text-center">Eliminar Usuario</h2>
                <h4 className="text-center mb-3">Está seguro que desea eliminar este usuario?</h4>

                {/* GET CUSTOMER DATA  */}
                <QueryGetUserById
                    query={Q_GET_USER_BY_ID}
                    variables={{ id: id }}
                >
                    {
                        ({ loading, error, data, refetch }) =>
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

                                <MutationRemoveUser
                                    mutation={M_REMOVE_USER}
                                    onCompleted={() => this.props.history.push('/users')}
                                >
                                    {
                                        removeUser =>
                                        {
                                            return (
                                                <React.Fragment>

                                                    <div className="row justify-content-center">
                                                        <form className="form-expand">
                                                            <UserLayout
                                                                data={this.user}
                                                                validators={this.validators}
                                                                readOnly={true}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger float-right"
                                                                onClick={e => this.confirmRemove(id, removeUser, refetch)}
                                                            >
                                                                ELIMINAR DEFINITIVAMENTE
                                                            </button>
                                                        </form>

                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                    }
                                </MutationRemoveUser>
                            )
                        }
                    }
                </QueryGetUserById>
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
        }
    }
    //-------------------------------------------------------------------------
    private async confirmRemove(input: string, removeUser: any, refetch: any)
    {
        try
        {
            await removeUser({ variables: { input } })
            //await refetch()

            Swal.fire(
                'Eliminar Usuario',
                'El Usuario ha sido eliminado con éxito.',
                'success'
            )
        }
        catch (error)
        {
            Swal.fire(
                'Eliminar Usuario',
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
export interface IRemoveUserProps
{
    shouldNavigateBack  : boolean
    history             : any
    match               : any
    session             : any
}
//---------------------------------------------------------------------------------
export interface IRemoveUserState
{
    validators          : ValidationDescriptor[]
}