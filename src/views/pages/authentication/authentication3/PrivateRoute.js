import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  let isAuthentic = false;
  try {
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : {};

    if (user?.id) {
      <Navigate to="/admin" />;
      isAuthentic = true;
    }
  } catch (err) {
    <Navigate to="/admin/pages/login" />;
    isAuthentic = false;
  } finally {
  }

  return isAuthentic ? children : <Navigate to="/admin/pages/login" />;
}
PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
};
