//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlReorderProps
{
    validators  : ValidationHelper
    value?      : string | undefined
    readOnly    : boolean
}
//---------------------------------------------------------------------------------
// Component for Age:
//---------------------------------------------------------------------------------
export const CtrlReorder: React.SFC<ICtrlReorderProps> =
    (props) =>
    {
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Punto de Reorden</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-bullhorn"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            name="stock"
                            className="form-control"
                            placeholder="Reorden"
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