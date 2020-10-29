import React from 'react';

import './Header.css';

import HomeIcon from '@material-ui/icons/Home';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import { Avatar } from '@material-ui/core';

import { useLocation, useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const currentRoute = location.pathname;

  const handleRoute = (route) => {
    history.push(route);
  };

  if (currentRoute.includes('/signin')) return <div></div>;
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
        <div
          onClick={() => handleRoute('/')}
          className={
            currentRoute === '/'
              ? 'header__option header__option--active'
              : 'header__option'
          }>
          <HomeIcon fontSize='large' />
          <p>Home</p>
        </div>
        <div
          onClick={() => handleRoute('/create')}
          className={
            currentRoute.includes('/create')
              ? 'header__option header__option--active'
              : 'header__option'
          }>
          <AddToPhotosIcon fontSize='large' />
          <p>Create Post</p>
        </div>
      </div>
      <div className='header__right'>
        <Avatar />
        <h5 className='header__user'>Abdo Wahba</h5>
      </div>
    </div>
  );
}

export default Header;
