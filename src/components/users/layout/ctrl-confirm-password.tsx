//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICtrlConfirmPasswordProps
{
    validators  : ValidationHelper
    value?      : string | undefined
    readOnly    : boolean
    hideLabels? : boolean | undefined
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CtrlConfirmPassword: React.SFC<ICtrlConfirmPasswordProps> =
    (props) =>
    {
        if (props.readOnly)
        {
            return <span>&nbsp;</span>
        }
        else
        {
            return (
                <React.Fragment>
    
                    <div className="form-group pl-1 pr-0">
                        {
                            (props.hideLabels)
                                ? ''
                                : <label>Repetir Contraseña</label>
                        }
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                name="confirm-password"
                                className="form-control"
                                placeholder={'Repetir Contraseña'}
                                required={props.validators.getRequired('password')}
                                minLength={props.validators.getMinLength('password')}
                                maxLength={props.validators.getMaxLength('password')}
                                pattern={props.validators.getRegex('password')}
                                readOnly={props.readOnly}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">
                                    <i className="fas fa-user-lock"></i>
                                </span>
                            </div>
                        </div>
                    </div>
    
                </React.Fragment>
            )
        }
    }