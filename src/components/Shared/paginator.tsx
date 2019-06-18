//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                    from 'react'
import { useState }             from 'react'
import { useEffect }            from 'react'
import { SyntheticEvent }       from 'react'
//---------------------------------------------------------------------------------
// Component Class
//---------------------------------------------------------------------------------
export class Paginator extends 
    React.PureComponent<IPaginatorProps, IPaginatorState>
{
    //-------------------------------------------------------------------------
    // Constructor Method Section
    //-------------------------------------------------------------------------
    constructor(props: IPaginatorProps)
    {
        // Calls Super
        super(props)
        
        // Initialize State
        this.state = {
            initialPageInRange  : 1,
            currentPage         : 1
        }
    }
    
    //-------------------------------------------------------------------------
    // Render Method Section
    //-------------------------------------------------------------------------
    public render(): JSX.Element
    {   
        // Return Template...
        return (
            <React.Fragment>
                {/* Apply CSS  */}
                {this.getCSS()}

                {/* Create Layout  */}
                {this.renderLayout()}
            </React.Fragment>
        )
    }

    //-------------------------------------------------------------------------
    // Private (UI) Methods Section
    //-------------------------------------------------------------------------
    private renderLayout(): JSX.Element
    {
        return (
            <div className="row justify-content-center mt-3">
                <nav>
                    <ul className="pagination">
                        {/* << PREV */}
                        <li className={this.props.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                            <a className="page-link"
                                href="#"
                                onClick={(e: SyntheticEvent) => this.goToPrev(e)}
                            >
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>                 

                        {this.renderPageItems()}

                        {/* NEXT >> */}
                        <li className={this.props.currentPage === this.getTotalPages() ? 'page-item disabled' : 'page-item'}>
                            <a className="page-link"
                                href="#"
                                onClick={(e: SyntheticEvent) => { this.goToNext(e) }}
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
    //-------------------------------------------------------------------------
    private renderPageItems(): JSX.Element[]
    {
        // Return Value
        const items: JSX.Element[] = []

        for (let iCounter: number = 0; iCounter < this.getMaxPossibleRange(); iCounter++)
        {
            items.push(
                <li key={iCounter} className={(this.props.currentPage === (this.props.initialPageInRange + iCounter)) ?
                    'page-item active' : 'page-item'}>

                    <a className="page-link"
                        href="#"
                        onClick={(e: SyntheticEvent) => this.goToPage(this.props.initialPageInRange + iCounter, e)}
                    >
                        {this.props.initialPageInRange + iCounter}
                    </a>
                </li>
            )
        }
        
        return items
    }
    //-------------------------------------------------------------------------
    private getCSS(): JSX.Element
    {
        const css = `

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
    // Eventhandler Methods Section
    //-------------------------------------------------------------------------
    private goToPage(page: number, e: SyntheticEvent)
    {
        e.preventDefault()
        
        const newOffset: number = this.getOffset(page)
        const newPage: number = this.getCurrentPage(newOffset)

        // this.setState({
        //     currentPage: newPage
        // })
        
        this.props.onPageChange(newOffset, newPage)
    }
    //-------------------------------------------------------------------------
    private goToPrev(e: SyntheticEvent)
    {
        e.preventDefault()
        
        // Initialize Local Variables
        let newCurrentPage = 1
        let newCurrentFirstPageInRange = 0
        
        // Determines Page never go off limits
        if (this.props.currentPage !== 1)
        {
            newCurrentPage = (this.props.currentPage - 1)
        }
        
        // Determines Range Displacement
        if ((newCurrentPage >= 1) && 
            (newCurrentPage <= this.props.initialPageInRange))
        {
            newCurrentFirstPageInRange = newCurrentPage
        }
        
        // Get new Offset and recalculates Page
        const newOffset : number = this.getOffset(newCurrentPage)
        const newPage   : number = this.getCurrentPage(newOffset)
        
        // Which version of the event should be called?
        if ((newCurrentFirstPageInRange >= 1))
        {
            this.props.onPageChange(newOffset, newPage, newCurrentFirstPageInRange)
        }
        else
        {
            this.props.onPageChange(newOffset, newPage)
        }
    }
    //-------------------------------------------------------------------------
    private goToNext(e: SyntheticEvent)
    {
        e.preventDefault()

        // Initialize Local Variables
        let newCurrentPage = 1
        let newCurrentFirstPageInRange = 0
        
        // Determines Page never go off limits
        if (this.props.currentPage !== this.getTotalPages())
        {
            newCurrentPage = (this.props.currentPage + 1)
        }
        
        // Determines Range Displacement
        if ((newCurrentPage <= this.getTotalPages()) &&
            (newCurrentPage >= 
            (this.props.initialPageInRange + this.getMaxPossibleRange())))
        {
            newCurrentFirstPageInRange = (this.props.initialPageInRange +1)
        }
        
        // Get new Offset and recalculates Page
        const newOffset : number = this.getOffset(newCurrentPage)
        const newPage   : number = this.getCurrentPage(newOffset)
        
        // Which version of the event should be called?
        if ((newCurrentFirstPageInRange > 0) && 
            (newCurrentPage > (newCurrentFirstPageInRange + 
                this.getMaxPossibleRange()-2)))
        {
            this.props.onPageChange(newOffset, newPage, newCurrentFirstPageInRange)
        }
        else
        {
            this.props.onPageChange(newOffset, newPage)
        }
    }    
    
    //-------------------------------------------------------------------------
    // Private (Utility) Methods Section
    //-------------------------------------------------------------------------
    private getOffset(currentPage: number): number
    {
        return ((currentPage - 1) * this.props.pageSize)
    }
    //-------------------------------------------------------------------------
    private getCurrentPage(offset: number): number
    {
        return ((Math.ceil(offset / this.props.pageSize)) + 1)
    }
    //-------------------------------------------------------------------------
    private getTotalPages(): number
    {
        return (Math.ceil(this.props.totalRecords / this.props.pageSize))
    }
    //-------------------------------------------------------------------------
    private getMaxPossibleRange(): number
    {
        return (this.props.maxRangeSize <= this.getTotalPages()) ? 
                    this.props.maxRangeSize : this.getTotalPages()
    }
}

//---------------------------------------------------------------------------------
// Component Interfaces
//---------------------------------------------------------------------------------
interface IPaginatorProps
{
    maxRangeSize            : number  // 3
    pageSize                : number  // 3              
    totalRecords            : number  // 19
    initialPageInRange      : number  // 1
    currentPage             : number  // 1
    onPageChange            : (newOffset: number, newPage: number, initialPage?: 
                                number | undefined) => void
}
//---------------------------------------------------------------------------------
interface IPaginatorState
{
    initialPageInRange  : number
    currentPage         : number
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

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