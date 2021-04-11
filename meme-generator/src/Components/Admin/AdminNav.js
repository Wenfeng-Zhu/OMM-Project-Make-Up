import React from "react";
import {Link} from "react-router-dom";
import {CgUserList, IoMdImages} from "react-icons/all";
import './AdminNav.css'
import PeopleIcon from '@material-ui/icons/People';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CommentIcon from '@material-ui/icons/Comment';

const NavData = [
    {
        title: 'Users',
        path: '/admin/usersList',
        className: 'nav-text',
        icon: <PeopleIcon/>
    },
    {
        title: 'Images',
        path: '/admin/imagesList',
        className: 'nav-text',
        icon: <PhotoLibraryIcon/>
    },
    {
        title: 'Comments',
        path: '/admin/CommentsList',
        className: 'nav-text',
        icon: <CommentIcon/>
    }
]

function AdminNav() {
    return (
        <nav className='AdminNav'>
            <ul className='nav-items'>
                {NavData.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>

        </nav>

    )

}

export default AdminNav