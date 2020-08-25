import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css"; 
import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyAePlnlT547B6hQ6xvgeI4QgrZUZTVWa-I",
  authDomain: "palmeet-4bc23.firebaseapp.com",
  databaseURL: "https://palmeet-4bc23.firebaseio.com",
  projectId: "palmeet-4bc23",
  storageBucket: "palmeet-4bc23.appspot.com",
  messagingSenderId: "514964160375",
  appId: "1:514964160375:web:9a33ede9ea7504b6766b72",
  measurementId: "G-5LEEXGZEQQ"
};
firebase.initializeApp(firebaseConfig)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
