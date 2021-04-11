import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";
import Store from "./Store";
import { Provider } from "react-redux";

var firebaseConfig = {
  apiKey: "AIzaSyBebjuql3UW8KRXwOUu5YyT2BWzG1A_XxA",
  authDomain: "banded-encoder-237513.firebaseapp.com",
  databaseURL: "https://banded-encoder-237513.firebaseio.com",
  projectId: "banded-encoder-237513",
  storageBucket: "banded-encoder-237513.appspot.com",
  messagingSenderId: "426831009836",
  appId: "1:426831009836:web:9b064d1980d48f57f55989",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
