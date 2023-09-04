import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propsTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AuthRoute.propsTypes = {
  user: propsTypes.object,
};

const mapStateToProps = (state) => ({
  autheticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
