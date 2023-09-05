import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../Redux/Actions/userActions";
import propTypes from "prop-types";
import logo from "../Images/logo.png";
import { Link, useHistory } from "react-router-dom";

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

const Login = function (props) {
  const {
    classes,
    UI: { loading, errors },
    user,
    loginUser,
  } = props;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState("");

  useEffect(() => {
    console.log("user", user);
    if (user.authenticated) history.push("/");
  }, [history, user]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const userdata = {
        email,
        password,
      };
      loginUser(userdata);
    },
    [email, loginUser, password]
  );

  const toogleVisisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm={4} xs={1} />
      <Grid item sm={4} xs={10}>
        <img className={classes.logo} src={logo} alt="WeConnect" />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value?.trim());
            }}
            helperText={errors?.email}
            error={!!errors?.email}
            fullWidth
          />
          <br />
          <TextField
            id="password"
            name="password"
            type={visibility ? "text" : "password"}
            label="Password"
            className={classes.textField}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value?.trim());
            }}
            helperText={errors?.password}
            error={!!errors?.password}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={`${visibility ? "Hide" : "Show"} Password`}
                    placement="top"
                  >
                    <IconButton onClick={toogleVisisibility}>
                      {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <br />
          {errors?.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors?.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.button}
            onClick={handleSubmit}
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
};

Login.propTypes = {
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
)(withStyles(styles)(Login));
