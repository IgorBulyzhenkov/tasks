import {Route, Routes, Navigate, Router} from "react-router-dom";
import {lazy, Suspense} from "react";
import {useSelector} from "react-redux";
import PrivateRouter from "./Routy/PrivateRouter";
import PublicRouter from "./Routy/PublicRouter";
import PulseLoader from "react-spinners/PulseLoader";
import "./App.css";
import {getInLoggedIn, getVerificationToken, getVerify} from "../redux/user/user-selectors";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Registration = lazy(() => import("../pages/RegistrationPage"));
const Login = lazy(() => import("../pages/LoginPage"));
const Home = lazy(() => import("../pages/HomePage"));
const Verify = lazy(() => import("../pages/Verify"));

function App() {
    const verify = useSelector(getVerify);
    const verifyToken = useSelector(getVerificationToken);
    const isLoggedIn = useSelector(getInLoggedIn);

    return (
        <>
            <div className="App">
                <Header/>
                <Suspense
                    fallback={
                        <div className="loader">
                            <PulseLoader color="#02172a" className="spinier"/>
                        </div>
                    }
                >
                    <Routes>
                        <Route path='/login' element={
                            <PublicRouter>
                                <Login/>
                            </PublicRouter>
                        }/>
                        <Route path='/auth' element={
                            <PublicRouter>
                                <Registration/>
                            </PublicRouter>
                        }/>
                        <Route path="/" element={
                            <PrivateRouter>
                                <Home/>
                            </PrivateRouter>
                        } />
                        <Route
                            path="/verify-email/:token"
                            element={
                                !verify && verifyToken ? <Verify/> : <Navigate to="/"/>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                isLoggedIn ? <Navigate to="/"/> : <Navigate to="/auth"/>
                            }
                        />
                    </Routes>
                </Suspense>
            </div>
            <Footer/>
            <ToastContainer/>
        </>
    );
}

export default App;
