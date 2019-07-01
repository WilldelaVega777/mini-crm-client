//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlTypeProps
{
    validators      : ValidationHelper
    value?          : string | undefined
    readOnly        : boolean
    hideLabels?     : boolean | undefined
}

//---------------------------------------------------------------------------------
// Component for Role:
//---------------------------------------------------------------------------------
export const CtrlRole: React.SFC<ICtrlTypeProps> = 
(props) => {
    return (
        <React.Fragment>
            <div className="form-group pl-1 pr-0">
                {
                    (props.hideLabels)
                    ? ''
                    : <label>Rol</label>
                }
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text">
                            <i className="fas fa-user-tag"></i>
                        </label>
                    </div>

                    <select
                        name="role"
                        className="custom-select"
                        required={props.validators.getRequired('role')}
                        defaultValue={props.value}
                        disabled={props.readOnly}
                    >
                        <option value="">Elegir...</option>
                        <option value="SALESMAN">VENDEDOR</option>
                        <option value="ADMINISTRATOR">ADMINISTRADOR</option>
                    </select>
                </div>
            </div>
        </React.Fragment>
    )
}