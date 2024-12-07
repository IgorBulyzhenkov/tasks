import Container from "../component/Container/Container";
import EditTaskListForm from "../component/Form/EditTaskListForm";
import { getIsRefreshing } from "../redux/task_list/task_list-selectors";
import s from './LoginPage.module.css';
import {useSelector} from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import {NavLink} from "react-router-dom";
import sTaskList from './OneTaskList.module.css';

function EditTaskListPage () {
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

                <h1>EDIT</h1>
                <EditTaskListForm/>
            </Container>
        </main>
    );
}

export default EditTaskListPage;