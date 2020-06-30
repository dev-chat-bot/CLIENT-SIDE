import {
  SET_USER,
  SET_ERROR,
  SET_ISLOGIN,
  SET_CONFIRMPASSWORD,
  SET_PASSWORD,
  SET_EMAIL,
  SET_USERNAME,
  SET_CHATLIST,
  SET_ADD_SNIPPET,
  SET_TOKEN,
} from "../action/index";

const initialState = {
  user: "",
  error: "",
  isLogin: false,
  confirmPassword: "",
  password: "",
  email: "",
  username: "",
  token: "",
  messageChatList: [],
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_ISLOGIN:
      return { ...state, isLogin: payload };
    case SET_EMAIL:
      return { ...state, email: payload };
    case SET_PASSWORD:
      return { ...state, password: payload };
    case SET_USERNAME:
      return { ...state, username: payload };
    case SET_CONFIRMPASSWORD:
      return { ...state, confirmPassword: payload };
    case SET_CHATLIST:
      const data = state.messageChatList
      return { ...state, messageChatList: data.concat(payload) };
    case SET_TOKEN:
      return {...state, token: payload}
    default:
      return { ...state };
  }
}

export default reducer;
