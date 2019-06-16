//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { useState }             from 'react'
import { ValidationHelper }     from '../../helpers/validations.helper'
import { ProductInput }         from '../../services/typeDefs/globals/graphql-global-types'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CtrlName }             from './layout/ctrl-name'
import { CtrlEntryAmount }      from './layout/ctrl-entry-amount'
import { CtrlSubmit }           from '../Shared/ctrl-submit'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IStockEntryLayoutProps
{
    data?: ProductInput | undefined
    validators: ValidationHelper
    readOnly?: boolean | undefined
    onAmountChanged: (newAmount: number) => void
}
//-------------------------------------------------------------------------
// Component for Amount Layout:
//-------------------------------------------------------------------------
export const StockEntryLayout: React.SFC<IStockEntryLayoutProps> =
(props) =>
{
    //---------------------------------------------------------------------------------
    // Local Variables Section
    //---------------------------------------------------------------------------------    
    const product = props.data

    //---------------------------------------------------------------------------------
    // Local State Section
    //---------------------------------------------------------------------------------     
    const [currentAmount, setCurrentAmount] = useState(0)

    //---------------------------------------------------------------------------------
    // Render Section
    //---------------------------------------------------------------------------------    
    return (
        <React.Fragment>
            <div className="p-3 subtle-shadow mb-4 bg-soothing-breeze subtle-corners animated fadeInLeft">
                <div className="form-row">
                    <div className="form-group col-md-9">
                        <CtrlName validators={props.validators}
                            value={
                                (product) ? (product as ProductInput).name : undefined
                            }
                            readOnly={true}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <CtrlEntryAmount
                            value={'0'}
                            readOnly={false}
                            onAmountChanged={(e: number) => {ctrlEntryAmount_changed(e)}}
                        />
                    </div>
                </div>
            </div>

            {(!props.readOnly) &&
                <CtrlSubmit disabled={currentAmount === 0}/>
            }

        </React.Fragment>
    )
    //---------------------------------------------------------------------------------
    // Eventhandler Methods Section
    //---------------------------------------------------------------------------------
    function ctrlEntryAmount_changed(e: number)
    {
        setCurrentAmount(e)
        props.onAmountChanged(e)
    }
}