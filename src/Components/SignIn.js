import React from 'react';
import { auth, provider } from '../firbase';
import { Button } from '@material-ui/core';

import './SignIn.css';

function SignIn() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => console.log('res: ', res))
      .catch((err) => console.log('err: ', err));
  };
  return (
    <div className='signin'>
      <div className='signin__logo'>
        <img
          src='https://icon-library.com/images/ads-icon/ads-icon-21.jpg'
          alt=''
        />
      </div>
      <div className='signin__title'>
        <h1>Ads Media</h1>
      </div>
      <div className='signin__button'>
        <Button variant='contained' color='primary' onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
