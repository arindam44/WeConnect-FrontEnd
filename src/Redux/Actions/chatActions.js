import {
  SET_THREADS,
  SET_CHAT,
  SEND_MESSEGE,
  UPDATE_THREADS,
  SET_USERS,
} from "../Types";

import axios from "axios";

export const getAllUsers = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/users`, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      dispatch({ type: SET_USERS, payload: res.data });
    })
    .catch(() => {});
};

export const getThreads = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/threads`, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      dispatch({ type: SET_THREADS, payload: res.data });
    })
    .catch(() => {});
};

export const sendMessage =
  (socket, reciever, sender, body, time) => (dispatch) => {
    dispatch({ type: SEND_MESSEGE, payload: { reciever, sender, body, time } });
    socket?.emit("send_messege", {
      reciever: reciever,
      sender: sender,
      body: body,
      time: time,
    });
  };

export const updateThreads = (formData) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/threads`, formData, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      dispatch({ type: UPDATE_THREADS, payload: res.data });
    })
    .catch(() => {});
};

export const createChat = (user, imageUrl) => (dispatch) => {
  dispatch({
    type: SET_CHAT,
    payload: {
      users: [user],
      imageUrls: [{ user: user, url: imageUrl }],
      chats: [],
    },
  });
};
