import s from "./BindUserPage.module.css";
import Container from "../component/Container/Container";
import BindUserForm from "../component/Form/BindUserForm";
import {useSelector} from "react-redux";
import { getIsRefreshing } from "../redux/users_to_task/users_to_task-selectors";
import PulseLoader from "react-spinners/PulseLoader";
import sTaskList from "./OneTaskList.module.css";
import {NavLink} from "react-router-dom";

function BindUserPage() {
    const isRefresh = useSelector(getIsRefreshing);

    return (
        <main className={s.main}>
            <Container>
                {isRefresh ?
                    <div className={s.loader}>
                        <PulseLoader color="#02172a" className="spinier"/>
                    </div>
                    : null
                }

                <div className={sTaskList.containerBtn}>
                    <NavLink
                        to='/task-list'
                        className={sTaskList.btn}
                    >
                        Task List
                    </NavLink>
                </div>

                <h1> Bind User Page </h1>
                <BindUserForm/>
            </Container>
        </main>
    );
}

export default BindUserPage;