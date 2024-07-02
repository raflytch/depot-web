import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initUser());

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

function authReducer(state, action) {
  switch (action.type) {
    case "logged-in":
      return action.user;
    case "logged-out":
      return {
        nama: "",
        email: "",
        role: "",
        token: "",
        alamat: "", // Tambahkan state untuk alamat
      };
    case "set-alamat":
      return {
        ...state,
        alamat: action.alamat,
      };
    default:
      return state;
  }
}

const initUser = () => {
  const token = Cookies.get("access_token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      return {
        nama: decodedToken.nama,
        email: decodedToken.email,
        role: decodedToken.role,
        token: token,
        alamat: "", // Tambahkan state untuk alamat
      };
    } catch (err) {
      return {
        nama: "",
        email: "",
        role: "",
        token: "",
        alamat: "", // Tambahkan state untuk alamat
      };
    }
  }
  return {
    nama: "",
    email: "",
    role: "",
    token: "",
    alamat: "", // Tambahkan state untuk alamat
  };
};
