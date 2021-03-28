import React, {useState, useEffect, useReducer, useRef} from 'react';
import './Edit.css';
import './ImageDisplay';
import ImageDisplay from "./ImageDisplay";
import TextInput from "./TextInput";
import ReactDOM from 'react-dom';
import Draggable from "react-draggable";

// function Text(index, text, color, size, bold, italic) {
//     this.index = index;
//     this.text = text;
//     this.color = color;
//     this.size = size;
//     this.bold = bold;
//     this.italic = italic;
// }

function Edit(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [memesList, setMemes] = useState([]);
    const [currentIndex, setIndex] = useState(0);
    const [numOfTexts, setNum] = useState(2);
    const [inputUnits, updateInputUnits] = useState({
        index: 0,
        text: '',
        color: '#000000',
        size: 40,
        bold: false,
        italic: false
    });

    // const [textList, setTextList] = useState({
    //     text_0: new Text(0, ',', '#000000', 40, false, false),
    //     text_1: new Text(1, ',', '#000000', 40, false, false)
    // });

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(result => {
                setMemes(result['data']['memes']);
                setIsLoaded(true);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });
    }, [memesList]);

    if (error) {
        return <div>Error:{error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        //alert('input text is: '+inputUnit.text);
        return (
            <div className="EditArea">
                <ImageDisplay
                    memesList={memesList}
                    currentIndex={currentIndex}
                    setIndex={setIndex}
                    inputUnits={inputUnits}
                    setExportImage={props.setExportImage}
                    numOfTexts = {numOfTexts}
                />
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

                {/*<p>*/}
                {/*    /!*{inputUnit_0.size + ' ' + inputUnit_1.index+' '}*!/*/}
                {/*</p>*/}

            </div>
        )
    }


}

export default Edit;