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
import LockIcon from "@material-ui/icons/Lock";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import React, {useState} from "react";

function LogInDialog(props){
    const [showPassword, handleShowPassword] = useState(false);
    return(
        <Dialog open={props.showLogIn} aria-labelledby="Log-In-Dialog">
            <DialogTitle id="Log-In-Dialog">Log In</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Input your email address and password to log in.
                </DialogContentText>
                <FormControl fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                        id="email"
                        onChange={event => props.setUserInfo({...props.userInfo, email: event.target.value})}
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
                        onChange={event => props.setUserInfo({...props.userInfo, password: event.target.value})}
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
                    props.setShowLogIn(false);
                    props.setUserInfo({
                        email: '',
                        username: '',
                        password: ''
                    });
                }}>
                    Cancel
                </Button>
                <Button onClick={() => {
                    fetch('http://localhost:5000/users/login', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(props.userInfo)
                    }).then(response => {
                        if (response.ok) {
                            return (response.json()).then((json) => {
                                //setUserInfo({...userInfo,username: json.user.username})
                                //setLoggedIn(true);
                                sessionStorage.setItem('token',json.data)
                                props.setShowLogIn(false);
                                props.setLogState(true);
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
    )
}

export default LogInDialog;

