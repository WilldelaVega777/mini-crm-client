//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { SyntheticEvent }   from 'react'
import { ValidationHelper } from '../../../helpers/validations.helper'
import { EmailInput }       from '../../../services/typeDefs/globals/graphql-global-types'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlEmailsProps
{
    emails              : EmailInput[]
    triggerCreate       : (e: SyntheticEvent) => void
    triggerDelete       : (e: SyntheticEvent, index: number) => void
    validators          : ValidationHelper
    readOnly            : boolean
}

//-------------------------------------------------------------------------
// Component for Emails:
//-------------------------------------------------------------------------
export const CtrlEmails: React.SFC<ICtrlEmailsProps> = 
(props) => {
    return (
        <React.Fragment>
            {props.emails.map((email: EmailInput, index: number) =>
            {
                return (
                    <div key={index} className="form-group col-md-12 pl-1 pr-0">
                        <label>Email {index + 1}</label>
                        
                        <div className="form-row input-group mb-3">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                                
                                <input type="email"
                                    className="form-control"
                                    name={`email_${index + 1}`}
                                    placeholder="Email"
                                    required={props.validators.getRequired('emails')}
                                    minLength={props.validators.getMinLength('emails')}
                                    maxLength={props.validators.getMaxLength('emails')}
                                    pattern={props.validators.getRegex('emails')}
                                    defaultValue={email.email}
                                    readOnly={props.readOnly}
                                />
                                { (!props.readOnly) &&
                                <div className="input-group-append">
                                    <button id="cmdRemoveEmail"
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={e => props.triggerDelete(e, index)}
                                    >
                                        &times; Eliminar Email
                                    </button>
                                </div>
                                }
                            </div>                            
                            
                        </div>
                    </div>
                )
            })}
            
            { (!props.readOnly) &&
            <div className="form-row mt-3 mb-4">
                <div className="col-md-12 text-center">
                    <button id="cmdNewEmail"
                        className="btn btn-warning"
                        onClick={e => props.triggerCreate(e)}
                    >
                        <i className="fas fa-plus"></i>
                        &nbsp;&nbsp;
                        Agregar Email
                    </button>
                </div>
            </div>
            }
        </React.Fragment>
    )
}