import React, {useEffect, useState} from "react";
import './TextInput.css'

const initialInputUnit = {
    index: 0,
    text: '',
    color: '#000000',
    size: 40,
    bold: false,
    italic: false
}

function TextInput(props) {
    //set the form information of texts
    const [textParameter, setText] = useState({...initialInputUnit, index: props.index})

    useEffect(() => {
        props.updateInputUnits(textParameter);
    })
    return (
        <div className="inputUnit">
            {/*Change the format of the displayed text in real time through state*/}
            <input className="inputBox" type="text"
                   onChange={event => {
                       setText({...textParameter, text: event.target.value});
                   }}/>
            <input className="inputColor" type="color"
                   onChange={event => {
                       setText({...textParameter, color: event.target.value});
                   }}/>
            <div>
                <label>Size</label>
                <input className="fontSize" type="number" defaultValue={40}
                       onChange={event => {
                           setText({...textParameter, size: event.target.value})
                       }}/>
            </div>
            <div>
                <label>Bold</label>
                <input className="fontBold" type="checkbox"
                       onChange={event => {
                           setText({...textParameter, bold: event.target.checked})
                       }}/>
            </div>
            <div>
                <label>Italic</label>
                <input className="fontItalic" type="checkbox"
                       onChange={event => {
                           setText({...textParameter, italic: event.target.checked})
                       }}/>
            </div>
        </div>
    )
}

export default TextInput;