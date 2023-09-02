import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likePost, unlikePost } from "../../Redux/Actions/dataActions";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import FavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteBorder from "@material-ui/icons/FavoriteBorder";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  ...theme.spredThis,
});

export class Likebutton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.postId === this.props.postId)
    )
      return true;
    else return false;
  };
  likePost = () => {
    this.props.likePost(this.props.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };
  render() {
    const likeButton = this.likedPost() ? (
      <Tooltip title="Undo Like" placement="top">
        <IconButton onClick={this.unlikePost}>
          <FavouriteIcon color="primary" />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Like" placement="top">
        <IconButton onClick={this.likePost}>
          <FavouriteBorder color="primary" />
        </IconButton>
      </Tooltip>
    );
    return likeButton;
  }
}
Likebutton.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Likebutton));
