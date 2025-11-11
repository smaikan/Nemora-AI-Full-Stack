import { Navigate, Outlet } from "react-router-dom";
type PrivateRouteProps = {
  isLogged: boolean;
};

const PrivateRoute = ({isLogged}:PrivateRouteProps) => {
  if (!isLogged) {
  return <Navigate to="/welcome" replace />;
}
return <Outlet />;
};

export default PrivateRoute;
