import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import HostPage from './pages/host/HostPage';

function App() {
  return (
    <Router>
      <div>
        <nav className="host-container-nav">
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
