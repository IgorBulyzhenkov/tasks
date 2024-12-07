import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './OneTasks.module.css';
import tasks from "../redux/tasks/tasks-operation";
import Container from "../component/Container/Container";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    getTasksTitle,
    getTasksCreatedAt,
    getTasksUserCreated,
    getTasksIsCompleted,
    getTasksDescription,
    getTasksId,
    getIsLoading,
    getTaskListName,
    getIsRefreshing
} from "../redux/tasks/tasks-selectors";
import PulseLoader from "react-spinners/PulseLoader";

const { getOneTasks } = tasks;

function OneTasks() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isRefresh = useSelector(getIsRefreshing);
    const navigate = useNavigate();
    const location = useLocation();

    const titleTask = useSelector(getTasksTitle);
    const descriptionTask = useSelector(getTasksDescription);
    const createdUser = useSelector(getTasksUserCreated);
    const createdAt = useSelector(getTasksCreatedAt);
    const idTask = useSelector(getTasksId);
    const isCompleted = useSelector(getTasksIsCompleted);
    const isLoading  = useSelector(getIsLoading);
    const taskList = useSelector(getTaskListName);

    useEffect(() => {
        dispatch(getOneTasks({ id }))
    }, []);

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
                {isLoading ?
                    <>

                        <div className={s.containerBtn}>
                            <button type="button" onClick={handleClick} className={s.btn}>
                                Go back
                            </button>
                        </div>

                        <h1 className="task-title">{titleTask}</h1>

                        <ul className={s.taskInfo}>
                            <li className={s.taskInfo__item}>
                            <p><strong>Task ID:</strong> {idTask}</p>
                            </li>
                            <li className={s.taskInfo__item}>
                                <p><strong>Description:</strong> {descriptionTask}</p>
                            </li>
                            <li className={s.taskInfo__item}>
                                <p><strong>Task List:</strong> {taskList}</p>
                            </li>
                            <li className={s.taskInfo__item}>
                                <p><strong>Created By:</strong> {createdUser}</p>
                            </li>
                            <li className={s.taskInfo__item}>
                                <p><strong>Created At:</strong> {createdAt}</p>
                            </li>
                            <li className={s.taskInfo__item}>
                                <p><strong>Status:</strong> {isCompleted === '1' ? "Completed" : "Not Completed"}</p>
                            </li>
                        </ul>
                    </> : ''
                }
            </Container>
        </main>
    );
}

export default OneTasks;