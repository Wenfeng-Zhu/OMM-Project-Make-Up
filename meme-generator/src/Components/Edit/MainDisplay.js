import React, {useState, useEffect, useReducer, useRef} from 'react';
import './MainDisplay.css';
import './ImageDisplay';
import ImageDisplay from "./ImageDisplay";
import TextInput from "./TextInput";
import ReactDOM from 'react-dom';
import Draggable from "react-draggable";

function MainDisplay(props) {

    //const [isLoaded, setIsLoaded] = useState(false);

    const [numOfTexts, setNum] = useState(2);
    const [inputUnits, updateInputUnits] = useState({
        index: 0,
        text: '',
        color: '#000000',
        size: 40,
        bold: false,
        italic: false
    });


    if (!props.isLoaded) {
        return <div>Loading...</div>;
    } else
    {
        //alert('input text is: '+inputUnit.text);
        return (
            <div className="MainDisplay">
                <ImageDisplay
                    sourceFromWeb={props.sourceFromWeb}
                    memesList={props.memesList}
                    isLoaded={props.isLoaded}
                    currentIndex={props.currentIndex}
                    setIndex={props.setIndex}
                    inputUnits={inputUnits}
                    setExportImage={props.setExportImage}
                    numOfTexts={numOfTexts}
                />
                <div className='rightEdit'>
                    <div className="SourceButton">
                        <button onClick={() => {
                            props.setSource(true);
                            props.setIndex(0);
                            props.setIsLoaded(false);
                        }}>Web Server
                        </button>
                        <button onClick={() => {
                            props.setSource(false);
                            props.setIndex(0);
                            props.setIsLoaded(false);
                        }}>Imgflip
                        </button>

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
                        <button className="addButton"
                                onClick={() => {
                                    if (numOfTexts < 4) {
                                        setNum(numOfTexts + 1);
                                    } else {
                                        alert('You can only add up to four text input boxes!');
                                    }
                                }}
                        >Add A New Text
                        </button>
                        <button className="deleteButton"
                                onClick={() => {
                                    if (numOfTexts > 2) {
                                        setNum(numOfTexts - 1);
                                    } else {
                                        alert('There must be at least two text input boxes!');
                                    }
                                }}
                        >Delete A Text
                        </button>

                    </div>
                </div>


            </div>
        )
    }


}

export default MainDisplay;