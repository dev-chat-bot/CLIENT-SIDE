import axios from "axios";
const baseUrl = "http://localhost:3000/";


export const SET_USER = "SET_USER";
export const SET_ERROR = "SET_ERROR";
export const SET_ISLOGIN = "SET_ISLOGIN";

export const setUser = (data) => {
  return { type: SET_USER, payload: data };
};

export const setError = (data) => {
  return { type: SET_ERROR, payload: data };
};
export const setIsLogin = (data) => {
  return { type: SET_ISLOGIN, payload: data };
};

export const SignUp = (data) => {
//   console.log(data, "ini data");
  return async (dispatch) => {
    try {
      let NewUser = await axios.post(baseUrl + "register", {
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      //   console.log(NewUser, "ini registrasi");
      dispatch(setUser(NewUser.data.access_token));
      dispatch(setIsLogin(true))
      localStorage.setItem("token", NewUser.data.access_token);
    } catch (error) {
      dispatch(setError(error.response.data.error));
      setTimeout(() => {
        dispatch(setError(""));
      }, 5000);
    }
  };
};

export const SignIn = (data) => {
//   console.log(data, "ini data signin");
  return async (dispatch) => {
    try {
      let user = await axios.post(baseUrl + "login", {
        username: data.username,
        password: data.password,
      });
      // console.log(user.data.access_token, 'ini user')
      dispatch(setUser(user.data.access_token));
      dispatch(setIsLogin(true))
      localStorage.setItem("token", user.data.access_token);
    } catch (error) {
      dispatch(setError(error.response.data.error));
      setTimeout(() => {
        dispatch(setError(""));
      }, 5000);
    }
  };
};

