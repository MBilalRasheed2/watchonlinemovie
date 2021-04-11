import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, {useEffect } from "react";
import Home from "./container/home";
import Details from "./container/details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as operationAction from './action/operation';
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(operationAction.operationLoad());
    
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/category/:main" component={Home} />
        <Route exact path="/details/:id" component={Details} />
      </Switch>
    </Router>
  );
};

export default App;
