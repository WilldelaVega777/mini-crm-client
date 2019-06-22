//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                from 'react'
import ApolloClient                         from 'apollo-boost' 
import { BrowserRouter as Router }          from 'react-router-dom'
import { Route }                            from 'react-router-dom'
import { Switch }                           from 'react-router-dom'
import { ApolloProvider }                   from 'react-apollo'
import { InMemoryCache }                    from 'apollo-boost';
//---------------------------------------------------------------------------------
// Imports Section (App Components)
//---------------------------------------------------------------------------------
import { Header }                           from '../Shared/header'
import { Footer }                           from '../Shared/footer'

import { Dashboard }                        from '../../views/Dashboard/dashboard'

import { Customers }                        from '../../views/Customers/_customers'
import { CreateCustomer }                   from '../../views/Customers/create-customer'
import { EditCustomer }                     from '../../views/Customers/edit-customer'
import { RemoveCustomer }                   from '../../views/Customers/remove-customer' 

import { Products }                         from '../../views/Products/_products'
import { CreateProduct }                    from '../../views/Products/create-product'
import { EditProduct }                      from '../../views/Products/edit-product'
import { RemoveProduct }                    from '../../views/Products/remove-product'
import { StockEntry }                       from '../../views/Products/stock-entry'

import { Orders }                           from '../../views/Orders/_orders'
import { CreateOrder }                      from '../../views/Orders/create-order'


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class App extends React.Component<IAppProps, IAppState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private apolloClient        : ApolloClient<{}>
    
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
                                    
                                    {/* / */}           
                                    <Route  exact 
                                        path="/" 
                                        render={(props) => 
                                            <Dashboard {...props} shouldNavigateBack={true} />
                                        }
                                    />
                                                                        
                                    {/* Dashboard */}
                                    <Route exact
                                        path="/dashboard"
                                        render={(props) =>
                                            <Dashboard {...props} shouldNavigateBack={true}/>
                                        }
                                    />                                      
                                    
                                    {/* Customers */}
                                    <Route exact
                                        path="/customers"
                                        render={(props) =>
                                            <Customers {...props} limit={3} initialOffset={0} client={this.apolloClient} />
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
                                    
                                    {/* Products */}
                                    <Route exact
                                        path="/products"
                                        render={(props) =>
                                            <Products {...props} limit={3} initialOffset={0} />
                                        }
                                    />
                                    <Route exact
                                        path="/product/create"
                                        render={(props) =>
                                            <CreateProduct {...props} shouldNavigateBack={true} />
                                        }
                                    />
                                    <Route exact
                                        path="/product/edit/:id"
                                        render={(props) =>
                                            <EditProduct {...props} shouldNavigateBack={true} />
                                        }
                                    />    
                                    <Route exact
                                        path="/product/remove/:id"
                                        render={(props) =>
                                            <RemoveProduct {...props} shouldNavigateBack={true} />
                                        }
                                    />
                                    
                                    <Route exact
                                        path="/product/entry/:id"
                                        render={(props) =>
                                            <StockEntry {...props} shouldNavigateBack={true} />
                                        }
                                    />                                    
                                    
                                    {/* Orders */}
                                    <Route exact
                                        path="/orders/:id"
                                        render={(props) =>
                                            <Orders {...props} limit={3} initialOffset={0} shouldNavigateBack={true}/>
                                        }
                                    />                                    
                                    
                                    <Route exact
                                        path="/order/create/:id"
                                        render={(props) =>
                                            <CreateOrder {...props} shouldNavigateBack={true} />
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