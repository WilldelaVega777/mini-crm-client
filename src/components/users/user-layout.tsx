//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                        from 'react'
import { ValidationHelper }         from '../../helpers/validations.helper'
import { 
    getUsers_getUsers_users as User 
} from '../../services/typeDefs/operations/getUsers'

//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CtrlUsername }             from './layout/ctrl-username'
import { CtrlPassword }             from './layout/ctrl-password'
import { CtrlConfirmPassword }      from './layout/ctrl-confirm-password'
import { CtrlSubmit }               from '../Shared/ctrl-submit'
import { CtrlFirstname }            from './layout/ctrl-firstname'
import { CtrlLastname }             from './layout/ctrl-lastname'
import { CtrlRole }                 from './layout/ctrl-role';

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IUserLayoutProps
{
    data?           : User | undefined
    validators      : ValidationHelper
    readOnly?       : boolean | undefined
    editMode?       : boolean | undefined
}
//-------------------------------------------------------------------------
// Component for Product Layout:
//-------------------------------------------------------------------------
export const UserLayout: React.SFC<IUserLayoutProps> =
    (props) =>
    {
        const user = props.data
        if (props.readOnly)
        {
            return (
                <div className="p-3 subtle-shadow mb-4 bg-soothing-breeze subtle-corners animated fadeInLeft">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <CtrlUsername validators={props.validators}
                                value={
                                    (user) ? (user as User).username : undefined
                                }
                                readOnly={(props.readOnly) ? true : false}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <CtrlFirstname validators={props.validators}
                                value={
                                    (user) ? (user as User).first_name : undefined
                                }
                                readOnly={(props.readOnly) ? true : false}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <CtrlLastname validators={props.validators}
                                value={
                                    (user) ? (user as User).last_name : undefined
                                }
                                readOnly={(props.readOnly) ? true : false}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <CtrlRole validators={props.validators}
                                value={
                                    (user) ? (user as User).role : undefined
                                }
                                readOnly={(props.readOnly) ? true : false}
                            />
                        </div>
                    </div>
                </div>  
            )
        }
        else
        {
            return (
                <React.Fragment>
                    <div className="p-3 subtle-shadow mb-4 bg-soothing-breeze subtle-corners animated fadeInLeft">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <CtrlUsername validators={props.validators}
                                    value={
                                        (user) ? (user as User).username : undefined
                                    }
                                    readOnly={(props.readOnly) ? true : false}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <CtrlPassword validators={props.validators}
                                    readOnly={(props.readOnly) ? true : false}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                &nbsp;
                            </div>
                            <div className="form-group col-md-6">
                                <CtrlConfirmPassword validators={props.validators}
                                    readOnly={(props.readOnly) ? true : false}
                                />                            
                            </div>
                        </div>  
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <CtrlFirstname validators={props.validators}
                                    value={
                                        (user) ? (user as User).first_name : undefined
                                    }
                                    readOnly={(props.readOnly) ? true : false}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <CtrlLastname validators={props.validators}
                                    value={
                                        (user) ? (user as User).last_name : undefined
                                    }
                                    readOnly={(props.readOnly) ? true : false}
                                />
                            </div>
                        </div>        
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <CtrlRole validators={props.validators}
                                    value={
                                        (user) ? (user as User).role : undefined
                                    }
                                    readOnly={(props.readOnly) ? true : false}
                                />
                            </div>
                        </div>                                                             
                    </div>
    
                    {(!props.readOnly) &&
                        <CtrlSubmit />
                    }
    
                </React.Fragment>
            )
        }
    }