import './HomePage.css';
import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header/Header';
import MainDisplay from "../../Components/Edit/MainDisplay";
import Operations from "../../Components/Operations/Operations";
import Comments from "../../Components/Comments/Comments";

// const initialUserInfo ={
//     username:'',
// }

function HomePage() {
    /**First priority state**/
    const [sourceFromWeb, setSource] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [logState, setLogState] = useState(sessionStorage.getItem('token') != null);

    /**Second priority state**/



    const [savedTitle, setSavedTitle] = useState('saved Image')

    const [memesList, setMemes] = useState([]);
    const [currentIndex, setIndex] = useState(0);
    const [error, setError] = useState(null);


    const [exportImage, setExportImage] = useState(null);

    async function loadImagesFromWebServer() {
        fetch('http://localhost:5000/images')
            .then(res => res.json())
            .then(result => {
                setMemes(result);
                setIsLoaded(true);
            }, (error) => {
                console.log(error)
            })
    }

    function loadImagesFromImgflip() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(result => {
                setMemes(result['data']['memes']);
                setIsLoaded(true);
            }, (error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        (sourceFromWeb) ? loadImagesFromWebServer() : loadImagesFromImgflip();
    }, [sourceFromWeb]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else{
        //setIsLoaded(false);
        return (
            <div className="App">
                <header>
                    <Header
                        logState={logState}
                        setLogState={setLogState}
                    />
                </header>
                <div className="leftSidebar"/>
                <main>
                    <MainDisplay
                        sourceFromWeb={sourceFromWeb}
                        setSource={setSource}
                        isLoaded={isLoaded}
                        setIsLoaded = {setIsLoaded}
                        memesList={memesList}
                        currentIndex={currentIndex}
                        setIndex={setIndex}

                        setExportImage={setExportImage}
                        exportImage={exportImage}
                        setSavedTitle={setSavedTitle}
                    />
                    <Operations
                        exportImage={exportImage}
                        savedTitle={savedTitle}
                    />
                    <Comments/>
                </main>
                <div className="rightSidebar"/>
                {/*<footer>*/}
                {/*    <p>Footer is displaying</p>*/}
                {/*</footer>*/}

            </div>
        );
    }



}

export default HomePage;
