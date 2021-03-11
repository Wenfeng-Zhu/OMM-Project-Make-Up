import logo from '../../logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header/Header';
import Edit from "../../Components/Edit/Edit";
import Operations from "../../Components/Operations/Operations";
import Comments from "../../Components/Comments/Comments";

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

    return (
        <div className="App">
            <header>
                <Header/>
            </header>
            <div className="leftSidebar"/>
            <main>
                <Edit/>
                <Operations/>
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
