//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlAgeProps
{
    validators      : ValidationHelper
    value?          : string | undefined
    readOnly        : boolean
}
//---------------------------------------------------------------------------------
// Component for Age:
//---------------------------------------------------------------------------------
export const CtrlAge: React.SFC<ICtrlAgeProps>  = 
(props) => {
    return (
        <React.Fragment>
            <div className="form-group pl-1 pr-0">
                <label>Edad</label>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fas fa-birthday-cake"></i>
                        </span>
                    </div>
                    <input
                        type="number"
                        name="age"
                        className="form-control"
                        placeholder="Edad"
                        required={props.validators.getRequired('age')}
                        min={props.validators.getMin('age')}
                        max={props.validators.getMax('age')}
                        defaultValue={props.value}
                        readOnly={props.readOnly}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}