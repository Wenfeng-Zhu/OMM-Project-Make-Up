import React, {useRef, useState} from "react";
import './Header.css';
import {IconContext} from "react-icons";
import jwtDecode from "jwt-decode";
import {Button, ListItemIcon, ListItemText, Menu, MenuItem, withStyles} from "@material-ui/core";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from "react-router-dom";


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
            backgroundColor: '#D8C3A5',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: '#D8C3A5',
            },
        },
    },
}))(MenuItem);

const UserMenu = [
    {
        title: 'My Profile',
        path: '/profile',
        className: 'menu-item',
        icon: <AssignmentIndIcon fontSize="small"/>
    },
    {
        title: 'Saved Memes',
        path: '/savedMemes',
        className: 'menu-item',
        icon: <BurstModeIcon fontSize="small"/>
    }
]

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#E98074'),
        backgroundColor: '#E98074',
        '&:hover': {
            backgroundColor: '#E85A4F',
        },
    },
}))(Button);

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
                                    <ColorButton
                                        variant="contained"
                                        color='default'
                                        className="logIn" onClick={() => {
                                        props.setShowLogIn(true);
                                    }}>
                                        Log In
                                    </ColorButton>
                                    <ColorButton
                                        variant="contained"
                                        color='default'
                                        className="registration" onClick={() => {
                                        props.setShowRegistration(true);
                                    }}>
                                        Registration
                                    </ColorButton>
                                </div>
                            ) : (
                                <div className="afterLogged">
                                    <ColorButton
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
                                    </ColorButton>
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
                                        {UserMenu.map((item, index) => {
                                            return (
                                                <li key={index} className={item.className}>
                                                    <Link to={item.path}>
                                                        <StyledMenuItem>
                                                            <ListItemIcon>
                                                                {item.icon}
                                                            </ListItemIcon>
                                                            <ListItemText primary={item.title}/>
                                                        </StyledMenuItem>
                                                    </Link>
                                                </li>
                                            )
                                        })}
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
            </div>
        </IconContext.Provider>
    )
}

export default Header;