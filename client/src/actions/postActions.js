import axios from "axios";
import { GET_ERRORS, GET_POSTS } from "./types";

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
        payload: {}
      })
    );
};
