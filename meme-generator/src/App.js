import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [text,setText] = useState(null);
  function callAPI(){
    fetch("http://localhost:5000/testAPI")
        .then(res => res.text())
        .then(res => setText(res))
        .catch(err => err);
  }
  useEffect(()=>{
    callAPI();
  });
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {text}
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;
