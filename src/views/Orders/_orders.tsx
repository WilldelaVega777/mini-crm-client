//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                    from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Main Type)
//---------------------------------------------------------------------------------
import { getOrdersByCustomer_getOrdersByCustomer_orders as Order }   
from '../../services/typeDefs/operations/getOrdersByCustomer'
//---------------------------------------------------------------------------------
// Imports Section (Apollo Types)
//---------------------------------------------------------------------------------
import { QueryGetOrdersByCustomer }             from '../../services/operations/queries/orders/getOrdersByCustomer.query'
import { Q_GET_ORDERS_BY_CUSTOMER }             from '../../services/operations/queries/orders/getOrdersByCustomer.query'
import { OrderCard }                            from '../../components/orders/card/order-card'
//---------------------------------------------------------------------------------
// Imports Section (Components)
//---------------------------------------------------------------------------------
import { Paginator }                            from '../../components/Shared/paginator'
import { Link }                                 from 'react-router-dom'
import { Loading }                              from '../../components/Shared/loading'
import Swal                                     from 'sweetalert2'

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Orders extends React.Component<IOrdersProps, IOrdersState>
{   
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private orders          : Order[]
    private totalRecords    : number
    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IOrdersProps)
    {
        // Calls Super
        super(props)
        
        // Initialize Private Fields
        this.orders         = []
        this.totalRecords   = 0
        
        // Initialize State
        this.state = {
            offset              : 0,
            initialPageInRange  : 1,
            currentPage         : 1
        }
    }
    
    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {   
        return (
            <React.Fragment>

                {/* Apply CSS  */}
                {this.getCSS()}
                
                {/* Create Layout  */}
                {this.renderLayout(this.props, this.state)}
                
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
    private renderLayout(props: IOrdersProps, state: IOrdersState)
    : JSX.Element 
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params
                
        return (
            <React.Fragment>
                <QueryGetOrdersByCustomer
                    query={Q_GET_ORDERS_BY_CUSTOMER}
                    variables={{ limit: props.limit, offset: this.state.offset, id: id }}
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
                            //${error.message}`
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
                            this.orders       = data.getOrdersByCustomer.orders
                            this.totalRecords = data.getOrdersByCustomer.metadata.totalRecords
                            
                            // Build UI
                            return (
                                <React.Fragment>
                                    
                                    {/* PAGE TITLE */}
                                    {this.getPageTitle()}
                                    
                                    {/* Customer List */}
                                    <div className="row">
                                    {
                                        this.orders.map(order => (
                                            <OrderCard order={(order as Order)} key={order.id} session={this.props.session}/>
                                        ))
                                    }
                                    </div>

                                    
                                    {/* Pagination */}
                                    <Paginator
                                        maxRangeSize={3}
                                        pageSize={this.props.limit}
                                        totalRecords={this.totalRecords}
                                        currentPage={this.state.currentPage}
                                        initialPageInRange={this.state.initialPageInRange}
                                        onPageChange={
                                            (newOffset: number, newPage: number, initialRange?: number | undefined) => {
                                                (initialRange) ? 
                                                    this.setPageFor(newOffset, newPage, initialRange ) 
                                                    : this.setPageFor(newOffset, newPage)
                                            }
                                        }
                                    />
                                    
                                    <br/>
                                    <br/>
                                    
                                </React.Fragment>
                            )
                        }
                    }}
                </QueryGetOrdersByCustomer>
                
                
            </React.Fragment>
        )
    }    
    //-------------------------------------------------------------------------
    private getPageTitle(): JSX.Element
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params
                
        return (
            <div className="row mb-3">
                <div className="col col-md-8 d-flex justify-content-end">
                    <h2 className="text-center mb-3">Lista de Pedidos</h2>
                </div>
                <div className="col col-md-4 d-flex justify-content-end">
                    <div>
                        <Link to={'/order/create/:id'.replace(':id', id)}
                            className="btn btn-info d-block d-md-inline-block mr-3"
                        >
                            Agregar Orden
                        </Link>                        
                    </div>
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
                initialPageInRange  : initialRange
            })  
        }
        else
        {
            this.setState({
                offset              : offset,
                currentPage         : page
            })            
        }
    }
 
}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface IOrdersProps
{
    limit               : number
    initialOffset       : number
    shouldNavigateBack  : boolean
    history             : any
    match               : any
    session             : any
}
//---------------------------------------------------------------------------------
export interface IOrdersState
{
    offset              : number
    currentPage         : number
    initialPageInRange  : number
}