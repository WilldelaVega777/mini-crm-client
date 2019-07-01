//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                                    from 'react'
import { Link }                                 from 'react-router-dom';

import { getCustomersPaginated_getCustomers_customers as CustomerPaginated }   
    from '../../services/typeDefs/operations/getCustomersPaginated'

    import { UserRole } 
    from '../../services/typeDefs/globals/graphql-global-types';



//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICustomerItemProps
{
    customer        : CustomerPaginated
    session         : any
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CustomerItem: React.SFC<ICustomerItemProps> =
(props) =>
{
    const { role } = props.session

    return (

        <li key={props.customer.id} className="list-group-item">
            <div className="row justify-content-between align-items-center">
                <div className="col-md-4 d-flex justify-content-between align-items-center">
                    <span>
                        {props.customer.first_name} {props.customer.last_name}
                        &nbsp; - &nbsp;
                        <i className="text-secondary">
                            {props.customer.company}
                        </i>
                    </span>
                </div>
                <div className="col-md-8 d-flex justify-content-end">
                    { (role === UserRole.SALESMAN) &&
                        <React.Fragment>
                            <Link to={'/orders/:id'.replace(':id', props.customer.id)}
                                className="btn btn-warning d-md-inline-block mr-3"
                            >
                                <i className="fas fa-eye"></i>
                            </Link>
                            <Link to={'/order/create/:id'.replace(':id', props.customer.id)}
                                className="btn btn-primary d-md-inline-block mr-3"
                            >
                                <i className="far fa-clipboard"></i>
                            </Link>
                        </React.Fragment>
                    }
                    <Link to={'/customer/edit/:id'.replace(':id', props.customer.id)}
                        className="btn btn-info d-md-inline-block mr-3"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                    <Link to={'/customer/remove/:id'.replace(':id', props.customer.id)}
                        className="btn btn-danger d-md-inline-block"
                    >
                        <i className="far fa-trash-alt"></i>
                    </Link>
                </div>
            </div>
        </li>

    )
}