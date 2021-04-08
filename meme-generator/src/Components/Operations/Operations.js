import React, {useEffect, useState} from 'react';
import './Operations.css';
import domToImage from 'dom-to-image';
import {saveAs} from 'file-saver';
import jwtDecode from "jwt-decode";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Snackbar,
    Typography
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Chart from "../Others/Chart";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Operations(props) {
    const [warning, showWarning] = useState(false);
    const [showChart, setShowChart] = useState(false);

    //whether the user logged now clicked the like button
    const [liked, setLiked] = useState(false);

    function checkLiked() {
        fetch('http://localhost:5000/images/' + props.currentImageId + '/like/' + jwtDecode(sessionStorage.getItem('token')).email)
            .then(res => res.json())
            .then(result => {
                setLiked(result);
            }, (error) => {
                console.log(error)
            })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        showWarning(false);
        setShowChart(false);
    };
    useEffect(() => {
        if (props.logState === false) {
            setLiked(false);
        } else {
            checkLiked();
        }
    }, [props.logState, props.currentImageId])


    if (!props.isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="OperationsArea">
                <button onClick={() => {
                    setShowChart(true)
                }}>Info
                </button>
                <button onClick={() => {
                    //alert(props.exportImage.title)
                    domToImage.toBlob(props.exportImage, null).then((blob) => {
                        saveAs(blob, props.savedTitle)
                    })
                }}>Download
                </button>
                <button onClick={() => {
                    let confirm = window.confirm('Are You sure to save the image?');
                    if (confirm) {
                        domToImage.toBlob(props.exportImage, null).then(function (blob) {
                            let formData = new FormData();
                            formData.set('file', blob, props.savedTitle + '.png');
                            let xhr = new XMLHttpRequest();
                            xhr.open('POST', 'http://localhost:5000/images/' + jwtDecode(sessionStorage.getItem('token')).email, true);
                            xhr.send(formData);
                        })
                    }

                }}>
                    Save
                </button>
                <Button
                    variant="contained"
                    onClick={() => {
                        if (props.logState) {
                            let upload = {email: jwtDecode(sessionStorage.getItem('token')).email};
                            fetch('http://localhost:5000/images/' + props.currentImageId + '/like', {
                                method: 'POST',
                                mode: 'cors',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(upload)
                            }).then(function (res) {
                                if (res.ok) {
                                    checkLiked();
                                    console.log('POST successfully！')
                                } else {
                                    console.log('require is failed！');
                                }
                            }, function (e) {
                                console.log('require is failed: ' + e);
                            })
                        } else {
                            showWarning(true);
                        }

                    }}
                    color={(liked) ? "primary" : "secondary"}
                >
                    like
                </Button>

                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={showChart}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Meme Info
                    </DialogTitle>
                    <DialogContent dividers>
                        <Chart
                            data={
                                [
                                    {genre: 'Views', sold: props.currentMeme.views},
                                    {genre: 'Likes', sold: props.currentMeme.likes.length}
                                ]
                            }
                        />

                    </DialogContent>
                </Dialog>

                <Snackbar open={warning} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                        You need log in first!
                    </Alert>
                </Snackbar>


            </div>
        )
    }

}

export default Operations;