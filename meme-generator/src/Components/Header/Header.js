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
    //set login response
    const [isLoggedIn, setLoggedIn] = useState(false);
    //Whether to display the login pop-up window
    const [showLogIn, setShowLogIn] = useState(false);
    //Whether to display the registration pop-up window
    const [showRegistration, setShowRegistration] = useState(false)
    //Whether to display the password
    const [showPassword, handleShowPassword] = useState(false);

    //set the original password and confirmed password
    const [registrationPwd, setPwd] = useState(initialRegistrationPwd);
    //set the user information: email-address, username, password
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    //set whether the email and the password are correct during the registration
    const [confirmed, setConfirmed] = useState(initialConfirmed);


    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="headerBar">
                <>
                    {
                        (!isLoggedIn) ?
                            (
                                <div className="beforeLogged">
                                    <button className="logIn" onClick={() => {
                                        setShowLogIn(true);
                                    }}>
                                        Log In
                                    </button>
                                    <button className="registration" onClick={() => {
                                        setShowRegistration(true);
                                    }}>
                                        Registration
                                    </button>
                                </div>
                            ) : (
                                <div className="afterLogged" >
                                    <button className="userButton">
                                        {userInfo.username}
                                    </button>
                                </div>
                            )
                    }
                </>


                {/*Dialog of the Log-in*/}
                <Dialog open={showLogIn} aria-labelledby="Log-In-Dialog">
                    <DialogTitle id="Log-In-Dialog">Log In</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Input your email address and password to log in.
                        </DialogContentText>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input
                                id="email"
                                onChange={event => setUserInfo({...userInfo, email: event.target.value})}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EmailIcon/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <b/>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                onChange={event => setUserInfo({...userInfo, password: event.target.value})}
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
                        <p/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setShowLogIn(false);
                            setUserInfo(initialUserInfo);
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            fetch('http://localhost:5000/users/login', {
                                method: 'POST',
                                mode: 'cors',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(userInfo)
                            }).then(response => {
                                if (response.ok) {
                                    return(response.json()).then((json)=>{
                                        setUserInfo({...userInfo,username: json.user.username})
                                        setLoggedIn(true);
                                        setShowLogIn(false);
                                    })
                                } else if (response.status === 422) {
                                    alert('The account does not exist or the password is incorrect');
                                }
                            }, function (e) {
                                console.log('require is failed: ' + e);
                            })
                        }}>
                            Log in
                        </Button>
                    </DialogActions>
                </Dialog>

                {/*Dialog of registration*/}
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
                                    fetch('http://localhost:5000/users/registration', {
                                        method: 'POST',
                                        mode: 'cors',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify(userInfo)
                                    }).then(function (res) {
                                        if (res.ok) {
                                            console.log('POST successfully！')
                                        } else {
                                            console.log('require is failed！');
                                        }
                                    }, function (e) {
                                        console.log('require is failed: ' + e);
                                    })
                                    alert('registration successfully');
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