import s from "./Permission.module.css";

function Permission({ props }) {

    const {handleChangeUser, toggleClick} = props;

    return (
        <div className={s.backdrop} onClick={toggleClick}>
            <div className={s.containerPermission}>
                <button type='button' className={s.buttonClose} onClick={toggleClick}>x</button>

                <label className={s.label}>
                    Edit task
                    <input className={s.input} type="radio" name='permission' onChange={handleChangeUser} data-id="edit"/>
                </label>
                <label className={s.label}>
                    View list task
                    <input className={s.input} type="radio" name='permission' onChange={handleChangeUser} data-id="view"/>
                </label>
                <label className={s.label}>
                    View List User
                    <input className={s.input} type="radio" name='permission' onChange={handleChangeUser} data-id="veiw_list"/>
                </label>

                <button type="submit" className={s.saveBtn}>Save</button>
            </div>
        </div>
    );
}

export default Permission;