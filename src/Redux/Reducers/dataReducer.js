import {
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  SET_POSTS,
  DELETE_POST,
  ADD_POST,
  SET_POST,
  SUBMIT_COMMENT,
} from "../Types";

const initialState = {
  posts: [],
  post: {},
  comments: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload.post,
        comments: action.payload.comments,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
      if (state.post._id === action.payload._id) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_POST:
      {
        let index = state.posts.findIndex(
          (post) => post._id === action.payload
        );
        state.posts.splice(index, 1);
      }
      return {
        ...state,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SUBMIT_COMMENT: {
      let index = state.posts.findIndex(
        (post) => post._id === action.payload.postdata._id
      );
      state.posts[index] = action.payload.postdata;
      return {
        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount + 1,
        },
        comments: [action.payload.newComment, ...state.comments],
      };
    }
    default:
      return {
        ...state,
      };
  }
}
