//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                from 'react'
import { BrowserRouter as Router }          from 'react-router-dom'
import { Route }                            from 'react-router-dom'
import { Switch }                           from 'react-router-dom'
import { ApolloClient }                     from 'apollo-boost'

//---------------------------------------------------------------------------------
// Imports Section (App Components)
//---------------------------------------------------------------------------------
import { PrivateRoute }                     from '../security/HOC/private-route'

import { Header }                           from '../Shared/header'
import { Footer }                           from '../Shared/footer'

import { Login }                            from '../../views/Security/login'

import { withSession }                      from '../security/HOC/with-session'
import { Dashboard }                        from '../../views/Dashboard/dashboard'

import { Users }                            from '../../views/Users/_users'
import { CreateUser }                       from '../../views/Users/create-user'
import { EditUser }                         from '../../views/Users/edit-user'
import { RemoveUser }                       from '../../views/Users/remove-user'

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


//-----------------------------------------------------------------------------
// Interfaces Section
//-----------------------------------------------------------------------------
interface IAppProps 
{
    title       : string
    gqlClient   : ApolloClient<{}>
    refetch     : any
    session     : any
    location    : any
}

//---------------------------------------------------------------------------------
// Component SFC
//---------------------------------------------------------------------------------
const App = (props: IAppProps) => {
    
    // Destructure, so HOC props can be reached by Route Component props
    const {gqlClient,refetch, session} = props

    const message = ((session.username !== "null") ? `Bienvenid@ ${session.first_name} ${session.last_name}` : '')
    
    return (
        <Router>
            <React.Fragment>
                <Header title={props.title} welcomeMessage={message} session={session} createButtonCaption="Nuevo Cliente" />
                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <Switch> 

                            {/* Security */}
                            <Route exact
                                path="/"
                                render={(props) =>
                                    <Login 
                                        {...props} 
                                        refetch={refetch}
                                        session={session}
                                        shouldNavigateBack={true} 
                                    />
                                }
                            />                                    

                            {/* /Dashboard */}
                            <PrivateRoute  
                                exact 
                                path="/dashboard" 
                                authenticatedUser={session}
                                render={(props) => 
                                    <Dashboard
                                        {...props}
                                        shouldNavigateBack={true}
                                    />
                                }
                            />
                          
                            
                            {/* Users */}
                            <PrivateRoute exact
                                path="/users"
                                authenticatedUser={session}
                                render={(props) =>
                                    <Users 
                                        {...props} 
                                        limit={3} 
                                        initialOffset={0}
                                        session={session}
                                    />
                                }
                            />  
                            <PrivateRoute exact
                                path="/user/create"
                                authenticatedUser={session}
                                render={(props) =>
                                    <CreateUser 
                                        {...props} 
                                        shouldNavigateBack={true}
                                        session={session}
                                    />
                                }
                            />
                            <PrivateRoute exact
                                path="/user/edit/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <EditUser 
                                        {...props} 
                                        shouldNavigateBack={true}
                                        session={session}
                                    />
                                }
                            />
                            <PrivateRoute exact
                                path="/user/remove/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <RemoveUser 
                                        {...props} 
                                        shouldNavigateBack={true} 
                                        session={session}
                                    />
                                }
                            />  


                            {/* Customers */}
                            <PrivateRoute exact
                                path="/customers"
                                authenticatedUser={session}
                                render={(props) =>
                                    <Customers
                                        {...props}
                                        limit={3}
                                        initialOffset={0}
                                        session={session}
                                        gqlClient={gqlClient}
                                    />
                                }
                            />   
                            <PrivateRoute  exact 
                                path="/customer/create"
                                authenticatedUser={session}
                                render={(props) =>
                                    <CreateCustomer 
                                        {...props} 
                                        session={session}
                                        shouldNavigateBack={true} 
                                    />
                                }
                            />
                            <PrivateRoute  exact
                                path="/customer/edit/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <EditCustomer 
                                        {...props}
                                        session={session}
                                        shouldNavigateBack={true} 
                                    />
                                }
                            /> 
                            <PrivateRoute exact
                                path="/customer/remove/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <RemoveCustomer 
                                        {...props} 
                                        shouldNavigateBack={true} 
                                    />
                                }
                            />     
                            
                            {/* Products */}
                            <PrivateRoute exact
                                path="/products"
                                authenticatedUser={session}
                                render={(props) =>
                                    <Products 
                                        {...props} 
                                        limit={3} 
                                        initialOffset={0} 
                                    />
                                }
                            />
                            <PrivateRoute exact
                                path="/product/create"
                                authenticatedUser={session}
                                render={(props) =>
                                    <CreateProduct 
                                        {...props} 
                                        shouldNavigateBack={true} 
                                    />
                                }
                            />
                            <PrivateRoute exact
                                path="/product/edit/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <EditProduct 
                                        {...props} 
                                        shouldNavigateBack={true} 
                                    />
                                }
                            />    
                            <PrivateRoute exact
                                path="/product/remove/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <RemoveProduct 
                                        {...props} 
                                        shouldNavigateBack={true} 
                                    />
                                }
                            />
                            
                            <PrivateRoute exact
                                path="/product/entry/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <StockEntry 
                                        {...props} 
                                        shouldNavigateBack={true} 
                                    />
                                }
                            />                                    
                            
                            {/* Orders */}
                            <PrivateRoute exact
                                path="/orders/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <Orders 
                                        {...props} 
                                        limit={3} 
                                        initialOffset={0} 
                                        shouldNavigateBack={true}
                                        session={session}
                                    />
                                }
                            />                                    
                            
                            <PrivateRoute exact
                                path="/order/create/:id"
                                authenticatedUser={session}
                                render={(props) =>
                                    <CreateOrder 
                                        {...props} 
                                        shouldNavigateBack={true}
                                        session={session}
                                    />
                                }
                            />
                                                                                                                                                                                                
                        </Switch>
                    </div>
                </main>
                <Footer session={session}/>
            </React.Fragment>
        </Router>
    );
}

//-----------------------------------------------------------------------------
// Exports Section
//-----------------------------------------------------------------------------
const RootSession = withSession(App)
export { RootSession }