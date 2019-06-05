//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { ValidationHelper }     from '../../helpers/validations.helper'
import { ProductInput }        from '../../services/typeDefs/globals/graphql-global-types'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CtrlName }             from './layout/ctrl-name'
import { CtrlPrice }            from './layout/ctrl-price'
import { CtrlStock }            from './layout/ctrl-stock'
import { CtrlSubmit }           from '../Shared/ctrl-submit'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IProductLayoutProps
{
    data?: ProductInput | undefined
    validators: ValidationHelper
    readOnly?: boolean | undefined
}
//-------------------------------------------------------------------------
// Component for Emails:
//-------------------------------------------------------------------------
export const ProductLayout: React.SFC<IProductLayoutProps> =
(props) =>
{

    const product = props.data
    let strPrice: string = '';
    let strStock: string = '';

    if (product)
    {
        strPrice = product.price.toString()
        strStock = product.stock.toString()
    }

    return (
        <React.Fragment>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <CtrlName validators={props.validators}
                        value={
                            (product) ? (product as ProductInput).name : undefined
                        }
                        readOnly={(props.readOnly) ? true : false}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <CtrlPrice validators={props.validators}
                        value={
                            (product) ? strPrice : undefined
                        }
                        readOnly={(props.readOnly) ? true : false}
                    />
                </div>
                <div className="form-group col-md-6">
                    <CtrlStock validators={props.validators}
                        value={
                            (product) ? strStock : undefined
                        }
                        readOnly={(props.readOnly) ? true : false}
                    />
                </div>
            </div>

            {(!props.readOnly) &&
                <CtrlSubmit />
            }

        </React.Fragment>
    )
}