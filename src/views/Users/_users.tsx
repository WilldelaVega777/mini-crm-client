//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                    from 'react'
import { Link }                                 from 'react-router-dom'
import { Redirect }                             from 'react-router-dom'

import { getUsers_getUsers_users as User }      from '../../services/typeDefs/operations/getUsers'
import { QueryGetUsersPaginated }               from '../../services/operations/queries/users/getUsersPaginated.query'
import { Q_GET_USERS }                          from '../../services/operations/queries/users/getUsersPaginated.query'
import { UserRole }                             from '../../services/typeDefs/globals/graphql-global-types';

import { UserItem }                             from '../../components/users/user-item'
import { Paginator }                            from '../../components/Shared/paginator'
import { Loading }                              from '../../components/Shared/loading'
import Swal                                     from 'sweetalert2'

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Users extends React.Component<IUsersProps, IUsersState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private users: User[]
    private totalRecords: number

    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IUsersProps)
    {
        // Calls Super
        super(props)

        // Initialize Private Fields
        this.users = []
        this.totalRecords = 0

        // Initialize State
        this.state = {
            offset: 0,
            initialPageInRange: 1,
            currentPage: 1,
            users: [],
            totalRecords: 0
        }
    }

    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {
        const role = this.props.session.role;
        const securityValidation = (role !== UserRole.ADMINISTRATOR) ? <Redirect to="/customers"/> : ''

        return (

            <React.Fragment>

                {securityValidation}

                <div className="customers_container">

                    {/* Apply CSS  */}
                    {this.getCSS()}

                    {/* Loads State with Query Data  */}
                    {this.renderLayout(this.props, this.state)}

                </div>

            </React.Fragment>

        );
    }

    //-------------------------------------------------------------------------
    // Private Methods Section (UI)
    //-------------------------------------------------------------------------
    private getCSS(): JSX.Element
    {
        const css = `
            .rise-little 
            {
                margin-top: 7px !important;        
            }
        `

        return (
            <style>
                {css}
            </style>
        )
    }
    //-------------------------------------------------------------------------
    private renderLayout(props: IUsersProps, state: IUsersState)
        : JSX.Element 
    {
        return (
            <React.Fragment>
                <div className="animated fadeIn">
                    <QueryGetUsersPaginated
                        query={Q_GET_USERS}
                        variables={{ limit: props.limit, offset: this.state.offset }}
                        pollInterval={1000}
                    >
                        {({ loading, error, data, startPolling, stopPolling, refetch }) =>
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
                                    `Cargando Datos: Parameters empepitation aborting..`,
                                    'error'
                                )
                                return ''
                            }
                            if (data)
                            {
                                // Pass Data to Private Properties
                                this.totalRecords = data.getUsers.metadata.totalRecords
                                this.users = data.getUsers.users

                                // Don't Build UI Here, stateful components will break when 
                                // Query returns load or error UI.
                                return (
                                    <React.Fragment>

                                        {/* PAGE TITLE */}
                                        {this.getPageTitle()}

                                        {/* Customer List */}
                                        <table className="table subtle-shadow">
                                            <thead>
                                                <tr className="table-primary">
                                                    <th className="text-center col-2" style={{ width: 'auto', maxWidth: '120px' }}>Usuario</th>
                                                    <th className="text-center col-3" style={{ width: 'auto' }}>Nombre</th>
                                                    <th className="text-center col-3" style={{ width: 'auto' }}>Apellido</th>
                                                    <th className="text-center col-2" style={{ width: 'auto' }}>Rol</th>
                                                    <th className="text-center col-2" style={{ width: 'auto' }} colSpan={2}>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.users.map(user => (
                                                    <UserItem user={(user as User)} key={user.id} />
                                                ))
                                            }
                                            </tbody>
                                        </table>


                                        {/* Pagination */}
                                        <Paginator
                                            maxRangeSize={3}
                                            pageSize={this.props.limit}
                                            totalRecords={this.totalRecords}
                                            currentPage={this.state.currentPage}
                                            initialPageInRange={this.state.initialPageInRange}
                                            onPageChange={
                                                (newOffset: number, newPage: number, initialRange?: number | undefined) =>
                                                {
                                                    (initialRange) ?
                                                        this.setPageFor(newOffset, newPage, initialRange)
                                                        : this.setPageFor(newOffset, newPage)
                                                }
                                            }
                                        />

                                    </React.Fragment>
                                )
                            }
                        }}
                    </QueryGetUsersPaginated>
                </div>

            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    private getPageTitle(): JSX.Element
    {
        return (
            <div className="row">
                <div className="col col-md-8 d-flex justify-content-end">
                    <h2 className="text-center mb-3">Lista de Usuarios</h2>
                </div>
                <div className="col col-md-4 d-flex justify-content-end">
                    <Link to="/user/create" className="btn btn-success my-auto mr-3 rise-little">
                        Nuevo Usuario
                    </Link>
                </div>
            </div>
        )
    }

    //-------------------------------------------------------------------------
    // Private Methods Section (Utility)
    //-------------------------------------------------------------------------
    private setPageFor(offset: number, page: number, initialRange?: number | undefined)
    {
        if (initialRange)
        {
            this.setState({
                offset: offset,
                currentPage: page,
                initialPageInRange: initialRange,
                totalRecords: this.totalRecords
            })
        }
        else
        {
            this.setState({
                offset: offset,
                currentPage: page,
                totalRecords: this.totalRecords
            })
        }
    }
}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface IUsersProps
{
    limit               : number
    initialOffset       : number
    session             : any
}
//---------------------------------------------------------------------------------
export interface IUsersState
{
    offset              : number
    currentPage         : number
    initialPageInRange  : number
    users               : User[]
    totalRecords        : number
}