import { LOGIN_SUCCESS, LOGOUT } from "./authActions";

const initialState = {
  role: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        role: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        role: null,
      };
    default:
      return state;
  }
};

export default authReducer;
