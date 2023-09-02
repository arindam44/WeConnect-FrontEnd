import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComment } from "../../Redux/Actions/dataActions";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import SendIcon from "@material-ui/icons/Send";

const styles = (theme) => ({
  ...theme.spreadThis,
  body: {
    position: "relative",
    width: "100%",
  },
  myvisibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "10px",
  },
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSend = (event) => {
    event.preventDefault();
    this.props.addComment(this.props.postId, { body: this.state.body });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", errors: {} });
    }
  }
  render() {
    const { classes } = this.props;
    const { errors, body } = this.state;
    console.log(errors);
    return (
      <>
        <hr className={classes.myvisibleSeparator} />
        <form onSubmit={this.handleSend} className={classes.body}>
          <TextField
            variant="outlined"
            name="body"
            fullWidth
            onChange={this.handleChange}
            placeholder="Write a comment"
            value={body}
            error={errors.comment ? true : false}
            helperText={errors.comment}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Send">
                    <IconButton type="submit" onClick={this.handleSend}>
                      <SendIcon color="primary" className={classes.sendIcon} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <hr className={classes.visibleSeparator} />
      </>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addComment })(
  withStyles(styles)(CommentForm)
);
