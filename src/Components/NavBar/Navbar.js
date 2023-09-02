import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Avatar } from "@material-ui/core";
import withStyles from "@material-ui/styles/withStyles";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import logo from "../../Images/logo.png";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = (theme) => ({
  ...theme.spreadThis,
  navContainer: {
    color: theme.spreadThis.palette.primary.main,
  },
});

const Navbar = (props) => {
  const { authenticated, classes } = props;
  return (
    <div>
      <CssBaseline />
      <AppBar>
        <Toolbar className={classes.navContainer}>
          <Grid container spacing={2}>
            <Grid xs={2} sm={3} item>
              <Link to="/">
                <Avatar
                  variant="rounded"
                  src={logo}
                  alt="WeConnect"
                  className={classes.avatar}
                />
              </Link>
            </Grid>
            <Grid xs={8} sm={6} item alignContent="center" justify="center">
              {authenticated ? <SignedInLinks /> : null}
            </Grid>
            <Grid item xs={2} sm={3}>
              {authenticated ? null : <SignedOutLinks />}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  authenticated: propTypes.bool.isRequired,
  classes: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
