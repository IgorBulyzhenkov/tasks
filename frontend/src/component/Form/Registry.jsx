import {useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from "./Registry.module.css";
import user from '../../redux/user/user-operation';

const { regUser } = user;

function Registry() {
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const reset = () => {
        setNickName("");
        setPassword("");
        setEmail("");
        setName("");
    }

    const handeSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let message = '';

        if (!emailRegex.test(email)) {
            message = 'Please enter a valid email';
        }

        if (!email || !password || !name || !nickName) {
            message = 'Email, name, nickname and password is required';
        }

        if(password.length < 6){
            message = 'Password must be at least 6 characters';
        }

        if (name.trim() && nickName.trim() && email.trim() && password.trim() && password.length >= 6 && message.trim() === '') {
            dispatch(regUser({name, nickName, email, password, reset}));
            return;
        }

        toast.error(message, {
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

    const handleChange = ({target: {name, value}}) => {
        switch (name) {
            case "email":
                return setEmail(value);

            case "name":
                return setName(value);

            case "password":
                return setPassword(value);

            case "nickName":
                return setNickName(value);

            default:
                return;
        }
    }

    return (
        <div className={s.formContainer}>
            <div className={s.textContainer}>
                <h1 className={s.title}>Hello!</h1>
                <p className={s.text}>
                    I am glad that you are reviewing my test assignment. In order to go to
                    the main pages, you need to register, then confirm your email, and
                    only then browse the site. The website is adapted to all types of
                    devices, from mobile to desktop. I wish you a nice day and a pleasant
                    viewing!
                </p>
            </div>
        <form noValidate onSubmit={handeSubmit} className={s.form}>
            <div className="form-group">
                <label className={s.label}>
                    <span className={s.spanLabel}>User nick name</span>
                    <input
                        value={nickName}
                        onChange={handleChange}
                        name="nickName"
                        type="text"
                        className={s.textField__input}
                        placeholder="User nick name"/>
                </label>
            </div>
            <div className="form-group">
                <label className={s.label}>
                    <span className={s.spanLabel}>User name</span>
                    <input
                        value={name}
                        onChange={handleChange}
                        name="name"
                        type="text"
                        className={s.textField__input}
                        placeholder="User name"/>
                </label>
            </div>
            <div className="form-group">
                <label className={s.label}>
                    <span className={s.spanLabel}>Email</span>
                    <input
                        value={email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        className={s.textField__input}
                        aria-describedby="emailHelp"
                        placeholder="Email"/>
                </label>
            </div>
            <div className="form-group">
                <label className={s.label}>
                    <span className={s.spanLabel}>Password</span>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className={s.textField__input}
                        placeholder="Password"/>
                </label>
            </div>
            <button type="submit" className={s.buttonReg}>Sing in</button>
        </form>
        </div>
    );
}

export default Registry;