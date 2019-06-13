//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                    from 'react'
import { Link }                                 from 'react-router-dom'

//---------------------------------------------------------------------------------
// Imports Section (Components)
//---------------------------------------------------------------------------------
import { Loading }                              from '../../components/Shared/loading'
import Swal                                     from 'sweetalert2'

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Dashboard extends React.Component<IDashboardProps, IDashboardState>
{   
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IDashboardProps)
    {
        // Calls Super
        super(props)
        
    }
    
    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {   
        return (
            <React.Fragment>

                {/* Apply CSS  */}
                {this.getCSS()}
                
                {/* Create Layout  */}
                {this.renderLayout(this.props, this.state)}
                
            </React.Fragment>
        );
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section (UI)
    //-------------------------------------------------------------------------
    private getCSS(): JSX.Element
    {
        const css = `
            .rise-little 
            {
                margin-top: 7px !important;        
            }
        `

        return (
            <style>
                {css}
            </style>
        )
    }
    //-------------------------------------------------------------------------
    private renderLayout(props: IDashboardProps, state: IDashboardState)
    : JSX.Element 
    {
        return (
            <React.Fragment>
                
                <p>Dashboard works!</p>
                
            </React.Fragment>
        )
    }    
    //-------------------------------------------------------------------------
    private getPageTitle(): JSX.Element
    {
        return (
            <div className="row">
                <div className="col col-md-8 d-flex justify-content-end">
                    <h2 className="text-center mb-3">CRM Dashboard</h2>
                </div>
            </div>
        )
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section (Utility)
    //-------------------------------------------------------------------------

 
}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface IDashboardProps
{
    shouldNavigateBack  : boolean
    history             : any
    match               : any
}
//---------------------------------------------------------------------------------
export interface IDashboardState
{

}