import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getInLoggedIn } from "../../redux/user/user-selectors";

function PublicRouter({children, redirect = "/"}) {
    const isLoggedIn = useSelector(getInLoggedIn);

    return isLoggedIn ? < Navigate to={redirect} replace /> : children ;
}

export default PublicRouter;

PublicRouter.propTypes = {
    children: PropTypes.node.isRequired,
}