import React, { useState, useEffect } from "react";
import ThreadList from "../Components/Chat/ThreadList";
import Chats from "../Components/Chat/Chats";
import UsersPanel from "../Components/Chat/UsersPanel";

import Grid from "@material-ui/core/Grid";

function Chat(props) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (window.screen.width < 400) setMobile(true);
  }, []);

  const chatsMarkup = !mobile ? (
    <Grid container spacing={1}>
      <Grid item sm={4} xs={12}>
        <ThreadList />
      </Grid>
      <Grid item sm={6} xs={12}>
        <Chats />
      </Grid>
      <Grid item sm={2} xs={12}>
        <UsersPanel />
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={1}>
      <Grid item sm={12} xs={12}>
        <ThreadList mobile={mobile} history={props.history} />
      </Grid>
    </Grid>
  );

  return <div class="container">{chatsMarkup}</div>;
}

export default Chat;
