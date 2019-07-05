import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import messageReducer from "./messageReducer";
import conversationId from "./conversationIdReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  post: postReducer,
  message: messageReducer,
  id: conversationId
});
