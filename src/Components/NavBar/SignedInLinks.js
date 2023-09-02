import React from "react";
import AddPost from "../Post/AddPost";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Notifications from "./Notifications";

import withStyles from "@material-ui/styles/withStyles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { grey } from "@material-ui/core/colors";

//ICONS
import HomeIcon from "@material-ui/icons/Home";
import ProfileIcon from "@material-ui/icons/AccountCircleRounded";
import ChatIcon from "@material-ui/icons/ForumRounded";
const drawerWidth = 240;
const styles = (theme) => ({
  ...theme.spreadThis,
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
});

const SignedInLinks = (props) => {
  const { user } = props;

  return (
    <div>
      <Box display="flex" justifyContent="space-around">
        <AddPost />
        <Link to={`/user/${user}`}>
          <Tooltip title="Profile" placement="top">
            <IconButton>
              <ProfileIcon style={{ color: grey[100] }} />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/">
          <Tooltip title="Home" placement="top">
            <IconButton>
              <HomeIcon style={{ color: grey[100] }} />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/chat">
          <Tooltip title="Chat" placement="top">
            <IconButton>
              <ChatIcon style={{ color: grey[100] }} />
            </IconButton>
          </Tooltip>
        </Link>
        <Notifications />
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.credentials.userHandle,
});

export default connect(mapStateToProps)(withStyles(styles)(SignedInLinks));
