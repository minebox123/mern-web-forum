import { GET_POSTS, ADD_POST, GET_POST } from "../actions/types";

const initialState = {
  post: null,
  posts: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
}
