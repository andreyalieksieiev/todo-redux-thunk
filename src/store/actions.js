import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getAllItemsSuccess = (payload) => ({type: actionTypes.GET_ALL_ITEM_SUCCESS, payload});
export const getAllItemsFail = (error) => ({type: actionTypes.GET_ALL_ITEM_FAIL, error});

export const changeItem = (payload) => ({type: actionTypes.CHANGE_ITEM, payload });
export const clearItem = () => ({type: actionTypes.CLEAR_ITEM });

export const filterTimeAction = (payload) => ({type: actionTypes.FILTER_TIME, payload});
export const completeFilterAction = (payload) => ({type: actionTypes.COMPLETE_FILTER, payload});

export const setCheckedSuccess = (payload) => ({type: actionTypes.SET_CHACKED_SUCCESS, payload});
export const setCheckedFail = (payload) => ({type: actionTypes.SET_CHACKED_FAIL, payload});

export const getAllItems = () => dispatch => 
 axios.get('http://localhost:3000/posts/')
      .then(({data}) => {
        dispatch(getAllItemsSuccess(data));
      })
      .catch(error => {
        dispatch(getAllItemsFail(error));
      });

export const addItemCreator = (post) => {
  return (dispatch) => {
    const newPost = post;
    if (newPost.title !== '') {
        axios.post('http://localhost:3000/posts/', newPost)
      .then(() => {
        dispatch(clearItem());
        dispatch(getAllItems()); 
      })
      .catch(err => console.log('catch', err));
      }
  };
};

export const DeleteItemCreator = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(response => {
        console.log('response: ', response);
        dispatch(getAllItems());
      })
      .catch(err => console.log('catch', err));
  };
};

export const setChecked = (event) => {
  return (dispatch) => {
       const {id, checked} = event.target;
    axios.patch(`http://localhost:3000/posts/${id}`, { 
      complete: checked
    })
      .then(() => {
        dispatch(setCheckedSuccess(id));
        dispatch(getAllItems());
      })
      .catch(error => dispatch(setCheckedFail(error)));
  };
};