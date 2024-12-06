import s from "./BindUserForm.module.css";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import users from "../../redux/users_to_task/users_to_task-operation";
import task_list from "../../redux/task_list/task_list-operation";
import { getUsersData, getIsLoading } from "../../redux/users_to_task/users_to_task-selectors";
import { getTaskListName } from "../../redux/task_list/task_list-selectors";
import { CiSearch } from "react-icons/ci";
import Permission from "../Modals/Permission";
import {toast} from "react-toastify";

const { searchUsers, bindUserToTask } = users;
const { getOneTaskList } = task_list;

function BindUserForm() {
    const [search, setSearch] = useState("");
    const { fk_task_list } = useParams();
    const dispatch = useDispatch();
    const taskName = useSelector(getTaskListName);
    const isLoading = useSelector(getIsLoading);
    const usersData = useSelector(getUsersData);
    const timeoutRef = useRef(null);
    const [toggle, setToggle] = useState(false);
    const [fkUser, setFkUser] = useState(null);
    const [permission, setPermission] = useState(null);
    const elBody = document.querySelector("body");

    useEffect(() => {
        const id = fk_task_list;
        dispatch(getOneTaskList({ id }));
    }, []);

    const handleChange = ({target : { value }}) => {
        setSearch(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            dispatch(searchUsers({ name: value }));
        }, 1000);

    }

    const handleChangeUser = (e) => {
        switch (e.target.name) {
            case "fkUser":
                setToggle(true);
                return setFkUser(e.target.dataset.id);
            case "permission":
                return setPermission(e.target.dataset.id);

            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(fkUser && fk_task_list && permission){
            setToggle(false);
            elBody.classList.remove("hidden");
            dispatch(bindUserToTask({ fk_user: fkUser, fk_task_list, permission}));
            return;
        }

        toast.error( "Bad errors!"  , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const toggleClick = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            if (toggle === true) {
                elBody.classList.remove("hidden");
                return setToggle(false);
            }
            setToggle(true);
            elBody.classList.add("hidden");
        }
    }

    return(
        <>
            <p> <strong>Task List</strong> {taskName}</p>
            <form noValidate className={s.form}>
                <label className={s.label}>
                    <input
                        className={s.input}
                        type="text"
                        name="search"
                        value={search}
                        placeholder="Search user"
                        onChange={handleChange}/>
                    <div className={s.searchIcon}>
                        <CiSearch />
                    </div>
                </label>
            </form>

            <form noValidate className={s.form} onSubmit={handleSubmit}>

                {usersData.length > 0 ?
                    (<ul className={s.list}>
                        {usersData.map((user) => (
                            <li key={user.id} className={s.item}>
                                <p>{user.name}</p>
                                <label>
                                    <input className={s.inputRadio} type="radio" name="fkUser" onChange={handleChangeUser} data-id={user.id}/>
                                </label>
                            </li>
                        ))}
                    </ul>) :
                    <p>Not Found User!</p>
                }

                {toggle ? <Permission props={{handleChangeUser, toggleClick}}/> : null}

            </form>
        </>
    );
}

export default BindUserForm;