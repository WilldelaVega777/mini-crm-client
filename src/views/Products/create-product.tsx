//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
import { SyntheticEvent }           from 'react'
//---------------------------------------------------------------------------------
// Imports Section (Apollo Types/Interfaces)
//---------------------------------------------------------------------------------
import { ProductInput }             from '../../services/typeDefs/globals/graphql-global-types'
import { MutationCreateProduct }    from '../../services/operations/mutations/products/create-product.mutation'
import { M_CREATE_PRODUCT }         from '../../services/operations/mutations/products/create-product.mutation'
//---------------------------------------------------------------------------------
// Imports Section (Helper Functions)
//---------------------------------------------------------------------------------
import { ValidationHelper } from '../../helpers/validations.helper'
import { ValidationDescriptor } from '../../helpers/validations.helper'
//---------------------------------------------------------------------------------
// Imports Section (Internal Components)
//---------------------------------------------------------------------------------
import { ProductLayout } from '../../components/products/product-layout'
//---------------------------------------------------------------------------------
// Imports Section (External Components)
//---------------------------------------------------------------------------------
import Swal from 'sweetalert2';


//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class CreateProduct extends
    React.Component<ICreateProductProps, ICreateProductState>
{
    //-------------------------------------------------------------------------
    // Private Fields Section
    //-------------------------------------------------------------------------
    private validators: ValidationHelper;

    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: ICreateProductProps)
    {
        // Calls Super
        super(props)

        // Initialize ProductInput for State
        const product: ProductInput = {} as ProductInput

        // Initial Values for Private Fields
        this.validators = new ValidationHelper();

        // Initialize State
        this.state = {
            newProduct: {
                ...product,
                price       : 0.0,
                stock       : 0
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
        // Return Form
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
        props: ICreateProductProps,
        state: ICreateProductState,
        validators: ValidationHelper
    ): JSX.Element 
    {
        return (
            <React.Fragment>
                {/* PAGE TITLE  */}
                <h2 className="text-center mb-3">Agregar Nuevo Producto</h2>

                {/* MAIN COMPONENT LAYOUT  */}
                <div className="row justify-content-center">

                    {/* DEFINE DATA MUTATION / MUTATION UI  */}
                    <MutationCreateProduct
                        mutation={M_CREATE_PRODUCT}
                        onCompleted={() => this.props.history.push('/products')}
                    >
                        {(createProduct: any) =>
                        {
                            return (

                                <form name="frmNewProduct"
                                    className="col-md-8 m-3"
                                    onSubmit={e => this.frmNewProduct_submit(e, createProduct)}
                                    onChange={e => this.frmNewProduct_change(e)}
                                >

                                    <ProductLayout
                                        validators={this.validators}
                                    />

                                </form>
                            )
                        }}
                    </MutationCreateProduct>
                </div>


            </React.Fragment>

        )
    }

    
    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    frmNewProduct_change(e: SyntheticEvent)
    {
        let { name, value } = (e.target as HTMLFormElement)

        // Debug:
        //const message = `Campo: ${name}, Valor: ${value}`
        //console.log(message);

        value = ((name === "price") ? Number(value) : value)
        value = ((name === "reorder") ? Number(value) : value)
        value = ((name === "stock") ? Number(value) : value)
        
        this.setState({
            newProduct: {
                ...this.state.newProduct,
                [name]: value
            }
        })

    }
    //-------------------------------------------------------------------------
    async frmNewProduct_submit(e: SyntheticEvent, createProduct: any): Promise<void | undefined>
    {
        e.preventDefault()
        e.persist()

        // Validation Analysis        
        if ((e.target as HTMLFormElement).checkValidity())
        {
            // Specific Form (Entity) Preparation
            const input = {
                ...this.state.newProduct
            }

            try
            {
                await createProduct({
                    variables: { input }
                })

                Swal.fire(
                    'Crear Nuevo Producto',
                    'El Nuevo Producto ha sido guardado con éxito.',
                    'success'
                )
            }
            catch (error)
            {
                Swal.fire(
                    'Crear Nuevo Producto',
                    `Error: ${error.message}`,
                    'error'
                )
                console.error(error)
            }

            await (e.target as HTMLFormElement).reset()
        }
    }
}

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
interface ICreateProductProps
{
    shouldNavigateBack: boolean,
    history: any
}
//---------------------------------------------------------------------------------
interface ICreateProductState
{
    newProduct: ProductInput,
    validators: ValidationDescriptor[]
}