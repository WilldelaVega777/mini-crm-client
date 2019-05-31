//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlTypeProps
{
    validators: ValidationHelper
    value?    : string | undefined
}

//---------------------------------------------------------------------------------
// Component for Type:
//---------------------------------------------------------------------------------
export const CtrlType: React.SFC<ICtrlTypeProps> = 
(props) => {
    return (
        <React.Fragment>
            <div className="form-group pl-1 pr-0">
                <label>Tipo Cliente</label>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text">
                            <i className="fas fa-hand-peace"></i>
                        </label>
                    </div>

                    <select
                        name="type"
                        className="custom-select"
                        required={props.validators.getRequired('type')}
                        defaultValue={props.value}
                    >
                        <option value="">Elegir...</option>
                        <option value="PREMIUM">PREMIUM</option>
                        <option value="BASIC">BASICO</option>
                    </select>
                </div>
            </div>
        </React.Fragment>
    )
}