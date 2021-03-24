import React, {Component, useState} from "react";
import './Header.css';
// import * as BiIcons from 'react-icons/bi';
// import {BiLogIn} from "react-icons/bi";
import {IconContext} from "react-icons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Button,
    // FilledInput,
    FormControl,
    IconButton,
    Input,
    InputLabel,
    // OutlinedInput,
    // TextField
} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {AccountCircle} from "@material-ui/icons";
// const axios = require('axios').default;

const initialRegistrationPwd = {
    originalPwd: '',
    confirmedPwd: ''
}


function Header(props) {
    //const [isLoggedIn, log] = useState(props.isLogged);
    const [showLogIn, setLog] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false)
    const [registrationPwd, setPwd] = useState(initialRegistrationPwd);
    const [confirmed, setConfirmed] = useState(true);
    const [showPassword, handleShowPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })

    const logOperation = () => props.logInOrOut(!props.isLogged);
    // const confirmPwd = () => {
    //     setConfirmed(registrationPwd.originalPwd === registrationPwd.confirmedPwd);
    // }

    function postUserInfo(){

    }


    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="headerBar">
                <button className="logIn" onClick={() => {
                    setLog(true);
                }}>
                    Log In
                </button>
                <button className="registration" onClick={() => {
                    setShowRegistration(true);
                }}>
                    Registration
                </button>

                <Dialog open={showLogIn} aria-labelledby="Log-In-Dialog">
                    <DialogTitle id="Log-In-Dialog">Log In</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Input your username and password to log in.
                        </DialogContentText>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="userName">User Name or Email Address</InputLabel>
                            <Input
                                id="userName"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <b/>
                        <FormControl fullWidth>
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
                        <Button onClick={() => {
                            setLog(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            setLog(false);
                        }}>
                            Log in
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={showRegistration} aria-labelledby="Registration-Dialog">
                    <DialogTitle id="Registration-Dialog">Registration</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Register a new account on the website.
                        </DialogContentText>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="userName">User Name or Email Address</InputLabel>
                            <Input
                                id="userName"
                                onChange={event => setUserInfo({...userInfo,username: event.target.value})}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <b/>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="registration-password">Password</InputLabel>
                            <Input
                                id="registration-password"
                                value={registrationPwd.originalPwd}
                                //onCompositionEnd={event => setPwd(event.target.value)}
                                //onCompositionEnd={event => setPwd(event.target.value)}
                                onChange={event => setPwd({...registrationPwd, originalPwd: event.target.value})}
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
                        <b/>
                        <FormControl fullWidth>
                            <InputLabel
                                color={confirmed ? 'primary' : 'secondary'}
                                htmlFor="confirm-password">{confirmed ? 'Confirm your password' : 'The confirmed password does not match'}</InputLabel>
                            <Input
                                error={!confirmed}
                                id="confirm-password"
                                type={showPassword ? "text" : "password"}
                                onChange={event => {
                                    setPwd({...registrationPwd, confirmedPwd: event.target.value});
                                    setUserInfo({...userInfo,password: event.target.value});
                                    setConfirmed(true);
                                }}
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
                        <Button onClick={() => {
                            setShowRegistration(false);
                            setPwd(initialRegistrationPwd);
                        }}>
                            Cancel
                        </Button>
                        <Button  onClick={() => {
                            if (registrationPwd.originalPwd === registrationPwd.confirmedPwd) {
                                fetch('http://localhost:5000/account/registration', {
                                    method: 'POST',
                                    mode:'cors',
                                    headers: {'Content-Type':'application/json'},
                                    body: JSON.stringify(userInfo)
                                }).then(function(res){
                                    if(res.ok){
                                        console.log('POST成功')
                                    }else{
                                        console.log('请求失败');
                                    }
                                }, function(e){
                                    console.log('请求失败:'+e);
                                })
                                //alert('registration successfully');
                            } else {
                                setConfirmed(false);
                            }
                        }}>
                            Registration
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </IconContext.Provider>

    )
}

export default Header;