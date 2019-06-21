//---------------------------------------------------------------------------------
// Component Interfaces
//---------------------------------------------------------------------------------
import React                from 'react'
import { SyntheticEvent }   from 'react'
import { useState }         from 'react'
import { useEffect }        from 'react'


//---------------------------------------------------------------------------------
// Component Interfaces
//---------------------------------------------------------------------------------
interface IPaginatorFunctionalProps
{
    maxRangeSize            : number  // 3
    pageSize                : number  // 3              
    totalRecords            : number  // 19
    onPageChange            : (newOffset: number, newPage: number, initialPage?: 
                                number | undefined) => void
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const PaginatorFunctional: React.SFC<IPaginatorFunctionalProps> =
(props) =>
{
    //-----------------------------------------------------------------------------
    // State/Effects Section
    //-----------------------------------------------------------------------------
    const {onPageChange, pageSize} = props
    
    const [currentState, setCurrentState] = useState({
        currentPage : 1,
        oldCurrentPage: 1,
        oldInitialPageInRange: 1,
        initialPageInRange: 1
    })
    
    useEffect(() => {
        if (currentState.currentPage !== currentState.oldCurrentPage)
        {
            console.log('lanzará onPageChange por cambio de Página')
            onPageChange(((currentState.currentPage -1) * pageSize), currentState.currentPage)
            
            setCurrentState({
                ...currentState,
                oldCurrentPage : currentState.currentPage
            })
        }
        
        if (currentState.initialPageInRange !== currentState.oldInitialPageInRange)
        {
            console.log('lanzará onPageChange por cambio de initialPageInRange')
            onPageChange(((currentState.currentPage -1) * pageSize), currentState.currentPage, currentState.initialPageInRange)
            
            setCurrentState({
                ...currentState,
                oldInitialPageInRange : currentState.initialPageInRange
            })
        }
    }, [currentState, onPageChange, pageSize])
    
    
    //-----------------------------------------------------------------------------
    // Render UI Functions
    //-----------------------------------------------------------------------------
    function getCSS(): JSX.Element
    {
        const css = `
            ul#paginatorFunctional>li>.page-link 
            {
                position: relative;            
                display: block;            
                padding: 0.5rem 0.75rem;
                margin-left: -1px;
                line-height: 1.25;
                color: #003C00;
                background-color: #D8EBEB;
                border: 1px solid #346767;
            }
            
            ul#paginatorFunctional>li.page-item.disabled>.page-link 
            {
                color: #868e96;
                pointer-events: none;
                cursor: auto;
                background-color: #CEFFCE;
                border-color: #718393;
            }
            
            ul#paginatorFunctional>li.page-item.active>.page-link
            {
                z-index: 1;
                color: #fff;
                background-color: #003C00;
                border-color: #AEFF5E;
            }
            
            ul#paginatorFunctional>li>.page-link:focus, ul#paginatorFunctional>li>.page-link:hover
            {
                color: #fff;
                text-decoration: none;
                background-color: #003C00;
            }
        `

        return (
            <style>
                {css}
            </style>
        )
    }

    
    function renderPageItems(): JSX.Element[]
    {   
        // Return Value
        const items: JSX.Element[] = []

        for (let iCounter: number = 0; iCounter < getMaxPossibleRange(); iCounter++)
        {
            items.push(
                <li key={iCounter} className={(currentState.currentPage === (currentState.initialPageInRange + iCounter)) ?
                    'page-item active' : 'page-item'}>

                    <a className="page-link"
                        href="#"
                        onClick={(e: SyntheticEvent) => goToPage(currentState.initialPageInRange + iCounter, e)}
                    >
                        {currentState.initialPageInRange + iCounter}
                    </a>
                </li>
            )
        }
        
        return items
    }

    //-----------------------------------------------------------------------------
    // Navigation Functions
    //-----------------------------------------------------------------------------
    function goToPage(page: number, e: SyntheticEvent)
    {
        e.preventDefault()
        
        setCurrentState({
            ...currentState,
            currentPage : page,
        })        
    }
    //-------------------------------------------------------------------------
    function goToPrev(e: SyntheticEvent)
    {
        e.preventDefault()
        
        // Initialize Local Variables
        let newCurrentPage = 1
        let newCurrentFirstPageInRange = 0
        
        // Determines Page never go off limits
        if (currentState.currentPage !== 1)
        {
            newCurrentPage = (currentState.currentPage - 1)
        }
        
        // Determines Range Displacement
        if ((newCurrentPage >= 1) && 
            (newCurrentPage <= currentState.initialPageInRange))
        {
            newCurrentFirstPageInRange = newCurrentPage
        }
        
        // Get new Offset and recalculates Page
        const newOffset : number = getOffset(newCurrentPage)
        const newPage   : number = getCurrentPage(newOffset)
        
        // Which version of the event should be called?
        if ((newCurrentFirstPageInRange >= 1))
        {
            setCurrentState({
                ...currentState,
                currentPage: newPage,
                initialPageInRange : newCurrentFirstPageInRange
            })
        }
        else
        {
            setCurrentState({
                ...currentState,
                currentPage: newPage
            })
        }
    }
    //-------------------------------------------------------------------------
    function goToNext(e: SyntheticEvent)
    {
        e.preventDefault()

        // Initialize Local Variables
        let newCurrentPage = 1
        let newCurrentFirstPageInRange = 0
        
        // Determines Page never go off limits
        if (currentState.currentPage !== getTotalPages())
        {
            newCurrentPage = (currentState.currentPage + 1)
        }
        
        // Determines Range Displacement
        if ((newCurrentPage <= getTotalPages()) &&
            (newCurrentPage >= 
            (currentState.initialPageInRange + getMaxPossibleRange())))
        {
            newCurrentFirstPageInRange = (currentState.initialPageInRange +1)
        }
        
        // Get new Offset and recalculates Page
        const newOffset : number = getOffset(newCurrentPage)
        const newPage   : number = getCurrentPage(newOffset)
        
        // Which version of the event should be called?
        if ((newCurrentFirstPageInRange > 0) && 
            (newCurrentPage > (newCurrentFirstPageInRange + 
                getMaxPossibleRange()-2)))
        {
            setCurrentState({
                ...currentState,
                currentPage: newPage,
                initialPageInRange : newCurrentFirstPageInRange
            })
        }
        else
        {
            setCurrentState({
                ...currentState,
                currentPage: newPage
            })
        }
    }    
    
    //-------------------------------------------------------------------------
    // Utility Functions
    //-------------------------------------------------------------------------
    function getOffset(currentPage: number): number
    {
        return ((currentPage - 1) * props.pageSize)
    }
    //-------------------------------------------------------------------------
    function getCurrentPage(offset: number): number
    {
        return ((Math.ceil(offset / props.pageSize)) + 1)
    }
    //-----------------------------------------------------------------------------
    function getTotalPages()
    {
        return (Math.ceil(props.totalRecords / props.pageSize))
    }
    //-----------------------------------------------------------------------------
    function getMaxPossibleRange()
    {
        return (props.maxRangeSize <= getTotalPages()) ? 
                    props.maxRangeSize : getTotalPages()
    }    
    
    //-----------------------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------------------
    return (
            <div className="row justify-content-center mt-3 animated fadeIn" style={{visibility: ((props.totalRecords === 0) ? 'hidden' : 'visible')}}>
                { getCSS() }
                <nav>
                    <ul className="pagination" id="paginatorFunctional">
                        {/* << PREV */}
                        <li className={currentState.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                            <a className="page-link"
                                href="#"
                                onClick={(e: SyntheticEvent) => goToPrev(e)}
                            >
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        
                        
                        { renderPageItems() }


                        {/* NEXT >> */}
                        <li className={currentState.currentPage === getTotalPages() ? 'page-item disabled' : 'page-item'}>
                            <a className="page-link"
                                href="#"
                                onClick={(e: SyntheticEvent) => { goToNext(e) }}
                            >
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>           
    )
}