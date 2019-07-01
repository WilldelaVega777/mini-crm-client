//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { ApolloConsumer }           from 'react-apollo'
import { withRouter }               from 'react-router'
import ApolloClient                 from 'apollo-client';


//---------------------------------------------------------------------------------
// Component Interfaces Section
//---------------------------------------------------------------------------------
interface ILogoutProps
{
    location    : any
    history     : any
    match       : any
    background  : string
    foreground  : string
}

//---------------------------------------------------------------------------------
// Component SFC
//---------------------------------------------------------------------------------
const LogoutComponent: React.FC<ILogoutProps> =
(props) =>
{
    const closeUserSession = (client: ApolloClient<any>, history: any) =>
    {
        localStorage.removeItem('token')
        client.resetStore()
        history.push('/')
    }

    return (
        <ApolloConsumer>
        {
            client => {
                return (
                    <button 
                        className={`btn ${props.background} ${props.foreground} ml-md-5`}
                        onClick={() => closeUserSession(client, props.history)}
                    >
                        <i className="fas fa-user-lock"></i>&nbsp; Cerrar Sesión
                    </button>

                )
            }
        }
        </ApolloConsumer>
    )
}

//---------------------------------------------------------------------------------
// Module ExportSection / (HOC)
//---------------------------------------------------------------------------------
export const Logout = withRouter(LogoutComponent)
