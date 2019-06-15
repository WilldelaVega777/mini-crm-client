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
        else if (((props.product.stock > props.product.reorder) && (props.product.stock < props.product.reorder * 1.39)))
        {
            cssClass = 'bg-golden-sand'
        }
        else if ((((props.product.stock >= props.product.reorder))))
        {
            cssClass = 'bg-mandarin-red'
        }

        return (
            <tr className={cssClass}>
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
                    {props.product.stock.toString()}
                </td>
                
                <td className="text-right pl-4">
                    <Link to={'/product/edit/:id'.replace(':id', props.product.id)}
                        className="btn btn-primary btn-block d-md-inline-block mr-3"
                    >
                        Editar
                    </Link>
                </td>
                
                <td className="align-right pl-2">
                    <Link to={'/product/remove/:id'.replace(':id', props.product.id)}
                        className="btn btn-danger btn-block d-md-inline-block mr-3"
                    >
                        Eliminar
                    </Link>
                </td>
                
            </tr>                        
        )
    }