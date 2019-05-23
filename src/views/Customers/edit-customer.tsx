//---------------------------------------------------------------------------------
// Imports Section (React Libs)
//---------------------------------------------------------------------------------
import React                        from 'react'
//---------------------------------------------------------------------------------
// Imports Section (React Component Interfaces)
//---------------------------------------------------------------------------------
import { IEditCustomerProps }       from '../../interfaces/react-components/edit-customer.interfaces'
import { IEditCustomerState }       from '../../interfaces/react-components/edit-customer.interfaces';
//---------------------------------------------------------------------------------
// Imports Section (Apollo Interfaces)
//---------------------------------------------------------------------------------
// import { IEditCustomerData }        from '../../interfaces/apollo/edit-customer.interfaces';
// import { IEditCustomerVariables}    from '../../interfaces/apollo/edit-customer.interfaces';

//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class EditCustomer extends React.Component<IEditCustomerProps, IEditCustomerState>
{
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IEditCustomerProps)
    {
        // Calls Super
        super(props)

        this.state = {

        }
    }

    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {
        return (
            <h2 className="text-center mb-3">Editar Cliente</h2>
        );
    }
}
