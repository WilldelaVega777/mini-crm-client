//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { ValidationHelper }     from '../../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICtrlNameProps
{
    validators: ValidationHelper
    value?: string | undefined
    readOnly: boolean
}

//---------------------------------------------------------------------------------
// Component for Product Name:
//---------------------------------------------------------------------------------
export const CtrlName: React.SFC<ICtrlNameProps> =
    (props) =>
    {
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Nombre</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Nombre"
                            required={props.validators.getRequired('name')}
                            minLength={props.validators.getMinLength('name')}
                            maxLength={props.validators.getMaxLength('name')}
                            pattern={props.validators.getRegex('name')}
                            defaultValue={props.value}
                            readOnly={props.readOnly}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="fas fa-barcode"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }