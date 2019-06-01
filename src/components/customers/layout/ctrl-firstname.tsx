//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper' 

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICtrlFirstnameProps
{
    validators  : ValidationHelper
    value?      : string | undefined
    readOnly    : boolean
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CtrlFirstname: React.SFC<ICtrlFirstnameProps> = 
(props) => {
    return (
        <React.Fragment>
            <div className="form-group pl-1 pr-0">
                <label>Nombre</label>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        placeholder="Nombre"
                        required={props.validators.getRequired('first_name')}
                        minLength={props.validators.getMinLength('first_name')}
                        maxLength={props.validators.getMaxLength('first_name')}
                        pattern={props.validators.getRegex('first_name')}
                        defaultValue={props.value}
                        readOnly={props.readOnly}
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