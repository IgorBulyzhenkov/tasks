import Container from "../component/Container/Container";
import EditTasksForm from "../component/Form/EditTasksForm";
import s from "./LoginPage.module.css";
import PulseLoader from "react-spinners/PulseLoader";
import {useSelector} from "react-redux";
import { getIsRefreshing } from "../redux/tasks/tasks-selectors";
import { useLocation, useNavigate} from "react-router-dom";
import sCreate from "./OneTaskList.module.css";

function EditTasks () {
    const isRefresh = useSelector(getIsRefreshing);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(location.state.from, { replace: false });
    };

    return (
        <main className={s.main}>
            <Container>
                {isRefresh ?
                    <div className={s.loader}>
                        <PulseLoader color="#02172a" className="spinier"/>
                    </div>
                    : null
                }

                <div className={sCreate.containerBtn}>
                    <button type="button" onClick={handleClick} className={sCreate.btn}>
                        Go back
                    </button>
                </div>

                <h1>EDIT Tasks</h1>
                <EditTasksForm/>
            </Container>
        </main>
    );
}

export default EditTasks;