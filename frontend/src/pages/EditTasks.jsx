import Container from "../component/Container/Container";
import EditTasksForm from "../component/Form/EditTasksForm";
import s from "./LoginPage.module.css";
import PulseLoader from "react-spinners/PulseLoader";
import {useSelector} from "react-redux";
import { getIsRefreshing } from "../redux/tasks/tasks-selectors";

function EditTasks () {
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
                <h1>EDIT Tasks</h1>
                <EditTasksForm />
            </Container>
        </main>
    );
}

export default EditTasks;