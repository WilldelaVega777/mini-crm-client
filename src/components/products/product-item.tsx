//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React            from 'react'
import { Link }         from 'react-router-dom';

//---------------------------------------------------------------------------------
// Imports (Model)
//---------------------------------------------------------------------------------
import { 
    getProductsPaginated_getProducts_products as Product 
} 
from '../../services/typeDefs/operations/getProductsPaginated'

//---------------------------------------------------------------------------------
// Imports (External Components)
//---------------------------------------------------------------------------------
import * as CurrencyFormat                  from 'react-currency-format';

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
        let cssClass: string = 'success';
        if (props.product.stock > (props.product.reorder * 1.40))
        {
            cssClass = 'bg-paradise-green'
        }
        else if ((props.product.stock > props.product.reorder) && (props.product.stock < props.product.reorder * 1.39))
        {
            cssClass = 'bg-flat-flesh'
        }
        else if ((props.product.stock <= props.product.reorder) && (props.product.stock > 0))
        {
            cssClass = 'bg-pink-glamour'
        }
        else if (props.product.stock === 0)
        {
            cssClass = 'bg-jalapeno-red text-light'
        }
        else if (props.product.stock < 0)
        {
            cssClass = 'bg-primary text-light'
        }        
        
        return (
            <tr className={`${cssClass} animated fadeIn`}>
                <td>
                    {props.product.name}
                </td>
                
                <td className="align-right">
                    <CurrencyFormat 
                        value={(props.product.price).toFixed(2)} 
                        thousandSeparator={true} 
                        prefix={'$'} 
                        displayType={'text'} 
                    />
                </td>

                <td className="text-center">
                    {props.product.reorder.toString()}
                </td>

                <td className="text-center">
                    {(props.product.projected_stock as number).toString()}
                </td>
                
                <td className="text-center">
                    {props.product.stock.toString()}
                </td>

                <td className="align-right pl-1">
                    <Link to={'/product/entry/:id'.replace(':id', props.product.id)}
                        className="btn btn-primary d-md-inline-block mr-1"
                    >
                        <i className="fab fa-dropbox"></i>
                    </Link>
                </td>
                
                <td className="align-right pl-1">
                    <Link to={'/product/edit/:id'.replace(':id', props.product.id)}
                        className="btn btn-info d-md-inline-block mr-1"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                </td>
                
                <td className="align-right pl-1">
                    <Link to={'/product/remove/:id'.replace(':id', props.product.id)}
                        className="btn btn-danger d-md-inline-block mr-1"
                    >
                        <i className="far fa-trash-alt"></i>
                    </Link>
                </td>
                
            </tr>                        
        )
    }