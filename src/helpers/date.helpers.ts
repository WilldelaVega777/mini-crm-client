//---------------------------------------------------------------------------------
// Public Functions Section
//---------------------------------------------------------------------------------
export function getFormattedDate(): string
{
    const today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let ddString: string = dd.toString()
    let mmString: string = mm.toString()

    const yyyy = today.getFullYear();
    if (dd < 10) 
    {
        ddString = '0' + dd;
    }
    if (mm < 10) 
    {
        mmString = '0' + mm;
    }
    const todayString = mmString + '/' + ddString + '/' + yyyy;

    return todayString
}
//---------------------------------------------------------------------------------
export function getFormattedDateFor(date: string): string
{
    const today: Date = new Date(date)

    let dd = today.getDate()
    let mm = today.getMonth() + 1

    let ddString: string = dd.toString()
    let mmString: string = mm.toString()

    const yyyy = today.getFullYear()
    if (dd < 10) 
    {
        ddString = '0' + dd
    }
    if (mm < 10) 
    {
        mmString = '0' + mm
    }
    const todayString = ddString + '/' + mmString + '/' + yyyy

    return todayString
}
