//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
//import { SyntheticEvent }       from 'react'
import { ValidationHelper }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CustomerLayout }       from '../customers/customer-layout'
import { CtrlSubmit }           from '../Shared/ctrl-submit'
import { CustomerInput }        from '../../services/typeDefs/globals/graphql-global-types'
//import { EmailInput }           from '../../services/typeDefs/globals/graphql-global-types'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IOrderLayoutProps
{
    data?           : CustomerInput | undefined
    validators      : ValidationHelper
    readOnly?       : boolean | undefined
    maxEmails       : number  | undefined
}

//-------------------------------------------------------------------------
// Component for Emails:
//-------------------------------------------------------------------------
export const OrderLayout: React.SFC<IOrderLayoutProps> = 
(props) => {
    
    return (
        <React.Fragment>
            <div className="container">
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <CustomerLayout
                            data={props.data}
                            emails={(props.data as CustomerInput).emails}
                            validators={props.validators}
                            readOnly={true}
                            maxEmails={1}
                            hideLabels={true}
                        />
                    </div>
                </div>                
            </div>
            <div className="container">
                <div className="form-row">
                    <div className="col-md-12 d-flex justify-content-end">
                        <CtrlSubmit/>
                    </div>
                </div>                
            </div>
        </React.Fragment>
    )
}