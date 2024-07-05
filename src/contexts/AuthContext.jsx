import {createContext, useEffect, useReducer} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initUser());

  useEffect(() => {
    (async () => {
      const { id } = state;
      if (id !== -1) {
        const res = await fetch(import.meta.env.VITE_BACKEND_URI + `users/alamat/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        const data = await res.json();

        dispatch({ type: "set-alamat", alamat: data.alamat });
      }
    })()
  }, [])

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
        id: -1,
        name: "",
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
    case "update-profile":
      return {
        ...state,
        name: action.name,
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
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
        token: token,
        alamat: "", // Tambahkan state untuk alamat
      };
    } catch (err) {
      return {
        id: -1,
        name: "",
        email: "",
        role: "",
        token: "",
        alamat: "", // Tambahkan state untuk alamat
      };
    }
  }
  return {
    id: -1,
    name: "",
    email: "",
    role: "",
    token: "",
    alamat: "", // Tambahkan state untuk alamat
  };
};
