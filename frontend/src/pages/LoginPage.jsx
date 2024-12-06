import {useSelector} from "react-redux";
import LoginForm from "../component/Form/LoginForm";
import Container from "../component/Container/Container";
import s from "./LoginPage.module.css";
import { getIsRefresh } from "../redux/user/user-selectors";
import PulseLoader from "react-spinners/PulseLoader";

function LoginPage() {
    const isRefresh = useSelector(getIsRefresh);

    return (
        <main className={s.main}>
            <Container>
                {isRefresh ?
                    <div className={s.loader}>
                        <PulseLoader color="#02172a" className="spinier"/>
                    </div>
                    : null
                }
                <LoginForm/>
            </Container>
        </main>
    );
}

export default LoginPage;