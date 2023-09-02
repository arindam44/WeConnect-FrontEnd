import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  LOADING_DATA,
  SET_UNAUTHENTICATED,
  SET_POSTS,
  MARK_NOTIFICATIONS_READ,
} from "../Types";
import axios from "axios";
import { socket } from "../../Util/Socket";

export const loginUser = (userdata, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signIn", userdata)
    .then((res) => {
      // setAuthorizationHeader(res.data.token);
      saveIdTokenInLocalStorage(res.data.token);
      dispatch(getUserData(history));
      dispatch({ type: CLEAR_ERRORS });
      /* setTimeout(() => {
        history.push("/");
      }, 3000);*/
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
/*
const setAuthorizationHeader = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
 // axios.defaults.headers.common["Authorization"] = IdToken;

 
};

*/

const saveIdTokenInLocalStorage = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
};
export const getUserData = (history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  fetch("/user", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("IdToken"),
    },
  })
    .then((res) => res.json())
    .then((user) => {
      dispatch({
        type: SET_USER,
        payload: user,
      });
      socket.emit("join", {
        id: user.credentials._id,
        userHandle: user.credentials.userHandle,
        imageUrl: user.credentials.imageUrl,
      });
      history.push("/");
    })
    .catch((err) => console.log(err));
};

export const signupUser = (newUserdata, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signUp", newUserdata)
    .then(async (res) => {
      //setAuthorizationHeader(res.data.token);
      saveIdTokenInLocalStorage(res.data.token);
      await dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      alert("Signed Up Successfully.");
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = (userHandle) => (dispatch) => {
  localStorage.removeItem("IdToken");
  // delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  socket.emit("logout", userHandle);

};

export const uploadProfileImage = (formdata) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/image", formdata, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then(() => {
      dispatch(getUserData());
      return axios.get("/posts");
    })
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const getUser = (userHandle) => (dispatch) => {
  console.log("from user page-------");
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data.posts });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: null });
    });
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post(`/notifications/`, notificationIds, {
      headers: {
        Authorization: localStorage.IdToken,
      },
    })
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((err) => console.log(err));
};
