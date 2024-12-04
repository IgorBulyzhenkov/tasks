import {useState} from "react";
import {useDispatch} from "react-redux";
import taskList from '../../redux/task_list/task_list-operation';
import {toast} from "react-toastify";
import s from "./Login.module.css";
import sCreate from './CreateTaskListForm.module.css';

const { createTaskList, getTaskList } = taskList;

function CreateTaskListForm({ actions }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [is_completed, setIsCompleted] = useState('0');
    const dispatch = useDispatch();

    const { toggleClick, setToggle } = actions;

    const reset = () => {
        setName('');
        setDescription('');
        setIsCompleted('0');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name.trim()){
            dispatch(createTaskList({ name, description, is_completed, reset, setToggle }))
            dispatch(getTaskList())
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

    return (
        <form noValidate onSubmit={handleSubmit} className={sCreate.form_check}>

            <button type='button' className={sCreate.buttonClose} onClick={toggleClick}>x</button>

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
    );
}

export default CreateTaskListForm;