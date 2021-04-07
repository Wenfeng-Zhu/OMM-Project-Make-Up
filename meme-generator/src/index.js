import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './Pages/Home/HomePage';
import Admin from './Pages/Admin/Admin'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Profile from "./Pages/User Menu/Profile";
import SavedMemes from "./Pages/User Menu/SavedMemes";

ReactDOM.render(
  <React.StrictMode>
      <>
          <Router>
              <Switch>
                  <Route path={'/'} exact component = {HomePage}/>
                  <Route path={'/admin'} component={Admin}/>
                  <Route path='/profile' component={Profile}/>
                  <Route path='/savedMemes' component={SavedMemes}/>
              </Switch>
          </Router>
      </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
