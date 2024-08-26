import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import HostPage from './pages/host/HostPage';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            {' '}
            <HomePage />{' '}
          </Route>
          <Route exact path="/host">
            {' '}
            <HostPage />{' '}
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
