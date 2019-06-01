//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React            from 'react'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface ICustomerPaginatorProps
{
    id                  : string
    onPagePrev          : () => void
    onPageNext          : () => void
    onPageNumber        : (page: number) => void
    initialRange        : number  // 3 => [ 3 , 4 , 5 ]
    currentPage         : number  // 4
    totalPages          : number  // 4
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const CustomerPaginator: React.SFC<ICustomerPaginatorProps> =
(props) =>
{
    return (
        <div className="row justify-content-center mt-3">
            <nav>
                <ul className="pagination">
                    {/* << PREV */}
                    <li className={props.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link"
                            href="#" 
                            onClick={()=>props.onPagePrev()}
                        >
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>

                    {/* NUMBERS: SLOT 1 */}
                    <li className={props.currentPage === props.initialRange ? 'page-item active'  : 'page-item'}>
                        <a className="page-link" 
                            href="#" 
                            onClick={()=>props.onPageNumber(props.initialRange)}
                        >
                            {props.initialRange}
                        </a>
                    </li>
                    
                    {/* NUMBERS: SLOT 2 */}
                    <li className={props.currentPage === (props.initialRange+1) ? 'page-item active' : 'page-item'}>
                        <a className="page-link" 
                            href="#" 
                            onClick={() => props.onPageNumber(props.initialRange+1)}
                        >
                            {props.initialRange+1}
                        </a>
                    </li>
                    
                    {/* NUMBERS: SLOT 3 */}
                    <li className={props.currentPage === (props.initialRange + 2) ? 'page-item active' : 'page-item'}>
                        <a className="page-link" 
                            href="#" 
                            onClick={() => props.onPageNumber(props.initialRange+2)}
                        >
                            {props.initialRange+2}
                        </a>
                    </li>
                    
                    {/* NEXT >> */}
                    <li className={props.currentPage === props.totalPages ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" 
                            href="#" 
                            onClick={()=>props.onPageNext()}
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