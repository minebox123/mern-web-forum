import axios from "axios";
import { GET_ERRORS, GET_CURRENT_PROFILE } from "./types";

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

export const getCurrentProfile = () => dispatch => {
  axios
    .get("/profile")
    .then(res =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
