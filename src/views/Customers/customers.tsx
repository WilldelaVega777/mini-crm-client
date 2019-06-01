//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                from 'react'
import { customers_customers as Customer }  from '../../services/typeDefs/operations/customers'
import { QueryCustomers }                   from '../../services/operations/queries/customers.query'
import { Q_GET_CUSTOMERS }                  from '../../services/operations/queries/customers.query'
import { CustomerItem }                     from '../../components/customers/customer-item'


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
                {this.renderLayout(this.props)}
                
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
    private renderLayout(props: ICustomersProps): JSX.Element 
    {
        return (
            <React.Fragment>
                <QueryCustomers
                    query={Q_GET_CUSTOMERS}
                    variables={{ limit: props.limit }}
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
                            return (
                                <React.Fragment>
                                    <h2 className="text-center mb-3">Lista de Clientes</h2>
                                    <ul className="list-group">
                                        {
                                            data.customers.map(customer => (
                                                <CustomerItem customer={(customer as Customer)} key={customer.id} />
                                            ))
                                        }
                                    </ul>
                                </React.Fragment>
                            )
                        }
                    }}
                </QueryCustomers>
            </React.Fragment>
        )
    }    
}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface ICustomersProps
{
    limit: number
}
//---------------------------------------------------------------------------------
export interface ICustomersState
{

}