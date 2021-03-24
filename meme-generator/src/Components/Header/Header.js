import React, {useState} from "react";
import './Header.css';
import {IconContext} from "react-icons";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    Button,
    FormControl,
    IconButton,
    Input,
    InputLabel,
} from "@material-ui/core";
import {Visibility, VisibilityOff, AccountCircle,} from '@material-ui/icons';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

const initialRegistrationPwd = {
    originalPwd: '',
    confirmedPwd: ''
}
const initialUserInfo = {
    email: '',
    username: '',
    password: ''
}
const initialConfirmed = {
    emailConfirmed: true,
    pwdConfirmed: true
}


function Header(props) {
    //const [isLoggedIn, log] = useState(props.isLogged);
    const [showLogIn, setLog] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false)
    const [showPassword, handleShowPassword] = useState(false);

    const [registrationPwd, setPwd] = useState(initialRegistrationPwd);
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [confirmed, setConfirmed] = useState(initialConfirmed);


    const logOperation = () => props.logInOrOut(!props.isLogged);
    // const confirmPwd = () => {
    //     setConfirmed(registrationPwd.originalPwd === registrationPwd.confirmedPwd);
    // }


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
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input
                                id="email"
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
                            <InputLabel
                                color={confirmed.emailConfirmed ? 'primary' : 'secondary'}
                                htmlFor="confirm-password">{confirmed.emailConfirmed ? 'Email Address' : 'Please enter the correct email address'}</InputLabel>
                            <Input
                                error={!confirmed.emailConfirmed}
                                id="email"
                                onChange={event => {
                                    setUserInfo({...userInfo, email: event.target.value})
                                    setConfirmed({...confirmed, emailConfirmed: true})
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EmailIcon/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <b/>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="userName">User Name</InputLabel>
                            <Input
                                id="userName"
                                onChange={event => {
                                    setUserInfo({...userInfo, username: event.target.value})
                                }}
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
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LockIcon/>
                                    </InputAdornment>
                                }
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
                                color={confirmed.pwdConfirmed ? 'primary' : 'secondary'}
                                htmlFor="confirm-password">{confirmed.pwdConfirmed ? 'Confirm your password' : 'The confirmed password does not match'}</InputLabel>
                            <Input
                                error={!confirmed.pwdConfirmed}
                                id="confirm-password"
                                type={showPassword ? "text" : "password"}
                                onChange={event => {
                                    setPwd({...registrationPwd, confirmedPwd: event.target.value});
                                    setUserInfo({...userInfo, password: event.target.value});
                                    setConfirmed({...confirmed, pwdConfirmed: true});
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LockIcon/>
                                    </InputAdornment>
                                }
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
                            setUserInfo(initialUserInfo);
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(userInfo.email))) {
                                //alert('Please enter the correct email address');
                                setConfirmed({...confirmed, emailConfirmed: false});
                            } else {
                                if (!(registrationPwd.originalPwd === registrationPwd.confirmedPwd)) {
                                    setConfirmed({...confirmed, pwdConfirmed: false});
                                } else {
                                    // fetch('http://localhost:5000/account/registration', {
                                    //     method: 'POST',
                                    //     mode: 'cors',
                                    //     headers: {'Content-Type': 'application/json'},
                                    //     body: JSON.stringify(userInfo)
                                    // }).then(function (res) {
                                    //     if (res.ok) {
                                    //         console.log('POST成功')
                                    //     } else {
                                    //         console.log('请求失败');
                                    //     }
                                    // }, function (e) {
                                    //     console.log('请求失败:' + e);
                                    // })
                                    //alert('registration successfully');
                                    //alert('注册成功' + ' ' + (registrationPwd.originalPwd === registrationPwd.confirmedPwd) + ' ' + userInfo.email + ' ' + userInfo.username + ' ' + userInfo.password + ' ' + registrationPwd.originalPwd);
                                }
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