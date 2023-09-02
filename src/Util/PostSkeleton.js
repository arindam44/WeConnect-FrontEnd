import React, { Fragment } from "react";
import NoImage from "../Images/no-image.png";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadThis,
  card: {
    display: "flex",
    marginBottom: 20,
    padding: 10,
    maxHeight: 160,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: "5%",
  },
  cover: {
    minWidth: 120,
    height: 120,
    margin: "auto",
    borderRadius: "50%",
    objectFit: "cover",
  },
  userHandle: {
    width: 40,
    height: 20,
    backgroundColor: theme.spreadThis.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: `rgba(0,0,0,0.3)`,
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: `rgba(0,0,0,0.6)`,
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: `rgba(0,0,0,0.6)`,
    marginBottom: 50,
  },
});

const PostSkeleton = (props) => {
  const { classes } = props;
  const Content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImage} />
      <CardContent className={classes.cardContent}>
        <div className={classes.userHandle}></div>
        <div className={classes.date}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.halfLine}></div>
      </CardContent>
    </Card>
  ));

  return <Fragment>{Content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostSkeleton);
