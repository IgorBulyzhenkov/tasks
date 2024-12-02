import { memo } from "react";
import { useDispatch } from "react-redux";
import user from "../redux/user/user-operation";
import { Navigate, useParams } from "react-router-dom";

const { verifyEmailUser } = user;

function Verify() {
    const dispatch = useDispatch();
    const params = useParams();

    if (params.token) {
        const verification_token = params.token;

        dispatch(verifyEmailUser({verification_token}))

        return <Navigate to="/"/>;
    }

   return <Navigate to="/auth"/>;
}

export default memo(Verify);
