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
    // State Section
    //-----------------------------------------------------------------------------
    const [currentState, setCurrentState] = useState({
        currentPage : 1,
        initialPageInRange: 1
    })
    useEffect(() => {
        props.onPageChange((currentState.currentPage * props.pageSize), currentState.currentPage)
    }, [])
    
    //-----------------------------------------------------------------------------
    // Methods Section
    //-----------------------------------------------------------------------------
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
    function getMaxPossibleRange()
    {
        return 3
    }
    //-----------------------------------------------------------------------------
    function goToPage(page: number, e: SyntheticEvent)
    {
        e.preventDefault()

        setCurrentState({
            currentPage : page,
            initialPageInRange: 1
        })
    }
    
    //-----------------------------------------------------------------------------
    // Render Section
    //-----------------------------------------------------------------------------
    return (
            <div className="row justify-content-center mt-3">
                {console.log('Enter render() of Functional Component')}
                <nav>
                    <ul className="pagination">
                        
                        { renderPageItems() }

                    </ul>
                </nav>
            </div>           
    )
}