import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import {getToken} from "../../redux/user/user-selectors";

function PrivateRouter({children, redirect = '/auth'}) {
    let token = useSelector(getToken);
    return token ? children : <Navigate to={redirect} replace />;
}

export default PrivateRouter;

PrivateRouter.propTypes = {
    children: PropTypes.node.isRequired,
}