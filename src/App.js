import React from 'react';
import './App.css';
import Header from './Components/Header';
import Feed from './Components/Feed';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CreatePost from './Components/CreatePost';
import SignIn from './Components/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className='App'>
          <Header />
          <Route exact path='/' component={Feed} />
          <Route path='/create' component={CreatePost} />
          <Route path='/signin' component={SignIn} />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
