import { useSelector } from "react-redux";
import Container from "../component/Container/Container";
import {getName, getNickName, getEmail} from "../redux/user/user-selectors";

function HomePage() {
    const name = useSelector(getName);
    const nickName = useSelector(getNickName);
    const email = useSelector(getEmail);

    return (
        <main>
            <Container>
                <div>HomePage</div>
                <ul>
                    <li>
                        <p>User Name</p>
                        <p>{name}</p>
                    </li>
                    <li>
                        <p>User nick name</p>
                        <p>{nickName}</p>
                    </li>
                    <li>
                        <p>Email</p>
                        <p>{email}</p>
                    </li>
                </ul>
            </Container>
        </main>
    );
}

export default HomePage;