//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                    from 'react'
import { QueryCustomers }       from '../../services/operations/queries/customers.query'
import { Q_GET_CUSTOMERS }      from '../../services/operations/queries/customers.query'
import { Link }                 from 'react-router-dom';
//---------------------------------------------------------------------------------
// Imports Section (Component Interfaces)
//---------------------------------------------------------------------------------
import { ICustomersProps }      from '../../interfaces/react-components/customers.interfaces'
import { ICustomersState }      from '../../interfaces/react-components/customers.interfaces'


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
            <QueryCustomers
                query={Q_GET_CUSTOMERS} 
                variables={{limit: this.props.limit}}
                pollInterval={1000}
            >
                {({loading, error, data, startPolling, stopPolling}) => {
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
                                    data.customers.map( customer => ( 
                                        <li key={ customer.id } className="list-group-item"> 
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                    <span>
                                                        {customer.first_name} {customer.last_name} 
                                                        &nbsp; - &nbsp;
                                                        <i className="text-secondary">
                                                            {customer.company}
                                                        </i>
                                                    </span>
                                                </div>
                                                <div className="col-md4 d-flex justify-content-end">
                                                    <Link to={'/customer/edit/:id'.replace(':id', customer.id)} 
                                                          className="btn btn-success d-block d-md-inline-block mr-3" 
                                                    >
                                                        Editar Cliente
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                </ul>
                            </React.Fragment>
                        )
                    }
                }}
            </QueryCustomers>
        );
    }
}
