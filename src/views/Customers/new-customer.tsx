//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { CustomerInput }            from '../../services/typeDefs/globals/graphql-global-types';
import { CustomerType }             from '../../services/typeDefs/globals/graphql-global-types';
import { MutationCreateCustomer }   from '../../services/operations/mutations/create-customer.mutation';
import { M_CREATE_CUSTOMER }        from '../../services/operations/mutations/create-customer.mutation'
//---------------------------------------------------------------------------------
// Imports Section (React Component Interfaces)
//---------------------------------------------------------------------------------
import { ICreateCustomersProps }    from '../../interfaces/react-components/create-customer.interfaces';
import { ICreateCustomersState}     from '../../interfaces/react-components/create-customer.interfaces';
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { getEnumFromString }        from '../../helpers/type.helpers';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class CreateCustomer extends 
                    React.Component<ICreateCustomersProps, ICreateCustomersState>
{
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ICreateCustomersProps)
    {
        // Calls Super
        super(props)

        // Initialize CustomerInput for State
        var customer: CustomerInput = {} as CustomerInput
        
        // Initialize State
        this.state = {
            newCustomer : {
                ...customer,
                age: 0,
                type: CustomerType.BASIC
            }
        }
    }

    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {
        return (
          <React.Fragment>
            {/* PAGE TITLE  */}
            <h2 className="text-center mb-3">Agregar Nuevo Cliente</h2>

            {/* DATA ENTRY FORM  */}
            <div className="row justify-content-center">
                <MutationCreateCustomer 
                    mutation={M_CREATE_CUSTOMER}
                >
                    { (createCustomer: any) => (
                            <form name="frmNewCustomer"
                                className="col-md-8 m-3"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    e.persist()
                                                                        
                                    const input = {
                                        ...this.state.newCustomer,
                                        age: Number(this.state.newCustomer.age),
                                    }
                                    
                                    createCustomer({
                                        variables: {input}
                                    }).then(() => {
                                        (e.target as HTMLFormElement).reset()
                                    })
                                }}
                            >
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre"
                                            onChange={e => {
                                                this.setState({
                                                    newCustomer: {
                                                        ...this.state.newCustomer,
                                                        first_name: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Apellido"
                                            onChange={e => {
                                                this.setState({
                                                    newCustomer:{
                                                        ...this.state.newCustomer,
                                                        last_name: e.target.value 
                                                    } 
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Empresa</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Empresa"
                                            onChange={e => {
                                                this.setState({
                                                    newCustomer:{
                                                        ...this.state.newCustomer,
                                                        company: e.target.value   
                                                    }   
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={e => {
                                                this.setState({
                                                    newCustomer:{
                                                        ...this.state.newCustomer,
                                                        email: e.target.value     
                                                    }  
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Edad</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Edad"
                                            onChange={e => {
                                                this.setState({
                                                    newCustomer:{
                                                        ...this.state.newCustomer,
                                                        age: Number(e.target.value)
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Tipo Cliente</label>
                                        <select className="form-control"
                                            onChange={e => {
                                                this.setState({
                                                    newCustomer:{
                                                        ...this.state.newCustomer,
                                                        type: getEnumFromString(CustomerType, e.target.value)
                                                    }
                                                });
                                            }}
                                        >
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASIC">BASICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success float-right"
                                >
                                Guardar Cambios
                                </button>
                            </form>
                        )
                    }
                </MutationCreateCustomer>
            </div>
          </React.Fragment>
        );
    }
}

