import React from 'react';
import './Operations.css';
import domToImage from 'dom-to-image';
import {saveAs} from 'file-saver';

function Operations(props){
    return(
        <div className="OperationsArea">
            <button onClick={()=>{
                //const node = document.getElementsByClassName('displayArea');
                domToImage.toBlob(props.exportImage).then((blob)=>{
                    saveAs(blob,'自动保存.png')
                })
            }}>Download</button>
        </div>
    )
}

export default Operations;