//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                    from 'react'
import { Redirect }             from 'react-router-dom'
import { Route }                from 'react-router-dom'

import { QueryGetCurrentLogin } from '../../../services/operations/queries/security/getCurrentLogin.query'
import { Q_GET_CURRENT_LOGIN }  from '../../../services/operations/queries/security/getCurrentLogin.query'
import { Loading }              from '../../Shared/loading'
import Swal                     from 'sweetalert2'

//---------------------------------------------------------------------------------
// Functional Component
//---------------------------------------------------------------------------------
export const PrivateRouteExpirable = ({
    authenticatedUser,
    render: Render,
    ...rest
}) =>
{
    // console.log('Enters Component PrivateRouteExpirable')
    return(
        <QueryGetCurrentLogin query={Q_GET_CURRENT_LOGIN}>
            {
                ({ loading, error, data, refetch }) =>
                {
                    let thisError: string = ''
                    if (error)
                    {
                        if (error.graphQLErrors && error.graphQLErrors.length > 0)
                        {
                            const rawError = error.graphQLErrors[0].message
                            thisError = rawError.substring(rawError.indexOf('"'), (rawError.length - 1))
                        }
                        else
                        {
                            thisError = error.message
                        }
                        Swal.fire(
                            'Error en Login',
                            `Error: ${thisError}`,
                            'error'
                        )
                    }
                    if (loading)
                    {
                        return (
                            <Loading />
                        )
                    }
                    if (data)
                    {
                        // console.log(`Session Data Received: ${data.getCurrentLogin ? data.getCurrentLogin.username : 'null'}`)
                    }

                    // Finally...
                    // console.log('Enters Component PrivateRouteExpirable WITH DATA')
                    return (
                        <Route
                            {...rest}
                            render={props =>
                                (authenticatedUser.username !== "null")
                                    ? (Render(props))
                                    : (<Redirect to={{
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
            }
        </QueryGetCurrentLogin>
    )
}