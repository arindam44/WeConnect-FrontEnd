import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getPost, clearErrors } from "../../Redux/Actions/dataActions";
import Likebutton from "./Likebutton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import NoImage from "../../Images/no-image.png";
import Linkify from "react-linkify";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";

import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

const styles = (theme) => ({
  ...theme.spreadThis,
  closeButton: {
    position: "absolute",
    right: "5%",
    top: "3.5%",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
  },

  dialogContent: {
    padding: 20,
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  image: {
    maxWidth: "80%",
    maxHeight: "auto",
  },
  container: {
    position: "relative",
  },
});

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, postId } = this.props;
    const newPath = `/user/${userHandle}/post/${postId}`;

    if (oldPath === newPath) oldPath = `user/${userHandle}`;
    window.history.pushState(null, null, newPath);
    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  componentWillReceiveProps(nextProps) {
    console.log("NEW------", nextProps.post, nextProps.comments);
  }
  render() {
    const {
      classes,
      post,
      comments,
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      post && (
        <Grid container className={classes.container}>
          <Grid item xs={2} sm={1}>
            <Avatar variant="circle" src={post.userImage} alt={NoImage} />
          </Grid>
          <Grid item xs={10} sm={11}>
            <MuiLink
              component={Link}
              color="primary"
              variant="h5"
              to={`/users/${this.props.userHandle}`}
              className={classes.userHandle}
            >
              @{this.props.userHandle}
            </MuiLink>
            <br />
            <Typography variant="body2" color="textSecondary">
              {dayjs(post.createdAt).format("h:mm a, MMMM DD, YYYY")}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">
              <Linkify className={classes.link}>{post.content}</Linkify>
            </Typography>
            {post.imageUrl && (
              <img src={post.imageUrl} alt="image" className={classes.image} />
            )}
            <br />
            <Likebutton postId={post._id} />
            <span>{post.likeCount} Likes</span>
            <Tooltip title="Comments" placement="top">
              <IconButton>
                <ChatIcon color="primary" />
              </IconButton>
            </Tooltip>
            <span>{post.commentCount} Comments</span>
          </Grid>
          <hr className={classes.visibleSeperator} />
          <CommentForm postId={post._id} />
          <Comments comments={comments} />
        </Grid>
      )
    );
    return (
      <Fragment>
        <Tooltip title="Expand Post" className={classes.expandButton}>
          <IconButton onClick={this.handleOpen}>
            <UnfoldMoreIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Tooltip
            title="Close"
            onClick={this.handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </Tooltip>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.data.post,
  comments: state.data.comments,
  UI: state.UI,
});

export default connect(mapStateToProps, { getPost, clearErrors })(
  withStyles(styles)(PostDialog)
);
