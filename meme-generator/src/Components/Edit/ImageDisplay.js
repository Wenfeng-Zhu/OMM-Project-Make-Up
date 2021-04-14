import React, {useEffect, useRef, useState} from 'react';
import Draggable from 'react-draggable';
import './ImageDisplay.css';
import MainImage from "./MainImage";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import Autocomplete from '@material-ui/lab/Autocomplete';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {Button, TextField} from "@material-ui/core";


function ImageDisplay(props) {
    const exportImage = useRef(null);
    const [autoplay, setAutoplay] = useState(false);
    const [textsParameter_0, setTextsParameter_0] = useState({
        index: 0,
        text: '',
        color: '#000000',
        size: 40,
        bold: false,
        italic: false
    });
    const [textsParameter_1, setTextsParameter_1] = useState({
        index: 1,
        text: '',
        color: '#000000',
        size: 40,
        bold: false,
        italic: false
    });
    const [textsParameter_2, setTextsParameter_2] = useState({
        index: 2,
        text: '',
        color: '#000000',
        size: 40,
        bold: false,
        italic: false
    });
    const [textsParameter_3, setTextsParameter_3] = useState({
        index: 3,
        text: '',
        color: '#000000',
        size: 40,
        bold: false,
        italic: false
    });

    useEffect(() => {
        if (props.inputUnits.index === 0) {
            setTextsParameter_0(props.inputUnits);
        } else if (props.inputUnits.index === 1) {
            setTextsParameter_1(props.inputUnits);
        } else if (props.inputUnits.index === 2) {
            setTextsParameter_2(props.inputUnits)
        } else if (props.inputUnits.index === 3) {
            setTextsParameter_3(props.inputUnits)
        }
        props.setExportImage(exportImage.current);
    });


    if (!props.isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="imageArea">
                <div className='searchInput'>
                    <Autocomplete
                        id="searchInput"
                        disableClearable
                        options={props.memesList}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) => {
                            // Apply the index of search results to the display area
                            props.setIndex(props.memesList.indexOf(value));
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                margin="normal"
                                variant="outlined"
                                InputProps={{...params.InputProps, type: 'search'}}
                            />
                        )}
                    />
                </div>
                <div className="scrollBar">
                    <div className='topBar'>
                        <p className="imageTitle">
                            {/*display the name of the displaying image*/}
                            {props.memesList[props.currentIndex].name}
                        </p>
                        <ToggleButtonGroup
                            className='filtering'
                            value={props.filter}
                            exclusive
                            onChange={(event, filtering) => {
                                // Apply the display order to the display area
                                if (filtering !== null) {
                                    props.setFilter(filtering);
                                }
                            }}
                        >
                            {/*The display order of the three pictures: time, number of views, number of likes*/}
                            <ToggleButton value="timestamp" disabled={!props.sourceFromWeb}>
                                <HistoryIcon/>
                            </ToggleButton>
                            <ToggleButton value="views" disabled={!props.sourceFromWeb}>
                                <VisibilityIcon/>
                            </ToggleButton>
                            <ToggleButton value="likes" disabled={!props.sourceFromWeb}>
                                <ThumbUpAltIcon/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="scrollImages">
                        {props.memesList.map((item, index) => {
                            return (
                                <img key={index} className="scrollSingleImage" src={
                                    // Get the url information of the picture through the current index and display it in the main display area
                                    (props.sourceFromWeb) ? ('http://localhost:5000/upload/' + item.url) : (item.url)
                                }
                                     alt="Image can not be displayed"
                                     onClick={() => props.setIndex(index)}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="displayArea" ref={exportImage}>
                    <MainImage
                        currentIndex={props.currentIndex}
                        memesList={props.memesList}
                        sourceFromWeb={props.sourceFromWeb}
                        isLoaded={props.isLoaded}
                        setDisplayingImage={props.setDisplayingImage}
                    />
                    {/*Up to four draggable text*/}
                    <Draggable bounds={'parent'}>
                        <p className={"text_0"}
                           style={{
                               fontSize: textsParameter_0.size + 'px',
                               color: textsParameter_0.color,
                               fontWeight: textsParameter_0.bold ? 'bold' : 'normal',
                               fontStyle: textsParameter_0.italic ? 'italic' : 'normal'
                           }}
                        >{textsParameter_0.text}</p>
                    </Draggable>
                    <Draggable bounds={'parent'}>
                        <p className="text_1"
                           style={{
                               fontSize: textsParameter_1.size + 'px',
                               color: textsParameter_1.color,
                               fontWeight: textsParameter_1.bold ? 'bold' : 'normal',
                               fontStyle: textsParameter_1.italic ? 'italic' : 'normal'
                           }}
                        >{textsParameter_1.text}</p>
                    </Draggable>
                    {props.numOfTexts > 2 ? <Draggable bounds={'parent'}>
                        <p className="text_2"
                           style={{
                               fontSize: textsParameter_2.size + 'px',
                               color: textsParameter_2.color,
                               fontWeight: textsParameter_2.bold ? 'bold' : 'normal',
                               fontStyle: textsParameter_2.italic ? 'italic' : 'normal'
                           }}
                        >{textsParameter_2.text}</p>
                    </Draggable> : null}

                    {props.numOfTexts > 3 ? <Draggable bounds={'parent'}>
                        <p className="text_3"
                           style={{
                               fontSize: textsParameter_3.size + 'px',
                               color: textsParameter_3.color,
                               fontWeight: textsParameter_3.bold ? 'bold' : 'normal',
                               fontStyle: textsParameter_3.italic ? 'italic' : 'normal'
                           }}
                        >{textsParameter_3.text}</p>
                    </Draggable> : null}


                </div>
                <div className="buttonsArea">
                    <Button
                        variant="contained"
                        color='default'
                        className="preButton"
                        onClick={() => props.setIndex(props.currentIndex === 0 ? props.memesList.length - 1 : props.currentIndex - 1)}
                    >Pre
                    </Button>
                    <Button
                        variant="contained"
                        color='default'
                        className="nextButton"
                        onClick={() => props.setIndex(props.currentIndex === props.memesList.length - 1 ? 0 : props.currentIndex + 1)}
                    >Next
                    </Button>
                </div>
            </div>
        );

    }


}

export default ImageDisplay;