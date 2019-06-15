//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                                                    from 'react'
import { getProductsPaginated_getProducts_products as Product } from '../../services/typeDefs/operations/getProductsPaginated'
import { QueryGetProducts }                                     from '../../services/operations/queries/products/getProductsPaginated.query'
import { Q_GET_PRODUCTS }                                       from '../../services/operations/queries/products/getProductsPaginated.query'
import { ProductItem }                                          from '../../components/products/product-item'
import { Paginator }                                            from '../../components/Shared/paginator'
import { Link }                                                 from 'react-router-dom'
import { Loading }                                              from '../../components/Shared/loading'
import Swal                                                     from 'sweetalert2'

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Products extends React.Component<IProductsProps, IProductsState> 
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private products: Product[]
    private totalRecords: number

    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IProductsProps)
    {
        // Calls Super
        super(props)

        // Initialize Private Fields
        this.products = []
        this.totalRecords = 0

        // Initialize State
        this.state = {
            offset: 0,
            initialPageInRange: 1,
            currentPage: 1
        }
    }

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
    private renderLayout(props: IProductsProps, state: IProductsState)
        : JSX.Element 
    {
        return (
            <React.Fragment>
                <QueryGetProducts
                    query={Q_GET_PRODUCTS}
                    variables={{ limit: props.limit, offset: this.state.offset, stock: false }}
                    pollInterval={1000}
                >
                    {({ loading, error, data, startPolling, stopPolling, refetch }) =>
                    {
                        if (loading)
                        {
                            return (
                                <Loading/>
                            )
                        }
                        if (error)
                        {
                            Swal.fire(
                                'Error', 
                                `Cargando Datos: ${error.message}`, 
                                'error'
                            )
                            return ''
                        }
                        if (data)
                        {
                            // Pass Data to Private Properties
                            this.products = data.getProducts.products
                            this.totalRecords = data.getProducts.metadata.totalRecords

                            // Build UI
                            return (
                                <React.Fragment>
                                    
                                    {/* PAGE TITLE */}
                                    {this.getPageTitle()}                                    

                                    {/* Product List */}
                                    <table className="table">
                                        <thead>
                                            <tr className="table-primary">
                                                <th className="text-center">Nombre</th>
                                                <th className="text-left">Precio</th>
                                                <th className="text-center">Reorden</th>
                                                <th className="text-center">Existencia</th>
                                                <th className="text-center"></th>
                                                <th className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.products.map(product => (
                                                <ProductItem product={(product as Product)} key={product.id} />
                                            ))
                                        }   
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
                                    <Paginator
                                        maxRangeSize={3}
                                        pageSize={this.props.limit}
                                        totalRecords={this.totalRecords}
                                        currentPage={this.state.currentPage}
                                        initialPageInRange={this.state.initialPageInRange}
                                        onPageChange={
                                            (newOffset: number, newPage: number, initialRange?: number | undefined) =>
                                            {
                                                (initialRange) ?
                                                    this.setPageFor(newOffset, newPage, initialRange)
                                                    : this.setPageFor(newOffset, newPage)
                                            }
                                        }
                                    />
                                </React.Fragment>
                            )
                        }
                    }}
                </QueryGetProducts>

            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    private getPageTitle(): JSX.Element
    {
        return (
            <div className="row">
                <div className="col col-md-8 d-flex justify-content-end">
                    <h2 className="text-center mb-3">Lista de Productos</h2>
                </div>
                <div className="col col-md-4 d-flex justify-content-end">
                    <Link to="/product/create" className="btn btn-success my-auto mr-3 rise-little">
                        Nuevo Producto
                    </Link>
                </div>
            </div>            
        )
    }

    //-------------------------------------------------------------------------
    // Private Methods Section (Utility)
    //-------------------------------------------------------------------------
    private setPageFor(offset: number, page: number, initialRange?: number | undefined)
    {
        if (initialRange)
        {
            this.setState({
                offset: offset,
                currentPage: page,
                initialPageInRange: initialRange
            })
        }
        else
        {
            this.setState({
                offset: offset,
                currentPage: page
            })
        }
    }

}

//---------------------------------------------------------------------------------
// Interface Declarations Section
//---------------------------------------------------------------------------------
export interface IProductsProps
{
    limit: number
    initialOffset: number
}
//---------------------------------------------------------------------------------
export interface IProductsState
{
    offset: number
    currentPage: number
    initialPageInRange: number
}