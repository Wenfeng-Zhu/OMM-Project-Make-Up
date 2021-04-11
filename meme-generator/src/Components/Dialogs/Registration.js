import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, IconButton,
    Input,
    InputAdornment,
    InputLabel
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import {AccountCircle, Visibility, VisibilityOff} from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import React, {useState} from "react";

const initialConfirmed = {
    emailConfirmed: true,
    pwdConfirmed: true
}
const initialRegistrationPwd = {
    originalPwd: '',
    confirmedPwd: ''
}

function RegistrationDialog(props) {
    //set whether the email and the password are correct during the registration
    const [confirmed, setConfirmed] = useState(initialConfirmed);
    //set the original password and confirmed password
    const [registrationPwd, setPwd] = useState(initialRegistrationPwd);
    const [showPassword, handleShowPassword] = useState(false);

    return (
        <Dialog open={props.showRegistration} aria-labelledby="Registration-Dialog">
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
                            props.setUserInfo({...props.userInfo, email: event.target.value})
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
                            props.setUserInfo({...props.userInfo, username: event.target.value})
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
                            props.setUserInfo({...props.userInfo, password: event.target.value});
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
                    props.setShowRegistration(false);
                    setPwd(initialRegistrationPwd);
                    props.setUserInfo({
                        email: '',
                        username: '',
                        password: ''
                    });
                }}>
                    Cancel
                </Button>
                <Button onClick={() => {
                    // First judge whether the format of the registered mailbox is correct through regularization
                    if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(props.userInfo.email))) {
                        setConfirmed({...confirmed, emailConfirmed: false});
                    } else {
                        // Determine whether the two entered passwords are the same
                        if (!(registrationPwd.originalPwd === registrationPwd.confirmedPwd)) {
                            setConfirmed({...confirmed, pwdConfirmed: false});
                        } else {
                            // A registration request with an account and password occurs through the api, and it is saved to the database
                            fetch('http://localhost:5000/users/registration', {
                                method: 'POST',
                                mode: 'cors',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(props.userInfo)
                            }).then(function (res) {
                                if (res.ok) {
                                    console.log('POST successfully！')
                                } else {
                                    console.log('require is failed！');
                                }
                            }, function (e) {
                                console.log('require is failed: ' + e);
                            })
                        }
                    }
                }}>
                    Registration
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RegistrationDialog