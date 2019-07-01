//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                from 'react';
import { Link }                             from 'react-router-dom';
import { NavLink }                          from 'react-router-dom';
import { Logout }                           from '../security/logout'
import { withRouter }                       from 'react-router';

import { getCurrentLogin_getCurrentLogin }  from '../../services/typeDefs/operations/getCurrentLogin'
import { UserRole }                         from '../../services/typeDefs/globals/graphql-global-types';

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
class AppHeader extends React.Component<IHeaderProps, IHeaderState>
{
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IHeaderProps)
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
        const bgRole: string = (role === UserRole.SALESMAN) ? 'bg-salesman-head' : (role === UserRole.ADMINISTRATOR) ? 'bg-admin-head' : 'bg-anon-head'
        const fgRole: string = (role === UserRole.SALESMAN) ? 'fg-salesman-head' : (role === UserRole.ADMINISTRATOR) ? 'fg-admin-head' : 'bg-anon-head'

        return (
            <React.Fragment>
                {/* Apply CSS  */ }
                { this.getCSS() }
                                
                <nav className={`navbar navbar-expand-lg navbar-dark ${bgRole} justify-content-between d-flex mb-4`}>
                    <div className="container">
                        <Link to="/dashboard" className="navbar-brand text-light font-weight-bold">
                            <h3><i className="far fa-grin-wink"></i>&nbsp;&nbsp;{this.props.title}</h3>
                            <h6 className="ml-5">{this.props.welcomeMessage}</h6>
                        </Link> 
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">

                            </ul>
                        </div>

                        { (this.props.session.username !== "null") &&
                            <div className="collapse navbar-collapse" id="navegacion">
                                <ul className="navbar-nav ml-auto text-right">
                                    { (role === UserRole.ADMINISTRATOR) &&
                                        <li className={"nav-item " + this.getNavLinkClass("/users")}>
                                            <NavLink to="/users" className="nav-link" activeClassName="active">Usuarios</NavLink>
                                        </li>
                                    }
                                    <li className={"nav-item " + this.getNavLinkClass("/customers")}>
                                        <NavLink to="/customers" className="nav-link" activeClassName="active">Clientes</NavLink>
                                    </li>
                                    <li className={"nav-item " + this.getNavLinkClass("/products")}>
                                        <NavLink to="/products" className="nav-link" activeClassName="active">Productos</NavLink>
                                    </li>
                                    <Logout background={bgRole} foreground={fgRole}/>
                                </ul>
                            </div>
                        }
                    </div>
                </nav>
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
    // Private Methods Section (Utilities)
    //-------------------------------------------------------------------------
    private getNavLinkClass(path)
    {
        return this.props.location.pathname === path ? 'active' : '';
    }
}

//---------------------------------------------------------------------------------
// Component Interfaces Section
//---------------------------------------------------------------------------------
interface IHeaderProps
{
    // Own Props
    title                   : string
    createButtonCaption     : string
    welcomeMessage          : string
    session                 : getCurrentLogin_getCurrentLogin

    
    // withRouter HOC Props
    match                   : any
    location                : any
    history                 : any
}
//---------------------------------------------------------------------------------
interface IHeaderState
{
    
}

//---------------------------------------------------------------------------------
// Module ExportSection / (HOC)
//---------------------------------------------------------------------------------
export const Header = withRouter(AppHeader)