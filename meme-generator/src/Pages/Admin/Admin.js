// The manager interface of the website backend
// Need to log in through an administrator account

import React, {useState} from "react";
import './Admin.css';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Input,
    InputAdornment,
    InputLabel
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UsersList from "../../Components/Admin/UsersList";
import ImagesList from "../../Components/Admin/ImagesList";
import AdminNav from "../../Components/Admin/AdminNav";
import CommentsList from "../../Components/Admin/CommentsList";

function Admin() {
    const [adminLogged, setAdminLogged] = useState(sessionStorage.getItem('admin'));
    const [adminInfo, verifyAdmin] = useState({
        username: '',
        password: ''
    })
    return (
        (!adminLogged) ?
            <Dialog className='adminLogWindow' open={true}>
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
                                    sessionStorage.setItem('admin', json.success);
                                    setAdminLogged(sessionStorage.getItem('admin'));

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
            :
            <div className='AdminPage'>
                <Router>
                    <AdminNav/>
                    <Switch>
                        <Route exact path={'/admin'} component={null}/>
                        <Route path={'/admin/usersList'} component={UsersList}/>
                        <Route path={'/admin/imagesList'} component={ImagesList}/>
                        <Route path={'/admin/commentsList'} component={CommentsList}/>
                    </Switch>
                </Router>
            </div>
    )
}

export default Admin;