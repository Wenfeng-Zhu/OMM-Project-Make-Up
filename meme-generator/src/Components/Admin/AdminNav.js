import React from "react";
import {Link} from "react-router-dom";
import {CgUserList, IoMdImages} from "react-icons/all";
import './AdminNav.css'

const NavData = [
    {
        title: 'Users',
        path: '/admin/usersList',
        className: 'nav-text',
        icon: <CgUserList/>
    },
    {
        title: 'Images',
        path: '/admin/imagesList',
        className: 'nav-text',
        icon: <IoMdImages/>
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