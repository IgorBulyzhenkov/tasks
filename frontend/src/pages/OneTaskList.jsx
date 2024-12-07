import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './OneTaskList.module.css';
import taskList from "../redux/task_list/task_list-operation";
import Container from "../component/Container/Container";
import {NavLink, useParams} from "react-router-dom";
import {
    getTaskListName,
    getTaskListCreatedAt,
    getTaskListUserCreated,
    getTaskListIsCompleted,
    getTaskListDescription,
    getTaskListId,
    getIsLoading,
    getIsRefreshing
} from "../redux/task_list/task_list-selectors";
import PulseLoader from "react-spinners/PulseLoader";

const { getOneTaskList } = taskList;

function OneTaskList() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isRefresh = useSelector(getIsRefreshing);

    const nameTask = useSelector(getTaskListName);
    const descriptionTask = useSelector(getTaskListDescription);
    const createdUser = useSelector(getTaskListUserCreated);
    const createdAt = useSelector(getTaskListCreatedAt);
    const idTask = useSelector(getTaskListId);
    const isCompleted = useSelector(getTaskListIsCompleted);
    const isLoading  = useSelector(getIsLoading);

    useEffect(() => {
        dispatch(getOneTaskList({ id }))
    }, []);


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
                            <NavLink
                                to='/task-list'
                                className={s.btn}
                            >
                                Task List
                            </NavLink>
                        </div>

                        <h1 className="task-title">{nameTask}</h1>

                        <ul className={s.taskInfo}>
                            <li className={s.taskInfo__item}>
                                <p><strong>Task ID:</strong> {idTask}</p>
                            </li>
                            <li className={s.taskInfo__item}>
                                <p><strong>Description:</strong> {descriptionTask}</p>
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

export default OneTaskList;