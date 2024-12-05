import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import sCreate from "./CreateTasksForm.module.css";
import s from "./Login.module.css";
import tasks from '../../redux/tasks/tasks-operation';
import {
    getTasksTitle,
    getTasksIsCompleted,
    getTasksDescription,
    getIsLoading
} from '../../redux/tasks/tasks-selectors';
import {useNavigate, useParams} from "react-router-dom";

const { getOneTasks, updateTasks } = tasks;

function EditTasksForm() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const titleTasks            = useSelector(getTasksTitle);
    const descriptionTasks      = useSelector(getTasksDescription);
    const isCompletedTasks      = useSelector(getTasksIsCompleted);
    const isLoading             = useSelector(getIsLoading);

    const [title, setTitle]                 = useState(titleTasks);
    const [description, setDescription]     = useState(descriptionTasks);
    const [is_completed, setIsCompleted]    = useState(isCompletedTasks);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOneTasks({ id }))
    }, []);

    const reset = () => {
        setTitle('');
        setDescription('');
        setIsCompleted('0');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(title.trim()){
            dispatch(updateTasks({ id, title, description, is_completed, reset }))
            navigate(`/tasks/view/${id}`, {state: {from: `/tasks/edit/${id}`}});
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

    const handleChange = ({target: {name, value, checked}}) => {
        switch (name) {
            case "title":
                return setTitle(value);

            case "description":
                return setDescription(value);

            case "is_completed":
                const completed = !checked ? '0' : '1';
                return setIsCompleted(completed);

            default:
                return;
        }
    }

    useEffect(() => {
        if (isLoading) {
            setTitle(titleTasks || "");
            setDescription(descriptionTasks || "");
            setIsCompleted(isCompletedTasks || false);
        }
    }, [isLoading, titleTasks, descriptionTasks, isCompletedTasks]);

    return (
        <>
            { isLoading ?
                <form noValidate onSubmit={handleSubmit} className={sCreate.form_check}>
                    <div className="form-group">
                        <label className={s.label}>
                            <span className={s.spanLabel}>Title Task</span>
                            <input
                                value={title}
                                onChange={handleChange}
                                type="text"
                                name="title"
                                className={s.textField__input}
                                placeholder="Enter title"/>
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
                                checked={is_completed === '1'}
                                onChange={handleChange}
                                className={sCreate.textField__input_check}
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={s.buttonLog}>
                        Save
                    </button>
                </form>
                    : null
            }
        </>
    );
}

export default EditTasksForm;