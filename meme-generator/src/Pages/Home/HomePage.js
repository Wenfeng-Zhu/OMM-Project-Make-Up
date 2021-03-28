import './HomePage.css';
import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header/Header';
import Edit from "../../Components/Edit/Edit";
import Operations from "../../Components/Operations/Operations";
import Comments from "../../Components/Comments/Comments";

// const initialUserInfo ={
//     username:'',
// }

function HomePage() {
    // const [text, setText] = useState(null);
    //
    // function callAPI() {
    //     fetch("http://localhost:5000/testAPI")
    //         .then(res => res.text())
    //         .then(res => setText(res))
    //         .catch(err => err);
    // }
    //
    // useEffect(() => {
    //     callAPI();
    // });
    const [exportImage, setExportImage] = useState(null);
    const [savedTitle,setSavedTitle] = useState('saved Image')
    // logState: logged or not, use to update the whole page when log-in or -out
    const [logState, setLogState] = useState(sessionStorage.getItem('token') != null);
    //const [userInfo,setUserInfo] = useReducer()

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
                <Edit
                    setExportImage={setExportImage}
                    exportImage={exportImage}
                    setSavedTitle = {setSavedTitle}
                />
                <Operations exportImage={exportImage} savedTitle = {savedTitle}/>
                <Comments/>
                {/*<p>*/}
                {/*    {'token:'+sessionStorage.getItem('token')}*/}
                {/*</p>*/}
            </main>
            <div className="rightSidebar"/>
            {/*<footer>*/}
            {/*    <p>Footer is displaying</p>*/}
            {/*</footer>*/}

        </div>
    );
}

export default HomePage;
