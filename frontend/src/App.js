import React, { Component } from 'react';
import { BrowserRouter as Router  , Route , Switch  } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'
import ResetPassword from './Components/ResetPassword';
import Register from './Components/Register'

class App extends Component {
  render(){
    return (
      <div className="App">
          <Router>
            <Switch>
              <Route exact path = '/login' component={()=><Login />} />
              <Route exact path = '/resetPassword' component={()=><ResetPassword />} />
              <Route exact path = '/register' component={()=> <Register />} />
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
