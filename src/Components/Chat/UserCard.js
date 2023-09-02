import React from "react";

import ListItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import green from "@material-ui/core/colors/green";

function UserCard(props) {
  const { user, online } = props;
  return (
    <ListItem
      style={{ cursor: "pointer" }}
      onClick={() => {
        props.createChat(user.userHandle, user.imageUrl);
      }}
    >
      <ListItemAvatar>
        <Badge
          overlap="circle"
          variant="standard"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          {online ? (
            <Avatar
              src={user.imageUrl}
              style={{ border: "2px solid #44b700" }}
            />
          ) : (
            <Avatar src={user.imageUrl} />
          )}
        </Badge>
      </ListItemAvatar>
      <ListItemText style={{ color: green }}>@{user.userHandle}</ListItemText>
    </ListItem>
  );
}

export default UserCard;
