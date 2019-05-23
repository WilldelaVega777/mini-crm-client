//---------------------------------------------------------------------------------
// Import Methods Section
//---------------------------------------------------------------------------------
import { CustomerInput } from '../../services/typeDefs/globals/graphql-global-types';

//---------------------------------------------------------------------------------
// Interface Definitions Section
//---------------------------------------------------------------------------------
export interface ICreateCustomersProps
{
    limit: string
}
//---------------------------------------------------------------------------------
export interface ICreateCustomersState
{
    newCustomer: CustomerInput
}