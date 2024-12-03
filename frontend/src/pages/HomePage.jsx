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
                <ul className={s.list}>
                    <li className={s.item}>
                        <p className={s.text}>User Name</p>
                        <p className={s.textUser}>{name}</p>
                    </li>
                    <li className={s.item}>
                        <p className={s.text}>User nick name</p>
                        <p className={s.textUser}>{nickName}</p>
                    </li>
                    <li className={s.item}>
                        <p className={s.text}>Email</p>
                        <p className={s.textUser}>{email}</p>
                    </li>
                </ul>
            </Container>
        </main>
    );
}

export default HomePage;