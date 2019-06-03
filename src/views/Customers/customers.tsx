//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                    from 'react'
import { getCustomers_customers as Customer }   from '../../services/typeDefs/operations/getCustomers'
import { QueryGetCustomersPaginated }           from '../../services/operations/queries/getCustomersPaginated.query'
import { Q_GET_CUSTOMERS }                      from '../../services/operations/queries/getCustomersPaginated.query'
import { CustomerItem }                         from '../../components/customers/customer-item'
import { Paginator }                            from '../../components/customers/customer-paginator'


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
            <QueryGetCustomersPaginated
                query={Q_GET_CUSTOMERS}
                variables={{ limit: props.limit, offset: state.offset }}
                pollInterval={1000}
            >
                {({ loading, error, data, startPolling, stopPolling }) =>
                {
                    if (loading)
                    {
                        return "Cargando..."
                    }
                    if (error)
                    {
                        return `Error: ${error.message}`
                    }
                    if (data)
                    {
                        // Pass Data to Private Properties
                        this.customers    = data.getCustomers.customers
                        this.totalRecords = data.getCustomers.metadata.totalRecords
                        
                        // Build UI
                        return (
                            <React.Fragment>
                                {/* PAGE TITLE */}
                                <h2 className="text-center mb-3">Lista de Clientes</h2>
                                
                                {/* Customer List */}
                                <ul className="list-group">
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
                                        (newOffset: number, newPage: number, initialRange?: number | undefined) => {
                                            (initialRange) ? 
                                                this.setPageFor(newOffset, newPage, initialRange ) 
                                                : this.setPageFor(newOffset, newPage)
                                        }
                                    }
                                />
                            
                            </React.Fragment>
                        )
                    }
                }}
            </QueryGetCustomersPaginated>
        )
    }
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
export interface ICustomersProps
{
    limit               : number
    initialOffset       : number
}
//---------------------------------------------------------------------------------
export interface ICustomersState
{
    offset              : number
    currentPage         : number
    initialPageInRange  : number
}