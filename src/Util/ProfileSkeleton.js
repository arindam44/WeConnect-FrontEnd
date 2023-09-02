import React from "react";
import NoImage from "../Images/no-image.png";
import PropTypes from "prop-types";

import withStyles from "@material-ui/styles/withStyles";
import Paper from "@material-ui/core/Paper";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadThis,
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
    },
    "& .profile-image": {
      display: "flex",
      position: "center",
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
      margin: "auto",
    },
    "& .profile-details": {
      textAlign: "center",
    },
  },
  userHandle: {
    height: 20,
    backgroundColor: theme.spreadThis.palette.primary.main,
    width: 60,
    margin: `0 auto 7px auto`,
  },
  fullLine: {
    height: 15,
    width: "100%",
    backgroundColor: `rgba(0,0,0,0.6)`,
    marginBottom: 10,
  },
});
const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div class="profile-image">
          <img src={NoImage} alt="Profile" className="profile-image" />
        </div>
        <hr className={classes.invisibleSeparator} />
        <div class="profile-names">
          <div className={classes.userHandle} />
          <hr className={classes.invisibleSeparator} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr className={classes.invisibleSeparator} />
          <div class="profile-details">
            <LocationOn color="primary" /> <span>Location</span>
            <hr className={classes.invisibleSeparator} />
            <LinkIcon color="primary" /> <span>Website</span>
            <hr className={classes.invisibleSeparator} />
            <CalendarToday color="primary" /> <span>Joined Date</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};
ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
