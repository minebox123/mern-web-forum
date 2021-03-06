import { GET_CURRENT_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  profiles: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
