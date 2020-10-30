export const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  posts: [],
};
export const actionTypes = {
  SET_USER: 'SET_USER',
  ADD_POST: 'ADD_POST',
  FETCH_POSTS: 'FETCH_POSTS',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    case actionTypes.ADD_POST:
      return { ...state, posts: [...state.posts, action.post] };

    case actionTypes.FETCH_POSTS:
      return { ...state, posts: action.posts };
  }
  return state;
};

export default reducer;
