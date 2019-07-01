//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                    from 'react'
import { Redirect }             from 'react-router-dom'
import { Route }                from 'react-router-dom'

//---------------------------------------------------------------------------------
// Functional Component
//---------------------------------------------------------------------------------
export const PrivateRoute= ({ 
    authenticatedUser, 
    render: Render, 
    ...rest 
}) =>
{
    return (
        <Route
            {...rest}
            render={props =>
                (authenticatedUser.username !== "null")
                ? ( Render(props) )
                : ( <Redirect to={{
                        pathname: '/',
                        state: {
                            from: props.location
                        }
                    }} />
                )
            }
        />
    )
}
