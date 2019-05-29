//---------------------------------------------------------------------
// Imports Interfaces Section:
//---------------------------------------------------------------------
import { EnvironmentService }       from '../services/app-services/environment-service'

//---------------------------------------------------------------------
// Exported Interfaces Section:
//---------------------------------------------------------------------
export interface ValidationDescriptor
{
    field: string | null;
    type: string | null;
    required: boolean;
    max: number | null;
    min: number | null;
    regex: string | null;
}
//---------------------------------------------------------------------
export interface ValidationError
{
    field       : string
    type        : ErrorTypes
}


//---------------------------------------------------------------------
// Exported Enum Types Section
//---------------------------------------------------------------------
export enum ErrorTypes
{
    required = "El campo es requerido",
    max      = "El valor es muy alto",
    min      = "El valor es muy bajo",
    format   = "Error de formato, por favor revise"
}


//---------------------------------------------------------------------
// Main Validation Class Section
//---------------------------------------------------------------------
export class ValidationHelper
{    
    //-----------------------------------------------------------------
    // Private Fields Section
    //-----------------------------------------------------------------
    private validations: ValidationDescriptor[];
    
    //-----------------------------------------------------------------
    // Constructor Method Section
    //-----------------------------------------------------------------
    constructor()
    {
        this.validations = [];
    }
    
    //-----------------------------------------------------------------
    // Public Methods Section
    //-----------------------------------------------------------------
    public async setValidators(schema: string)
    {
        try
        {
            const response = await fetch(
                EnvironmentService.getInstance().getApiUrlFor(schema)
            )
            const data = await response.json()
            this.validations = (data as ValidationDescriptor[])
        }
        catch (e)
        {
            const error = e.message
            throw new Error(error)
        }
    }
    //-----------------------------------------------------------------
    public getValidators(): ValidationDescriptor[]
    {
        return this.validations    
    }
    
    //-----------------------------------------------------------------
    public runValidations(data: any): ValidationError[]  
    {
        return [{ field: "firstName", type: ErrorTypes.required }]
    }
    //-----------------------------------------------------------------
    public getRequired(field: string) : boolean
    {   
        const validator: ValidationDescriptor = 
            this.getVO(field, this.validations)
                
        return ((validator && validator.required) ? validator.required : false)
    }
    //-----------------------------------------------------------------
    public getMaxLength(field: string): number
    {   
        const validator: ValidationDescriptor =
            this.getVO(field, this.validations)

        return ((validator && validator.max) ? validator.max : 100)
    }
    //-----------------------------------------------------------------
    public getMinLength(field: string): number
    {
        const validator: ValidationDescriptor =
            this.getVO(field, this.validations)

        return ((validator && validator.min) ? validator.min : 0)
    }
    //-----------------------------------------------------------------
    public getMax(field: string): number
    {
        const validator: ValidationDescriptor =
            this.getVO(field, this.validations)

        return ((validator && validator.max) ? validator.max : 100)
    }    
    //-----------------------------------------------------------------
    public getMin(field: string): number
    {
        const validator: ValidationDescriptor =
            this.getVO(field, this.validations)

        return ((validator && validator.min) ? validator.min : 0)
    }
    //-----------------------------------------------------------------
    public getRegex(field: string): string
    {
        const validator: ValidationDescriptor =
            this.getVO(field, this.validations)

        return ((validator && validator.regex) ? validator.regex : '')
    }    
    
    //-----------------------------------------------------------------
    // Private Methods Section
    //-----------------------------------------------------------------
    private getVO(field: string, validators: ValidationDescriptor[])
    : ValidationDescriptor
    {
        return ((this.validations.filter(validator => validator.field === field))[0])
    }
}
