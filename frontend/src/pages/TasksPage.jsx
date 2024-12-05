import s from './TasksPage.module.css';
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import Container from "../component/Container/Container";
import tasks from '../redux/tasks/tasks-operation';
import CreateTasksModal from "../component/Modals/CreateTasks";
import {
    getDataTasks,
    getTasksCurrentPage,
    getTasksTotalPage
} from "../redux/tasks/tasks-selectors";
import { BsFillBookmarkCheckFill, BsFillBookmarkXFill } from "react-icons/bs";
import Pagination from "../component/Pagination/Pagination";

const { getTasks, destroyTasks } = tasks;

function TasksPage (){
    const tasksData = useSelector(getDataTasks);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const { fk_task_list } = useParams();
    const navigate = useNavigate();
    const elBody = document.querySelector("body");
    const currentPage = useSelector(getTasksCurrentPage);
    const totalPages = useSelector(getTasksTotalPage);
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page"), 10) || 1;
    const limit = parseInt(params.get("limit"), 10) || 10;

    useEffect(() => {
        dispatch(getTasks({ fk_task_list, page, limit }));
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
        dispatch(destroyTasks({ id }));
        dispatch(getTasks({ fk_task_list, page, limit }));
    }

    const handlePageChange = (page, limit) => {
        if(limit){
            navigate(`/tasks/${fk_task_list}?page=${page}&limit=${limit}`);
        }else{
            navigate(`/tasks/${fk_task_list}?page=${page}`);
        }
    };

    return (
        <main className={s.main}>
            <Container>

                <h1> Tasks </h1>
                <button onClick={toggleClick} className={s.buttonAdd}>Add task</button>

                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Completed</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasksData.length > 0 ? (
                            tasksData.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>
                                        {task.is_completed === '0' ?
                                            <BsFillBookmarkCheckFill className={s.success}/> :
                                            <BsFillBookmarkXFill className={s.noCheck}/>}
                                    </td>
                                    <td>{task.created_at}</td>
                                    <td>
                                        <ul className={s.list}>
                                            {(task.permission === 'full' || task.permission === 'view') ?
                                                <li>
                                                    <NavLink
                                                        to={`/tasks/view/${task.id}`}
                                                        className={s.button}
                                                    >
                                                        View
                                                    </NavLink>
                                                </li> : null
                                            }
                                            {(task.permission === 'full' || task.permission === 'edit') ?
                                                <li>
                                                    <NavLink
                                                        to={`/tasks/edit/${task.id}`}
                                                        className={s.button}
                                                    >
                                                        Edit
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
            {toggle ? <CreateTasksModal actions={{toggleClick, setToggle, fk_task_list, page, limit}}/> : null}
        </main>
    );
}

export default TasksPage;