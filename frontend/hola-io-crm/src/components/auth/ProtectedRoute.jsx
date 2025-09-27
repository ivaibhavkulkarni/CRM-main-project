import { Navigate, Outlet } from "react-router-dom"
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({children}) => {
  // Will integrate these values later
    const { isAuthenticated, loading } = useAuth();


    if (loading){
        // You can render a loading spinner here
        return <div>Loading...</div>;
    }

    if(!isAuthenticated){
        return <Navigate to ="/Login" replace />;
    }

  return (
    <DashboardLayout>{children ? children: <Outlet/>}</DashboardLayout>
  )
};

export default ProtectedRoute