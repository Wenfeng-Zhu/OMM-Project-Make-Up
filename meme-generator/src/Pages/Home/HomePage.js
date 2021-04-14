import './HomePage.css';
import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header/Header';
import MainDisplay from "../../Components/Edit/MainDisplay";
import Operations from "../../Components/Operations/Operations";
import Comments from "../../Components/Comments/Comments";
import LogInDialog from "../../Components/Dialogs/LogIn";
import RegistrationDialog from "../../Components/Dialogs/Registration";

const initialUserInfo = {
    email: '',
    username: '',
    password: ''
}

function HomePage() {
    /**First priority state**/
    const [sourceFromWeb, setSource] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [logState, setLogState] = useState(sessionStorage.getItem('token') != null);

    /**Second priority state**/
    //Whether to display the login pop-up window
    const [showLogIn, setShowLogIn] = useState(false);
    //Whether to display the registration pop-up window
    const [showRegistration, setShowRegistration] = useState(false)
    //set the user information: email-address, username, password
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    // the all memes will be displayed
    const [memesList, setMemes] = useState([]);
    //set the display oder of memesList: time, views, likes, default is time
    const [filter, setFilter] = useState('timestamp');
    // set the index of the displaying meme
    const [currentIndex, setIndex] = useState(0);

    /**Three priority status**/
    //set the file name when the meme is being downloaded
    const [savedTitle, setSavedTitle] = useState('saved Image')
    //set the node/DOM element of the displaying image
    const [exportImage, setExportImage] = useState(null);

    //get all memes from web server
    async function loadImagesFromWebServer() {
        fetch('http://localhost:5000/images/'+filter)
            .then(res => res.json())
            .then(result => {
                setMemes(result);
                setIsLoaded(true);
            }, (error) => {
                console.log(error)
            })
    }
    //get 100 memes of the most popular memes through api of imgflip
    async function loadImagesFromImgflip() {
        fetch("https://api.imgflip.com/get_memes", )
            .then(response => response.json())
            .then(result => {
                setMemes(result['data']['memes']);
                setIndex(0);
                setIsLoaded(true);
            }, (error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        (sourceFromWeb) ? loadImagesFromWebServer() : loadImagesFromImgflip();
    }, [sourceFromWeb,filter]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="HomePage">
                <div className="leftSidebar"/>
                <main>
                    <MainDisplay
                        sourceFromWeb={sourceFromWeb}
                        setSource={setSource}
                        isLoaded={isLoaded}
                        setIsLoaded={setIsLoaded}
                        filter={filter}
                        setFilter={setFilter}
                        memesList={memesList}
                        currentIndex={currentIndex}
                        setIndex={setIndex}
                        setExportImage={setExportImage}
                        exportImage={exportImage}
                        setSavedTitle={setSavedTitle}
                    />
                    <Operations
                        sourceFromWeb={sourceFromWeb}
                        isLoaded={isLoaded}
                        logState={logState}
                        exportImage={exportImage}
                        savedTitle={savedTitle}
                        currentMeme={memesList[currentIndex]}
                        currentImageId={memesList[currentIndex]._id}
                    />
                    <Comments
                        isLoaded={isLoaded}
                        sourceFromWeb={sourceFromWeb}
                        logState={logState}
                        setShowLogIn={setShowLogIn}

                        currentImageId={memesList[currentIndex]._id}
                    />
                </main>
                <div className="rightSidebar">
                    <Header
                        isLoaded={isLoaded}
                        logState={logState}
                        setLogState={setLogState}
                        setShowLogIn={setShowLogIn}
                        setShowRegistration={setShowRegistration}
                    />
                </div>

                <LogInDialog
                    logState={logState}
                    setLogState={setLogState}
                    showLogIn={showLogIn}
                    setShowLogIn={setShowLogIn}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                />
                <RegistrationDialog
                    logState={logState}
                    setLogState={setLogState}
                    showRegistration={showRegistration}
                    setShowRegistration={setShowRegistration}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                />
            </div>
        );
    }
}

export default HomePage;
