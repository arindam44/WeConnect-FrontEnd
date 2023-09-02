import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost, clearErrors } from "../../Redux/Actions/dataActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Picker from "emoji-picker-react";
import { grey } from "@material-ui/core/colors";
import InputAdornment from "@material-ui/core/InputAdornment";

//ICONS
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Emoji from "@material-ui/icons/InsertEmoticonSharp";
import PhotoIcon from "@material-ui/icons/InsertPhoto";
import DoneIcon from "@material-ui/icons/Done";
import { FormHelperText } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadThis,
  notchedOutline: {
    borderColor: "white !important",
  },
  emojiPicker: {
    position: "relative",
    left: "50%",
    height: "300px",
    width: "200px",
    marginBottom: "20px",
  },
  imageIcon: {
    marginRight: 10,
  },
  imagePreview: {
    position: "relative",
    marginLeft: "20%",
    marginRight: "20%",
    maxWidth: "70%",
    maxHeight: 500,
    alignSelf: "center",
  },
  closeimage: {
    position: "relative",
    marginRight: "10px",
  },
  submitButton: {
    display: "flex",
    marginTop: "10px",
    marginBottom: "15px",
    borderRadius: "15px",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    left: "93%",
  },
});

class AddPost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
    emojiOpen: false,
    showImageButton: true,
    imageUrl: null,
    image: null,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {}, disableImage: false });
    this.clearImage();
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      emojiOpen: false,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const newPost = new FormData();
    newPost.append("body", this.state.body);
    if (this.state.image) {
      newPost.append("file", this.state.image, this.state.image.name);
    }

    this.props.addPost(newPost);
  };
  openPicker = () => {
    this.setState({ emojiOpen: !this.state.emojiOpen });
    console.log("openpicker called--", this.state.emojiOpen);
  };
  handleEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    this.setState({ body: this.state.body + emojiObject.emoji });
  };
  handleImageChange = (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    var url = null;
    if (image) {
      url = URL.createObjectURL(image);
      this.setState({ imageUrl: url, showImageButton: false, image: image });
    }
  };
  addImage = (event) => {
    event.preventDefault();
    document.getElementById("addImageInput").click();
    this.setState({ emojiOpen: false });
  };
  clearImage = () => {
    this.setState({ imageUrl: null, showImageButton: true, image: null });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        open: false,
        errors: {},
      });
    }
  }
  render() {
    const { errors, showImageButton, imageUrl } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <Tooltip title="Create New Post" placement="top">
          <IconButton hidden onClick={this.handleOpen}>
            <AddIcon style={{ color: grey[100] }} />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <div>
              <Typography variant="h6">Create Post</Typography>
              <Tooltip
                title="Close"
                onClick={this.handleClose}
                className={classes.closeButton}
              >
                <CloseIcon />
              </Tooltip>
            </div>
            <form>
              <TextField
                name="body"
                type="text"
                variant="outlined"
                placeholder="Write something..."
                multiline
                fullWidth
                autoFocus="true"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.body}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Emoji" placement="top">
                        <IconButton onClick={this.openPicker}>
                          <Emoji />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              {this.state.emojiOpen && (
                <div className={classes.emojiPicker}>
                  <Picker
                    disableSkinTonePicker="true"
                    disableSearchBar="true"
                    onEmojiClick={this.handleEmojiClick}
                  />
                </div>
              )}
              <input
                type="file"
                hidden
                id="addImageInput"
                onChange={this.handleImageChange}
              />
              {showImageButton && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.addImage}
                  className={classes.button}
                >
                  <PhotoIcon className={classes.imageIcon} /> Insert Photo
                </Button>
              )}
              {imageUrl && (
                <div id="image-preview">
                  <Tooltip
                    title="Close"
                    onClick={this.clearImage}
                    className={classes.closeimage}
                  >
                    <CloseIcon />
                  </Tooltip>
                  <img
                    src={imageUrl}
                    alt="image"
                    className={classes.imagePreview}
                  />
                </div>
              )}
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
                onClick={this.handleSubmit}
              >
                <DoneIcon className={classes.imageIcon} /> Done
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
});
export default connect(mapStateToProps, { addPost, clearErrors })(
  withStyles(styles)(AddPost)
);
