import { SEND_MESSAGE, RECEIVE_MESSAGES } from "./types";
import axios from "axios";

// Create new conversation and send a message
export const sendMessage = recipientId => dispatch => {
  axios
    .get(`/conversations/${recipientId}`)
    .then(res => {
      dispatch({
        type: RECEIVE_MESSAGES,
        payload: res.data.conversation
      });
    })
    .catch(err => console.log(err));
};
