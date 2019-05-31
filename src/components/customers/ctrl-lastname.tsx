//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICtrlLastnameProps
{
    validators      : ValidationHelper
    value?          : string | undefined
}

//---------------------------------------------------------------------------------
// Component for Last Name:
//---------------------------------------------------------------------------------
export const CtrlLastname: React.SFC<ICtrlLastnameProps> = 
(props) => {
    return (
        <React.Fragment>
            <div className="form-group pl-1 pr-0">
                <label>Apellido</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        placeholder="Nombre"
                        required={props.validators.getRequired('last_name')}
                        minLength={props.validators.getMinLength('last_name')}
                        maxLength={props.validators.getMaxLength('last_name')}
                        pattern={props.validators.getRegex('last_name')}
                        defaultValue={props.value}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            <i className="far fa-address-book"></i>
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}