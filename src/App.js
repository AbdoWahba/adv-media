import React, { useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Feed from './Components/Feed';
import { Route, BrowserRouter } from 'react-router-dom';
import CreatePost from './Components/CreatePost';
import SignIn from './Components/SignIn';
import { useStateValue } from './store/Provider';
import { actionTypes } from './store/reducers';
import db from './firbase';
function App() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    db.collection('posts')
      .orderBy('date', 'desc')
      .onSnapshot((snapshot) => {
        dispatch({
          type: actionTypes.FETCH_POSTS,
          posts: snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
        });
      });
  }, []);
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Route exact path='/' component={Feed} />
        <Route path='/create' component={CreatePost} />
        <Route path='/signin' component={SignIn} />
      </div>
    </BrowserRouter>
  );
}

export default App;
