import {useSelector} from "react-redux";
import LoginForm from "../component/Form/LoginForm";
import Container from "../component/Container/Container";
import s from "./LoginPage.module.css";

function LoginPage() {

    return (
        <main className={s.main}>
            <Container>
                <LoginForm/>
            </Container>
        </main>
    );
}

export default LoginPage;