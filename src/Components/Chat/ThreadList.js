import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { getThreads } from "../../Redux/Actions/chatActions";
import store from "../../Redux/Store";
import { SET_CHAT } from "../../Redux/Types";

import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import SentIcon from "@material-ui/icons/CallMade";
import RecievedIcon from "@material-ui/icons/CallReceived";

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    height: "630px",
    overflow: "auto",
  },
  list: {
    position: "relative",
    maxHeight: "100px",
  },
  listItem: {
    cursor: "pointer",
  },
  listItemText: {
    overflow: "hidden",
  },
  time: {
    position: "absolute",
    right: 5,
  },
  icon: {
    marginRight: 5,
  },
});

class ThreadList extends Component {
  componentDidMount() {
    this.props.getThreads();
  }

  render() {
    const { classes, threads } = this.props;
    const threadsMarkup =
      Object.keys(threads).length > 0 ? (
        threads.map((thread) => {
          const lastChat = thread.chats[thread.chats.length - 1];
          return (
            <>
              <ListItem
                className={classes.listItem}
                onClick={() => {
                  store.dispatch({ type: SET_CHAT, payload: thread });
                  if (this.props.mobile === true)
                    this.props.history.push("/m.chat");
                }}
              >
                <ListItemAvatar>
                  <Avatar src={thread.imageUrls[0].url} />
                </ListItemAvatar>
                <ListItemText className={classes.listItemText}>
                  <Typography variant="bosy1">
                    <strong>@{thread.users[0]}</strong>
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className={classes.time}
                  >
                    {dayjs(lastChat.time).format("DD MMM, hh:mm A")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {lastChat.sender === thread.users[0] ? (
                      <RecievedIcon fontSize="small" className={classes.icon} />
                    ) : (
                      <SentIcon fontSize="small" className={classes.icon} />
                    )}
                    {lastChat.body}
                  </Typography>
                </ListItemText>
              </ListItem>
              <hr style={{ width: "90%", backgroundColor: "black" }} />
            </>
          );
        })
      ) : (
        <div>Loading Threads</div>
      );

    return (
      <>
        <Typography
          variant="h5"
          style={{
            marginLeft: 20,
            fontFamily: "Cooper Black",
          }}
          color="primary"
        >
          Chats
        </Typography>
        {this.props.mobile && (
          <Typography
            variant="body1"
            style={{
              position: "absolute",
              right: 10,
              top: 65,
              marginLeft: 20,
              fontFamily: "Cooper Black",
            }}
            color="primary"
            onClick={() => this.props.history.push("/m.contacts")}
          >
            Contacts
          </Typography>
        )}
        <List className={classes.list}>{threadsMarkup}</List>
      </>
    );
  }
}

ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  getThreads: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  threads: state.chat.threads,
});

export default connect(mapStateToProps, { getThreads })(
  withStyles(styles)(ThreadList)
);
