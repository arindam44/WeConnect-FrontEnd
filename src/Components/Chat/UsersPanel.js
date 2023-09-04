import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createChat, getAllUsers } from "../../Redux/Actions/chatActions";
import UserCard from "./UserCard";

import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    width: "100%",
    height: "630px",
    overflow: "auto",
  },
});

const UsersPanel = (props) => {
  useEffect(() => {
    props.getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { users, onlineUsers, currentUser } = props;

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
        {onlineUsers
          .filter((user) => user.userHandle !== currentUser.userHandle)
          .map((user, index) => {
            return (
              <UserCard
                key={`online-user-${index}`}
                user={user}
                online={true}
              />
            );
          })}
        {users
          .filter((user) => user.userHandle !== currentUser.userHandle)
          .map((user, index) => {
            return <UserCard key={`other-user-${index}`} user={user} />;
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
