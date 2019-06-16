//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                from 'react'

//---------------------------------------------------------------------------------
// Imports Section (Apollo Interfaces)
//---------------------------------------------------------------------------------
import { QueryGetTopCustomers }             from '../../services/operations/queries/dashboard/getTopCustomers.query';
import { Q_GET_TOP_CUSTOMERS }              from '../../services/operations/queries/dashboard/getTopCustomers.query';
//---------------------------------------------------------------------------------
// Imports Section (Components)
//---------------------------------------------------------------------------------
import { Loading }                          from '../../components/Shared/loading'
import Swal                                 from 'sweetalert2'
//---------------------------------------------------------------------------------
// Imports Section (Components: Charts)
//---------------------------------------------------------------------------------
import { BarChart }                         from 'recharts';
import { Bar }                              from 'recharts';
import { XAxis }                            from 'recharts';
import { YAxis }                            from 'recharts';
import { CartesianGrid }                    from 'recharts';
import { Tooltip }                          from 'recharts';

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class TopCustomers extends React.Component<ITopCustomersProps, ITopCustomersState>
{       
    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {   
        return (
            <React.Fragment>

                {/* Apply CSS  */}
                {this.getCSS()}
                
                {/* Create Layout  */}
                {this.renderLayout(this.props, this.state)}
                
            </React.Fragment>
        );
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section (UI)
    //-------------------------------------------------------------------------
    private getCSS(): JSX.Element
    {
        const css = `
            .rise-little 
            {
                margin-top: 7px !important; 
            }
        `

        return (
            <style>
                {css}
            </style>
        )
    }
    //-------------------------------------------------------------------------
    private renderLayout(props: ITopCustomersProps, state: ITopCustomersState)
    : JSX.Element 
    {
        return (
            <React.Fragment>
                
                <div className={props.className}>
                    { this.getComponentTitle() }

                    <div className="row border border-primary subtle-shadow bg-white" style={{ minHeight: '270px'}}>
                        <div className="col col-md-12 d-flex justify-content-center align-middle">
                            <div className="row">
                                <div className="col col-md-12 my-auto">
                                    <QueryGetTopCustomers 
                                        query={Q_GET_TOP_CUSTOMERS} 
                                        pollInterval={1000}
                                    >
                                    {
                                        ({loading, error, data, startPolling, stopPolling}) => {
                                            if (loading)
                                            {
                                                return (
                                                    <Loading/>
                                                )
                                            }
                                            if (error)
                                            {
                                                //${error.message}`
                                                Swal.fire(
                                                    'Error', 
                                                    `Cargando Datos: Parameters empepitation aborting..`,
                                                    'error'
                                                )
                                                return ''
                                            }
                                            if (data)
                                            {
                                                const topCustomerData = data.getTopCustomers
                                                
                                                return (
                                                    <React.Fragment>
                                                        <BarChart width={430} height={250} data={topCustomerData as {}[]}
                                                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                                            <CartesianGrid strokeDasharray="3 3"/>
                                                            <XAxis dataKey="name"/>
                                                            <YAxis/>
                                                            <Tooltip/>
                                                            <Bar dataKey="total" fill="#fdcb6e" />
                                                        </BarChart>
                                                    </React.Fragment>
                                                )
                                            }
                                        }   
                                    }
                                    </QueryGetTopCustomers>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
            </React.Fragment>
        )
    }    
    //-------------------------------------------------------------------------
    private getComponentTitle(): JSX.Element
    {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col col-md-12 d-flex justify-content-center border border-primary bg-primary pt-3">
                        <h6 className="text-center text-light mb-3">Mejores Clientes</h6>
                    </div>
                </div>             
            </React.Fragment>
        )
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section (Utility)
    //-------------------------------------------------------------------------

 
}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface ITopCustomersProps
{
    className? : string | undefined
}
//---------------------------------------------------------------------------------
export interface ITopCustomersState
{

}
