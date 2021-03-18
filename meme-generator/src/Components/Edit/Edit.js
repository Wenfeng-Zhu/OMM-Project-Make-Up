import React,{useState, useEffect, useReducer, useRef} from 'react';
import './Edit.css';
import './ImageDisplay';
import ImageDisplay from "./ImageDisplay";
import TextInput from "./TextInput";
import ReactDOM from 'react-dom';


const initialInputUnit = {
    index: 0,
    text: '',
    color: '#000000',
    size: 40,
    bold: false,
    italic: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'index':
            //inputUnits.push({...state, index: action.index});
            return {...state, index: action.index};
        case 'text':
            //inputUnits[state.index] = {...state, text: action.text};
            return {...state, text: action.text};
        case 'color':
            //inputUnits[state.index] = {...state, color: action.color};
            return {...state, color: action.color};
        case 'size':
            //inputUnits[state.index] = {...state, size: action.size};
            return {...state, size: action.size};
        case 'bold':
            //inputUnits[state.index] = {...state, bold: action.bold};
            return {...state, bold: action.bold};
        case 'italic':
            //inputUnits[state.index] = {...state, italic: action.italic};
            return {...state, italic: action.italic};
        default:
            throw new Error('Unexpected action');
    }
};

function Edit(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [memesList, setMemes] = useState([]);
    const [currentIndex, setIndex] = useState(0);
    //const [inputUnits,updateAllUnits] = useState([]);
    const [inputUnit_0, updateInputUnit_0] = useReducer(reducer, initialInputUnit);
    const [inputUnit_1, updateInputUnit_1] = useReducer(reducer, initialInputUnit);

    // function initialInputUnits(index){
    //     let tempInputUnits = inputUnits.slice();
    //     tempInputUnits.push({
    //         index: index,
    //         text: '',
    //         color: '#000000',
    //         size: 40,
    //         bold: false,
    //         italic: false
    //     });
    //     return tempInputUnits;
    // }


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
    }, []);

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
                    inputUnit_0 = {inputUnit_0}
                    inputUnit_1 = {inputUnit_1}
                    setExportImage = {props.setExportImage}
                />
                <div className="inputArea">
                    <div className="inputBoxes" id="inputBoxes">
                        <TextInput updateInputUnit={updateInputUnit_0} index = {'0'}/>
                        <TextInput updateInputUnit={updateInputUnit_1} index = {'1'}/>
                    </div>
                    <button className="addButton"
                            onClick={()=>{
                                ReactDOM.render(<TextInput updateInputUnit={updateInputUnit_1} index = {'1'}/>,document.getElementById('inputBoxes'))
                            }}
                    >Add A New Text</button>

                </div>

                {/*<p>*/}
                {/*    /!*{inputUnit_0.size + ' ' + inputUnit_1.index+' '}*!/*/}
                {/*</p>*/}

            </div>
        )
    }


}

export default Edit;