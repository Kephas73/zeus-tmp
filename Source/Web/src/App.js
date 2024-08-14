import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import HostPage from './pages/host/HostPage';
import { Box, Button, Container, Modal } from '@material-ui/core';


const containerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "90%",
  borderRadius: "7px",
  backgroundColor: "#fff", // Change to whatever color you want
  padding: 24
};
function App() {
  return (
    <Router>
      <div>
        <nav className="container-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/host">Host Page</Link>
            </li>
          </ul>
        </nav>


        <Switch>
        <Route exact path="/"> <HomePage/> </Route>
        <Route exact path="/host"> <HostPage /> </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
