//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React            from 'react';

import { UserRole }     from '../../services/typeDefs/globals/graphql-global-types';

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
        const { role } = this.props.session
        const bgRole: string = (role === UserRole.SALESMAN) ? 'bg-salesman-foot' : (role === UserRole.ADMINISTRATOR) ? 'bg-admin-foot' : 'bg-anon-foot'
        const fgRole: string = (role === UserRole.SALESMAN) ? 'fg-salesman-foot' : (role === UserRole.ADMINISTRATOR) ? 'fg-admin-foot' : 'bg-anon-foot'

        return (
            <React.Fragment>
                
                {/* Apply CSS  */}
                {this.getCSS()}
                
                <footer className="footer mt-auto py-3">
                    <nav className={`navbar navbar-expand-lg navbar-dark ${bgRole} justify-content-between d-flex mb-4 custom-top-padding`}>
                        <div className="container">
                            <span className={`${fgRole}`}>GeoSysOnline <i className="far fa-copyright"></i> 2019 - All rights reserved.</span>
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
            .custom-top-padding
            {
                padding-top: 12px;
            }
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
    session: any
}
//---------------------------------------------------------------------------------
interface IFooterState
{

}