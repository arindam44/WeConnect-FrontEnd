import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUserDetails } from "../../Redux/Actions/userActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Picker from "emoji-picker-react";
import InputAdornnment from "@material-ui/core/InputAdornment";
//ICONS
import EditIcon from "@material-ui/icons/Edit";
import Emoji from "@material-ui/icons/InsertEmoticonSharp";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import YoutubeIcon from "@material-ui/icons/YouTube";

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: "right",
  },
  textField: {
    width: "90%",
  },
  emojiPicker: {
    position: "relative",
    left: "50%",
    height: "300px",
    width: "200px",
    marginBottom: "20px",
  },
});
class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    youtube: "",
    open: false,
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  handleOpen = () => {
    this.setState({
      open: true,
    });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  openPicker = () => {
    this.setState({ emojiOpen: !this.state.emojiOpen });
  };
  handleEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    this.setState({ bio: this.state.bio + emojiObject.emoji });
  };
  closeEmojiPicker = () => {
    this.setState({ emojiOpen: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit Profile" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                onClick={this.closeEmojiPicker}
              />
              <Tooltip title="Insert Emoji" placement="top">
                <IconButton onClick={this.openPicker}>
                  <Emoji />
                </IconButton>
              </Tooltip>
              {this.state.emojiOpen && (
                <div className={classes.emojiPicker}>
                  <Picker
                    disableSkinTonePicker="true"
                    disableSearchBar="true"
                    onEmojiClick={this.handleEmojiClick}
                  />
                </div>
              )}
              <br />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Your location"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornnment position="start">
                      <Tooltip title="Emoji" placement="top">
                        <IconButton onClick={this.openPicker}>
                          <LocationOn color="primary" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornnment>
                  ),
                }}
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                style={{ marginRight: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornnment position="start">
                      <Tooltip title="Emoji" placement="top">
                        <IconButton onClick={this.openPicker}>
                          <LinkIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornnment>
                  ),
                }}
              />
              <TextField
                name="youtube"
                type="text"
                label="YouTube"
                placeholder="Your location"
                className={classes.textField}
                value={this.state.youtube}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornnment position="start">
                      <Tooltip title="Emoji" placement="top">
                        <IconButton onClick={this.openPicker}>
                          <YoutubeIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornnment>
                  ),
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
