//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
//import { SyntheticEvent }     from 'react'
import { ValidationHelper }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { CustomerLayout }       from '../customers/customer-layout'
import { CtrlSubmit }           from '../Shared/ctrl-submit'
import { CustomerInput }        from '../../services/typeDefs/globals/graphql-global-types'
import { ProductInput }         from '../../services/typeDefs/globals/graphql-global-types'
import { OrderItemInput }       from '../../services/typeDefs/globals/graphql-global-types'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Select                   from 'react-select'
import Animated                 from 'react-select/animated'
import { Products } from '../../views/Products/_products';

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IOrderLayoutProps
{
    customer?       : CustomerInput | undefined
    products        : ProductInput[]
    orderItems      : OrderItemInput[]
    validators      : ValidationHelper
    readOnly?       : boolean | undefined
    maxEmails?      : number  | undefined
}
interface IOrderLayoutState
{
        
}

//-------------------------------------------------------------------------
// Component for Emails:
//-------------------------------------------------------------------------
export class OrderLayout extends React.Component<IOrderLayoutProps, IOrderLayoutState>
{
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------    
    constructor(props: IOrderLayoutProps)
    {
        super(props)
        
        this.state = {
            
        }
    }
    
    //-------------------------------------------------------------------------
    // Render Method
    //-------------------------------------------------------------------------
    public render()
    {
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <h4 className="mb-3 text-secondary" style={{textAlign: 'center'}}>
                                Resumen del Cliente
                            </h4>
                            <hr/>
                            <CustomerLayout
                                data={this.props.customer}
                                emails={(this.props.customer as CustomerInput).emails}
                                validators={this.props.validators}
                                readOnly={true}
                                maxEmails={1}
                                hideLabels={true}
                            />
                        </div>
                        <div className="col col-md-8">
                            <div className="row">
                                <div className="col col-md-12 d-flex justify-content-center">
                                    <h4 className="mb-3 ml-5 text-secondary">
                                        Datos de la Orden
                                    </h4>
                                </div>
                            </div>
                            <div className="row ml-5">
                                <div className="col col-md-12">
                                    <Select 
                                        options={this.props.products.map(product => {
                                            return {
                                                label: product.name,
                                                value: product.id
                                            }
                                        })} 
                                        isMulti={true}
                                        components={Animated()}
                                        placeholder="Seleccionar Productos"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                <div className="container">
                    <div className="form-row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <CtrlSubmit/>
                        </div>
                    </div>                
                </div>
            </React.Fragment>
        )
    }
}