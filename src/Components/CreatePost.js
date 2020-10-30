import React, { useState, useEffect } from 'react';
import db from '../firbase';
import firebase from 'firebase';
import { useLocation, useHistory } from 'react-router-dom';
import { useStateValue } from '../store/Provider';
import { storage } from '../firbase';
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
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import './CreatePost.css';

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

function CreatePost() {
  const [body, setBody] = useState('');
  const [canPost, setCanPost] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const history = useHistory();

  const [tag, setTag] = useState('');
  const [tagsList, setTagsList] = useState([]);
  const allInputs = { imgUrl: '' };
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageType, setImageType] = useState('');

  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleFireBaseUpload = () => {
    console.log('start of upload');
    // async magic goes here...
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref('images')
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log('FFFIIINNNIIISH');
            setImageReady(true);
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };
  const addTag = () => {
    if (tag && tag.length >= 3) {
      setTagsList([...tagsList, tag]);
      setTag('');
    }
  };
  console.log(imageAsFile);
  console.log(imageAsUrl);
  const handleImageAsFile = (e) => {
    setImageReady(false);
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
    setImageType((imageType) =>
      image.type.includes('image') ? 'img' : 'video'
    );
  };
  useEffect(() => {
    if (imageAsFile !== '') {
      handleFireBaseUpload();
    }
  }, [imageAsFile]);
  useEffect(() => {
    console.log(imageAsUrl.imgUrl, imageReady);
    if (
      (tagsList.length !== 0 && body && imageAsFile == '') ||
      (tagsList.length !== 0 && imageAsUrl.imgUrl && imageReady)
    ) {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  });
  const removeTag = () => {
    const newTags = [...tagsList];
    newTags.splice(-1, 1);
    setTagsList(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      addTag();
    }
  };

  const post = () => {
    db.collection('posts').add({
      auther: user.displayName ? user.displayName : '',
      avatar: user.photoURL ? user.photoURL : '',
      body: body,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      image: imageAsUrl.imgUrl ? imageAsUrl.imgUrl : '',
      imgType: imageType ? imageType : '',
      tags: tagsList ? tagsList : [],
    });
    setTimeout(() => {
      history.push('/');
    }, 2000);
  };
  return (
    <div className='create'>
      <Card className={matches ? classes.root : classes.smallRoot}>
        <CardHeader
          avatar={<Avatar src={user ? user.photoURL : ''} />}
          title={user ? user.displayName : ''}
        />
        <CardContent>
          <TextField
            id='filled-full-width'
            style={{ margin: 8 }}
            placeholder={
              user ? `What is on your mind, ${user.displayName}?` : ''
            }
            fullWidth
            margin='normal'
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            variant='filled'
            onChange={handleBodyChange}
            value={body}
          />
          <Paper component='div' className={classes.tagsRoot}>
            <InputBase
              className={classes.input}
              placeholder='Add Tags'
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
          <div className='tag__container'>
            {tagsList.map((el) => (
              <div className='tag' key={el}>
                {el}
              </div>
            ))}
          </div>
          <div className='create__button'>
            <div className={classes.upload}>
              <input
                accept='video/*,image/*'
                className={classes.inputFile}
                id='contained-button-file'
                type='file'
                onChange={handleImageAsFile}
              />
              <label htmlFor='contained-button-file'>
                <Button variant='contained' color='primary' component='span'>
                  {imageType ? imageType : 'Upload'}
                </Button>
              </label>
            </div>
            <Button
              variant='contained'
              color='primary'
              onClick={post}
              disabled={!canPost}
              onClick={post}>
              POST
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePost;
