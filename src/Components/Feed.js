import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  TextField,
  Paper,
  InputBase,
  Divider,
  IconButton,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

import Post from './Post';
import Video from './vid.mp4';
import './Feed.css';
import { useStateValue } from '../store/Provider';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
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
  tagsRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    marginTop: '2rem',
    width: '50%',
  },
  tagsRootSmall: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    marginTop: '2rem',
    width: '80%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  upload: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputFile: {
    display: 'none',
  },
}));

function Feed() {
  const classes = useStyles();

  const [{ posts }, dispacher] = useStateValue();
  const [postsList, setPostsList] = useState(posts);
  const [tag, setTag] = useState('');
  const [tagsList, setTagsList] = useState([]);
  const matches = useMediaQuery('(min-width:600px)');

  const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  };
  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const removeTag = () => {
    const newTags = [...tagsList];
    newTags.splice(-1, 1);
    setTagsList(newTags);
  };

  const addTag = () => {
    if (tag && tag.length >= 3) {
      setTagsList([...tagsList, tag]);
      setTag('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      addTag();
    }
  };
  console.log(tagsList);
  const findCommonElement = (array1, array2) => {
    // Loop for array1
    for (let i = 0; i < array1.length; i++) {
      // Loop for array2
      for (let j = 0; j < array2.length; j++) {
        // Compare the element of each and
        // every element from both of the
        // arrays
        if (array1[i] === array2[j]) {
          // Return if common element found
          return true;
        }
      }
    }

    // Return if no common element exist
    return false;
  };
  return (
    <div>
      <Paper
        component='div'
        className={matches ? classes.tagsRoot : classes.tagsRootSmall}>
        <InputBase
          className={classes.input}
          placeholder='Filter By Tags'
          //   inputProps={{ 'aria-label': 'search google maps' }}
          //   variant='filled'
          value={tag}
          onChange={handleTagChange}
          onKeyDown={handleKeyDown}
        />
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          color='primary'
          className={classes.iconButton}
          aria-label='add'
          onClick={addTag}>
          <AddIcon />
        </IconButton>
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          color='secondary'
          className={classes.iconButton}
          aria-label='add'
          onClick={removeTag}>
          <CancelPresentationIcon />
        </IconButton>
      </Paper>
      <div className='tag__container--feed'>
        {tagsList.map((el) => (
          <div className='tag--feed' key={el}>
            {el}
          </div>
        ))}
      </div>
      {posts
        .filter(({ data }) => {
          return tagsList.length == 0 || findCommonElement(tagsList, data.tags);
        })
        .map(({ id, data }) => {
          const { body, tags, image, avatar, auther, date, imgType } = data;
          console.log(avatar);
          return (
            <Post
              key={id}
              auther={auther}
              body={body}
              date={timeConverter(date.toMillis())}
              imageType={imgType}
              image={image}
              avatarSrc={}
              tags={tags}
            />
          );
        })}
      <Post
        key='1'
        auther='Abdo Wahba'
        body='Lana Del Ray <3'
        date='14 sep 2020'
        imageType='video'
        image={Video}
      />
      <Post
        key='2'
        auther='Abdo Wahba'
        body='Lana Del Ray <3'
        date='14 sep 2020'
        imageType='img'
        image='data:image/jpeg;base64,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'
      />
      <Post
        key='3'
        auther='Abdo Wahba'
        body='this is a legand post'
        date='14 sep 2020'
      />
    </div>
  );
}

export default Feed;
