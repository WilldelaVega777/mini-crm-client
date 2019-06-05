//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlPriceProps
{
    validators  : ValidationHelper
    value?      : string | undefined
    readOnly    : boolean
}
//---------------------------------------------------------------------------------
// Component for Price:
//---------------------------------------------------------------------------------
export const CtrlPrice: React.SFC<ICtrlPriceProps> =
    (props) =>
    {
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Precio</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-comment-dollar"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder="Precio"
                            required={props.validators.getRequired('price')}
                            min={props.validators.getMin('price')}
                            max={props.validators.getMax('price')}
                            defaultValue={props.value}
                            readOnly={props.readOnly}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }