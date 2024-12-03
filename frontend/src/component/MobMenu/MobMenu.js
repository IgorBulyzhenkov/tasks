import s from "./MobMenu.module.css";
import {NavLink} from "react-router-dom";
import {FiX} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import Container from "../Container/Container";
import {getInLoggedIn} from "../../redux/user/user-selectors";
import user from "../../redux/user/user-operation";

const {logOutUser} = user;

function MobMenu({setToggle}) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getInLoggedIn);

    const elBody = document.querySelector("body");

    const handleClickToggle = () => {
        setToggle(false);
        elBody.classList.remove("hidden");
    };

    const handleClick = () => {
        dispatch(logOutUser());
        elBody.classList.remove("hidden");
        setToggle(false);
    };

    const removeClass = () => {
        elBody.classList.remove("hidden");
        setToggle(false);
    };

    return (
        <Container>
            <div className={s.menu}>
                <div className={s.close}>
                    <FiX onClick={handleClickToggle} className={s.close}/>
                </div>

                {isLoggedIn ? (
                    <ul className={s.list}>
                        <li className={s.item}>
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    isActive ? s.activeLink : s.navLink
                                }
                                onClick={removeClass}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className={s.item}>
                            <button onClick={handleClick} className={s.buttonExit}>
                                Log out
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className={s.list} onClick={removeClass}>
                        <li className={s.item}>
                            <NavLink
                                to="/login"
                                className={({isActive}) =>
                                    isActive ? s.activeLink : s.navLink
                                }
                                onClick={removeClass}
                            >
                                Log in
                            </NavLink>
                        </li>
                        <li className={s.item}>
                            <NavLink
                                to="/auth"
                                className={({isActive}) =>
                                    isActive ? s.activeLink : s.navLink
                                }
                                onClick={removeClass}
                            >
                                Registration
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </Container>
    );
}

export default MobMenu;

MobMenu.propTypes = {
    setToggle: PropTypes.func.isRequired,
};
