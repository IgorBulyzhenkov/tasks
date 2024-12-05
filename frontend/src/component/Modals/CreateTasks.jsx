import CreateTasksForm from '../Form/CreateTasksForm';
import s from './CreateTasks.module.css';

function CreateTasks({ actions }) {

    const { toggleClick } = actions;

    return (
        <div className={s.backdrop} onClick={toggleClick}>
            <div>
                <CreateTasksForm actions={actions}/>
            </div>
        </div>
    );
}

export default CreateTasks;