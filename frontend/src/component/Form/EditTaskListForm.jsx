import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import sCreate from "./CreateTaskListForm.module.css";
import s from "./Login.module.css";
import taskList from '../../redux/task_list/task_list-operation';
import {
    getTaskListName,
    getTaskListIsCompleted,
    getTaskListDescription,
    getIsLoading
} from '../../redux/task_list/task_list-selectors';
import {useNavigate, useParams} from "react-router-dom";

const { getOneTaskList, updateTaskList } = taskList;

function EditTaskListForm() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const nameTaskList      = useSelector(getTaskListName);
    const descriptionTaskList      = useSelector(getTaskListDescription);
    const isCompletedTaskList      = useSelector(getTaskListIsCompleted);
    const isLoading                = useSelector(getIsLoading);

    const [name, setName]            = useState(nameTaskList);
    const [description, setDescription]     = useState(descriptionTaskList);
    const [is_completed, setIsCompleted]    = useState(isCompletedTaskList);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOneTaskList({ id }))
    }, []);

    const reset = () => {
        setName('');
        setDescription('');
        setIsCompleted('0');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name.trim()){
            dispatch(updateTaskList({ id, name, description, is_completed, reset }))
            navigate(`/task-list/${id}`, {state: {from: `/task-list/edit/${id}`}});
        }else{
            toast.error( "Name is required"  , {
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
    }

    const handleChange = ({target: {name, value}}) => {
        switch (name) {
            case "name":
                return setName(value);

            case "description":
                return setDescription(value);

            case "is_completed":
                return setIsCompleted(value);

            default:
                return;
        }
    }

    useEffect(() => {
        if (isLoading) {
            setName(nameTaskList || "");
            setDescription(descriptionTaskList || "");
            setIsCompleted(isCompletedTaskList || false);
        }
    }, [isLoading, nameTaskList, descriptionTaskList, isCompletedTaskList]);

    return (
        <>
            { isLoading ?
                <form noValidate onSubmit={handleSubmit} className={sCreate.form_check}>
                    <div className="form-group">
                        <label className={s.label}>
                            <span className={s.spanLabel}>Name Task</span>
                            <input
                                value={name}
                                onChange={handleChange}
                                type="text"
                                name="name"
                                className={s.textField__input}
                                placeholder="Enter name"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className={s.label}>
                            <span className={s.spanLabel}>Description</span>
                            <input
                                type="text"
                                name="description"
                                value={description}
                                onChange={handleChange}
                                className={s.textField__input}
                                placeholder="Description"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className={sCreate.label_check}>
                            <span className={sCreate.spanLabel_check}>Is Completed</span>
                            <input
                                type="checkbox"
                                name="is_completed"
                                value={is_completed}
                                onChange={handleChange}
                                className={sCreate.textField__input_check}
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={s.buttonLog}>
                        Create
                    </button>
                </form>
                    : null
            }
        </>
    );
}

export default EditTaskListForm;