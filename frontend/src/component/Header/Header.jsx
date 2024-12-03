import {useState} from "react";
import s from "./Header.module.css";
import logo from "../../images/sd_solutions.svg";
import {Link, NavLink} from "react-router-dom";
import Container from "../Container/Container";
import {MdMenu, MdOutlineExitToApp} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {getInLoggedIn, getName} from "../../redux/user/user-selectors";
import user from '../../redux/user/user-operation';
import MobMenu from "../MobMenu/MobMenu";

const { logOutUser } = user;

function Header() {
    const [toggle, setToggle] = useState(false);
    const isLoggedIn = useSelector(getInLoggedIn);
    const name = useSelector(getName);
    const elBody = document.querySelector("body");
    const dispatch = useDispatch();

    const toggleClick = () => {
        if (toggle === true) {
            return setToggle(false);
        }
        setToggle(true);
        elBody.classList.add("hidden");
    };

    const handleClick = () => {
        dispatch(logOutUser());
    };


    return (
        <header className={s.header}>
            <Container>
                <div className={s.headerContainer}>

                    <Link to="/home">
                        <img src={logo} alt="logo" className={s.logo}/>
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <p className={s.text}>Welcome {name}!</p>
                            <nav className={s.nav}>
                                <ul className={s.list}>
                                    <li className={s.item}>
                                        <NavLink
                                            to="/"
                                            className={({isActive}) =>
                                                isActive ? s.activeLink : s.navLink
                                            }
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <button
                                type="button"
                                onClick={handleClick}
                                className={s.buttonExit}
                            >
                                <MdOutlineExitToApp className={s.svgButton}/>
                            </button>

                        </>) : (
                        <>
                            <ul className={s.list}>
                                <li className={s.item}>
                                    <NavLink
                                        to="/login"
                                        // className={s.link}
                                        className={({isActive}) =>
                                            isActive ? s.activeLink : s.navLink
                                        }
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
                                    >
                                        Registration
                                    </NavLink>
                                </li>
                            </ul>
                        </>)}

                    <div>
                        <MdMenu
                            className={!toggle ? s.burgerMenu : s.display}
                            onClick={toggleClick}
                        />
                    </div>
                </div>
            </Container>
            <div>{toggle ? <MobMenu setToggle={setToggle}/> : null}</div>
        </header>
    );
}

export default Header;