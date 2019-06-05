//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlStockProps
{
    validators  : ValidationHelper
    value?      : string | undefined
    readOnly    : boolean
}
//---------------------------------------------------------------------------------
// Component for Age:
//---------------------------------------------------------------------------------
export const CtrlStock: React.SFC<ICtrlStockProps> =
    (props) =>
    {
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>En existencia</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-balance-scale"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            name="stock"
                            className="form-control"
                            placeholder="En existencia"
                            required={props.validators.getRequired('stock')}
                            min={props.validators.getMin('stock')}
                            max={props.validators.getMax('stock')}
                            defaultValue={props.value}
                            readOnly={props.readOnly}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }