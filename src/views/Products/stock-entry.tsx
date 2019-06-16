//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { SyntheticEvent }           from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Apollo & Interfaces)
//---------------------------------------------------------------------------------
import { QueryGetProduct }          from '../../services/operations/queries/products/getProduct.query'
import { Q_GET_PRODUCT }            from '../../services/operations/queries/products/getProduct.query'
import { ProductInput }             from '../../services/typeDefs/globals/graphql-global-types'
import { MutationUpdateProduct }    from '../../services/operations/mutations/products/edit-product.mutation'
import { M_UPDATE_PRODUCT }         from '../../services/operations/mutations/products/edit-product.mutation'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper }         from '../../helpers/validations.helper'
import { ValidationDescriptor }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { StockEntryLayout }         from '../../components/products/stock-entry-layout'
import { Loading }                  from '../../components/Shared/loading'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal                         from 'sweetalert2'


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class StockEntry extends
    React.Component<IStockEntryProps, IStockEntryState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private validators  : ValidationHelper
    private product     : ProductInput
    private timeoutId   : number

    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IStockEntryProps)
    {
        // Calls Super
        super(props)

        // Initialize ProductInput for State
        const product: ProductInput = {} as ProductInput

        // Initial Values for Private Fields
        this.validators = new ValidationHelper()
        this.product    = product
        this.timeoutId  = 0

        // Initialize State
        this.state = {
            StockEntry: {
                ...product
            },
            newAmount: 0,
            validators: []
        }
    }


    //-------------------------------------------------------------------------
    // Lifecycle Eventhandler Methods
    //-------------------------------------------------------------------------
    async componentWillMount()
    {
        await this.validators.setValidators('Product')
        this.setState({
            validators: this.validators.getValidators()
        })
    }

    //-------------------------------------------------------------------------
    // RENDER Method
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {
        return (
            <React.Fragment>

                {/* Apply CSS  */}
                {this.getCSS()}

                {/* Create Form  */}
                {this.renderForm(this.props, this.state, this.validators)}

            </React.Fragment>
        );
    }

    //-------------------------------------------------------------------------
    // Private Methods Section
    //-------------------------------------------------------------------------
    private getCSS(): JSX.Element
    {
        const css = `
            .button_new_email 
            {
                position:absolute;
                bottom:0             
            }
        `

        return (
            <React.Fragment>
                <style>
                    {css}
                </style>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    private renderForm(
        props: IStockEntryProps,
        state: IStockEntryState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params

        return (
            <React.Fragment>

                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Entrada de Almacén</h2>

                {/* MAIN COMPONENT LAYOUT  */}
                <div className="row justify-content-center">

                    {/* GET CUSTOMER DATA  */}
                    <QueryGetProduct
                        query={Q_GET_PRODUCT}
                        variables={{ id: id }}
                    >
                        {({ loading, error, data, refetch }) =>
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
                            if (data && data.getProduct)
                            {
                                this.setProduct(id, data.getProduct as ProductInput)
                            }
                            return (
                                <React.Fragment>

                                    {/* DEFINE DATA MUTATION / MUTATION UI  */}
                                    <MutationUpdateProduct
                                        mutation={M_UPDATE_PRODUCT}
                                        onCompleted={() => this.props.history.push('/products')}
                                    >
                                        {
                                            (updateProduct) =>
                                            {
                                                return (

                                                    <form name="frmStockEntry"
                                                        className="col-md-8 m-3"
                                                        onSubmit={e => this.frmStockEntry_submit(e, updateProduct, refetch)}
                                                    >
                                                        <StockEntryLayout
                                                            data={this.product}
                                                            validators={this.validators}
                                                            onAmountChanged={(e: number) => this.stockEntryLayout_amountChanged(e)}
                                                        />
                                                    </form>

                                                )
                                            }
                                        }
                                    </MutationUpdateProduct>

                                </React.Fragment>
                            )
                        }}
                    </QueryGetProduct>
                </div>
            </React.Fragment>
        )
    }
    //-------------------------------------------------------------------------
    private setProduct(id: string, ci: ProductInput)
    {
        if (!this.product.id)
        {
            this.product = ci
            this.product.id = id
            this.timeoutId = window.setTimeout(() =>
            {
                this.setState({
                    StockEntry: this.product
                })
                window.clearTimeout(this.timeoutId)
            }, 0)
        }
    }

    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    stockEntryLayout_amountChanged(e: number)
    {
        this.setState({
            newAmount: e
        })
    }

    //-------------------------------------------------------------------------
    async frmStockEntry_submit(e: SyntheticEvent, updateProduct: any, refetch: any)
    : Promise<void | undefined>
    {
        e.preventDefault()
        e.persist()

        // Validation Analysis        
        if ((e.target as HTMLFormElement).checkValidity())
        {
            // Specific Form (Entity) Preparation

            this.setState({
            StockEntry : ({
                ...this.state.StockEntry,
                stock: this.state.StockEntry.stock += this.state.newAmount,
                projected_stock: (this.product.projected_stock as number) += this.state.newAmount
            } as ProductInput)
            })

            const input = {
                ...this.state.StockEntry
            }

            try
            {
                await updateProduct({
                    variables: { input }
                })

                await refetch()

                Swal.fire(
                    'Actualizar Producto',
                    'El Producto ha sido actualizado con éxito.',
                    'success'
                )
            }
            catch (error)
            {
                Swal.fire(
                    'Actualizar Producto',
                    `Error: ${error.message}`,
                    'error'
                )
                console.error(error)
            }

        }
    }
}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface IStockEntryProps
{
    shouldNavigateBack: boolean,
    history: any,
    match: any
}
//---------------------------------------------------------------------------------
export interface IStockEntryState
{
    StockEntry  : ProductInput,
    newAmount   : number,
    validators  : ValidationDescriptor[]
}