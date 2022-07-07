import _ from 'lodash';
import jsonPlaceHolder from "../apis/jsonPlaceHolder";


export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    console.log(getState().posts)

    // const usersIds = _.uniq(_.map(getState().posts, 'userId'))
    // console.log(usersIds);
    // usersIds.forEach(id => dispatch(fetchUser(id)));

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value()

}

// Posts action creator
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceHolder.get('/posts');

    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data
    });

   };

// User action creator
export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data })
};

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USER', payload: response.data })
// });