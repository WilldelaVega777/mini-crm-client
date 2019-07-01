//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                    from 'react'

//---------------------------------------------------------------------------------
// Imports Section (Apollo Interfaces)
//---------------------------------------------------------------------------------
import { QueryGetTopSellers }   from '../../services/operations/queries/dashboard/getTopSellers.query';
import { Q_GET_TOP_SELLERS }    from '../../services/operations/queries/dashboard/getTopSellers.query';
//---------------------------------------------------------------------------------
// Imports Section (Components)
//---------------------------------------------------------------------------------
import { Loading }              from '../../components/Shared/loading'
import Swal                     from 'sweetalert2'
//---------------------------------------------------------------------------------
// Imports Section (Components: Charts)
//---------------------------------------------------------------------------------
import { BarChart }             from 'recharts';
import { Bar }                  from 'recharts';
import { XAxis }                from 'recharts';
import { YAxis }                from 'recharts';
import { CartesianGrid }        from 'recharts';
import { Tooltip }              from 'recharts';

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class TopSellers extends React.Component<ITopSellersProps, ITopSellersState>
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
    private renderLayout(props: ITopSellersProps, state: ITopSellersState)
        : JSX.Element 
    {
        return (
            <React.Fragment>

                <div className={props.className}>
                    {this.getComponentTitle()}

                    <div className="row border border-primary subtle-shadow bg-white" style={{ minHeight: '270px' }}>
                        <div className="col col-md-12 d-flex justify-content-center align-middle">
                            <div className="row">
                                <div className="col col-md-12 my-auto">
                                    <QueryGetTopSellers
                                        query={Q_GET_TOP_SELLERS}
                                        pollInterval={1000}
                                    >
                                        {
                                            ({ loading, error, data, startPolling, stopPolling }) =>
                                            {
                                                if (loading)
                                                {
                                                    return (
                                                        <Loading />
                                                    )
                                                }
                                                if (error)
                                                {
                                                    Swal.fire(
                                                        'Error',
                                                        `Cargando Datos: Parameters empepitation aborting..`,
                                                        'error'
                                                    )
                                                    return ''
                                                }
                                                if (data)
                                                {
                                                    const topSellerData = data.getTopSellers

                                                    return (
                                                        <React.Fragment>
                                                            <BarChart width={430} height={250} data={topSellerData as {}[]}
                                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="name" />
                                                                <YAxis />
                                                                <Tooltip />
                                                                <Bar dataKey="total" fill="#0097e6" />
                                                            </BarChart>
                                                        </React.Fragment>
                                                    )
                                                }
                                            }
                                        }
                                    </QueryGetTopSellers>
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
                    <div className={`col col-md-12 d-flex justify-content-center border border-primary ${this.props.background} pt-3`}>
                        <h6 className={`text-center ${this.props.foreground} mb-3`}>Top Sellers</h6>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface ITopSellersProps
{
    className?: string | undefined
    background: string
    foreground: string
}
//---------------------------------------------------------------------------------
export interface ITopSellersState
{

}
