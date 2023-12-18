import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home';
import Login from './login';
import './app.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route path="/login">
            <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;