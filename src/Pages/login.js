import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../Redux/Actions/userActions";
import propTypes from "prop-types";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
//ICONS
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      visibility: false,
    };
  }
  componentWillMount() {
    if (this.props.user.authenticated === true) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userdata = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userdata, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  toogleVisisibility = (event) => {
    this.setState({ visibility: !this.state.visibility });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm={4} xs={1} />
        <Grid item sm={4} xs={10}>
          <img className={classes.logo} src={logo} alt="WeConnect" />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            />
            <br />

            <TextField
              id="password"
              name="password"
              type={this.state.visibility ? "text" : "password"}
              label="Password"
              className={classes.textField}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={
                        this.state.visibility
                          ? "Hide Password"
                          : "Show Password"
                      }
                      placement="top"
                    >
                      <IconButton onClick={this.toogleVisisibility}>
                        {this.state.visibility ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <br />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
              onClick={this.handleSubmit}
            >
              LOGIN
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />

            <small>
              Don't have an Account? Sign Up{" "}
              <Link to="/signup" className={classes.link}>
                <b>Here</b>
              </Link>
            </small>
          </form>
        </Grid>
        <Grid item sm={4} xs={1} />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: propTypes.object.isRequired,
  loginUser: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  UI: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
