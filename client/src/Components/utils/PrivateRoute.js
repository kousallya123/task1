import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../../Store/userContext'

const PrivateRoute = () => {

    const {  userDetails } = useContext(UserContext)  
    console.log('private route works..........')
  return (
    !userDetails ? <Navigate to="/" /> : <Outlet />
  )
};
export default PrivateRoute;