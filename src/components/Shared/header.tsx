//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React            from 'react';
import { Link }         from 'react-router-dom';
import { NavLink }      from 'react-router-dom';
import { withRouter }   from 'react-router';


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
        return (
            <React.Fragment>
                {/* Apply CSS  */ }
                { this.getCSS() }
                                
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
                    <div className="container">
                        <Link to="/" className="navbar-brand text-light font-weight-bold">
                            <h3><i className="far fa-angry"></i>&nbsp;&nbsp;My Angry CRM</h3>
                        </Link> 
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">

                            </ul>
                        </div>


                        <div className="collapse navbar-collapse" id="navegacion">
                            <ul className="navbar-nav ml-auto text-right">
                                <li className={"nav-item " + this.getNavLinkClass("/customers")}>
                                    <NavLink to="/customers" className="nav-link" activeClassName="active">Clientes</NavLink>
                                </li>
                                <li className={"nav-item " + this.getNavLinkClass("/products")}>
                                    <NavLink to="/products" className="nav-link" activeClassName="active">Productos</NavLink>
                                </li>
                            </ul>
                        </div>
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
    createButtonCaption : string
    
    // withRouter HOC Props
    match               : any
    location            : any
    history             : any
}
//---------------------------------------------------------------------------------
interface IHeaderState
{
    
}

//---------------------------------------------------------------------------------
// Module Exports Section / (HOC)
//---------------------------------------------------------------------------------
export const Header = withRouter(AppHeader)