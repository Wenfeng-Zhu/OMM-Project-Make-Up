import React, {useState} from "react";
import './Profile.css'
import {
    Button, FormControl,
    IconButton, Input, InputAdornment, InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, Snackbar, TextField,
} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from "@material-ui/icons/Email";
import jwtDecode from "jwt-decode";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from "@material-ui/icons/Lock";
import MuiAlert from "@material-ui/lab/Alert";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    Label: {
        width: '100%',
        maxWidth: '120px'
    },
    Text: {
        width: '95%',
    },
    Button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

function Profile() {
    const [userInfo, setUserInfo] = useState({
        email: jwtDecode(sessionStorage.getItem('token')).email,
        username: jwtDecode(sessionStorage.getItem('token')).username.toString(),
        oldPassword: '',
        newPassword: ''
    })
    const [edit, setEdit] = useState(false);
    const [showPassword, handleShowPassword] = useState(false);
    const [updatePwd, setUpdatePwd] = useState(false);
    const [warning, showWarning] = useState({
        showing: false,
        type: '',
        content: ''
    });
    const classes = useStyles();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        showWarning({
            showing: false,
            type: '',
            content: ''
        });
    };

    return (
        <div className='ProfilePage'>
            <div className="leftSidebar"/>
            <div className={classes.root}>
                <Link to={'/'}>
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        className={classes.Button}
                        startIcon={<HomeIcon/>}
                    >Home</Button>
                </Link>
                <List className={classes.root}>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.Label} primary="Email"/>
                        <ListItemText>{userInfo.email}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText className={classes.Label} primary="Username"/>
                        {
                            (!edit) ? <ListItemText className={classes.Text}>{userInfo.username}</ListItemText> :
                                <div>
                                    <TextField
                                        className={classes.Text}
                                        defaultValue={userInfo.username}
                                        onChange={(event) => {
                                            setUserInfo({...userInfo, username: event.target.value})
                                        }
                                        }
                                    />
                                </div>

                        }
                        {
                            (!edit) ? <Button
                                    variant="contained"
                                    color="default"
                                    size="small"
                                    className={classes.Button}
                                    startIcon={<EditIcon/>}
                                    onClick={() => {
                                        setEdit(true)
                                    }
                                    }
                                >
                                    Edit
                                </Button> :
                                <Button
                                    variant="contained"
                                    color="default"
                                    size="small"
                                    className={classes.Button}
                                    startIcon={<SaveIcon/>}
                                    onClick={() => {
                                        fetch('http://localhost:5000/users/updateUsername', {
                                            method: 'POST',
                                            mode: 'cors',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify(userInfo)
                                        }).then(function (res) {
                                            if (res.ok) {
                                                return (res.json().then(json => {
                                                    sessionStorage.setItem('token', json.data)
                                                }))
                                            } else {
                                                console.log('require is failed！');
                                            }
                                        }, function (e) {
                                            console.log('require is failed: ' + e);
                                        })
                                        setEdit(false)
                                    }
                                    }
                                >
                                    Save
                                </Button>
                        }
                    </ListItem>
                </List>
                {
                    (!updatePwd) ? <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.Button}
                            startIcon={<VpnKeyIcon/>}
                            onClick={() => {
                                setUpdatePwd(true);
                            }
                            }
                        >
                            Change Password
                        </Button> :
                        <div>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="oldPassword">Enter the old Password</InputLabel>
                                <Input
                                    id="oldPassword"
                                    onChange={event => setUserInfo({...userInfo, oldPassword: event.target.value})}
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
                            <FormControl fullWidth>
                                <InputLabel htmlFor="newPassword">Enter the new Password</InputLabel>
                                <Input
                                    id="newPassword"
                                    onChange={event => setUserInfo({...userInfo, newPassword: event.target.value})}
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
                            <Button
                                fullWidth
                                variant="contained"
                                color='secondary'
                                onClick={() => {
                                    if (userInfo.oldPassword === userInfo.newPassword) {
                                        showWarning({
                                            showing: true,
                                            type: 'warning',
                                            content: "The new password is the same as the old password, please enter a different password!"
                                        })
                                    } else {
                                        fetch('http://localhost:5000/users/updatePassword', {
                                            method: 'POST',
                                            mode: 'cors',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify(userInfo)
                                        }).then(function (res) {
                                            if (res.ok) {
                                                showWarning({
                                                    showing: true,
                                                    type: 'success',
                                                    content: 'Password was updated successfully!'
                                                })
                                                setUpdatePwd(false);
                                            } else if (res.status === 422) {
                                                showWarning({
                                                    showing: true,
                                                    type: 'error',
                                                    content: 'Wrong Password, please enter again'
                                                })
                                            }
                                        }, function (e) {
                                            console.log('require is failed: ' + e);
                                        })
                                    }

                                }}
                            >Confirm</Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color='default'
                                onClick={() => {
                                    setUpdatePwd(false);
                                }}
                            >Cancel</Button>
                        </div>
                }

            </div>
            <div className="rightSidebar"/>
            <Snackbar open={warning.showing} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={warning.type}>
                    {warning.content}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Profile;