//---------------------------------------------------------------------------
// Exported Functions Section
//---------------------------------------------------------------------------
export function getEnumFromString<T>(type: T, str: string): T[keyof T]
{
    const casted = str as keyof T;
    return type[casted];
}
