import {useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from 'react-toastify';
import s from "./Login.module.css";

function LoginForm() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const reset = () => {
        setPassword("");
        setEmail("");
    }

    const handeSubmit = (e) => {
        e.preventDefault();

        let message = '';

        if (email.trim() === "" || password.trim() === "") {
            // dispatch('');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            message = 'Please enter a valid email';
        }

        if (!email || !password) {
            message = 'Email and password is required';
        }

        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handleChange = ({target: {name, value}}) => {
        switch (name) {
            case "email":
                return setEmail(value);

            case "password":
                return setPassword(value);

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
                        <span className={s.spanLabel}>Email</span>
                        <input
                            value={email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            className={s.textField__input}
                            aria-describedby="emailHelp"
                            placeholder="Enter email"/>
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
                <button
                    type="submit"
                    className={s.buttonLog}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;