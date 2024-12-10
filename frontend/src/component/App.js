import {Route, Routes, Navigate} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PrivateRouter from "./Routy/PrivateRouter";
import PublicRouter from "./Routy/PublicRouter";
import PulseLoader from "react-spinners/PulseLoader";
import "./App.css";
import {getInLoggedIn, getToken, getVerificationToken, getVerify, getIsRefresh} from "../redux/user/user-selectors";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import user from "../redux/user/user-operation";
import s from "../pages/LoginPage.module.css";

const { getCurrentUser } = user;

const Registration = lazy(() => import("../pages/RegistrationPage"));
const Login = lazy(() => import("../pages/LoginPage"));
const Home = lazy(() => import("../pages/HomePage"));
const Verify = lazy(() => import("../pages/Verify"));
const TaskList = lazy(() => import("../pages/TaskList"));
const OneTaskList = lazy(() => import("../pages/OneTaskList"));
const EditTaskList = lazy(() => import("../pages/EditTaskListPage"));
const Tasks = lazy(() => import("../pages/TasksPage"));
const OneTasks = lazy(() => import('../pages/OneTasks'));
const EditTasks = lazy(() => import("../pages/EditTasks"));
const UsersList = lazy(() => import("../pages/UsersList"));
const BindUser = lazy(() => import("../pages/BindUserPage"));

function App() {
    const verify = useSelector(getVerify);
    const verifyToken = useSelector(getVerificationToken);
    const isLoggedIn = useSelector(getInLoggedIn);
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const isRefresh = useSelector(getIsRefresh);

    useEffect(() => {
        if(token) {
            dispatch(getCurrentUser());
        }
    }, []);

    return (
        <>
            <div className="App">
                {isRefresh ?
                    <div className={s.loader}>
                        <PulseLoader color="#02172a" className="spinier"/>
                    </div>
                    : null
                }
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

                        <Route path="/task-list" element={
                            <PrivateRouter>
                                <TaskList/>
                            </PrivateRouter>
                        } />

                        <Route path="/task-list/:id" element={
                            <PrivateRouter>
                                <OneTaskList/>
                            </PrivateRouter>
                        } />

                        <Route path="/task-list/edit/:id" element={
                            <PrivateRouter>
                                <EditTaskList/>
                            </PrivateRouter>
                        } />

                        <Route path="/tasks/list/:fk_task_list" element={
                            <PrivateRouter>
                                <Tasks/>
                            </PrivateRouter>
                        } />

                        <Route path="/tasks/view/:id" element={
                            <PrivateRouter>
                                <OneTasks/>
                            </PrivateRouter>
                        } />

                        <Route path="/tasks/edit/:id" element={
                            <PrivateRouter>
                                <EditTasks/>
                            </PrivateRouter>
                        } />

                        <Route path="/users-list/:fk_task_list" element={
                            <PrivateRouter>
                                <UsersList/>
                            </PrivateRouter>
                        } />

                        <Route path="/users/bind/:fk_task_list" element={
                            <PrivateRouter>
                                <BindUser/>
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
