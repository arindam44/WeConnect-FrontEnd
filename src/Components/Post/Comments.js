import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import NoImage from "../../Images/no-image.png";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
  ...theme.spreadThis,
  commentData: {
    marginLeft: 20,
  },
});

class Comments extends Component {
  render() {
    console.log(this.props);
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={1} xs={2}>
                    <Avatar variant="circle" src={userImage} alt={NoImage} />
                  </Grid>
                  <Grid item sm={11} xs={10}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`user/${userHandle}`}
                        color="primary"
                      >
                        @{userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
