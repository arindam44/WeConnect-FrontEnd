import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./Util/Theme";
import "./App.css";
import { Provider } from "react-redux";
import {
  NEW_MESSEGE,
  SET_AUTHENTICATED,
  SET_ONLINE_USERS,
  SET_SOCKET,
  SET_THREADS,
} from "./Redux/Types";
import { logoutUser, getUserData } from "./Redux/Actions/userActions";
import store from "./Redux/Store";
import home from "./Pages/home";
import Login from "./Pages/login";
import signUp from "./Pages/signUp";
import Navbar from "./Components/NavBar/Navbar";
import user from "./Pages/user";
import chat from "./Pages/Chat";
import Chats from "./Components/Chat/Chats";
import ThreadList from "./Components/Chat/ThreadList";
import UsersPanel from "./Components/Chat/UsersPanel";
import axios from "axios";
import { validateAuth } from "./Util/AuthUtils";
import io from "socket.io-client";

let threadsIntervalId;
let socket;

function App() {
  useEffect(() => {
    if (validateAuth()) {
      store.dispatch({ type: SET_AUTHENTICATED });

      // initialize socket
      socket = io.connect();
      store.dispatch({ type: SET_SOCKET, payload: socket });

      socket.on("new_messege", (data) => {
        store.dispatch({ type: NEW_MESSEGE, payload: data });
      });

      socket.on("online_users", (userList) => {
        store.dispatch({ type: SET_ONLINE_USERS, payload: userList });
      });

      store.dispatch(getUserData(socket));

      threadsIntervalId = setInterval(() => {
        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/threads`, {
            headers: {
              Authorization: localStorage.IdToken,
            },
          })
          .then((res) => {
            store.dispatch({ type: SET_THREADS, payload: res.data });
          })
          .catch(() => {});
      }, 5000);
    } else {
      store.dispatch(logoutUser("", socket));
      if (window.location.pathname !== "/login") window.history.href = "/login";
    }
    return () => {
      clearInterval(threadsIntervalId);
    };
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={signUp} />
                <Route exact path="/user/:userHandle" component={user} />
                <Route exact path="/chat" component={chat} />
                <Route exact path="/m.threads" component={ThreadList} />
                <Route exact path="/m.chat" component={Chats} />
                <Route exact path="/m.contacts" component={UsersPanel} />
                <Route
                  exact
                  path="/user/:userHandle/post/:postId"
                  component={user}
                />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
