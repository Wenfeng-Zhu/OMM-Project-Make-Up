import React, {useEffect, useRef, useState} from 'react';
import './Operations.css';
import domToImage from 'dom-to-image';
import {saveAs} from 'file-saver';
import * as ReactDOM from "react-dom";

function Operations(props) {

    return (
        <div className="OperationsArea">
            <button onClick={() => {
                //alert(props.exportImage.title)
                domToImage.toBlob(props.exportImage, null).then((blob) => {
                    saveAs(blob, props.savedTitle)
                })
            }}>Download
            </button>
            <button onClick={() => {

            }}>
                Save
            </button>
            {/*<>*/}
            {/*    {props.exportImage}*/}
            {/*</>*/}

        </div>
    )
}

export default Operations;