import s from "./BindUserPage.module.css";
import Container from "../component/Container/Container";
import BindUserForm from "../component/Form/BindUserForm";

function BindUserPage() {

    return (
        <main className={s.main}>
            <Container>
                <h1> Bind User Page </h1>
                <BindUserForm/>
            </Container>
        </main>
    );
}

export default BindUserPage;