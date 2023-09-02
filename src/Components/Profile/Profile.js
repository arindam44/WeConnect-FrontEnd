import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import {
  logoutUser,
  uploadProfileImage,
} from "../../Redux/Actions/userActions";
import { addPost } from "../../Redux/Actions/dataActions";
import ProfileSkeleton from "../../Util/ProfileSkeleton";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import Badge from "@material-ui/core/Badge";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import LogOutIcon from "@material-ui/icons/PowerSettingsNew";
import YoutubeIcon from "@material-ui/icons/YouTube";

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    padding: 10,
  },
  imageDialog: {},
  fullImage: {
    maxWidth: "100%",
    height: "auto",
  },
});

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleImageChange = async (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("file", image, image.name);
    await this.props.uploadProfileImage(formData);
    const post = new FormData();
    const gender =
      this.props.user.credentials.gender === "male" ? "his" : "her";
    post.append(
      "body",
      `@${this.props.user.credentials.userHandle} changed ${gender} profile picture`
    );
    post.append("file", image, image.name);
    this.props.addPost(post);
  };
  handleEditImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.user.userHandle);
    this.props.history.push("/login");
  };
  toUpperCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  render() {
    const {
      classes,
      user: {
        credentials: {
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
        loading,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-image">
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <ToolTip title="Edit Profile Image">
                  <Fab
                    onClick={this.handleEditImage}
                    color="primary"
                    size="small"
                  >
                    <EditIcon />
                  </Fab>
                </ToolTip>
              }
            >
              <Avatar
                src={imageUrl}
                className="profile-image"
                onClick={this.handleOpen}
              />
              <input
                type="file"
                id="imageInput"
                hidden
                onChange={this.handleImageChange}
              />
            </Badge>
          </div>
          <hr />
          <div className="profile-names">
            <MuiLink
              component={Link}
              to={`user/${userHandle}`}
              variant="h5"
              className={classes.link}
            >
              @{userHandle}
            </MuiLink>
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
                    className={classes.link}
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
                    className={classes.link}
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
                    className={classes.link}
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
          <ToolTip title="LogOut" placement="top">
            <IconButton onClick={this.handleLogout}>
              <LogOutIcon color="secondary" />
            </IconButton>
          </ToolTip>
          <EditDetails />
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            className={classes.imageDialog}
          >
            <img src={imageUrl} className={classes.fullImage} />
          </Dialog>
        </div>
      </Paper>
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  user: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
  logoutUser: propTypes.func.isRequired,
  uploadProfileImage: propTypes.func.isRequired,
  addPost: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadProfileImage, addPost };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
