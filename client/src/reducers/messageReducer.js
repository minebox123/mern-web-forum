import {
  SEND_MESSAGE,
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE
} from "../actions/types";

const initialState = {
  message: null,
  messages: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages]
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
