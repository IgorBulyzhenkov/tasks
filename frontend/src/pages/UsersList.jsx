import s from './UsersList.module.css';
import Container from "../component/Container/Container";
import {NavLink, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import users from "../redux/users_to_task/users_to_task-operation";
import { getUsersData, getIsRefreshing } from "../redux/users_to_task/users_to_task-selectors";
import task_list from "../redux/task_list/task_list-operation";
import { getTaskListName } from "../redux/task_list/task_list-selectors";
import PulseLoader from "react-spinners/PulseLoader";

const { getOneTaskList } = task_list;
const { getUsersList } = users;

function UsersList() {
    const { fk_task_list }= useParams();
    const dispatch = useDispatch();
    const userData = useSelector(getUsersData);
    const taskName = useSelector(getTaskListName);
    const isRefresh = useSelector(getIsRefreshing);

    useEffect(() => {
        const id = fk_task_list;

        dispatch(getUsersList({ fk_task_list }));
        dispatch(getOneTaskList({ id }));
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

                <div className={s.containerBtn}>
                    <NavLink
                        to='/task-list'
                        className={s.btn}
                    >
                        Task List
                    </NavLink>
                </div>

                <h1> Users List </h1>

                <p><strong>Task List:</strong> {taskName}</p>

                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Name User</th>
                            <th>Permission</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData.length > 0 ? (
                            userData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.permission}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className={s.noData}>
                                    No user list found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                </div>
            </Container>
        </main>
    )
}

export default UsersList;