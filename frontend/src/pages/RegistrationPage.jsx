import { useSelector } from "react-redux";
import Registry from '../component/Form/Registry';
import Container from "../component/Container/Container";
import s from "./Registration.module.css";
import {getIsRefresh, getVerificationToken} from "../redux/user/user-selectors";
import VerifyEmail from "../component/VerifyEmail/VerifyEmail";
import PulseLoader from "react-spinners/PulseLoader";

function RegistrationPage() {
    const isRefresh = useSelector(getIsRefresh);
    const verifyToken = useSelector(getVerificationToken);

    return (
        <main className={s.main}>
            <Container>
                {isRefresh ?
                    <div className={s.loader}>
                        <PulseLoader color="#02172a" className="spinier"/>
                    </div>
                    : null
                }
                <Registry/>
                {verifyToken ? <VerifyEmail/> : '' }
            </Container>
        </main>
    );
}

export default RegistrationPage;