import { SEND_MESSAGE, RECEIVE_MESSAGES } from "../actions/types";

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
    default:
      return state;
  }
}
