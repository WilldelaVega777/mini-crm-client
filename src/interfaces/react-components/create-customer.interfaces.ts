//---------------------------------------------------------------------------------
// Import Methods Section
//---------------------------------------------------------------------------------
import { CustomerInput }        from '../../services/typeDefs/globals/graphql-global-types'
import { ValidationError  }     from '../../helpers/validations.helper';
import { ValidationHelper }     from '../../helpers/validations.helper';

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface ICreateCustomersProps
{
    shouldNavigateBack  : boolean,
    history             : any
}
//---------------------------------------------------------------------------------
export interface ICreateCustomersState
{
    newCustomer     : CustomerInput
}