//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { QueryGetCurrentLogin } from '../../../services/operations/queries/security/getCurrentLogin.query'
import { Q_GET_CURRENT_LOGIN }  from '../../../services/operations/queries/security/getCurrentLogin.query'
import { Loading }              from '../../Shared/loading'
import Swal                     from 'sweetalert2'

//---------------------------------------------------------------------------------
// Component HOC for handling User Session:
//---------------------------------------------------------------------------------
export const withSession = Component => props => (
    <QueryGetCurrentLogin query={Q_GET_CURRENT_LOGIN}>
        {
            ({ loading, error, data, refetch}) =>
            {
                let thisError: string = ''
                if (error)
                {
                    if (error.graphQLErrors && error.graphQLErrors.length > 0)
                    {
                        const rawError = error.graphQLErrors[0].message
                        thisError = rawError.substring(rawError.indexOf('"'), (rawError.length-1))
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
                        <Loading/>
                    )
                }
                if (data)
                {
                    // console.log(`Session Data Received: ${data.getCurrentLogin? data.getCurrentLogin.username : 'null'}`)
                }
                // Component will always be App
                return (
                    <Component 
                        {...props} 
                        refetch={refetch} 
                        session={((data && data.getCurrentLogin) ? data.getCurrentLogin : {username: 'null'})}
                    />
                )
            }
        }
    </QueryGetCurrentLogin>    
)
