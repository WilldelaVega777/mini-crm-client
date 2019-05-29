//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React        from 'react';
import { Link }     from 'react-router-dom';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Header extends React.Component<IHeaderProps, IHeaderState>
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand text-light font-weight-bold">
                        <h3><i className="far fa-angry"></i>&nbsp;&nbsp;My Angry CRM</h3>
                    </Link> 
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navegacion">
                        <ul className="navbar-nav ml-auto text-right">
                            <li className="nav-item active">
                                <Link to="/customer/create" className="btn btn-success">
                                    {this.props.createButtonCaption}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
//---------------------------------------------------------------------------------
interface IHeaderProps
{
    createButtonCaption: string;
}
//---------------------------------------------------------------------------------
interface IHeaderState
{
    
}

