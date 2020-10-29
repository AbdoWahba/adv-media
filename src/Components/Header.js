import React from 'react';

import './Header.css';

import HomeIcon from '@material-ui/icons/Home';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import { Avatar } from '@material-ui/core';

function Header({ currentRoute }) {
  return (
    <div className='header'>
      <div className='header__left'>
        <img
          src='https://icon-library.com/images/ads-icon/ads-icon-21.jpg'
          alt=''
        />
        <h3 className='header__title'>Ads Media</h3>
      </div>
      <div className='header__center'>
        <div className='header__option header__option--active'>
          <HomeIcon fontSize='large' />
          <p>Home</p>
        </div>
        <div className='header__option'>
          <AddToPhotosIcon fontSize='large' />
          <p>Create Post</p>
        </div>
      </div>
      <div className='header__right'>
        <Avatar src='https://icon-library.com/images/ads-icon/ads-icon-21.jpg' />
        <h5>Abdo Wahba</h5>
      </div>
    </div>
  );
}

export default Header;
