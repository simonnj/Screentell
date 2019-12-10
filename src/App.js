import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// importing components
import Navbar from './components/NavBar';
import Tells from './components/Tells';
import UserList from './components/UserList';
// importing pages
import homePage from './pages/homePage';
import signupPage from './pages/signupPage';
import loginPage from './pages/loginPage';
import cardTest from './pages/cardTest';




export class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <div>
          
        </div>
        <BrowserRouter>
          <Navbar />>
          <div className="container">
            <Switch>
              <Route exact path="/" component={homePage} />>
              <Route exact path="/signupPage" component={signupPage} />>
              <Route exact path="/loginPage" component={loginPage} />>
              <Route exact path="/cardTest" component={cardTest} />>
              
          </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
