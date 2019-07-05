import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  GET_CONVERSATION_ID,
  GET_ALL_CONVERSATIONS
} from "./types";
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

// get a conversation Id
export const getConvByParticipants = recipientId => dispatch => {
  axios
    .get(`/conversations/${recipientId}`)
    .then(res =>
      dispatch({
        type: GET_CONVERSATION_ID,
        payload: res.data.convId[0]
      })
    )
    .catch(err => console.log(err));
};

// Get all conversations
export const getAllConversations = () => dispatch => {
  axios
    .get("/conversations")
    .then(res =>
      dispatch({
        type: GET_ALL_CONVERSATIONS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
