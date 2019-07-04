import { RECEIVE_MESSAGES, RECEIVE_MESSAGE } from "./types";
import axios from "axios";

// Get the whole conversation
export const loadMessages = conversationId => dispatch => {
  axios
    .get(`/conversations/${conversationId}`)
    .then(res => {
      dispatch({
        type: RECEIVE_MESSAGES,
        payload: res.data.conversation
      });
    })
    .catch(err => console.log(err));
};

// Send messages
export const sendMessage = (conversationId, text) => dispatch => {
  axios
    .post(`/conversations/${conversationId}`, text)
    .then(res =>
      dispatch({
        type: RECEIVE_MESSAGE,
        payload: res.data.conversation
      })
    )
    .catch(err => console.log(err));
};
