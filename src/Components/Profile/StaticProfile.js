import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import YoutubeIcon from "@material-ui/icons/YouTube";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadThis,
  imageDialog: {
    position: "absolute",
  },
  fullImage: {
    position: "relative",
    maxHeight: 600,
  },
});

class StaticProfile extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  toUpperCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  render() {
    const {
      classes,
      profile: {
        userHandle,
        firstName,
        lastName,
        createdAt,
        imageUrl,
        bio,
        website,
        youtube,
        location,
      },
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-image">
            <Avatar
              src={imageUrl}
              className="profile-image"
              onClick={this.handleOpen}
            />
          </div>
          <hr />
          <div className="profile-names">
            <Typography variant="h5">@{userHandle}</Typography>
            <hr />
            <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            <div className="profile-details">
              {location && (
                <Fragment>
                  <LocationOn color="primary" />
                  <a
                    href={`http://google.com/maps/place/${location}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 10 }}
                  >
                    <span>{this.toUpperCase(location)}</span>
                  </a>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <Typography
                    variant="body1"
                    component={Link}
                    to={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 10 }}
                  >
                    {website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
                  </Typography>
                  <hr />
                </Fragment>
              )}
              {youtube && (
                <Fragment>
                  <YoutubeIcon color="primary" />
                  <Typography
                    variant="body1"
                    component={Link}
                    to={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 10 }}
                  >
                    {youtube.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
                  </Typography>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />
              <span style={{ marginLeft: 10 }}>
                Joined {dayjs(createdAt).format("MMM YYYY")}
              </span>
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth="l"
          maxHeight={window.innerHeight}
          className={classes.imageDialog}
        >
          <img src={imageUrl} alt="image" className={classes.fullImage} />
        </Dialog>
      </Paper>
    );
  }
}

StaticProfile.propTypes = {
  profile: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
