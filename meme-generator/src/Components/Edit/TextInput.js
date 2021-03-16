import React ,{useEffect}from "react";
import './TextInput.css'

function TextInput(props) {
    useEffect(()=>{
        //props.updateInputUnit({type:'index',index:props.index});
        //alert('Test times')
        //alert('test')
    })
    return (
        <div className="inputUnit">
            <input className="inputBox" type="text"
                   onChange={event => props.updateInputUnit({type: 'text', text: event.target.value})}/>
            <input className="inputColor" type="color"
                   onChange={event => props.updateInputUnit({type: 'color', color: event.target.value})}/>
            <div>
                <label>Size</label>
                <input className="fontSize" type="number" defaultValue={40}
                       onChange={event => props.updateInputUnit({type: 'size', size: event.target.value})}/>
            </div>

            <div>
                <label>Bold</label>
                <input className="fontBold" type="checkbox"
                       onChange={event => props.updateInputUnit({type: 'bold', bold: event.target.checked})}/>
            </div>

            <div>
                <label>Italic</label>
                <input className="fontItalic" type="checkbox"
                       onChange={event => props.updateInputUnit({type: 'italic', italic: event.target.checked})}/>
            </div>

        </div>

    )

}

export default TextInput;