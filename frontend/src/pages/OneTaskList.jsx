import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './OneTaskList.module.css';
import taskList from "../redux/task_list/task_list-operation";
import Container from "../component/Container/Container";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    getTaskListName,
    getTaskListCreatedAt,
    getTaskListUserCreated,
    getTaskListIsCompleted,
    getTaskListDescription,
    getTaskListId,
    getIsLoading
} from "../redux/task_list/task_list-selectors";

const { getOneTaskList } = taskList;

function OneTaskList() {
    const { id } = useParams();
    const dispatch = useDispatch();

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
                {isLoading ?
                    <>
                        <h1 className="task-title">{nameTask}</h1>

                        <div className="task-info">
                            <p><strong>Task ID:</strong> {idTask}</p>
                            <p><strong>Description:</strong> {descriptionTask}</p>
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

export default OneTaskList;