import { GET_CONVERSATION_ID } from "../actions/types";

const initialState = {
  conversationId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATION_ID:
      return {
        ...state,
        conversationId: action.payload
      };
    default:
      return state;
  }
}
