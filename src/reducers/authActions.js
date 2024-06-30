// Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Action Creators
export const loginSuccess = (role) => ({
  type: LOGIN_SUCCESS,
  payload: role,
});

export const logout = () => ({
  type: LOGOUT,
});
