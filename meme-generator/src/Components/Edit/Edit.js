import React, {useState, useEffect, useReducer, useRef} from 'react';
import './Edit.css'

function Edit() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [memesList, setMemes] = useState([]);
    const [currentIndex, setIndex] = useState(0);

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

    const preImage = () => setIndex(currentIndex === 0 ? memesList.length - 1 : currentIndex - 1);
    const nextImage = () => setIndex(currentIndex === memesList.length - 1 ? 0 : currentIndex + 1);


    if (error) {
        return <div>Error:{error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="EditArea">
                <div className="imageArea">
                    <div className="scrollBar">
                        {/*The length of memesList is{memesList.length};*/}
                        <p className="imageTitle">
                            {memesList[currentIndex].name}
                        </p>
                        <div className="scrollImages" >
                            {memesList.map((item, index) => {
                                return (
                                    <img key={index} className="scrollSingleImage" src={item.url}
                                         alt="Image can not be displayed"
                                         onClick={() => setIndex(index)}
                                    />
                                )
                            })}
                        </div>

                    </div>
                    <div className="displayArea">
                        <img className="image" src={memesList[currentIndex].url} alt="Image can not be displayed"/>
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