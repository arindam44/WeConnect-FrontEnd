import {
  SET_ONLINE_USERS,
  SET_THREADS,
  SET_CHAT,
  SEND_MESSEGE,
  UPDATE_THREADS,
  SET_USERS,
} from "../Types";
import { socket } from "../../Util/Socket";
import store from "../Store";

import axios from "axios";

export const getAllUsers = () => (dispatch) => {
  axios
    .get("/users", {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      dispatch({ type: SET_USERS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

window.setInterval(() => {
  axios
    .get("/threads", {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      store.dispatch({ type: SET_THREADS, payload: res.data });
    })
    .catch((err) => console.log(err));
}, 5000);

export const getThreads = () => (dispatch) => {
  axios
    .get("/threads", {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: SET_THREADS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const sendMessage = (reciever, sender, body, time) => (dispatch) => {
  dispatch({ type: SEND_MESSEGE, payload: { reciever, sender, body, time } });
  socket.emit("send_messege", {
    reciever: reciever,
    sender: sender,
    body: body,
    time: time,
  });
};

export const updateThreads = (formData) => (dispatch) => {
  axios
    .post("/threads", formData, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      dispatch({ type: UPDATE_THREADS, payload: res.data });
    })
    .catch((err) => console.log(err));
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
