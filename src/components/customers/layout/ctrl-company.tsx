//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlCompanyProps
{
    validators      : ValidationHelper
    value?          : string | undefined
    readOnly        : boolean
    hideLabels?     : boolean | undefined
}
//--------------------------------------------------------------------------------
// Component for Company:
//--------------------------------------------------------------------------------
export const CtrlCompany: React.SFC<ICtrlCompanyProps> = 
(props) => {
    return (
        <React.Fragment>
            <div className="form-group pl-1 pr-0">
                {
                    (props.hideLabels)
                    ? ''
                    : <label>Empresa</label>
                }
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="company"
                        className="form-control"
                        placeholder="Empresa"
                        required={props.validators.getRequired('company')}
                        minLength={props.validators.getMinLength('company')}
                        maxLength={props.validators.getMaxLength('company')}
                        pattern={props.validators.getRegex('company')}
                        defaultValue={props.value}
                        readOnly={props.readOnly}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            <i className="fas fa-city"></i>
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}