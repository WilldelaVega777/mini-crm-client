//---------------------------------------------------------------------------------
// Imports Section 
//---------------------------------------------------------------------------------
import React                from 'react'
import { Link }             from 'react-router-dom';

//---------------------------------------------------------------------------------
// Imports (Model)
//---------------------------------------------------------------------------------
import
{
    getUsers_getUsers_users as User
}
    from '../../services/typeDefs/operations/getUsers'

//---------------------------------------------------------------------------------
// Component Interface
//---------------------------------------------------------------------------------
interface IUserItemProps
{
    user: User
}

//---------------------------------------------------------------------------------
// Component for First Name:
//---------------------------------------------------------------------------------
export const UserItem: React.SFC<IUserItemProps> =
    (props) =>
    {
        let cssClass: string = 'success';
        if (true)
        {
            cssClass = 'bg-paradise-green'
        }

        return (
            <tr className={`${cssClass} animated fadeIn`}>
                <td className="col-2 text-center text-danger" style={{width: 'auto'}}>
                    {props.user.username}
                </td>
                <td className="col-3 text-center" style={{ width: 'auto' }}>
                    {props.user.first_name}
                </td>
                <td className="col-3 text-center" style={{ width: 'auto' }}>
                    {props.user.last_name}
                </td>
                <td className="col-2 text-center" style={{ width: 'auto' }}>
                    {(props.user.role === 'SALESMAN') ? 'Vendedor' : 'Administrador'}
                </td>

                <td className="text-right pl-1 col-1" style={{ width: 'auto' }}>
                    <Link to={'/user/edit/:id'.replace(':id', props.user.id)}
                        className="btn btn-info d-md-inline-block mr-1"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>
                </td>

                <td className="text-left pl-1 col-1" style={{ width: 'auto', maxWidth: '120px'}}>
                    <Link to={'/user/remove/:id'.replace(':id', props.user.id)}
                        className="btn btn-danger d-md-inline-block mr-1"
                    >
                        <i className="far fa-trash-alt"></i>
                    </Link>
                </td>

            </tr>
        )
    }