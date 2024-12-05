import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import s from "./TaskList.module.css";
import { NavLink, useLocation, useNavigate} from "react-router-dom";
import Container from "../component/Container/Container";
import taskList from '../redux/task_list/task_list-operation';
import CreateTaskModal from "../component/Modals/CreateTaskList";
import {
    getDataTaskList,
    getCurrentPage,
    getTotalPage
} from "../redux/task_list/task_list-selectors";
import { BsFillBookmarkCheckFill, BsFillBookmarkXFill } from "react-icons/bs";
import Pagination from "../component/Pagination/Pagination";

const { getTaskList, destroyTaskList, getOneTaskList } = taskList;

function TaskList() {
    const taskListData = useSelector(getDataTaskList);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const elBody = document.querySelector("body");
    const location = useLocation();
    const currentPage = useSelector(getCurrentPage);
    const totalPages = useSelector(getTotalPage);
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page"), 10) || 1;
    const limit = parseInt(params.get("limit"), 10) || 10;

    useEffect(() => {
        dispatch(getTaskList({ page, limit }));

    }, [page, limit, dispatch]);

    const toggleClick = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            if (toggle === true) {
                return setToggle(false);
            }
            setToggle(true);
            elBody.classList.add("hidden");
        }
    }

    const deleteTaskList = ({target : {id}}) => {
        dispatch(destroyTaskList({ id }));
        dispatch(getTaskList({ page, limit }));
    }

    const handlePageChange = (page, limit) => {
        if(limit){
            navigate(`/task-list?page=${page}&limit=${limit}`);
        }else{
            navigate(`/task-list?page=${page}`);
        }
    };

    return (
        <main className={s.main}>
            <Container>

                <h1> Task List </h1>

                <button onClick={toggleClick} className={s.buttonAdd}>Add task list</button>

                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Completed</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskListData.length > 0 ? (
                            taskListData.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.name}</td>
                                    <td>
                                        {task.is_completed ?
                                            <BsFillBookmarkCheckFill className={s.success}/> :
                                            <BsFillBookmarkXFill className={s.noCheck}/>}
                                    </td>
                                    <td>{task.created_at}</td>
                                    <td>
                                        <ul className={s.list}>
                                            {(task.permission === 'full' || task.permission === 'view') ?
                                                <li className={s.item}>
                                                    <NavLink
                                                        to={`/task-list/${task.id}`}
                                                        className={s.button}
                                                    >
                                                        View
                                                    </NavLink>
                                                </li> : null
                                            }
                                            {(task.permission === 'full' || task.permission === 'edit') ?
                                                <li>
                                                    <NavLink
                                                        to={`/task-list/edit/${task.id}`}
                                                        className={s.button}
                                                    >
                                                        Edit
                                                    </NavLink>
                                                </li> : null
                                            }
                                            {(task.permission === 'full' || task.permission === 'edit' || task.permission === 'view') ?
                                                <li>
                                                    <NavLink
                                                        to={`/tasks/list/${task.id}`}
                                                        className={s.button}
                                                    >
                                                        Tasks
                                                    </NavLink>
                                                </li> : null
                                            }
                                            {(task.permission === 'full' || task.permission === 'view_list') ?
                                                <li>
                                                    <NavLink
                                                        to={`/`}
                                                        className={s.button}
                                                    >
                                                        User List
                                                    </NavLink>
                                                </li> : null
                                            }
                                            {task.permission === 'full' ?
                                                <li>
                                                    <button type='button' onClick={deleteTaskList} id={task.id}
                                                            className={s.buttonDelete}>Delete
                                                    </button>
                                                </li> : null
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className={s.noData}>
                                    No task list found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        limit={limit}
                    />
                </div>
            </Container>
            {toggle ? <CreateTaskModal actions={{ toggleClick, setToggle, page, limit }} /> : null}
        </main>
    );
}

export default TaskList;