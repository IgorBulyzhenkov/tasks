import {useState} from "react";
import {useDispatch} from "react-redux";
import tasks from '../../redux/tasks/tasks-operation';
import {toast} from "react-toastify";
import s from "./Login.module.css";
import sCreate from './CreateTaskListForm.module.css';

const { createTasks, getTasks } = tasks;

function CreateTasksForm({ actions }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [is_completed, setIsCompleted] = useState('0');
    const dispatch = useDispatch();

    const { toggleClick, setToggle, fk_task_list, page, limit } = actions;

    const reset = () => {
        setTitle('');
        setDescription('');
        setIsCompleted('0');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(title.trim()){
            dispatch(createTasks({ fk_task_list, title, description, is_completed, reset, setToggle }))
            dispatch(getTasks({ fk_task_list, page, limit }))
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

    const handleChange = ({target: {name, value, checked }}) => {
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

    return (
        <form noValidate onSubmit={handleSubmit} className={sCreate.form_check}>

            <button type='button' className={sCreate.buttonClose} onClick={toggleClick}>x</button>

            <div className="form-group">
                <label className={s.label}>
                    <span className={s.spanLabel}>Title Tasks</span>
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
    );
}

export default CreateTasksForm;