//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                from 'react';
import { BrowserRouter as Router }          from 'react-router-dom';
import { Route }                            from 'react-router-dom';
import { Switch }                           from 'react-router-dom';
import { ApolloProvider }                   from 'react-apollo';
import ApolloClient, { InMemoryCache }      from 'apollo-boost';
//---------------------------------------------------------------------------------
// Imports Section (App Components)
//---------------------------------------------------------------------------------
import { Header }                           from '../Shared/header';
import { Footer }                           from '../Shared/footer';
import { Customers }                        from '../../views/Customers/customers';
import { CreateCustomer }                   from '../../views/Customers/new-customer';
import { EditCustomer }                     from '../../views/Customers/edit-customer';
import { RemoveCustomer }                   from '../../views/Customers/remove-customer'


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class App extends React.Component<IAppProps, IAppState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private apolloClient        : ApolloClient<{}>;
    
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IAppProps)
    {
        // Call Parent Constructor
        super(props);
        
        // Configure Apollo Client
        this.apolloClient = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache({
                addTypename: false
            }),
            onError: ({ networkError, graphQLErrors }) =>
            {
                console.log('graphQLErrors:', graphQLErrors);
                console.log('networkError', networkError);
            }
        });
    }

    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render() : JSX.Element
    {
        return (
            <ApolloProvider client={this.apolloClient}>
                <Router>
                    <React.Fragment>
                        {this.getCSS()}
                        <Header createButtonCaption="Nuevo Cliente" />
                        <main role="main" className="flex-shrink-0">
                            <div className="container">
                                <Switch>
                                    <Route  exact 
                                            path="/" 
                                            render={(props) => 
                                                <Customers {...props} limit={3} initialOffset={0} />
                                            }
                                    />
                                    <Route  exact 
                                            path="/customer/create"
                                            render={(props) =>
                                                <CreateCustomer {...props} shouldNavigateBack={true} />
                                            }
                                    />
                                    <Route  exact
                                            path="/customer/edit/:id"
                                            render={(props) =>
                                                <EditCustomer {...props} shouldNavigateBack={true} />
                                            }
                                    /> 
                                    <Route exact
                                        path="/customer/remove/:id"
                                        render={(props) =>
                                            <RemoveCustomer {...props} shouldNavigateBack={true} />
                                        }
                                    />                                     
                                </Switch>
                            </div>
                        </main>
                        <Footer/>
                    </React.Fragment>
                </Router>
            </ApolloProvider>
        );
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section
    //-------------------------------------------------------------------------
    private getCSS(): JSX.Element
    {
        const css = `

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

//-----------------------------------------------------------------------------
// Interfaces Section
//-----------------------------------------------------------------------------
interface IAppProps 
{

}
//-----------------------------------------------------------------------------
interface IAppState
{

}