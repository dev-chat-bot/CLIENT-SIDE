import { SET_USER, SET_ERROR, SET_ISLOGIN } from "../action/index";

const initialState = {
  user: {},
  error: "",
  isLogin: false
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
    default:
      return { ...state };
  }
}

export default reducer;
