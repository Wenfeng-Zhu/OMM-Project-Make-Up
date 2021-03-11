import React, {Component, useState} from "react";
import './Header.css';
import * as BiIcons from 'react-icons/bi';
import {BiLogIn} from "react-icons/bi";
import {IconContext} from "react-icons";

function Header() {
    const [isLoggedIn, log] = useState(false);
    const logOperation = () => log(!isLoggedIn);

    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="headerBar">
                {
                    isLoggedIn ? <button className="user" onClick={logOperation}>Username</button>:
                        <button className="logIn" onClick={logOperation}>Log in</button>
                }
            </div>
        </IconContext.Provider>

    )
}

export default Header;