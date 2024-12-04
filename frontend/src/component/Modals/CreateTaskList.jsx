import CreateTaskListForm from '../Form/CreateTaskListForm';
import s from './CreateTaskList.module.css';

function CreateTaskList({ actions }) {

    const { toggleClick } = actions;

    return (
        <div className={s.backdrop} onClick={toggleClick}>
            <div>
                <CreateTaskListForm actions={actions}/>
            </div>
        </div>
    );
}

export default CreateTaskList;