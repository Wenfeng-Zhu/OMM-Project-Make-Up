import React from 'react';
import './Comments.css'
import {TextField} from "@material-ui/core";

function Comments(props) {
    return (
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
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                    />
                    <button>Add</button>
                </div>
            }


        </div>
    )
}

export default Comments;