import {
  SET_SOCKET,
  SET_USERS,
  SET_ONLINE_USERS,
  SET_THREADS,
  SET_CHAT,
  SEND_MESSEGE,
  UPDATE_THREADS,
  NEW_MESSEGE,
} from "../Types";

const initialState = {
  socket: null,
  users: [],
  onlineUsers: [],
  threads: [],
  thread: {},
  chat: [],
};

const chatReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_ONLINE_USERS:
      action.payload.map((onlineUser) => {
        const index = state.users.findIndex(
          (user) => user.userHandle === onlineUser.userHandle
        );
        if (index) {
          state.users.splice(index, 1);
        }
      });
      return {
        ...state,
        onlineUsers: action.payload,
      };
    case SET_THREADS:
      return {
        ...state,
        threads: action.payload,
      };
    case SET_CHAT:
      state.thread.users = action.payload.users;
      state.thread.imageUrls = action.payload.imageUrls;
      state.threads.map((thread) => {
        if (thread.users[0] === action.payload.users[0]) {
          state.chat = thread.chats;
        } else {
          state.chat = [];
        }
      });
      return {
        ...state,
      };
    case SEND_MESSEGE:
      return {
        ...state,
        chat: [...state.chat, action.payload],
      };
    case NEW_MESSEGE:
      if (Object.keys(state.chat).length > 0) {
        if (state.thread.users[0] === action.payload.sender) {
          state.chat = [...state.chat, action.payload];
        }
      }
      return {
        ...state,
      };
    case UPDATE_THREADS:
      state.threads = action.payload;
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default chatReducer;
