import { useDispatch, useSelector } from 'react-redux';
import s from './VerifyEmail.module.css';
import user from '../../redux/user/user-operation';
import { getEmail } from "../../redux/user/user-selectors";

const { sendEmailAgain } = user;

function VerifyEmail() {
    const email = useSelector(getEmail);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(sendEmailAgain({email}));
    }

    return (
        <div className={s.textContainer}>
            <p className={s.text}>
                A letter has been sent to the <span className={s.span}>{email}</span> to
                confirm the e-mail. If the email has not arrived, click send again
            </p>
            <button type="button" className={s.button} onClick={handleClick}>
                send again
            </button>
        </div>
    );
}

export default VerifyEmail;