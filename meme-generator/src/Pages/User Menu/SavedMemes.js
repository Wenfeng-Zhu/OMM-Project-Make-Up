import React, {useEffect, useRef, useState} from "react";
import './SavedMemes.css'
import {Button, makeStyles} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import {Link} from "react-router-dom";
import jwtDecode from "jwt-decode";
import domToImage from "dom-to-image";
import {saveAs} from 'file-saver';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '400px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        height: '100%',
        maxHeight: '400px',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.secondary,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    Button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));


function SavedMemes() {
    const classes = useStyles();
    const [userMemes, setUserMemes] = useState([]);
    const [currentIndex, setIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reloadMemes, setReload] = useState(false);
    const displayedImage = useRef();

    function needReloadUserMemes() {
        setReload(!reloadMemes);
    }

    useEffect(() => {
        fetch('http://localhost:5000/images/' + jwtDecode(sessionStorage.getItem('token')).email + '/saved')
            .then(res => {
                if (res.status === 204) {
                    setIsLoaded(true);
                } else {
                    res.json().then(result => {
                        setUserMemes(result);
                        setIndex(0);
                        setIsLoaded(true);
                    }, (error) => {
                        console.log(error)
                    })
                }
            })
    }, [isLoaded])

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='SavedMemesPage'>
                <div className="leftSidebar"/>
                <div className='SavedMemes'>
                    <Link to={'/'}>
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            className={classes.Button}
                            startIcon={<HomeIcon/>}
                        >Home</Button>
                    </Link>
                    {
                        (userMemes.length === 0) ? <div>
                            <p>You haven't saved any meme</p>
                        </div> : <>
                            <div className="userScrollBar">
                                <div className="userScrollImages">
                                    {userMemes.map((item, index) => {
                                        return (
                                            <img className="userSingleImage" src={
                                                'http://localhost:5000/upload/' + item.url
                                            }
                                                 alt="Image can not be displayed"
                                                 onClick={() => setIndex(index)}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                            <span>{userMemes[currentIndex].name}</span>
                            <div className='imageDisplay'>
                                <img ref={displayedImage} src={
                                    'http://localhost:5000/upload/' + userMemes[currentIndex].url
                                }
                                     alt="Image can not be displayed"
                                />
                                <div className='buttons'>
                                    <button onClick={() => {
                                        domToImage.toBlob(displayedImage.current, null).then((blob) => {
                                            saveAs(blob, userMemes[currentIndex].name)
                                        })
                                    }}>Download
                                    </button>
                                    <button onClick={() => {
                                        const confirm = window.confirm('Are You Sure to delete this image?');
                                        if (confirm) {
                                            //alert('delete')
                                            fetch('http://localhost:5000/images/' + jwtDecode(sessionStorage.getItem('token')).email + '/delete', {
                                                method: 'POST',
                                                mode: 'cors',
                                                headers: {'Content-Type': 'application/json'},
                                                body: JSON.stringify(userMemes[currentIndex])
                                            }).then(function (res) {
                                                if (res.ok) {
                                                    console.log('POST successfully！')
                                                } else {
                                                    console.log('require is failed！');
                                                }
                                            }, function (e) {
                                                console.log('Error: ' + e);
                                            });
                                            needReloadUserMemes();
                                            setIsLoaded(false);
                                        } else {
                                        }
                                    }}>Delete
                                    </button>

                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="rightSidebar"/>
            </div>
        )
    }
}

export default SavedMemes;