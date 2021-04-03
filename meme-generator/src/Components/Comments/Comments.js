import React, {useState} from 'react';
import './Comments.css'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Snackbar,
    TextField
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import jwtDecode from "jwt-decode";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Comments(props) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [comment,setComment] = useState('');
    const [successComment,setSuccess] = useState(false);
    const [emptyComment,setEmpty] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setEmpty(false);
        setSuccess(false);
        setComment('');
    };
    return (
        <>
            {(props.sourceFromWeb) ?
                <div className="CommentsArea">
                    <div className='CommentsList'>
                        added comments were displayed here!
                    </div>
                    {(!props.logState) ?
                        <div className='commentBeforeLogin'>
                            <p>Log in to add a comment</p>
                            <button onClick={() => {
                                props.setShowLogIn(true);
                            }
                            }>Log In
                            </button>
                        </div> :
                        <div className='AddNewComment'>
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
                            <button onClick={() => {
                                if (comment === '') {
                                    setEmpty(true);
                                } else {
                                    setShowConfirmDialog(true);
                                }

                            }}>Add
                            </button>
                        </div>
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
                        fetch('http://localhost:5000/images/'+props.currentImageId+'/comment', {
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

export default Comments;