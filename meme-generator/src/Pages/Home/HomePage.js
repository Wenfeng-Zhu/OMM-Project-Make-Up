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

    async function loadImagesFromImgflip() {
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
        return (
            <div className="App">
                <header>
                    <Header
                        isLoaded = {isLoaded}
                        logState={logState}
                        setLogState={setLogState}
                        setShowLogIn = {setShowLogIn}
                        setShowRegistration = {setShowRegistration}
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
                        isLoaded = {isLoaded}
                        logState = {logState}
                        exportImage={exportImage}
                        savedTitle={savedTitle}
                        currentImageId = {memesList[currentIndex]._id}
                    />
                    <Comments
                        isLoaded ={isLoaded}
                        sourceFromWeb = {sourceFromWeb}
                        logState = {logState}
                        setShowLogIn = {setShowLogIn}

                        currentImageId = {memesList[currentIndex]._id}
                    />
                </main>
                <div className="rightSidebar"/>

                <LogInDialog
                    logState = {logState}
                    setLogState = {setLogState}
                    showLogIn = {showLogIn}
                    setShowLogIn = {setShowLogIn}
                    userInfo = {userInfo}
                    setUserInfo = {setUserInfo}
                />
                {/*Dialog of registration*/}
                <RegistrationDialog
                    showRegistration = {showRegistration}
                    setShowRegistration = {setShowRegistration}
                    userInfo = {userInfo}
                    setUserInfo = {setUserInfo}
                />
            </div>
        );
    }



}

export default HomePage;
