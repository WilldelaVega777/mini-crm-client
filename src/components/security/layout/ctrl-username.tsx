//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { ValidationHelper }     from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICtrlUsernameProps
{
    data        : string
    validators  : ValidationHelper
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CtrlUsername: React.SFC<ICtrlUsernameProps> =
    (props) =>
    {
        function doNothing() {}

        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Usuario</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Usuario"
                            required={props.validators.getRequired('username')}
                            minLength={props.validators.getMinLength('username')}
                            maxLength={props.validators.getMaxLength('username')}
                            pattern={props.validators.getRegex('username')}
                            value={props.data}
                            onChange={e => doNothing()}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }