import React, {useState} from 'react';
import './MainDisplay.css';
import './ImageDisplay';
import ImageDisplay from "./ImageDisplay";
import TextInput from "./TextInput";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import StorageIcon from '@material-ui/icons/Storage';
import WebIcon from '@material-ui/icons/Web';
import {Button, makeStyles, Paper} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

function MainDisplay(props) {
    // set the number of the displaying texts, default & min is 2 and max is 4
    const [numOfTexts, setNum] = useState(2);
    //set the form information of the input unit
    const [inputUnits, updateInputUnits] = useState({
        index: 0,
        text: '',
        color: '#000000',
        size: 40,
        bold: false,
        italic: false
    });
    const [displayingImage, setDisplayingImage] = useState(null);
    const classes = useStyles();
    if (!props.isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="MainDisplay">
                <Paper>
                    <ImageDisplay
                        sourceFromWeb={props.sourceFromWeb}
                        filter={props.filter}
                        setFilter={props.setFilter}
                        memesList={props.memesList}
                        isLoaded={props.isLoaded}
                        currentIndex={props.currentIndex}
                        setIndex={props.setIndex}
                        inputUnits={inputUnits}
                        setExportImage={props.setExportImage}
                        numOfTexts={numOfTexts}
                        setDisplayingImage={setDisplayingImage}
                    />
                </Paper>

                <Paper className='rightEdit'>
                    <div className="SourceButton">
                        <ToggleButtonGroup
                            className='filtering'
                            value={props.sourceFromWeb}
                            exclusive
                            onChange={(event, newSource) => {
                                if (newSource !== null) {
                                    props.setSource(newSource);
                                    props.setIndex(0);
                                    props.setIsLoaded(false)
                                }
                            }}
                            aria-label="web source"
                        >
                            <ToggleButton value={true}>
                                <StorageIcon/> Web
                            </ToggleButton>
                            <ToggleButton value={false}>
                                <WebIcon/> Imgflip
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <div className={classes.root}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={event => {
                                    displayingImage.src = window.URL.createObjectURL(event.target.files[0])
                                }}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="default" startIcon={<CloudUploadIcon/>}
                                        component="span">
                                    Upload
                                </Button>
                            </label>
                        </div>


                    </div>
                    <div className="inputArea">
                        <div className="inputBoxes">
                            <div className='titleInput'>
                                <span>Title</span>
                                <input className='savedTitle' onChange={event => {
                                    props.setSavedTitle(event.target.value)
                                }}/>
                            </div>
                            <TextInput updateInputUnits={updateInputUnits} index={0}/>
                            <TextInput updateInputUnits={updateInputUnits} index={1}/>
                            {numOfTexts > 2 ? <TextInput updateInputUnits={updateInputUnits} index={2}/> : null}
                            {numOfTexts > 3 ? <TextInput updateInputUnits={updateInputUnits} index={3}/> : null}
                        </div>
                        <Button
                            className="addButton"
                            variant="contained"
                            color='default'
                            onClick={() => {
                                if (numOfTexts < 4) {
                                    setNum(numOfTexts + 1);
                                } else {
                                    alert('You can only add up to four text input boxes!');
                                }
                            }}
                        >Add A New Text
                        </Button>
                        <Button
                            variant="contained"
                            color='default'
                            className="deleteButton"
                            onClick={() => {
                                if (numOfTexts > 2) {
                                    setNum(numOfTexts - 1);
                                } else {
                                    alert('There must be at least two text input boxes!');
                                }
                            }}
                        >Delete A Text
                        </Button>

                    </div>
                </Paper>
            </div>
        )
    }


}

export default MainDisplay;