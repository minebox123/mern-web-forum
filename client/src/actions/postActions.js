import axios from "axios";
import { GET_ERRORS, GET_POSTS, GET_POST } from "./types";

// GET ALL POSTS
export const getAllPosts = () => dispatch => {
  axios
    .get("/post/all")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

// CREATE A POST
export const createPost = (userInput, history) => dispatch => {
  axios
    .post("/post", userInput)
    .then(res => history.push("/post/all"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add a comment
export const addComment = (postId, userInput) => dispatch => {
  axios
    .post(`/post/comment/${postId}`, userInput)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get a post by id
export const getPostById = postId => dispatch => {
  axios
    .get(`/post/${postId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Like a post
export const likePost = (postId, commentId) => dispatch => {
  axios
    .post(`/post/like/${postId}/${commentId}`)
    .then(res => {
      dispatch(getAllPosts());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Unlike a post
export const dislikePost = (postId, commentId) => dispatch => {
  axios
    .post(`/post/dislike/${postId}/${commentId}`)
    .then(res => {
      dispatch(getAllPosts());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
