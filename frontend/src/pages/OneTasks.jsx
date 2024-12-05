import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './OneTasks.module.css';
import tasks from "../redux/tasks/tasks-operation";
import Container from "../component/Container/Container";
import {useParams} from "react-router-dom";
import {
    getTasksTitle,
    getTasksCreatedAt,
    getTasksUserCreated,
    getTasksIsCompleted,
    getTasksDescription,
    getTasksId,
    getIsLoading,
    getTaskListName
} from "../redux/tasks/tasks-selectors";

const { getOneTasks } = tasks;

function OneTasks() {
    const { id } = useParams();
    const dispatch = useDispatch();

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


    return (
        <main className={s.main}>
            <Container>
                {isLoading ?
                    <>
                        <h1 className="task-title">{titleTask}</h1>

                        <div className="task-info">
                            <p><strong>Task ID:</strong> {idTask}</p>
                            <p><strong>Description:</strong> {descriptionTask}</p>
                            <p><strong>Task List:</strong> {taskList}</p>
                            <p><strong>Created By:</strong> {createdUser}</p>
                            <p><strong>Created At:</strong> {createdAt}</p>
                            <p>
                                <strong>Status:</strong> {!isCompleted ? "Completed" : "Not Completed"}
                            </p>
                        </div>
                    </> : ''
                }
            </Container>
        </main>
    );
}

export default OneTasks;