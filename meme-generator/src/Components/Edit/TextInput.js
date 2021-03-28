import React, {useEffect, useReducer, useState} from "react";
import './TextInput.css'


// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'index':
//             //inputUnits.push({...state, index: action.index});
//             return {...state, index: action.index};
//         case 'text':
//             //inputUnits[state.index] = {...state, text: action.text};
//             return {...state, text: action.text};
//         case 'color':
//             //inputUnits[state.index] = {...state, color: action.color};
//             return {...state, color: action.color};
//         case 'size':
//             //inputUnits[state.index] = {...state, size: action.size};
//             return {...state, size: action.size};
//         case 'bold':
//             //inputUnits[state.index] = {...state, bold: action.bold};
//             return {...state, bold: action.bold};
//         case 'italic':
//             //inputUnits[state.index] = {...state, italic: action.italic};
//             return {...state, italic: action.italic};
//         default:
//             throw new Error('Unexpected action');
//     }
// };

const initialInputUnit = {
    index: 0,
    text: '',
    color: '#000000',
    size: 40,
    bold: false,
    italic: false
}

function TextInput(props) {


    const [textParameter, setText] = useState({...initialInputUnit, index: props.index})
    // const [inputUnit, updateInputUnit] = useReducer(reducer, initialInputUnit);
    useEffect(() => {
        props.updateInputUnits(textParameter);
    })
    return (
        <div className="inputUnit">
            <input className="inputBox" type="text"
                   onChange={event => {
                       //updateInputUnit({type: 'text', text: event.target.value})
                       setText({...textParameter, text: event.target.value});
                       //props.updateInputUnit({type: 'text', text: event.target.value})
                   }}/>
            <input className="inputColor" type="color"
                   onChange={event => {
                       //updateInputUnit({type: 'color', color: event.target.value})
                       setText({...textParameter, color: event.target.value});
                   }}/>
            <div>
                <label>Size</label>
                <input className="fontSize" type="number" defaultValue={40}
                       onChange={event => {
                           //updateInputUnit({type: 'size', size: event.target.value})
                           setText({...textParameter, size: event.target.value})
                           // initialInputUnit.size = event.target.value;
                           // props.updateInputUnits(initialInputUnit);
                       }}/>
            </div>

            <div>
                <label>Bold</label>
                <input className="fontBold" type="checkbox"
                       onChange={event => {
                           //updateInputUnit({type: 'bold', bold: event.target.checked})
                           // initialInputUnit.bold = event.target.checked;
                           // props.updateInputUnits(initialInputUnit);
                           setText({...textParameter,bold: event.target.checked})
                       }}/>
            </div>

            <div>
                <label>Italic</label>
                <input className="fontItalic" type="checkbox"
                       onChange={event => {
                           //updateInputUnit({type: 'italic', italic: event.target.checked})
                           // initialInputUnit.italic = event.target.checked;
                           // props.updateInputUnits(initialInputUnit);
                           setText({...textParameter,italic: event.target.checked})
                       }}/>
            </div>
        </div>

    )

}

export default TextInput;