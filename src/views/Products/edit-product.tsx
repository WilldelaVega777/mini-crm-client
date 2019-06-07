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
import { ProductLayout }            from '../../components/products/product-layout'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal from 'sweetalert2';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class EditProduct extends
    React.Component<IEditProductProps, IEditProductState>
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
    constructor(props: IEditProductProps)
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
            editProduct: {
                ...product,
                price: 0.0,
                stock: 0
            },
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
        props: IEditProductProps,
        state: IEditProductState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        // Obtain Customer Id from Route
        const { id } = this.props.match.params

        return (
            <React.Fragment>

                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Editar Producto</h2>

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

                                                    <form name="frmEditProduct"
                                                        className="col-md-8 m-3"
                                                        onSubmit={e => this.frmEditProduct_submit(e, updateProduct, refetch)}
                                                        onChange={e => this.frmEditProduct_change(e)}
                                                    >

                                                        <ProductLayout
                                                            data={this.product}
                                                            validators={this.validators}
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
                    editProduct: this.product
                })
                window.clearTimeout(this.timeoutId)
            }, 0)
        }
    }

    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    frmEditProduct_change(e: SyntheticEvent)
    {
        let { name, value } = (e.target as HTMLFormElement)

        // Debug:
        //const message = `Campo: ${name}, Valor: ${value}`
        //console.log(message);

        value = ((name === "price") ? Number(value) : value)
        value = ((name === "stock") ? Number(value) : value)

        this.setState({
            editProduct: {
                ...this.state.editProduct,
                [name]: value
            }
        })
    }
    //-------------------------------------------------------------------------
    async frmEditProduct_submit(e: SyntheticEvent, updateProduct: any, refetch: any)
    : Promise<void | undefined>
    {
        e.preventDefault()
        e.persist()

        // Validation Analysis        
        if ((e.target as HTMLFormElement).checkValidity())
        {
            // Specific Form (Entity) Preparation
            const input = {
                ...this.state.editProduct
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
export interface IEditProductProps
{
    shouldNavigateBack: boolean,
    history: any,
    match: any
}
//---------------------------------------------------------------------------------
export interface IEditProductState
{
    editProduct: ProductInput,
    validators: ValidationDescriptor[]
}