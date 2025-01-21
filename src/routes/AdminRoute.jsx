import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../components/hooks/useAdmin";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    if(loading || isAdminLoading){
        return <div className="text-center "><span className="loading loading-spinner mt-20 loading-lg"></span></div>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate to = {"/"}></Navigate>;
};

export default AdminRoute;