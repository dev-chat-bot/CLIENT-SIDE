import axios from "axios"

const baseUrl = "http://localhost:3000/"

export const SET_EMAIL = "SET_EMAIL"
export const SET_USERNAME = "SET_USERNAME"
export const SET_PASSWORD = "SET_PASSWORD"
export const SET_CONFIRMPASSWORD = "SET_CONFIRMPASSWORD"
export const SET_USER = "SET_USER"
export const SET_ERROR = "SET_ERROR"
export const SET_ISLOGIN = "SET_ISLOGIN"
export const SET_CHATLIST = "SET_CHATLIST"

export const setUser = (data) => {
  return { type: SET_USER, payload: data }
}
export const setEmail = (data) => {
  return { type: SET_EMAIL, payload: data }
}
export const setUsername = (data) => {
  return { type: SET_USERNAME, payload: data }
}
export const setPassword = (data) => {
  return { type: SET_PASSWORD, payload: data }
}
export const setConfirmPassword = (data) => {
  return { type: SET_CONFIRMPASSWORD, payload: data }
}

export const setError = (data) => {
  return { type: SET_ERROR, payload: data }
}
export const setIsLogin = (data) => {
  return { type: SET_ISLOGIN, payload: data }
}
export const setChatList = (data) => {
  return { type: SET_CHATLIST, payload: data }
}

export const SignUp = (data) => {
  //   console.log(data, "ini data");
  return async (dispatch) => {
    try {
      let NewUser = await axios.post(baseUrl + "register", {
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      //   console.log(NewUser, "ini registrasi");
      dispatch(setUser(NewUser.data.access_token))
      dispatch(setIsLogin(true))
      localStorage.setItem("token", NewUser.data.access_token)
      if (NewUser.data.access_token) {
        dispatch(setEmail(""))
        dispatch(setUsername(""))
        dispatch(setPassword(""))
        dispatch(setConfirmPassword(""))
      }
    } catch (error) {
      dispatch(setError(error.response.data.error))
      setTimeout(() => {
        dispatch(setError(""))
      }, 5000)
    }
  }
}

export const SignIn = (data) => {
  //   console.log(data, "ini data signin");
  return async (dispatch) => {
    try {
      let user = await axios.post(baseUrl + "login", {
        username: data.username,
        password: data.password,
      })
      // console.log(user.data.access_token, 'ini user')
      dispatch(setUser(user.data.access_token))
      dispatch(setIsLogin(true))
      localStorage.setItem("token", user.data.access_token)
      if (user.data.access_token) {
        dispatch(setUsername(""))
        dispatch(setPassword(""))
      }
    } catch (error) {
      dispatch(setError(error.response.data.error))
      setTimeout(() => {
        dispatch(setError(""))
      }, 5000)
    }
  }
}

export const UserRequest = (text) => {
  return async (dispatch) => {
    try {
      let getResponse = await axios({
        url: baseUrl + "dialogflow",
        method: "post",
        data: {
          text,
        },
        headers: {
          token: localStorage.token,
        },
      })
      if (typeof getResponse.data === "object") {
        getResponse.data.forEach((element) => {
          dispatch(setChatList({ adeps: { message: element } }))
        })
      } else {
        dispatch(setChatList({ adeps: { message: getResponse.data } }))
      }
    } catch (error) {
      //console.log(error.response)
      dispatch(setError(error.response.data.error))
      setTimeout(() => {
        dispatch(setError(""))
      }, 5000)
      // belum handle in mainpage to show error message
    }
  }
}

export const LoginFacebook = (email) => {
  return async (dispatch) => {
    try {
      let dataFacebook = await axios({
        url: baseUrl + "facebooklogin",
        method: "post",
        data: {
          email,
        },
      })
      dispatch(setUser(dataFacebook.data.access_token))
      localStorage.setItem("token", dataFacebook.data.access_token)
    } catch (error) {
      dispatch(setError(error.response.data.error))
      setTimeout(() => {
        dispatch(setError(""))
      }, 5000)
    }
  }
}
