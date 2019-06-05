//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { QueryGetProduct }          from '../../services/operations/queries/products/getProduct.query'
import { Q_GET_PRODUCT }            from '../../services/operations/queries/products/getProduct.query'
import { ProductInput }             from '../../services/typeDefs/globals/graphql-global-types'
import { MutationRemoveProduct }    from '../../services/operations/mutations/products/remove-product.mutation'
import { M_REMOVE_PRODUCT }         from '../../services/operations/mutations/products/remove-product.mutation'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper }         from '../../helpers/validations.helper'
import { ValidationDescriptor }     from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { ProductLayout }           from '../../components/products/product-layout'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal                         from 'sweetalert2';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class RemoveProduct extends
    React.Component<IRemoveProductProps, IRemoveProductState>
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
    constructor(props: IRemoveProductProps)
    {
        // Calls Super
        super(props)

        // Initial Values for Private Fields
        this.validators = new ValidationHelper()
        this.product    = {} as ProductInput
        this.timeoutId = 0

        // Initialize State
        this.state = {
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
            .form-expand
            {
                min-width: 600px !important;
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
        props: IRemoveProductProps,
        state: IRemoveProductState,
        validators: ValidationHelper
    ): JSX.Element
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params

        return (
            <React.Fragment>
                {/* PAGE TITLE  */}
                <h2 className="text-center">Eliminar Producto</h2>
                <h4 className="text-center mb-3">Está seguro que desea eliminar este producto?</h4>

                {/* GET CUSTOMER DATA  */}
                <QueryGetProduct
                    query={Q_GET_PRODUCT}
                    variables={{ id: id }}
                >
                    {
                        ({ loading, error, data, refetch }) =>
                        {
                            if (loading)
                            {
                                return "Put something that looks good for loading here..."
                            }
                            if (error)
                            {
                                return `Error: ${error.message}`
                            }
                            if (data && data.getProduct)
                            {
                                this.setProduct(id, data.getProduct as ProductInput)
                            }
                            return (

                                <MutationRemoveProduct
                                    mutation={M_REMOVE_PRODUCT}
                                    onCompleted={() => this.props.history.push('/')}
                                >
                                    {
                                        removeProduct =>
                                        {
                                            return (
                                                <React.Fragment>

                                                    <div className="row justify-content-center">
                                                        <form className="form-expand">
                                                            <ProductLayout
                                                                data={this.product}
                                                                validators={this.validators}
                                                                readOnly={true}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger float-right"
                                                                onClick={e => this.confirmRemove(id, removeProduct, refetch)}
                                                            >
                                                                ELIMINAR DEFINITIVAMENTE
                                                            </button>
                                                        </form>

                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                    }
                                </MutationRemoveProduct>
                            )
                        }
                    }
                </QueryGetProduct>
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
        }
    }
    //-------------------------------------------------------------------------
    private async confirmRemove(input: string, removeProduct: any, refetch: any)
    {
        try
        {
            await removeProduct({ variables: { input } })
            await refetch()

            Swal.fire(
                'Eliminar Producto',
                'El Producto ha sido eliminado con éxito.',
                'success'
            )
        }
        catch (error)
        {
            Swal.fire(
                'Eliminar Producto',
                `Error: ${error.message}`,
                'error'
            )
            console.error(error)
        }
    }

}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface IRemoveProductProps
{
    shouldNavigateBack: boolean,
    history: any,
    match: any
}
//---------------------------------------------------------------------------------
export interface IRemoveProductState
{
    validators: ValidationDescriptor[]
}