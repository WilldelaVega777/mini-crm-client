//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                                    from 'react'
import { Link }                                 from 'react-router-dom';
import { getCustomers_customers as Customer }   from '../../services/typeDefs/operations/getCustomers'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICustomerItemProps
{
    customer        : Customer
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CustomerItem: React.SFC<ICustomerItemProps> =
(props) =>
{
    return (

        <li key={props.customer.id} className="list-group-item">
            <div className="row justify-content-between align-items-center">
                <div className="col-md-6 d-flex justify-content-between align-items-center">
                    <span>
                        {props.customer.first_name} {props.customer.last_name}
                        &nbsp; - &nbsp;
                        <i className="text-secondary">
                            {props.customer.company}
                        </i>
                    </span>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <Link to={'/order/create/:id'.replace(':id', props.customer.id)}
                        className="btn btn-warning d-block d-md-inline-block mr-3"
                    >
                        Agregar Orden
                    </Link>
                    <Link to={'/customer/edit/:id'.replace(':id', props.customer.id)}
                        className="btn btn-primary d-block d-md-inline-block mr-3"
                    >
                        Editar Cliente
                    </Link>
                    <Link to={'/customer/remove/:id'.replace(':id', props.customer.id)}
                        className="btn btn-danger d-block d-md-inline-block"
                    >
                        Eliminar Cliente
                    </Link>
                </div>
            </div>
        </li>

    )
}