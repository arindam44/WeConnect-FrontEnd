import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { logoutUser } from "../../Redux/Actions/userActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";
import ProfileIcon from "@material-ui/icons/AccountCircleRounded";
import ChatIcon from "@material-ui/icons/ForumRounded";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";

function NavigationPanel(props) {
  const history = useHistory();
  const { user } = props;
  return (
    <div>
      <List>
        <ListItem component={Link} to={"/"}>
          <ListItemAvatar>
            <HomeIcon color="primary" />
          </ListItemAvatar>
          <ListItemText>
            <Typography>Home</Typography>
          </ListItemText>
        </ListItem>

        <ListItem component={Link} to={`/user/${user.userHandle}`}>
          <ListItemAvatar>
            <ProfileIcon color="primary" />
          </ListItemAvatar>
          <ListItemText>
            <Typography>Profile</Typography>
          </ListItemText>
        </ListItem>

        <ListItem component={Link} to={"/chat"}>
          <ListItemAvatar>
            <ChatIcon color="primary" />
          </ListItemAvatar>
          <ListItemText>
            <Typography>Chat</Typography>
          </ListItemText>
        </ListItem>

        <ListItem
          onClick={() => {
            props.logoutUser(user.userHandle);
            history.push("/login");
          }}
        >
          <ListItemAvatar>
            <LogoutIcon color="secondary" />
          </ListItemAvatar>
          <ListItemText>
            <Typography>Logout</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.credentials,
});

export default connect(mapStateToProps, { logoutUser })(NavigationPanel);
