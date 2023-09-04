import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  ADD_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../Types";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/posts`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

export const likePost = (postId) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/post/${postId}/like`, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
      },
    })
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch(() => {});
};

export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/post/${postId}/unlike`, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
      },
    })
    .then((res) => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch(() => {});
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_BASE_URL}/post/${postId}`, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(() => {});
};

export const addPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/post`, newPost, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/post/${postId}`, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
      },
    })
    .then((res) => {
      dispatch({ type: SET_POST, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(() => {});
};

export const addComment = (postId, body) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/post/${postId}/comment`, body, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
