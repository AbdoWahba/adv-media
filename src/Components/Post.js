import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { red } from '@material-ui/core/colors';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import './Post.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    padding: '1rem 0rem',
    margin: '.5rem 0rem',
    borderRadius: '2rem',
  },

  smallRoot: {
    width: '95%',
    padding: '1rem 0rem',
    margin: '1rem 0rem',
    borderRadius: '1rem',
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post({
  body,
  auther,
  date,
  image,
  imageType,
  avatarSrc,
  tags,
}) {
  console.log(avatarSrc);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div className='post'>
      <Card className={matches ? classes.root : classes.smallRoot}>
        <CardHeader
          avatar={
            <Avatar
              src={avatarSrc ? JSON.parse(avatarSrc) : './momo'}
              alt={auther}
            />
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={auther}
          subheader={date}
        />
        <CardContent>
          <Typography variant='body2' component='p'>
            {body}
          </Typography>
        </CardContent>
        {image && imageType === 'video' ? (
          <CardMedia
            title='video'
            component='video'
            src={image}
            controls
            type='video/mp4'
          />
        ) : image ? (
          <CardMedia src={image} title='image' component='img' />
        ) : (
          ''
        )}
        <CardContent>
          <h3 style={{ margin: '.25rem' }}>TAGS</h3>
          <hr />
          <div className='tag__container--post'>
            {tags
              ? tags.map((el) => (
                  <div className='tag--post' key={el}>
                    {el}
                  </div>
                ))
              : ''}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
