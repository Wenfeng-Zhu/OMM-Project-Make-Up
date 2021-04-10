import React, {useEffect, useState} from 'react';
import './Comments.css'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Snackbar,
    TextField
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import jwtDecode from "jwt-decode";
import FaceIcon from '@material-ui/icons/Face';
import SendIcon from '@material-ui/icons/Send';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Comments(props) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [comment, setComment] = useState('');
    const [successComment, setSuccess] = useState(false);
    const [emptyComment, setEmpty] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const [reloadComments, setReload] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setEmpty(false);
        setSuccess(false);
        setComment('');
    };

    function needReloadComments() {
        setReload(!reloadComments);
    }

    useEffect(() => {
        if (props.sourceFromWeb)
            fetch('http://localhost:5000/images/' + props.currentImageId + '/comments')
                .then(res => res.json())
                .then(result => {
                    setCommentsList(result);
                }, (error) => {
                    console.log(error)
                })
    }, [reloadComments, props.currentImageId])

    if (!props.isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                {(props.sourceFromWeb) ?
                    <div className="CommentsArea">
                        <div className='CommentsList'>
                            {
                                (commentsList.length === 0) ?
                                    <p>This meme has not been reviewed yet, come to review it!</p> :
                                    <List>
                                        {

                                            commentsList.map((item, index) => {
                                                return (
                                                    <Paper key={index}>
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <FaceIcon/>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText primary={item.username}
                                                                          secondary={item.timestamp}/>
                                                            {/*<ListItemText>{item.comment}</ListItemText>*/}

                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemText primary={item.comment}/>
                                                            {/*<ListItemText>{item.comment}</ListItemText>*/}
                                                            <Divider/>
                                                        </ListItem>
                                                        <Divider/>
                                                    </Paper>
                                                )
                                            })
                                        }
                                    </List>
                            }

                        </div>
                        {(!props.logState) ?
                            <Paper className='commentBeforeLogin'>
                                <p>Log in to add a comment</p>
                                <Button
                                    variant="contained"
                                    color="default"
                                    onClick={() => {
                                    props.setShowLogIn(true);
                                }
                                }>Log In
                                </Button>
                            </Paper> :
                            <Paper className='AddNewComment'>
                                <TextField
                                    fullWidth={true}
                                    id="NewComment"
                                    label="Add a New Comment"
                                    multiline
                                    rows={4}
                                    placeholder={'Enter your comment here'}
                                    value={comment}
                                    variant="outlined"
                                    onChange={event => {
                                        setComment(event.target.value);
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size='small'
                                    //className={classes.button}
                                    endIcon={<SendIcon/>}
                                    onClick={() => {
                                        if (comment === '') {
                                            setEmpty(true);
                                        } else {
                                            setShowConfirmDialog(true);
                                        }
                                    }}
                                >
                                    Send
                                </Button>
                            </Paper>
                        }
                    </div> :
                    <div className='closedComment'>
                        <p>This is not a resource from this website, so you cannot comment</p>
                    </div>}

                <Dialog open={showConfirmDialog} aria-labelledby="Confirm-Dialog-title"
                        aria-describedby="Confirm-Dialog-description">
                    <DialogTitle id='Confirm-Dialog-title'>Confirm</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="Confirm-Dialog-description">
                            Are you sure to post your comment?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setShowConfirmDialog(false)
                        }}
                        >Cancel</Button>
                        <Button onClick={() => {
                            let uploadComment = {
                                image_id: props.currentImageId,
                                email: jwtDecode(sessionStorage.getItem('token')).email,
                                username: jwtDecode(sessionStorage.getItem('token')).username,
                                comment: comment
                            }
                            fetch('http://localhost:5000/images/' + props.currentImageId + '/comment', {
                                method: 'POST',
                                mode: 'cors',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(uploadComment)
                            }).then(function (res) {
                                if (res.ok) {
                                    console.log('POST successfully！')
                                } else {
                                    console.log('require is failed！');
                                }
                            }, function (e) {
                                console.log('require is failed: ' + e);
                            })
                            setSuccess(true);
                            setShowConfirmDialog(false)
                            setComment('');
                            needReloadComments();
                        }}>Confirm</Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={emptyComment} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                        You need enter something!
                    </Alert>
                </Snackbar>
                <Snackbar open={successComment} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Post successfully!
                    </Alert>
                </Snackbar>
            </>
        )
    }

}

export default Comments;