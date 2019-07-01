//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                    from 'react';
import ReactDOM                 from 'react-dom';
//---------------------------------------------------------------------------------
// Imports Section (Resources)
//---------------------------------------------------------------------------------
import './styles/bootstrap.css'
import './styles/fontawesome.css'
import './styles/animate.css'
import './styles/_app.css'

//---------------------------------------------------------------------------------
// Imports Section (Apollo)
//---------------------------------------------------------------------------------
import { InMemoryCache }        from 'apollo-boost';
import ApolloClient             from 'apollo-boost' 
import { ApolloProvider }       from 'react-apollo'

//---------------------------------------------------------------------------------
// Imports Section (Components: App Component)
//---------------------------------------------------------------------------------
import { RootSession }          from './components/App/App'
//---------------------------------------------------------------------------------
// Imports Section (Servicer Worker)
//---------------------------------------------------------------------------------
import * as serviceWorker       from './serviceWorker'
//---------------------------------------------------------------------------------
// Configure Apollo Client
//---------------------------------------------------------------------------------
const apolloClient = new ApolloClient<{}>({
    uri: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: 'include'
    },
    request: operation =>
    {
        return new Promise((resolve, reject) =>
        {
            const token = localStorage.getItem('token')
            operation.setContext({
                headers: {
                    authorization: token
                }
            })
            resolve()
        })
    },
    cache: new InMemoryCache({
        addTypename: false
    }),
    onError: ({ networkError, graphQLErrors }) =>
    {
        console.error('graphQLErrors:', graphQLErrors);
        console.error('networkError', networkError);
    }
});

//---------------------------------------------------------------------------------
// Render App Component (Bootstrap Section)
//---------------------------------------------------------------------------------
ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <RootSession title="My happy CRM" gqlClient={apolloClient}/>
    </ApolloProvider>, document.getElementById('root')
)


//---------------------------------------------------------------------------------
// Service Working Configuration (Off by Default)
//---------------------------------------------------------------------------------
serviceWorker.unregister()
