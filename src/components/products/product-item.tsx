//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React            from 'react'
import { Link }         from 'react-router-dom';

import { getProductsPaginated_getProducts_products as Product } 
                        from '../../services/typeDefs/operations/getProductsPaginated'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IProductItemProps
{
    product: Product
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const ProductItem: React.SFC<IProductItemProps> =
    (props) =>
    {
        return (

            <li key={props.product.id} className="list-group-item">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                        <span>
                            {props.product.name} - In Stock: {props.product.stock.toString()}
                            &nbsp; - &nbsp;
                        <i className="text-secondary">
                                Price: ${props.product.price}
                            </i>
                        </span>
                    </div>
                    <div className="col-md4 d-flex justify-content-end">
                        <Link to={'/product/remove/:id'.replace(':id', props.product.id)}
                            className="btn btn-danger d-block d-md-inline-block mr-3"
                        >
                            &times; Eliminar Producto
                    </Link>
                        <Link to={'/product/edit/:id'.replace(':id', props.product.id)}
                            className="btn btn-primary d-block d-md-inline-block mr-3"
                        >
                            Editar Producto
                        </Link>
                    </div>
                </div>
            </li>

        )
    }