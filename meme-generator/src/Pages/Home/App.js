import './App.css';
import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header/Header';
import Edit from "../../Components/Edit/Edit";
import Operations from "../../Components/Operations/Operations";
import Comments from "../../Components/Comments/Comments";

// const initialUserInfo ={
//     username:'',
// }

function App() {
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
    const [exportImage,setExportImage] = useState(null);
    const [isLogged, logInOrOut] = useState(false);
    //const [userInfo,setUserInfo] = useReducer()

    return (
        <div className="App">
            <header>
                <Header
                    isLogged = {isLogged}
                    logInOrOut = {logInOrOut}
                />
            </header>
            <div className="leftSidebar"/>
            <main>
                <Edit setExportImage = {setExportImage}/>
                <Operations exportImage = {exportImage}/>
                <Comments/>
            </main>
            <div className="rightSidebar"/>
            {/*<footer>*/}
            {/*    <p>Footer is displaying</p>*/}
            {/*</footer>*/}

        </div>
    );
}

export default App;
