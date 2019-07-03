import { SEND_MESSAGE } from "../actions/types";

const initialState = {
  message: null,
  messages: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
}
