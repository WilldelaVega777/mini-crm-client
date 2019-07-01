//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { ValidationHelper }     from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICtrlPasswordProps
{
    data        : string
    validators  : ValidationHelper
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CtrlPassword: React.SFC<ICtrlPasswordProps> =
    (props) =>
    {
        function doNothing() {}

        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Contraseña</label>
                    <div className="input-group mb-3">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder={'Contraseña'}
                            required={props.validators.getRequired('password')}
                            minLength={props.validators.getMinLength('password')}
                            maxLength={props.validators.getMaxLength('password')}
                            pattern={props.validators.getRegex('password')}
                            value={props.data}
                            onChange={e => doNothing()}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="fas fa-unlock"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }