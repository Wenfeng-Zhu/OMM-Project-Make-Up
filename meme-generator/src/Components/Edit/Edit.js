import React from 'react';
import './Edit.css'

function Edit(){
    return(
        <div className="EditArea">
            <div className="imageArea">
                <div className="scrollBar">
                    This is ScrollBar
                </div>
                <div className="displayArea">
                    This is display Area
                </div>
                <div className="buttonsArea">
                    <button className="preButton">Pre</button>
                    <button className="nextButton">Next</button>
                </div>
            </div>
            <div className="inputArea">
                This is Input Area
            </div>
        </div>
    )
}

export default Edit;