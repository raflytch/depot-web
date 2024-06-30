import NotFound from "../pages/404.jsx";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {useContext} from "react";

const AdminProtected = ({ children }) => {
    const { role } = useContext(AuthContext);
    return role === 'ADMIN' ? children : <NotFound />;
}

export default AdminProtected;