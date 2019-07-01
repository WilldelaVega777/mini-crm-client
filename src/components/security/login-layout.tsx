//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                        from 'react'
import { ValidationHelper }         from '../../helpers/validations.helper'

//---------------------------------------------------------------------------------
// Imports Section (Data Model)
//---------------------------------------------------------------------------------
import { authenticateVariables as User }
    from '../../services/typeDefs/operations/authenticate'

//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CtrlUsername }             from './layout/ctrl-username'
import { CtrlPassword }             from './layout/ctrl-password'
import { CtrlSubmit }               from '../Shared/ctrl-submit'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ILoginLayoutProps
{
    data: User,
    validators: ValidationHelper
}
//-------------------------------------------------------------------------
// Component for Product Layout:
//-------------------------------------------------------------------------
export const LoginLayout: React.SFC<ILoginLayoutProps> =
    (props) =>
    {   
        return (
            <React.Fragment>
                <div className="container mt-5" style={{maxWidth: '500px'}}>
                    <div className="row">
                        <div className="col col-md-12 align-center">
                            <div className="p-3 subtle-shadow mb-4 bg-soothing-breeze subtle-corners animated fadeInLeft">
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <CtrlUsername 
                                            data={props.data.username} 
                                            validators={props.validators}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">                
                                    <div className="form-group col-md-12">
                                        <CtrlPassword 
                                            data={props.data.password} 
                                            validators={props.validators}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-md-12 align-right">
                            <CtrlSubmit
                                caption='Ingresar al Sistema'
                                disabled={((!props.data.username) || (!props.data.password))}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }