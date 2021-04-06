import React, {useRef, useState} from "react";
import './Header.css';
import {IconContext} from "react-icons";
import jwtDecode from "jwt-decode";
import LogInDialog from "../Dialogs/LogIn";
import RegistrationDialog from "../Dialogs/Registration";
import {Button, ListItemIcon, ListItemText, Menu, MenuItem, withStyles} from "@material-ui/core";
import * as PropTypes from "prop-types";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function Header(props) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userButton = useRef(null)
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
                                    <Button
                                        ref={userButton}
                                        className='userButton'
                                        aria-controls="user-menu"
                                        aria-haspopup="false"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setShowUserMenu(true);
                                        }}
                                    >
                                        {jwtDecode(sessionStorage.getItem('token')).username}
                                    </Button>
                                    <StyledMenu
                                        id="user-menu"
                                        open={showUserMenu}
                                        anchorEl={userButton.current}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}

                                        onClose={() => {
                                            setShowUserMenu(false);
                                        }}
                                    >
                                        <StyledMenuItem>
                                            <ListItemIcon>
                                                <AssignmentIndIcon fontSize="small"/>
                                            </ListItemIcon>
                                            <ListItemText primary="My Profile"/>
                                        </StyledMenuItem>
                                        <StyledMenuItem>
                                            <ListItemIcon>
                                                <BurstModeIcon fontSize="small"/>
                                            </ListItemIcon>
                                            <ListItemText primary="Saved Memes"/>
                                        </StyledMenuItem>
                                        <StyledMenuItem onClick={() => {
                                            sessionStorage.removeItem('token')
                                            props.setLogState(false);
                                            setShowUserMenu(false);
                                        }}>
                                            <ListItemIcon>
                                                <ExitToAppIcon fontSize="small"/>
                                            </ListItemIcon>
                                            <ListItemText primary="Log out"/>
                                        </StyledMenuItem>
                                    </StyledMenu>

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