import { SEND_MESSAGE } from "./types";
import axios from "axios";

// Create new conversation and send a message
export const sendMessage = recipientId => dispatch => {
  axios
    .post(`/conversations/createComv/${recipientId}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
