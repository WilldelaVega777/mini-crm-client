//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React from 'react';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Footer extends React.Component<IFooterProps, IFooterState>
{
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IFooterProps)
    {
        // Calls Super
        super(props);

        this.state = {

        }
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
                
                <footer className="footer mt-auto py-3">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
                        <div className="container">
                            <span className="text-muted">GeoSysOnline <i className="far fa-copyright"></i> 2019 - All rights reserved.</span>
                        </div>
                    </nav>                    
                </footer>

            </React.Fragment>
        );
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section
    //-------------------------------------------------------------------------
    private getCSS(): JSX.Element
    {
        const css = `
            .footer 
            {
                position: fixed;
                bottom: 0;
                width: 100%;
                /* Set the fixed height of the footer here */
                height: 60px;
            }
        `

        return (
            <React.Fragment>
                <style>
                    {css}
                </style>
            </React.Fragment>
        )
    }
    
}
//---------------------------------------------------------------------------------
interface IFooterProps
{

}
//---------------------------------------------------------------------------------
interface IFooterState
{

}