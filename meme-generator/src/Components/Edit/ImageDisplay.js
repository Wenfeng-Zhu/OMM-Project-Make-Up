import React ,{useEffect,useRef}from 'react';
import Draggable from 'react-draggable';
import './ImageDisplay.css';

function ImageDisplay(props) {
    const exportImage = useRef(null);
    useEffect(()=>{
        props.setExportImage(exportImage.current);
    });
    return (
        <div className="imageArea">
            <div className="scrollBar">
                {/*The length of memesList is{memesList.length};*/}
                <p className="imageTitle">
                    {props.memesList[props.currentIndex].name}
                </p>
                <div className="scrollImages">
                    {props.memesList.map((item, index) => {
                        return (
                            <img key={index} className="scrollSingleImage" src={item.url}
                                 alt="Image can not be displayed"
                                 onClick={() => props.setIndex(index)}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="displayArea" ref={exportImage}>
                <img className="image" src={props.memesList[props.currentIndex].url} alt="Image can not be displayed"/>
                <Draggable bounds={'parent'}>
                    <text className="text_0"
                          style={{
                              fontSize: props.inputUnit_0.size+'px',
                              color: props.inputUnit_0.color,
                              fontWeight: props.inputUnit_0.bold ? 'bold' : 'normal',
                              fontStyle: props.inputUnit_0.italic ? 'italic' : 'normal'
                          }}
                    >{props.inputUnit_0.text}</text>
                </Draggable>
                <Draggable bounds={'parent'}>
                    <text className="text_1"
                          style={{
                              fontSize: props.inputUnit_1.size+'px',
                              color: props.inputUnit_1.color,
                              fontWeight: props.inputUnit_1.bold ? 'bold' : 'normal',
                              fontStyle: props.inputUnit_1.italic ? 'italic' : 'normal'
                          }}
                    >{props.inputUnit_1.text}</text>
                </Draggable>


            </div>
            <div className="buttonsArea">
                <button className="preButton"
                        onClick={() => props.setIndex(props.currentIndex === 0 ? props.memesList.length - 1 : props.currentIndex - 1)}
                >Pre
                </button>
                <button className="nextButton"
                        onClick={() => props.setIndex(props.currentIndex === props.memesList.length - 1 ? 0 : props.currentIndex + 1)}
                >Next
                </button>
            </div>
        </div>
    )
}

export default ImageDisplay;