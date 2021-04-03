import React, {} from 'react';
import './Operations.css';
import domToImage from 'dom-to-image';
import {saveAs} from 'file-saver';
import jwtDecode from "jwt-decode";

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
                domToImage.toBlob(props.exportImage, null).then(function (blob){
                    let formData = new FormData();
                    formData.set('file', blob, props.savedTitle+'.png');
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://localhost:5000/images/'+jwtDecode(sessionStorage.getItem('token')).email, true);
                    xhr.send(formData);
                })


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