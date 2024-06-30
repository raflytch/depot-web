import {createContext, useEffect, useReducer} from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export function AuthProvider ({ children }) {
    const [state, dispatch] = useReducer(authReducer, initUser);

    useEffect(() => {
        const token = Cookies.get("access_token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;

                dispatch({
                    type: 'logged-in',
                    user: {
                        nama: decodedToken.nama,
                        email: decodedToken.email,
                        role: userRole,
                        token: token,
                    }
                })
            } catch (err) {
                // pass
            }
        }
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
        case 'logged-in':
            return action.user;
        case 'logged-out':
            return {
                nama: '',
                email: '',
                role: '',
                token: '',
            };
    }
}

const initUser = {
    nama: '',
    email: '',
    role: '',
    token: ''
}
