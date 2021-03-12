import React, {useState, useEffect, useReducer,useRef} from 'react';
import './Edit.css'

// const initState = {
//     isLoaded: false,
//     memesList: loadImages(),
//     index: 0,
// }
//
// function loadImages() {
//     const memesList = [];
//     fetch("https://api.imgflip.com/get_memes")
//         .then(response => response.json())
//         .then(result => {
//             for (let i = 0; i < result['data']['memes'].length; i++) {
//                 memesList[i] = result['data']['memes'][i];
//             }
//             return memesList;
//         })
// }
//

// function loadImagesReducer(state, action) {
//     switch (action.type) {
//         case 'pre':
//             return {index: state.index === 0 ? memesList.length - 1 : state.index - 1};
//         case 'next':
//             return {index: state.index === (memesList.length - 1) ? 0 : state.index + 1};
//         default :
//             throw new Error();
//     }
// }


function Edit() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [memesList, setMemes] = useState([]);
    //const initialState = {index: 0};
    // const [state,dispatch] = useReducer(loadImagesReducer,initialState);
    const [index, setIndex] = useState(0);

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

    const preImage = () => setIndex(index === 0 ? memesList.length - 1 : index - 1);
    const nextImage = () => setIndex(index === memesList.length - 1 ? 0 : index + 1);


    if (error) {
        return <div>Error:{error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="EditArea">
                <div className="imageArea">
                    <div className="scrollBar">
                        This is ScrollBar
                    </div>
                    <div className="displayArea" >
                        <img className="image" src={memesList[index].url} alt="Image can not be displayed" />
                    </div>
                    <div className="buttonsArea">
                        <button className="preButton" onClick={preImage}>Pre</button>
                        <button className="nextButton" onClick={nextImage}>Next</button>
                    </div>
                </div>
                <div className="inputArea">
                    This is Input Area
                </div>
            </div>
        )
    }


}

export default Edit;