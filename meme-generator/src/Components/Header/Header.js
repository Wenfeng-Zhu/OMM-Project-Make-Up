import React, {useState} from "react";
import './Header.css';
import {IconContext} from "react-icons";
import jwtDecode from "jwt-decode";
import LogInDialog from "../Dialogs/LogIn";
import RegistrationDialog from "../Dialogs/Registration";


function Header(props) {
    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="headerBar">
                <>
                    {
                        (!props.logState) ?
                            (
                                <div className="beforeLogged">
                                    <button className="logIn" onClick={() => {
                                        props.setShowLogIn(true);
                                    }}>
                                        Log In
                                    </button>
                                    <button className="registration" onClick={() => {
                                        props.setShowRegistration(true);
                                    }}>
                                        Registration
                                    </button>
                                </div>
                            ) : (
                                <div className="afterLogged">
                                    <button className="userButton"
                                            onClick={() => {
                                                sessionStorage.removeItem('token')
                                                props.setLogState(false);
                                            }}>
                                        {
                                            jwtDecode(sessionStorage.getItem('token')).username
                                        }
                                    </button>
                                </div>
                            )
                    }
                </>

                {/*Dialog of the Log-in*/}


            </div>
        </IconContext.Provider>

    )
}

export default Header;