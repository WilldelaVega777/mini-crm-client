//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'

//---------------------------------------------------------------------------------
// Component Interface:
//---------------------------------------------------------------------------------
interface ICtrlSubmitProps
{
    caption?        : string  | undefined
    disabled?       : boolean | undefined
}

//-------------------------------------------------------------------------
// Component for Submit:
//-------------------------------------------------------------------------
export const CtrlSubmit: React.SFC<ICtrlSubmitProps> =
(props) =>
{
    return (
        <React.Fragment>
            <button
                type="submit"
                className="btn btn-success float-right"
                disabled={props.disabled}
            >
                {props.caption ? props.caption : 'Guardar Cambios'}
            </button>
        </React.Fragment>
    )
}