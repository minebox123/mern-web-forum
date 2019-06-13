import axios from "axios";

import { GET_ERRORS, GET_CURRENT_USER } from "./types";

// registration

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
