import React, {useState} from "react";
import {
    Button,
    Dialog, DialogActions,
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

function Admin() {
    const [adminLogged, setAdminLogged] = useState(sessionStorage.getItem('admin'));
    const [adminInfo, verifyAdmin] = useState({
        username: '',
        password: ''
    })
    return (
        (!adminLogged) ?
            <Dialog open={true}>
                <DialogTitle id="Log-In-Dialog">Admin Log In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Log in with admin account
                    </DialogContentText>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="adminUsername">Username</InputLabel>
                        <Input
                            id="adminUsername"
                            onChange={event => verifyAdmin({...adminInfo, username: event.target.value})}
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
                            onChange={event => verifyAdmin({...adminInfo, password: event.target.value})}
                            type={"password"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <p/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        fetch('http://localhost:5000/users/admin', {
                            method: 'POST',
                            mode: 'cors',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(adminInfo)
                        }).then(response => {
                            if (response.ok) {
                                return (response.json()).then((json) => {
                                    //setUserInfo({...userInfo,username: json.user.username})
                                    //setLoggedIn(true);
                                    sessionStorage.setItem('admin', json.success);
                                    setAdminLogged(sessionStorage.getItem('admin'));
                                    //alert('admin logged in')
                                    //props.setLogState(true);
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
            : <button onClick={()=>{
                sessionStorage.removeItem('admin');
                setAdminLogged(sessionStorage.getItem('admin'));

            }}>Log Out</button>

    )
}

export default Admin;