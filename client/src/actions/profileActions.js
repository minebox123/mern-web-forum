import axios from "axios";
import { ADD_PROFILE, GET_ERRORS } from "./types";

// Add profile information
export const addProfileInformation = (userData, history) => dispatch => {
  axios
    .post("/profile", userData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
