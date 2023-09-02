import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { markNotificationsRead } from "../../Redux/Actions/userActions";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { grey } from "@material-ui/core/colors";

//ICONS
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not._id);
    this.props.markNotificationsRead(unreadNotificationIds);
  };
  render() {
    const { notifications } = this.props;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      let unreadNotifications = notifications.filter(
        (not) => not.read === false
      ).length;
      unreadNotifications > 0
        ? (notificationIcon = (
            <Badge badgeContent={unreadNotifications} color="secondary">
              <NotificationsIcon style={{ color: grey[100] }} />
            </Badge>
          ))
        : (notificationIcon = (
            <NotificationsIcon style={{ color: grey[100] }} />
          ));
    } else {
      notificationIcon = <NotificationsIcon style={{ color: grey[100] }} />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === "like" ? "liked" : "commented on";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="textPrimary"
                variant="body1"
                to={`/user/${not.recipient}/post/${not.postId}`}
              >
                {not.sender} {verb} your post{" "}
              </Typography>
              <br />
              <Typography
                variant="caption"
                color="textSecondary"
                style={{ marginLeft: 10 }}
              >
                {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>No notifications yet</MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
          style={{ maxHeight: "500px" }}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notification: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
