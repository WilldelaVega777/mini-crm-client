//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlEntryAmountProps
{
    value?          : string | undefined
    readOnly        : boolean
    onAmountChanged : (newAmount: number) => void 
}
//---------------------------------------------------------------------------------
// Component for Age:
//---------------------------------------------------------------------------------
export const CtrlEntryAmount: React.SFC<ICtrlEntryAmountProps> =
    (props) =>
    {
        return (
            <React.Fragment>
                <div className="form-group pl-1 pr-0">
                    <label>Agregar</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-plus-circle"></i>
                            </span>
                        </div>
                        <input
                            type="number"
                            name="stock"
                            className="form-control text-right"
                            placeholder="Agregar"
                            required
                            min={0}
                            max={1000000}
                            pattern="^[0-9]+$/"
                            defaultValue={props.value}
                            readOnly={false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => txtAmount_changed(e)}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
        
        function txtAmount_changed(e: React.ChangeEvent<HTMLInputElement>)
        {
            const newValue = Number(e.target.value);
            
            props.onAmountChanged(newValue)

        }
    }