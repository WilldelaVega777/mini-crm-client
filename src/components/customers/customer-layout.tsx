//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { SyntheticEvent }       from 'react'
import { ValidationHelper }     from '../../helpers/validations.helper'
import { CustomerInput }        from '../../services/typeDefs/globals/graphql-global-types'
import { EmailInput }           from '../../services/typeDefs/globals/graphql-global-types'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CtrlFirstname }        from './layout/ctrl-firstname'
import { CtrlLastname }         from './layout/ctrl-lastname'
import { CtrlCompany }          from './layout/ctrl-company'
import { CtrlEmails }           from './layout/ctrl-emails'
import { CtrlAge }              from './layout/ctrl-age'
import { CtrlType }             from './layout/ctrl-type'
import { CtrlSubmit }           from '../Shared/ctrl-submit'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICustomerLayoutProps
{
    emails          : EmailInput[],
    triggerCreate?  : (e: SyntheticEvent) => void | undefined,
    triggerDelete?  : (e: SyntheticEvent, index: number) => void | undefined,
    data?           : CustomerInput | undefined
    validators      : ValidationHelper
    readOnly?       : boolean | undefined
    maxEmails?      : number  | undefined
    hideLabels?     : boolean | undefined
}
//-------------------------------------------------------------------------
// Component for Emails:
//-------------------------------------------------------------------------
export const CustomerLayout: React.SFC<ICustomerLayoutProps> = 
(props) => {
    
    const customer = props.data
    let strAge: string = '';
    
    if (customer)
    {
        strAge = customer.age.toString()
    }
    return (
        <React.Fragment>
            <div className="p-3 subtle-shadow mb-4 bg-soothing-breeze subtle-corners animated fadeInRight">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <CtrlFirstname validators={props.validators} 
                            value={
                                (customer) ? (customer as CustomerInput).first_name : undefined
                            }
                            readOnly={ (props.readOnly) ? true : false }
                            hideLabels={props.hideLabels}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <CtrlLastname validators={props.validators} 
                            value={
                                (customer) ? (customer as CustomerInput).last_name : undefined
                            }
                            readOnly={ (props.readOnly) ? true : false }
                            hideLabels={props.hideLabels}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <CtrlCompany validators={props.validators}
                            value={
                                (customer) ? (customer as CustomerInput).company : undefined
                            }
                            readOnly={ (props.readOnly) ? true : false }
                            hideLabels={props.hideLabels}
                        />
                    </div>
                </div>

                <CtrlEmails
                    emails={props.emails}
                    
                    triggerCreate={(e: SyntheticEvent) =>
                    {
                        if (props.triggerCreate)
                        {
                            props.triggerCreate(e)
                        }
                    }}
                    triggerDelete={(e: SyntheticEvent, indexToRemove: number) =>
                    {
                        if (props.triggerDelete)
                        {
                            props.triggerDelete(e, indexToRemove)
                        }
                    }}
                    
                    validators={props.validators}
                    readOnly={ (props.readOnly) ? true : false }
                    maxEmails={ (props.maxEmails) ? props.maxEmails : 0 }
                    hideLabels={props.hideLabels}
                />

                <div className="form-row">
                    <div className="form-group col-md-5">
                        <CtrlAge validators={props.validators} 
                            value={
                                (customer) ? strAge : undefined
                            }
                            readOnly={ (props.readOnly) ? true : false }
                            hideLabels={props.hideLabels}
                        />
                    </div>
                    <div className="form-group col-md-7">
                        <CtrlType validators={props.validators} 
                            value={
                                (customer) ? (customer as CustomerInput).type : undefined
                            }
                            readOnly={ (props.readOnly) ? true : false }
                            hideLabels={props.hideLabels}
                        />
                    </div>
                </div>
            </div>
            
            { (!props.readOnly) &&
            <CtrlSubmit/>
            }
            
        </React.Fragment>
    )
}