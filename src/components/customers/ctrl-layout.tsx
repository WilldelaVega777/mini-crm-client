//---------------------------------------------------------------------------------
// Usage: 
//---------------------------------------------------------------------------------
/*
    {
        ctrl_layout(
            this.state.emails,
            (e) => this.cmdNewEmail_click(e, index)
            (e, indexToRemove) => this.cmdRemoveEmail_click(e, index)
            this.validators
        )
    }
*/

//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { SyntheticEvent }   from 'react'
import { ValidationHelper } from '../../helpers/validations.helper'
import { CustomerInput }    from '../../services/typeDefs/globals/graphql-global-types'
import { EmailInput }       from '../../services/typeDefs/globals/graphql-global-types'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CtrlFirstname }       from './ctrl-firstname'
import { CtrlLastname }        from './ctrl-lastname'
import { CtrlCompany }         from './ctrl-company'
import { CtrlEmails }          from './ctrl-emails'
import { CtrlAge }             from './ctrl-age'
import { CtrlType }            from './ctrl-type'
import { CtrlSubmit }          from '../Shared/ctrl-submit'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICtrlLayoutProps
{
    emails          : EmailInput[],
    triggerCreate   : (e: SyntheticEvent) => void,
    triggerDelete   : (e: SyntheticEvent, index: number) => void,
    data?           : CustomerInput | undefined
    validators      : ValidationHelper    
}
//-------------------------------------------------------------------------
// Component for Emails:
//-------------------------------------------------------------------------
export const CtrlLayout: React.SFC<ICtrlLayoutProps> = 
(props) => {
    
    const customer = props.data
    let strAge: string = '';
    
    if (customer)
    {
        strAge = customer.age.toString()
    }
    
    return (
        <React.Fragment>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <CtrlFirstname validators={props.validators} 
                        value={
                            (customer) ? (customer as CustomerInput).first_name : undefined
                        }
                    />
                </div>
                <div className="form-group col-md-6">
                    <CtrlLastname validators={props.validators} 
                        value={
                            (customer) ? (customer as CustomerInput).last_name : undefined
                        }
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <CtrlCompany validators={props.validators}
                       value={
                            (customer) ? (customer as CustomerInput).company : undefined
                       } 
                    />
                </div>
            </div>

            <CtrlEmails
                emails={props.emails}
                triggerCreate={(e: SyntheticEvent) =>
                {
                    props.triggerCreate(e)
                }}
                triggerDelete={(e: SyntheticEvent, indexToRemove: number) =>
                {
                    props.triggerDelete(e, indexToRemove)
                }}
                validators={props.validators}
            />

            <div className="form-row">
                <div className="form-group col-md-6">
                    <CtrlAge validators={props.validators} 
                        value={
                            (customer) ? strAge : undefined
                        } 
                    />
                </div>
                <div className="form-group col-md-6">
                    <CtrlType validators={props.validators} 
                        value={
                            (customer) ? (customer as CustomerInput).type : undefined
                        }                     
                    />
                </div>
            </div>
            
            <CtrlSubmit/>
            
        </React.Fragment>
    )
}