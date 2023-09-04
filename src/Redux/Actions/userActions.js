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
  SET_SOCKET,
} from "../Types";
import axios from "axios";

export const loginUser = (userdata, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/signIn`, userdata)
    .then((res) => {
      saveIdTokenInLocalStorage(res.data.token);
      dispatch(getUserData(history));
      dispatch({ type: CLEAR_ERRORS });
      // window.location.href = "/";
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

const saveIdTokenInLocalStorage = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
  console.log("idtoken", IdToken);
};
export const getUserData = (socket) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  fetch(`${process.env.REACT_APP_API_BASE_URL}/user`, {
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
      socket?.emit("join", {
        id: user.credentials._id,
        userHandle: user.credentials.userHandle,
        imageUrl: user.credentials.imageUrl,
      });
      window.history.push("/");
    })
    .catch(() => {});
};

export const signupUser = (newUserdata, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/signUp`, newUserdata)
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

export const logoutUser = (userHandle, socket) => (dispatch) => {
  localStorage.removeItem("IdToken");
  dispatch({ type: SET_UNAUTHENTICATED });
  socket?.emit("logout", userHandle);
  dispatch({ type: SET_SOCKET, payload: null });
};

export const uploadProfileImage = (formdata) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/image`, formdata, {
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
    .catch(() => {});
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/user`, userDetails, {
      headers: {
        Authorization: localStorage.getItem("IdToken"),
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      dispatch(getUserData());
    })
    .catch(() => {});
};

export const getUser = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/user/${userHandle}`, {
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
    .post(
      `${process.env.REACT_APP_API_BASE_URL}/notifications/`,
      notificationIds,
      {
        headers: {
          Authorization: localStorage.IdToken,
        },
      }
    )
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch(() => {});
};
