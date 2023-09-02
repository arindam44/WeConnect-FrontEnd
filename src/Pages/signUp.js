import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import propTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import logo from "../Images/logo.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

//REDUX IMPORTS
import { connect } from "react-redux";
import { signupUser } from "../Redux/Actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  firstNameField: {
    width: "49%",
    marginRight: "1%",
  },
  lastNameField: {
    width: "49%",
    marginLeft: "1%",
  },
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      userHandle: "",
      gender: "",
      password: "",
      confirmPassword: "",
      errors: {},
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
    const newUserdata = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userHandle: this.state.userHandle,
      gender: this.state.gender,
    };
    this.props.signupUser(newUserdata, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleUsernameChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.toLowerCase(),
    });
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
            Signup
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
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              className={classes.firstNameField}
              onChange={this.handleChange}
              helperText={errors.firstName}
              error={errors.firstName ? true : false}
            />

            <TextField
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              className={classes.lastNameField}
              onChange={this.handleChange}
              helperText={errors.lastName}
              error={errors.lastName ? true : false}
            />
            <br />

            <TextField
              id="userHandle"
              name="userHandle"
              type="text"
              label="Username"
              className={classes.textField}
              onChange={this.handleUsernameChange}
              helperText={
                errors.userHandle
                  ? errors.userHandle
                  : "only lowercase characters, 0-9 & special chars"
              }
              error={errors.userHandle ? true : false}
              fullWidth
              value={this.state.userHandle}
            />
            <br />

            <Select
              id="gender"
              name="gender"
              label="Gender"
              required
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.gender}
              helperText={errors.gender}
              error={errors.gender ? true : false}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            />
            <br />

            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              label="Confirm Password"
              className={classes.textField}
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
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
            >
              SIGNUP
              {loading && <CircularProgress className={classes.progress} />}
            </Button>
            <br />

            <small>
              Already have an Account? Login{" "}
              <Link to="/login" className={classes.link}>
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

signup.propTypes = {
  classes: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  UI: propTypes.object.isRequired,
  signupUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
