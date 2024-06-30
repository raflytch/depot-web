import {createContext, useEffect, useReducer} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export function AuthProvider({children}) {
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
            };
    }
}

const initUser = () => {

    const token = Cookies.get("access_token");

    if (token) {
        try {
            const decodedToken = jwtDecode(token);

            console.log(decodedToken)

            return {
                nama: decodedToken.nama,
                email: decodedToken.email,
                role: decodedToken.role,
                token: token,
            };
        } catch (err) {
            return {
                nama: "",
                email: "",
                role: "",
                token: "",
            }
        }
    }
    return {
        nama: "",
        email: "",
        role: "",
        token: "",
    }
};
