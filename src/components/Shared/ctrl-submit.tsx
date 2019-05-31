//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React from 'react'

//-------------------------------------------------------------------------
// Component for First Name:
//-------------------------------------------------------------------------
export const CtrlSubmit = () => {
    return (
        <React.Fragment>
            <button
                type="submit"
                className="btn btn-success float-right"
            >
                Guardar Cambios
            </button>
        </React.Fragment>
    )
}