import React, {Component, useState} from "react";
import './Header.css';
import * as BiIcons from 'react-icons/bi';
import {BiLogIn} from "react-icons/bi";
import {IconContext} from "react-icons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    Input,
    InputLabel,
    OutlinedInput,
    TextField
} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


function Header(props) {
    //const [isLoggedIn, log] = useState(props.isLogged);
    const [openDialog, setOpen] = useState(false);
    const [showPassword, handleShowPassword] = useState(false);

    const logOperation = () => props.logInOrOut(!props.isLogged);


    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="headerBar">
                <button variant="outlined" color="primary" className="logIn" onClick={() => {
                    setOpen(true);
                }}>
                    Log In
                </button>
                <Dialog open={openDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Log In</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Input your username and password to log in.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            variant="outlined"
                            margin="dense"
                            id="name"
                            label="User Name or Email Address"
                            type="email"
                            fullWidth
                        />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <Input
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                handleShowPassword(!showPassword)
                                            }}>
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>

                                }
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{
                            setOpen(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={()=>{
                            setOpen(false);
                        }}>
                            Log in
                        </Button>
                    </DialogActions>
                </Dialog>
                {/*{*/}
                {/*    props.isLogged ? <button className="user" onClick={logOperation}>Username</button>:*/}
                {/*        <button className="logIn" onClick={logOperation}>Log in</button>*/}
                {/*}*/}
            </div>
        </IconContext.Provider>

    )
}

export default Header;