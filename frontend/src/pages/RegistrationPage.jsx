import { useSelector } from "react-redux";
import Registry from '../component/Form/Registry';
import Container from "../component/Container/Container";
import s from "./Registration.module.css";
import {getVerificationToken} from "../redux/user/user-selectors";
import VerifyEmail from "../component/VerifyEmail/VerifyEmail";

function RegistrationPage() {

    const verifyToken = useSelector(getVerificationToken);

    return (
        <main className={s.main}>
            <Container>
                <Registry/>
                {verifyToken ? <VerifyEmail/> : '' }
            </Container>
        </main>
    );
}

export default RegistrationPage;