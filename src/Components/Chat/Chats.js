import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import image from "../../Images/logo.png";
import { sendMessage, updateThreads } from "../../Redux/Actions/chatActions";
import { socket } from "../../Util/Socket";
import store from "../../Redux/Store";
import { NEW_MESSEGE } from "../../Redux/Types";

import withStyles from "@material-ui/styles/withStyles";
import { Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import SendIcon from "@material-ui/icons/Send";
import {
  ThemeProvider,
  TitleBar,
  MessageList,
  Message,
  Bubble,
  MessageText,
} from "@livechat/ui-kit";

const theme = {
  vars: {
    "primary-color": "rgb(92, 92, 214)",
    "secondary-color": "#fbfbfb",
    "tertiary-color": "#d6d6f5",
  },
};

const styles = (theme) => ({
  ...theme.spreadThis,
  notchedOutline: {
    borderColor: "white !important",
  },
});

socket.on("new_messege", (data) => {
  store.dispatch({ type: NEW_MESSEGE, payload: data });
});

class Chats extends Component {
  state = {
    body: "",
  };
  handleChange = (event) => {
    this.setState({ body: event.target.value });
  };
  handleSend = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const reciever = this.props.thread.users[0];
    const sender = this.props.user.userHandle;
    const body = this.state.body;
    const time = new Date();
    formData.append("reciever", reciever);
    formData.append("sender", sender);
    formData.append("body", body);
    formData.append("time", time);
    formData.append("recieverImageUrl", this.props.thread.imageUrls[0].url);
    console.log(formData);

    this.props.updateThreads(formData);
    this.props.sendMessage(reciever, sender, body, time);

    this.setState({ body: "" });
  };
  render() {
    const { thread, chat, user, classes } = this.props;
    const chatsMarkup =
      Object.keys(thread).length !== 0 ? (
        <>
          <div style={{ maxWidth: "100%", height: 500, minHeight: "100%" }}>
            <TitleBar
              leftIcons={[
                <Avatar
                  src={thread.imageUrls[0].url}
                  style={{ marginLeft: 10 }}
                />,
              ]}
              title={<Typography variant="h6">@{thread.users[0]}</Typography>}
            />
            <MessageList active>
              {chat.map((msg) => {
                return (
                  <Message
                    date={dayjs(msg.time).format("DD MMM, hh:mm A")}
                    isOwn={msg.sender === user.userHandle ? true : false}
                  >
                    <Bubble style={{ maxWidth: 500 }}>
                      <MessageText>{msg.body}</MessageText>
                    </Bubble>
                  </Message>
                );
              })}
            </MessageList>
            <form onSubmit={this.handleSend}>
              <TextField
                name="body"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
                placeholder="Write a message..."
                value={this.state.body}
                autoFocus
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <Tooltip title="Send" placement="top">
                        <IconButton onClick={this.handleSend}>
                          <SendIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </div>
        </>
      ) : (
        <Paper
          style={{
            width: "100%",
            height: "630px",
          }}
        >
          <img
            src={image}
            style={{
              objectPosition: "center",
              objectFit: "none",
              width: "100%",
              height: 450,
              opacity: 0.7,
            }}
          />
          <Typography
            variant="h4"
            color="textSecondary"
            style={{ marginLeft: "32%" }}
          >
            {"Stay Connected :)"}
          </Typography>
        </Paper>
      );
    return <ThemeProvider theme={theme}>{chatsMarkup}</ThemeProvider>;
  }
}

Chats.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  thread: PropTypes.object.isRequired,
  chat: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  thread: state.chat.thread,
  chat: state.chat.chat,
  user: state.user.credentials,
});

export default connect(mapStateToProps, { sendMessage, updateThreads })(
  withStyles(styles)(Chats)
);
