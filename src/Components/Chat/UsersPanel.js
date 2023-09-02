import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../Redux/Store";
import { socket } from "../../Util/Socket";
import { SET_ONLINE_USERS } from "../../Redux/Types";
import { createChat, getAllUsers } from "../../Redux/Actions/chatActions";
import UserCard from "./UserCard";

import withStyles from "@material-ui/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

import { grey } from "@material-ui/core/colors";

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    width: "100%",
    height: "630px",
    overflow: "auto",
  },
});

socket.on("online_users", (userList) => {
  console.log(userList);
  store.dispatch({ type: SET_ONLINE_USERS, payload: userList });
});

const UsersPanel = (props) => {
  useEffect(() => {
    props.getAllUsers();
  }, []);
  const { users, onlineUsers, currentUser, classes } = props;

  console.log(users);
  return (
    <>
      <Typography
        variant="h5"
        style={{
          marginLeft: 20,
          fontFamily: "Cooper Black",
        }}
        color="textSecondary"
      >
        Contacts
      </Typography>
      <List component="nav">
        {onlineUsers.map((user) => {
          if (user.userHandle !== currentUser.userHandle) {
            return <UserCard user={user} online={true} />;
          }
        })}
        {users.map((user) => {
          if (user.userHandle !== currentUser.userHandle) {
            return <UserCard user={user} />;
          }
        })}
      </List>
    </>
  );
};
UsersPanel.propTypes = {
  users: PropTypes.array.isRequired,
  onlineUsers: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  createChat: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.chat.users,
  onlineUsers: state.chat.onlineUsers,
  currentUser: state.user.credentials,
});
export default connect(mapStateToProps, { createChat, getAllUsers })(
  withStyles(styles)(UsersPanel)
);
