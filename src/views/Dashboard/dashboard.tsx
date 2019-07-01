//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                       from 'react'

//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { TopCustomers }            from '../../components/dashboard/topCustomers'

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Dashboard extends React.Component<IDashboardProps, IDashboardState>
{   
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
                
                { this.getCSS() }
                
                { this.getPageTitle() }
                
                <div className="row justify-content-center">
                    <div className="col col-md-5 mr-5">
                        <TopCustomers className="animated fadeInLeft"/>
                    </div>
                    <div className="col col-md-5">
                        <TopCustomers className="animated fadeInRight"/>
                    </div>                    
                </div>
                
            </React.Fragment>
        )
    }    
    //-------------------------------------------------------------------------
    private getPageTitle(): JSX.Element
    {
        return (
            <div className="row">
                <div className="col col-md-8 d-flex justify-content-end mb-4">
                    <h2 className="text-center mb-3">CRM Dashboard</h2>
                </div>
            </div>
        )
    } 
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