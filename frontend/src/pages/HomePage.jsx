import { useSelector } from "react-redux";
import Container from "../component/Container/Container";
import {getName, getNickName, getEmail} from "../redux/user/user-selectors";
import s from "./HomePage.module.css";

function HomePage() {
    const name      = useSelector(getName);
    const nickName  = useSelector(getNickName);
    const email     = useSelector(getEmail);

    return (
        <main className={s.main}>
            <Container>
                <ul className={s.taskInfo}>
                    <li className={s.taskInfo__item}>
                        <p><strong>User Name:</strong> {name}</p>
                    </li>
                    <li className={s.taskInfo__item}>
                        <p><strong>User nick name:</strong> {nickName}</p>
                    </li>
                    <li className={s.taskInfo__item}>
                        <p><strong>Email:</strong> {email}</p>
                    </li>
                </ul>
            </Container>
        </main>
    );
}

export default HomePage;