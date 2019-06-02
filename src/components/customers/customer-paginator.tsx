//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React            from 'react'
import { useState }     from 'react'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICustomerPaginatorProps
{
    maxRangeSize        : number  // 3
    pageSize            : number  // 3              
    totalRecords        : number  // 19
    currentPage         : number  // 1
    onPageChange        : (newOffset: number, newPage: number) => void
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CustomerPaginator: React.SFC<ICustomerPaginatorProps> =
(props) =>
{
    //-------------------------------------------------------------------------
    // State Management Section
    //-------------------------------------------------------------------------
    const [initialPageInRange, setInitialPageInRange] = useState(1)
    //const [currentPage, setCurrentPage] = useState(1)

    //-------------------------------------------------------------------------
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    const goToPage = (page: number) => {
        //setCurrentPage(page)
        // console.log(`Page already set into state: ${page} - Page currently in State: ${currentPage}`)
        const newOffset: number = getOffset(page)
        const newPage  : number = getCurrentPage(newOffset)
        props.onPageChange(newOffset, newPage)
    }
    
    //-------------------------------------------------------------------------
    // Private Methods Section
    //-------------------------------------------------------------------------
    const getOffset = (currentPage: number): number => {
        return ((currentPage - 1) * props.pageSize)
    }
    const getCurrentPage = (offset: number): number => {
        return ((Math.ceil(offset / props.pageSize)) + 1)
    }
    //-------------------------------------------------------------------------
    const getTotalPages = (): number =>
    {
        return (Math.ceil(props.totalRecords / props.pageSize))
    }    
    //-------------------------------------------------------------------------
    const getMaxPossibleRange = (): number =>
    {
        return (props.maxRangeSize <= getTotalPages()) ? props.maxRangeSize : getTotalPages()
    }

    
    //-------------------------------------------------------------------------
    // UI Rendering
    //-------------------------------------------------------------------------
    const items: JSX.Element[] = []
    
    for (let iCounter: number = 0; iCounter < getMaxPossibleRange(); iCounter++)
    {
        items.push(
            <li key={iCounter} className={(props.currentPage === (initialPageInRange + iCounter)) ?
                'page-item active' : 'page-item'}>

                <a className="page-link"
                    href="#"
                    onClick={() => goToPage(initialPageInRange + iCounter)}
                >
                    {initialPageInRange + iCounter}
                </a>
            </li>
        )
    }
    
    
    return (
        <div className="row justify-content-center mt-3">
            <nav>
                <ul className="pagination">
                    
                    {items}

                </ul>
            </nav>
        </div>   
    )
}