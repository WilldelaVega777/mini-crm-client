//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                    from 'react'
import { getCustomers_customers as Customer }   from '../../services/typeDefs/operations/getCustomers'
import { QueryGetCustomers }                    from '../../services/operations/queries/getCustomers.query'
import { Q_GET_CUSTOMERS }                      from '../../services/operations/queries/getCustomers.query'
import { CustomerItem }                         from '../../components/customers/customer-item'
import { CustomerPaginator }                    from '../../components/customers/customer-paginator'


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Customers extends React.Component<ICustomersProps, ICustomersState>
{    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ICustomersProps)
    {
        // Calls Super
        super(props)

        this.state = {
            offset          : 0,
            initialRange    : 1,
            currentPage     : 1,
            totalRecords    : 19
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
            <React.Fragment>
                <style>
                    {css}
                </style>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    private renderLayout(props: ICustomersProps, state: ICustomersState): JSX.Element 
    {
        return (
            <React.Fragment>
                <QueryGetCustomers
                    query={Q_GET_CUSTOMERS}
                    variables={{ limit: props.limit, offset: state.offset }}
                    pollInterval={1000}
                >
                    {({ loading, error, data, startPolling, stopPolling, refetch }) =>
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
                            return (
                                <React.Fragment>
                                    {/* PAGE TITLE */}
                                    <h2 className="text-center mb-3">Lista de Clientes</h2>
                                    
                                    {/* Customer List */}
                                    <ul className="list-group">
                                        {
                                            data.customers.map(customer => (
                                                <CustomerItem customer={(customer as Customer)} key={customer.id} />
                                            ))
                                        }
                                    </ul>
                                    
                                    {/* Pagination */}
                                    <CustomerPaginator 
                                        id="pgtCustomers"
                                        onPagePrev={()=>this.pgtCustomers_prev()}
                                        onPageNext={()=>this.pgtCustomers_next()}
                                        onPageNumber={(page: number)=>this.pgtCustomers_page(page)}
                                        initialRange={state.initialRange}
                                        currentPage={state.currentPage}
                                        totalPages={this.getTotalPages()}
                                    />
                              
                                </React.Fragment>
                            )
                        }
                    }}
                </QueryGetCustomers>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    private getOffset(): number
    {
        return ((this.state.currentPage-1) * this.props.limit)
    }
    //-------------------------------------------------------------------------
    private async setPageFor(offset: number)
    {
        await this.setState({
            offset: offset
        })
    }    
    //-------------------------------------------------------------------------
    private getTotalPages(): number
    {
        return (Math.ceil(this.state.totalRecords/this.props.limit))
    }

    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    private async pgtCustomers_prev()
    {
        if ((this.state.currentPage === this.state.initialRange) && 
            (this.state.currentPage !== 1))
        {
            await this.setState({
                currentPage     : (this.state.currentPage -1),
                initialRange    : (this.state.initialRange -1)
            })
            await this.setPageFor(this.getOffset())        
        }
        else if ((this.state.currentPage !== (this.state.initialRange)) && 
                 (this.state.currentPage !== 1))
        {
            await this.setState({
                currentPage: (this.state.currentPage - 1)
            })
            await this.setPageFor(this.getOffset())
        }
    }
    //-------------------------------------------------------------------------
    private async pgtCustomers_next()
    {
        if ((this.state.currentPage === (this.state.initialRange +2)) && 
            (this.state.currentPage !== this.getTotalPages()))
        {
            await this.setState({
                currentPage: (this.state.currentPage + 1),
                initialRange: (this.state.initialRange + 1)
            })
            await this.setPageFor(this.getOffset())
        }
        else if ((this.state.currentPage !== (this.state.initialRange + 2)) && 
                 (this.state.currentPage !== this.getTotalPages()))
        {
            await this.setState({
                currentPage: (this.state.currentPage + 1)
            })
            await this.setPageFor(this.getOffset())
        }
    }
    //-------------------------------------------------------------------------
    private async pgtCustomers_page(page: number)
    {
        await this.setState({
            currentPage: page
        })
        await this.setPageFor(this.getOffset())
    }
}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface ICustomersProps
{
    limit           : number
    initialOffset   : number
}
//---------------------------------------------------------------------------------
export interface ICustomersState
{
    offset          : number
    initialRange    : number
    currentPage     : number
    totalRecords    : number
}