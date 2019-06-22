//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                    from 'react'
import { getCustomers_customers as Customer }   from '../../services/typeDefs/operations/getCustomers'
import { QueryGetCustomersPaginated }           from '../../services/operations/queries/customers/getCustomersPaginated.query'
import { Q_GET_CUSTOMERS }                      from '../../services/operations/queries/customers/getCustomersPaginated.query'
import { CustomerItem }                         from '../../components/customers/customer-item'
import { Paginator }                            from '../../components/Shared/paginator'
import { Link }                                 from 'react-router-dom'
import { Loading }                              from '../../components/Shared/loading'
import Swal                                     from 'sweetalert2'

import { gql, ApolloClient } from "apollo-boost";

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Customers extends React.Component<ICustomersProps, ICustomersState>
{   
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private customers       : Customer[]
    private totalRecords    : number
    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ICustomersProps)
    {
        // Calls Super
        super(props)
        
        // Initialize Private Fields
        this.customers      = []
        this.totalRecords   = 0
        
        // Initialize State
        this.state = {
            offset              : 0,
            initialPageInRange  : 1,
            currentPage         : 1,
            customers           : [],
            totalRecords        : 0
        }
    }

    //-------------------------------------------------------------------------
    // Component Lifecycle Eventhandlers
    //-------------------------------------------------------------------------
    async componentDidMount()
    {
        try
        {
            const result = await this.props.client
                .query({
                    query: gql`
                        {
                            getCustomers(limit: 10, offset: 0) {
                                customers {
                                    first_name
                                    last_name
                                }
                            }
                        }
                    `
                }
            )
            console.log(result.data.getCustomers.customers)
        }
        catch (error)
        {
            console.error(error)
        }
    }

    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {   
        return (
            <div className="customers_container">

                {/* Apply CSS  */}
                {this.getCSS()}

                {/* Loads State with Query Data  */}
                {this.renderLayout(this.props, this.state)}
 
            </div>
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
    private renderLayout(props: ICustomersProps, state: ICustomersState)
    : JSX.Element 
    {
        return (
            <React.Fragment>
                <div className="animated fadeIn">
                    <QueryGetCustomersPaginated
                        query={Q_GET_CUSTOMERS}
                        variables={{ limit: props.limit, offset: this.state.offset }}
                        pollInterval={1000}
                    >
                        {({ loading, error, data, startPolling, stopPolling, refetch }) =>
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
                                    `Cargando Datos: Parameters empepitation aborting..`,
                                    'error'
                                )
                                return ''
                            }
                            if (data)
                            {
                                // Pass Data to Private Properties
                                this.totalRecords = data.getCustomers.metadata.totalRecords
                                this.customers    = data.getCustomers.customers
                                
                                // Don't Build UI Here, stateful components will break when 
                                // Query returns load or error UI.
                                return (
                                    <React.Fragment>

                                        {/* PAGE TITLE */ }
                                        { this.getPageTitle() }

                                        {/* Customer List */ }
                                        <ul className="list-group subtle-shadow">
                                            {
                                                this.customers.map(customer => (
                                                    <CustomerItem customer={(customer as Customer)} key={customer.id} />
                                                ))
                                            }
                                        </ul>


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
                    </QueryGetCustomersPaginated>
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
                    <h2 className="text-center mb-3">Lista de Clientes</h2>
                </div>
                <div className="col col-md-4 d-flex justify-content-end">
                    <Link to="/customer/create" className="btn btn-success my-auto mr-3 rise-little">
                        Nuevo Cliente
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
                offset              : offset,
                currentPage         : page,
                initialPageInRange  : initialRange,
                totalRecords        : this.totalRecords
            })  
        }
        else
        {
            this.setState({
                offset              : offset,
                currentPage         : page,
                totalRecords        : this.totalRecords
            })
        }
    }
}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface ICustomersProps
{
    limit               : number
    initialOffset       : number
    client              : ApolloClient<{}>
}
//---------------------------------------------------------------------------------
export interface ICustomersState
{
    offset              : number
    currentPage         : number
    initialPageInRange  : number
    customers           : Customer[]
    totalRecords        : number
}